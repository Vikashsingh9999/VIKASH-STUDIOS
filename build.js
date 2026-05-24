const fs = require('fs');
const path = require('path');

const services = [
  "AI Development Services", "Web Development Services", "App Development",
  "SaaS Development", "UI/UX Design", "SEO Services", "Branding Services",
  "Cloud Services", "Cybersecurity", "Digital Marketing", "Automation Services",
  "CRM Development", "ERP Solutions", "WordPress Development", "Shopify Development",
  "AI Automation", "Prompt Engineering", "API Development", "Enterprise Software",
  "IT Consulting", "Video Editing", "Creative Design", "Motion Graphics",
  "Social Media Marketing"
];

for(let i=services.length; i<500; i++) {
  services.push(`IT Solution Service ${i+1}`);
}

const certificates = [
  "FGD8654HS-Sakshi-Tameshwarnath-Dubey",
  "FGD8904HS-Pranali-Ashok-Babar"
];

const serviceTemplatePath = path.join(__dirname, 'templates', 'service.html');
const certificateTemplatePath = path.join(__dirname, 'templates', 'certificate.html');

let serviceTemplate = '';
let certificateTemplate = '';

if (fs.existsSync(serviceTemplatePath)) {
  serviceTemplate = fs.readFileSync(serviceTemplatePath, 'utf8');
} else {
  console.warn("templates/service.html not found. Creating dummy template.");
  serviceTemplate = "<html><head><title>{{SERVICE_NAME}}</title></head><body><h1>{{SERVICE_NAME}}</h1></body></html>";
  fs.mkdirSync(path.join(__dirname, 'templates'), { recursive: true });
  fs.writeFileSync(serviceTemplatePath, serviceTemplate);
}

if (fs.existsSync(certificateTemplatePath)) {
  certificateTemplate = fs.readFileSync(certificateTemplatePath, 'utf8');
} else {
  console.warn("templates/certificate.html not found. Creating dummy template.");
  certificateTemplate = "<html><head><title>Certificate {{CERTIFICATE_ID}}</title></head><body><h1>{{CANDIDATE_NAME}}</h1><embed src='/Certificate_PDF/{{CERTIFICATE_ID}}.pdf' /></body></html>";
  fs.writeFileSync(certificateTemplatePath, certificateTemplate);
}

// Ensure directories exist
const dirs = ['services', 'certificates'];
dirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Generate Service Pages
services.forEach(service => {
  const slug = service.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  let html = serviceTemplate
    .replace(/{{SERVICE_NAME}}/g, service)
    .replace(/{{SERVICE_SLUG}}/g, slug);
  
  fs.writeFileSync(path.join(__dirname, 'services', `${slug}.html`), html);
});

// Generate Certificate Pages
certificates.forEach(certId => {
  const dirPath = path.join(__dirname, 'certificates', certId);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  const nameParts = certId.split('-');
  const idPart = nameParts.shift(); // remove ID
  const candidateName = nameParts.join(' ');

  let html = certificateTemplate
    .replace(/{{CERTIFICATE_ID}}/g, certId)
    .replace(/{{CANDIDATE_NAME}}/g, candidateName);

  fs.writeFileSync(path.join(dirPath, 'index.html'), html);
});

// Generate sitemap.xml
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.vikashstudios.online/</loc></url>
  <url><loc>https://www.vikashstudios.online/founders/vikash-b-singh</loc></url>
  <url><loc>https://www.vikashstudios.online/founders/richa-r-gupta</loc></url>
`;

services.forEach(service => {
  const slug = service.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  sitemap += `  <url><loc>https://www.vikashstudios.online/services/${slug}</loc></url>\n`;
});

sitemap += `</urlset>`;
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap);

// Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://www.vikashstudios.online/sitemap.xml
`;
fs.writeFileSync(path.join(__dirname, 'robots.txt'), robotsTxt);

console.log(`Generated ${services.length} service pages, ${certificates.length} certificate pages, sitemap.xml, and robots.txt.`);
