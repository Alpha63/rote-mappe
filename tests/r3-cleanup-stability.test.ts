import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { migrateData } from '../src/utils/migrateData';
import { initialFormData } from '../src/types';

describe('R3: Cleanup & Stability — Absence of Dead Files', () => {
  const rootDir = path.resolve(__dirname, '..');

  const deadFiles = [
    'src/App.css',
    'src/assets/react.svg',
    'public/vite.svg',
    'split_i18n.py',
  ];

  deadFiles.forEach((relPath) => {
    it(`verifies dead file ${relPath} does not exist`, () => {
      const fullPath = path.join(rootDir, relPath);
      expect(fs.existsSync(fullPath)).toBe(false);
    });
  });
});

describe('R3: Cleanup & Stability — package.json Dependencies & Scripts', () => {
  const pkgPath = path.resolve(__dirname, '../package.json');
  const pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

  it('contains valid and required scripts for build, lint, and test', () => {
    expect(pkgJson.scripts).toBeDefined();
    expect(pkgJson.scripts.build).toContain('vite build');
    expect(pkgJson.scripts.lint).toContain('eslint');
    expect(pkgJson.scripts.test).toContain('vitest');
  });

  it('contains all required production dependencies', () => {
    const deps = pkgJson.dependencies;
    expect(deps).toBeDefined();

    const expectedDeps = [
      'react',
      'react-dom',
      'react-hook-form',
      'zod',
      '@hookform/resolvers',
      'i18next',
      'react-i18next',
      'pdf-lib',
      'lucide-react',
      'jszip',
      'file-saver',
      '@uiw/react-md-editor',
      'vite-plugin-pwa',
    ];

    expectedDeps.forEach((dep) => {
      expect(deps[dep], `Missing dependency: ${dep}`).toBeDefined();
    });
  });

  it('does not contain unused or deprecated dependencies', () => {
    const allDeps = {
      ...(pkgJson.dependencies || {}),
      ...(pkgJson.devDependencies || {}),
    };

    // Ensure deprecated or legacy packages are not present
    const prohibitedDeps = ['moment', 'lodash', 'babel-eslint', 'rimraf'];
    prohibitedDeps.forEach((prohibited) => {
      expect(allDeps[prohibited]).toBeUndefined();
    });
  });
});

describe('R3: Cleanup & Stability — migrateData() Schema Backwards Compatibility', () => {
  it('correctly migrates legacy flat schema to modern nested schema', () => {
    const legacyData = {
      firstName: 'Max',
      lastName: 'Mustermann',
      employmentStatus: 'Angestellter',
      employerName: 'Acme Corp GmbH',
      employerAddress: 'Musterstraße 42, 10115 Berlin',
      position: 'Senior Engineer',
      employeeId: 'EMP-12345',
      workEmail: 'max.mustermann@acme.com',
      emergencyContacts: [
        { id: 'c1', type: 'Kollege', name: 'Bob', phone: '012345678', email: 'bob@acme.com' }
      ],
      doctors: [
        { id: 'd1', type: 'Hausarzt', name: 'Dr. Med. Weber', phone: '030-111111', website: 'dr-weber.de', address: 'Praxisweg 1' }
      ],
      birthCert: { id: 'bc-1', name: 'Geburtsurkunde', documentAction: 'upload', fileData: null, fileType: null },
      marriageCert: { id: 'mc-1', name: 'Heiratsurkunde', documentAction: 'skip', fileData: null, fileType: null },
      divorceCert: { id: 'dc-1', name: 'Scheidungsurkunde', documentAction: 'placeholder', fileData: null, fileType: null },
      bankAccounts: [
        {
          id: 'ba-1',
          iban: 'DE89370400440532013000',
          bic: 'COBADEFFXXX',
          bankName: 'Commerzbank',
          bankAddress: 'Frankfurt',
          accountHolder: 'Max Mustermann',
          hasPowerOfAttorney: false,
        }
      ]
    };

    const migrated = migrateData(legacyData);

    // 1. Employment object migration
    expect(migrated.employment).toBeDefined();
    expect(migrated.employment?.status).toBe('Angestellter');
    expect(migrated.employment?.companyName).toBe('Acme Corp GmbH');
    expect(migrated.employment?.street).toBe('Musterstraße 42');
    expect(migrated.employment?.zipCode).toBe('10115');
    expect(migrated.employment?.city).toBe('Berlin');
    expect(migrated.employment?.position).toBe('Senior Engineer');
    expect(migrated.employment?.employeeId).toBe('EMP-12345');
    expect(migrated.employment?.workEmail).toBe('max.mustermann@acme.com');
    expect(migrated.employment?.emergencyContacts).toHaveLength(1);
    expect(migrated.employment?.emergencyContacts[0].name).toBe('Bob');

    // 2. Doctors nested under medicalData
    expect(migrated.medicalData).toBeDefined();
    expect(migrated.medicalData.doctors).toHaveLength(1);
    expect(migrated.medicalData.doctors[0].name).toBe('Dr. Med. Weber');

    // 3. Certificates renamed
    expect(migrated.birthCertificate).toEqual(legacyData.birthCert);
    expect(migrated.marriageCertificate).toEqual(legacyData.marriageCert);
    expect(migrated.divorceCertificate).toEqual(legacyData.divorceCert);

    // 4. Preserved existing fields
    expect(migrated.firstName).toBe('Max');
    expect(migrated.lastName).toBe('Mustermann');
    expect(migrated.bankAccounts).toHaveLength(1);

    // 5. Legacy flat properties are deleted from root
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rootAny = migrated as any;
    expect(rootAny.doctors).toBeUndefined();
    expect(rootAny.employmentStatus).toBeUndefined();
    expect(rootAny.employerName).toBeUndefined();
    expect(rootAny.employerAddress).toBeUndefined();
    expect(rootAny.position).toBeUndefined();
    expect(rootAny.employeeId).toBeUndefined();
    expect(rootAny.workEmail).toBeUndefined();
    expect(rootAny.emergencyContacts).toBeUndefined();
    expect(rootAny.birthCert).toBeUndefined();
    expect(rootAny.marriageCert).toBeUndefined();
    expect(rootAny.divorceCert).toBeUndefined();
  });

  it('handles empty or partial schemas with initialFormData defaults', () => {
    const emptyMigrated = migrateData({});
    expect(emptyMigrated.firstName).toBe(initialFormData.firstName);
    expect(emptyMigrated.lastName).toBe(initialFormData.lastName);
    expect(emptyMigrated.medicalData).toBeDefined();
    expect(emptyMigrated.medicalData.doctors).toEqual([]);
    expect(emptyMigrated.employment).toBeDefined();
  });

  it('preserves already modern nested structures intact', () => {
    const modernData = {
      ...initialFormData,
      firstName: 'Erika',
      lastName: 'Musterfrau',
      employment: {
        status: 'Selbstständiger' as const,
        companyName: 'Musterfrau Design Studio',
        street: 'Designerallee 7',
        zipCode: '80331',
        city: 'München',
        position: 'Geschäftsführerin',
        employeeId: '',
        workEmail: 'erika@design.de',
        emergencyContacts: []
      },
      medicalData: {
        bloodType: 'A+',
        organDonor: true,
        explicitOrganDonationContradiction: false,
        conditions: 'Keine',
        medications: '',
        allergies: 'Pollen',
        doctors: [
          { id: 'doc-1', type: 'Zahnarzt', name: 'Dr. Zahn', phone: '089-12345', website: '', address: 'München' }
        ]
      }
    };

    const result = migrateData(modernData);
    expect(result.firstName).toBe('Erika');
    expect(result.employment?.companyName).toBe('Musterfrau Design Studio');
    expect(result.medicalData.bloodType).toBe('A+');
    expect(result.medicalData.doctors).toHaveLength(1);
  });
});
