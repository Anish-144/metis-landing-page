import fs from 'fs';
import * as cheerio from 'cheerio';

// The HTML is wrapped in some markdown or it's raw HTML. We'll just read it and pass to cheerio.
const content = fs.readFileSync('C:\\Users\\anish\\.gemini\\antigravity\\brain\\30c7cd00-5764-4b4f-8f95-7080098830ca\\.system_generated\\steps\\3\\content.md', 'utf8');
const html = content.replace(/```html|```/g, ''); // strip markdown if any
const $ = cheerio.load(html);

console.log('\n=== CSS VARIABLES (COLORS) ===\n');
const cssBlocks = $('style').map((i, el) => $(el).html()).get().join('\n');
const rootMatch = cssBlocks.match(/:root\s*{([^}]+)}/g);
if (rootMatch) {
    console.log(rootMatch.join('\n'));
}

console.log('\n=== HEADINGS ===\n');
$('h1, h2, h3').each((i, el) => {
    console.log(`${el.tagName}: ${$(el).text().replace(/\s+/g, ' ').trim()} [class: ${$(el).attr('class') || ''}]`);
});

console.log('\n=== HERO (section with "hero" class) ===\n');
const hero = $('section[class*="hero"]');
console.log(hero.text().replace(/\s+/g, ' ').trim());

console.log('\n=== ALL SECTIONS WITH CLASSES ===\n');
$('section').each((i, el) => {
    console.log(`Section ${i}: class="${$(el).attr('class') || ''}" id="${$(el).attr('id') || ''}"`);
});

console.log('\n=== SERVICES CARDS ===\n');
$('.service-card').each((i, el) => {
    console.log(`Service ${i}: ${$(el).text().replace(/\s+/g, ' ').trim()}`);
});

console.log('\n=== TESTIMONIALS ===\n');
$('[data-testimonial-item]').each((i, el) => {
    console.log(`Testimonial ${i}: ${$(el).text().replace(/\s+/g, ' ').trim()}`);
});

console.log('\n=== FOOTER ===\n');
console.log($('footer').text().replace(/\s+/g, ' ').trim());
