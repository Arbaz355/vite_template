/**
 * Page Metadata Component
 *
 * A component for managing document metadata, including:
 * - Page title
 * - Meta description
 * - Open Graph tags
 * - Twitter card data
 * - Canonical URL
 * - Other SEO-related tags
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface PageMetaProps {
  /** Page title */
  title: string;
  /** Site name to append to title */
  siteName?: string;
  /** Page description */
  description?: string;
  /** Page canonical URL */
  canonicalUrl?: string;
  /** Language of the page */
  language?: string;
  /** Image to use for social sharing */
  imageUrl?: string;
  /** Type of content (article, website, etc.) */
  type?: 'website' | 'article' | 'profile' | 'book' | 'product';
  /** Article publish date (for articles) */
  publishDate?: string;
  /** Article modification date (for articles) */
  modifiedDate?: string;
  /** Author name (for articles) */
  author?: string;
  /** List of keywords for the page */
  keywords?: string[];
  /** Whether to prevent search engines from indexing the page */
  noIndex?: boolean;
  /** Whether to prevent search engines from following links */
  noFollow?: boolean;
  /** Additional meta tags */
  additionalMetaTags?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
  /** Twitter card type */
  twitterCardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
  /** Twitter handle */
  twitterHandle?: string;
  /** Schema.org JSON-LD scripts for structured data */
  jsonLd?: object | object[];
}

/**
 * PageMeta Component
 *
 * Manages document head metadata for SEO and social sharing.
 */
const PageMeta: React.FC<PageMetaProps> = ({
  title,
  siteName,
  description,
  canonicalUrl,
  language = 'en',
  imageUrl,
  type = 'website',
  publishDate,
  modifiedDate,
  author,
  keywords,
  noIndex = false,
  noFollow = false,
  additionalMetaTags = [],
  twitterCardType = 'summary',
  twitterHandle,
  jsonLd,
}) => {
  // Format full title with site name if provided
  const fullTitle = siteName ? `${title} | ${siteName}` : title;

  // Prepare JSON-LD structured data
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : '';

  return (
    <Helmet htmlAttributes={{ lang: language }}>
      {/* Basic metadata */}
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Search engine directives */}
      {(noIndex || noFollow) && (
        <meta
          name="robots"
          content={`${noIndex ? 'noindex' : 'index'}, ${noFollow ? 'nofollow' : 'follow'}`}
        />
      )}

      {/* Open Graph tags for social sharing */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:type" content={type} />
      {description && <meta property="og:description" content={description} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {siteName && <meta property="og:site_name" content={siteName} />}

      {/* Article-specific metadata */}
      {type === 'article' && publishDate && (
        <meta property="article:published_time" content={publishDate} />
      )}
      {type === 'article' && modifiedDate && (
        <meta property="article:modified_time" content={modifiedDate} />
      )}
      {type === 'article' && author && <meta property="article:author" content={author} />}

      {/* Twitter Card data */}
      <meta name="twitter:card" content={twitterCardType} />
      {twitterHandle && <meta name="twitter:site" content={`@${twitterHandle}`} />}
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}

      {/* Additional meta tags */}
      {additionalMetaTags.map((tag, index) => (
        <meta
          key={`meta-${index}`}
          {...(tag.name ? { name: tag.name } : {})}
          {...(tag.property ? { property: tag.property } : {})}
          content={tag.content}
        />
      ))}

      {/* Structured data */}
      {jsonLd && <script type="application/ld+json">{jsonLdString}</script>}
    </Helmet>
  );
};

export default PageMeta;
