// Descarga la voz en off y la música de cada reel y renderiza los videos finales.
// Uso: npm install && npm run finalizar
import {execSync} from 'node:child_process';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const urls = JSON.parse(readFileSync(join(root, 'scripts', 'audio-urls.json'), 'utf8'));

const REELS = [
  {dir: 'estudia', id: 'WorkshopReel', out: 'renders/estudia-inteligente-reel-final.mp4'},
  {dir: 'educar', id: 'EducarReel', out: 'renders/educar-ia-reel-final.mp4'},
];

for (const [dir, files] of Object.entries(urls)) {
  const folder = join(root, 'public', 'audio', dir);
  mkdirSync(folder, {recursive: true});
  for (const [name, url] of Object.entries(files)) {
    const dest = join(folder, name);
    if (existsSync(dest)) continue;
    process.stdout.write(`Descargando ${dir}/${name}… `);
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(
        `No se pudo descargar ${dir}/${name} (HTTP ${res.status}). ` +
          'Si el enlace venció, descarga el audio desde Magnific y guárdalo en ' +
          `public/audio/${dir}/${name}.`,
      );
    }
    writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    console.log('listo');
  }
}

mkdirSync(join(root, 'renders'), {recursive: true});
for (const reel of REELS) {
  console.log(`\nRenderizando ${reel.out}…`);
  execSync(`npx remotion render ${reel.id} ${reel.out}`, {cwd: root, stdio: 'inherit'});
}
console.log('\nListo. Los videos con voz y música están en la carpeta renders/.');
