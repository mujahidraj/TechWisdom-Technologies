import { Helmet } from 'react-helmet-async';
import data from '@/data.json';

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;      // New: Specific image for this page
  keywords?: string[]; // New: Specific keywords for this page
  type?: 'website' | 'article'; // New: Type of content
  noIndex?: boolean;   // New: Option to hide page from Google
}

const SEOHead = ({ 
  title, 
  description, 
  path = '', 
  image, 
  keywords = [], 
  type = 'website',
  noIndex = false
}: SEOHeadProps) => {
  const { site } = data;
  
  // 1. Construct Dynamic Values
  const pageTitle = title ? `${title} | ${site.name}` : site.name;
  const pageDescription = site.description || description;
  const siteUrl = "https://www.techwisdom.site"; // Hardcoded domain for safety
  const currentUrl = `${siteUrl}${path}`;
  const pageImage = image ? `${siteUrl}${image}` : `${siteUrl}/social-preview.png`; // Fallback to a default image
  
  // 2. Merge Default Keywords with Page Keywords
  const baseKeywords = ["Web Development", "TechWisdom", "Software Agency", "Bangladesh","Web Development agency", "Tech Wisdom", "Software Agency in Bangladesh", "Bangladesh website development", "TechWisdom Technologies", "Tech Wisdom", "Twtech", "Web Development Agency", "Custom Software Development", "Mobile App Development", "React Developer", "Node.js Expert", "Digital Trust Solutions", "UI/UX Design", "Graphics Designing", "Digital Marketing Agency", "SEO Services", "Full Stack Developer", "MERN Stack", "Software Company Bangladesh", "Tech Consultancy", "Enterprise Software", "E-commerce Solutions", "Mujahid Rashid Raj", "Website Redesign", "API Integration", "Cloud Solutions", "SaaS Development", "IT Support", "Startup Tech Partner", "Agile Development", "CMS Development" , 	"Responsive Web Design" , 	"Tech Solutions Global" , 	"Offshore Development" , 	"Software Outsourcing" , 	"Tech Innovation" , 	"Web Application Development"];
  const allKeywords = [...baseKeywords, ...keywords].join(", ");

  // 3. Structured Data (JSON-LD) for Google Rich Results
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": type === 'article' ? "Article" : "WebPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": currentUrl,
    "publisher": {
      "@type": "Organization",
      "name": site.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/app-icon.ico`
      }
    }
  };

  return (
    <Helmet>
      {/* --- STANDARD TAGS --- */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content="Mujahid Rashid Raj" />
      <link rel="canonical" href={currentUrl} />
      
      {/* --- ROBOTS (Indexing Control) --- */}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />

      {/* --- OPEN GRAPH (Facebook/LinkedIn) --- */}
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* --- TWITTER CARDS --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@TechWisdomTech" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />

      {/* --- STRUCTURED DATA (The "Secret Weapon") --- */}
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>
    </Helmet>
  );
};

export default SEOHead;