const fs = require('fs');
const path = require('path');

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('ERROR: SUPABASE_URL and SUPABASE_ANON_KEY env vars are required');
  process.exit(1);
}

const dist = path.join(__dirname, 'dist');
fs.mkdirSync(dist, { recursive: true });

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace("'__SUPABASE_URL__'", JSON.stringify(url));
html = html.replace("'__SUPABASE_KEY__'", JSON.stringify(key));
fs.writeFileSync(path.join(dist, 'index.html'), html);

['logo_uwi_lrg.jpg', 'default_data.zip', 'default_increments.csv', 'mapping.xlsx'].forEach(f => {
  if (fs.existsSync(f)) fs.copyFileSync(f, path.join(dist, f));
});

console.log('Build complete → dist/');
