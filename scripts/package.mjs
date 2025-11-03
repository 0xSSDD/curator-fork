import * as Fs from 'node:fs';

const pkg = process.cwd();
if (Fs.existsSync(`${pkg}/publish`) && Fs.statSync(`${pkg}/publish`).isDirectory()) {
  Fs.rmSync(`${pkg}/publish`, { recursive: true, force: true });
}

Fs.mkdirSync(`${pkg}/publish`);
Fs.cpSync(`${pkg}/dist`, `${pkg}/publish/dist`, { recursive: true });
Fs.cpSync(`${pkg}/src`, `${pkg}/publish/src`, { recursive: true });

if (Fs.existsSync(`${pkg}/README.md`)) {
  Fs.cpSync(`${pkg}/README.md`, `${pkg}/publish/README.md`);
}

if (Fs.existsSync(`${pkg}/LICENSE`)) {
  Fs.cpSync(`${pkg}/LICENSE`, `${pkg}/publish/LICENSE`);
}

if (Fs.existsSync(`${pkg}/package.json`)) {
  Fs.cpSync(`${pkg}/package.json`, `${pkg}/publish/package.json`);
}
