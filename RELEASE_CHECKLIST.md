# Release-Checkliste

Vor jedem Release:

- [ ] `npm ci`
- [ ] `npm run lint`
- [ ] `npm test -- --run`
- [ ] `npm run build`
- [ ] `npm run check:performance`
- [ ] Produktionspreview starten und `npm run check:headers` ausführen
- [ ] `npm run check:links` ausführen und externe Vorlagenlinks prüfen
- [ ] `npm audit --omit=optional --audit-level=high`
- [ ] Docker-Image bauen und Container-Healthcheck sowie HTTP-Route prüfen
- [ ] Browser-Smoke-Test bei 375, 768 und 1440 Pixeln durchführen
- [ ] Tastatur- und manuellen Screenreader-Test durchführen
- [ ] Import eines Legacy-, JSON-, verschlüsselten und ZIP-Backups prüfen
- [ ] PDF in allen Templates und Sprachen stichprobenartig prüfen
- [ ] `CHANGELOG.md`, `README.md` und `package.json` auf konsistente Version
      und Release-Notizen prüfen
- [ ] Keine sensiblen Testdaten, Geheimnisse oder temporären Artefakte
      committen
