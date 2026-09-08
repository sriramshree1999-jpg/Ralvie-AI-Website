import type { APIRoute } from 'astro';

const pages = [
  '/',
  '/ai-crm/',
  '/ai-email-manager/',
  '/ai-phone-receptionist/',
  '/ai-web-voicebot/',
  '/ai-website-chatbot/',
  '/ai-website-forms/',
  '/blog/',
  '/book-demo/',
  '/contact/',
  '/frontdesk/',
  '/frontdesk/industries/education-institutions/',
  '/frontdesk/industries/financial-services/',
  '/frontdesk/industries/healthcare-clinics/',
  '/frontdesk/industries/hotels-hospitality/',
  '/frontdesk/industries/real-estate/',
  '/frontdesk/use-cases/24-7-customer-support/',
  '/frontdesk/use-cases/crm-lead-management/',
  '/frontdesk/use-cases/customer-support/',
  '/frontdesk/use-cases/human-like-ai-call-chat-handling/',
  '/frontdesk/use-cases/multilingual-support/',
  '/frontdesk/use-cases/smart-call-routing/',
  '/pricing/',
  '/productivity/',
  '/productivity/automatic-activity-tracking/',
  '/productivity/dashboard/',
  '/productivity/projects/',
  '/productivity/screen-captures/',
  '/productivity/tasks/',
  '/productivity/time-logs/',
  '/productivity/industries/agency/',
  '/productivity/industries/consultancy/',
  '/productivity/industries/enterprise/',
  '/productivity/industries/professional-services/',
  '/productivity/industries/saas/',
  '/productivity/use-cases/dashboards-reports/',
  '/productivity/use-cases/employee-productivity/',
  '/productivity/use-cases/project-management/',
  '/productivity/use-cases/task-management/',
  '/productivity/use-cases/time-tracking/',
];

export const GET: APIRoute = () => {
  const urls = pages
    .map((path) => `  <url><loc>https://ralvie.ai${path}</loc></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
