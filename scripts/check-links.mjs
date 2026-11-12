import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const urls = [
  'https://github.com/Alpha63/rote-mappe',
  'https://www.bmj.de/DE/service/formulare/form_vorsorgevollmacht/form_vorsorgevollmacht_node.html',
  'https://shop.verbraucherzentrale.de/formulare-testament',
  'https://www.verbraucherzentrale.de/patientenverfuegung-online',
  'https://www.friedhofsverband-sauerland.de/info-center.html',
];

const failures = [];
for (const url of urls) {
  try {
    const { stdout } = await execFileAsync('curl', [
      '--fail', '--location', '--silent', '--show-error',
      '--max-time', '20', '--output', '/dev/null', '--write-out', '%{http_code}', url,
    ]);
    console.log(`${stdout.trim()} ${url}`);
  } catch (error) {
    failures.push(`${url} (${error instanceof Error ? error.message : 'request failed'})`);
  }
}

if (failures.length > 0) {
  throw new Error(`External links failed:\n${failures.join('\n')}`);
}
