import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const html=fs.readFileSync('dist/index.html','utf8');
assert.equal((html.match(/<h1[ >]/g)||[]).length,1,'Exactly one H1');
assert.match(html,/<html lang="es-AR"/);
for(const x of ['canonical','og:image','application/ld+json','id="contacto"','jw-marquee__track','Tranquilidad técnica garantizada'])assert.ok(html.includes(x),x);
for(const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g))JSON.parse(m[1]);
const base=process.env.BASE_PATH||'/';
for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)){let u=m[1];if(!u.startsWith('/')||u.startsWith('//'))continue;if(base!=='/'&&u.startsWith(base))u=u.slice(base.length);const p=path.join('dist',decodeURIComponent(u.replace(/^\//,'')));assert.ok(fs.existsSync(p),'Missing local asset: '+p)}
assert.ok(!html.includes('wp-content'),'No remote WordPress assets');
assert.ok(!html.includes(' -</span>'),'No marquee dashes');
assert.ok(fs.existsSync('dist/sitemap.xml'));assert.ok(fs.existsSync('dist/robots.txt'));
console.log('OK: H1, SEO, JSON-LD, anchors, local resources, marquee and static endpoints');
