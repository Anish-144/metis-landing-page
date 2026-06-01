const fs = require('fs');
const html = fs.readFileSync('C:\\Users\\anish\\.gemini\\antigravity\\brain\\30c7cd00-5764-4b4f-8f95-7080098830ca\\scratch\\hildenkaira.html', 'utf8');

function extract(regex, name) {
  const match = html.match(regex);
  if (match) {
    console.log(`\n=== ${name} ===\n`);
    console.log(match[0].substring(0, 1500));
  } else {
    console.log(`\n=== ${name} Not found ===\n`);
  }
}

// Global colors
extract(/:root\s*{[^}]*}/, 'CSS Variables');

// Nav
extract(/<nav[^>]*>[\s\S]*?<\/nav>/i, 'Nav');

// Hero
extract(/<section[^>]*class="[^"]*hero[^"]*"[^>]*>[\s\S]*?<\/section>/i, 'Hero Section');

// Case studies
extract(/<div[^>]*class="[^"]*work[^"]*"[^>]*>[\s\S]*?<\/div>/i, 'Work Block');
extract(/<section[^>]*class="[^"]*case[^"]*"[^>]*>[\s\S]*?<\/section>/i, 'Case Section');

// Testimonials
extract(/<section[^>]*class="[^"]*testimonial[^"]*"[^>]*>[\s\S]*?<\/section>/i, 'Testimonials');

// Footer
extract(/<footer[^>]*>[\s\S]*?<\/footer>/i, 'Footer');

// About
extract(/<section[^>]*class="[^"]*about[^"]*"[^>]*>[\s\S]*?<\/section>/i, 'About Us');
