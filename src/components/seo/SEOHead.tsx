import { Helmet } from 'react-helmet-async';
import data from '@/data.json';

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
}

const SEOHead = ({ title, description, path = '' }: SEOHeadProps) => {
  const { site } = data;
  const pageTitle = title ? `${title} | ${site.name}` : site.name;
  const pageDescription = description || site.description;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <link rel="canonical" href={`https://nexgendigital.com${path}`} />
    </Helmet>
  );
};

export default SEOHead;
