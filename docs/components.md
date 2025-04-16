# Component Documentation

This document provides detailed information about the key reusable components in the application.

## Table of Contents

- [Image Components](#image-components)
  - [ResponsiveImage](#responsiveimage)
- [SEO Components](#seo-components)
  - [PageMeta](#pagemeta)
- [Router Guards](#router-guards)
  - [AuthGuard](#authguard)
  - [RoleGuard](#roleguard)
- [Lazy Loading](#lazy-loading)
  - [LazyLoadWrapper](#lazyloadwrapper)

## Image Components

### ResponsiveImage

`ResponsiveImage` is a component for handling responsive images with advanced features:

#### Features

- Lazy loading with IntersectionObserver
- Multiple resolutions (srcset) support
- Blur-up loading effect
- Fallback image on error
- Aspect ratio preservation
- WebP format support

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | string | (required) | Main image source URL |
| `srcSet` | string | undefined | Image srcset for responsive sizes |
| `sizes` | string | undefined | Image sizes attribute |
| `placeholder` | string | undefined | Low quality image placeholder |
| `alt` | string | (required) | Alt text for the image |
| `width` | number\|string | undefined | Width of the image |
| `height` | number\|string | undefined | Height of the image |
| `lazy` | boolean | true | Enable/disable lazy loading |
| `className` | string | '' | CSS class name |
| `useWebP` | boolean | true | Whether to allow browser WebP format |
| `aspectRatio` | string | undefined | Aspect ratio to maintain (e.g., "16:9") |
| `objectFit` | string | 'cover' | Image object fit style |
| `loading` | string | 'lazy' | Optional loading strategy |
| `decoding` | string | 'async' | Optional decoding strategy |
| `fallbackSrc` | string | undefined | Fallback image to show on error |
| `onLoad` | function | undefined | Callback when image loads |
| `onError` | function | undefined | Callback when image fails to load |

#### Example Usage

```jsx
import { ResponsiveImage } from 'core/components/Image';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <ResponsiveImage 
        src={product.imageUrl}
        srcSet={`${product.imageUrl_sm} 300w, ${product.imageUrl} 800w, ${product.imageUrl_lg} 1200w`}
        sizes="(max-width: 600px) 300px, (max-width: 1200px) 800px, 1200px"
        placeholder={product.thumbnailUrl}
        alt={product.name}
        aspectRatio="4:3"
        fallbackSrc="/images/product-placeholder.jpg"
      />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  );
}
```

## SEO Components

### PageMeta

`PageMeta` is a component for managing document metadata, including titles, descriptions, and social media tags.

#### Features

- Page title management
- Meta description
- Open Graph tags for social sharing
- Twitter card data
- Canonical URL
- JSON-LD structured data

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | (required) | Page title |
| `siteName` | string | undefined | Site name to append to title |
| `description` | string | undefined | Page description |
| `canonicalUrl` | string | undefined | Page canonical URL |
| `language` | string | 'en' | Language of the page |
| `imageUrl` | string | undefined | Image to use for social sharing |
| `type` | string | 'website' | Type of content |
| `publishDate` | string | undefined | Article publish date |
| `modifiedDate` | string | undefined | Article modification date |
| `author` | string | undefined | Author name |
| `keywords` | string[] | undefined | List of keywords |
| `noIndex` | boolean | false | Prevent search engines from indexing |
| `noFollow` | boolean | false | Prevent search engines from following links |
| `additionalMetaTags` | array | [] | Additional meta tags |
| `twitterCardType` | string | 'summary' | Twitter card type |
| `twitterHandle` | string | undefined | Twitter handle |
| `jsonLd` | object | undefined | Schema.org JSON-LD data |

#### Example Usage

```jsx
import { PageMeta } from 'core/components/SEO';

function ProductPage({ product }) {
  return (
    <>
      <PageMeta 
        title={product.name}
        siteName="My E-commerce Store"
        description={product.description.substring(0, 160)}
        canonicalUrl={`https://example.com/products/${product.slug}`}
        imageUrl={product.imageUrl}
        type="product"
        keywords={[product.category, product.brand, 'buy online']}
        jsonLd={{
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": product.name,
          "description": product.description,
          "image": product.imageUrl,
          "offers": {
            "@type": "Offer",
            "price": product.price,
            "priceCurrency": "USD"
          }
        }}
      />
      <div className="product-page">
        {/* Product content */}
      </div>
    </>
  );
}
```

## Router Guards

### AuthGuard

`AuthGuard` is a component that protects routes requiring authentication.

#### Features

- Redirects unauthenticated users
- Customizable redirect path
- Optional loading state

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | (required) | Components to render when authenticated |
| `redirectTo` | string | '/login' | Path to redirect to when not authenticated |
| `fallback` | ReactNode | null | Component to show while checking authentication |

#### Example Usage

```jsx
import { AuthGuard } from 'core/router/guards';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={
        <AuthGuard fallback={<LoadingSpinner />}>
          <DashboardPage />
        </AuthGuard>
      } />
    </Routes>
  );
}
```

### RoleGuard

`RoleGuard` is a component that protects routes requiring specific user roles.

#### Features

- Role-based access control
- Redirects unauthorized users
- Works with multiple roles

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | (required) | Components to render when authorized |
| `roles` | string[] | (required) | Allowed roles for this route |
| `redirectTo` | string | '/unauthorized' | Path to redirect to when not authorized |
| `fallback` | ReactNode | null | Component to show while checking |

#### Example Usage

```jsx
import { RoleGuard } from 'core/router/guards';

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={
        <AuthGuard>
          <RoleGuard roles={['admin']} fallback={<LoadingSpinner />}>
            <AdminDashboard />
          </RoleGuard>
        </AuthGuard>
      } />
    </Routes>
  );
}
```

## Lazy Loading

### LazyLoadWrapper

`LazyLoadWrapper` is a component that combines error boundary and suspense for lazy-loaded components.

#### Features

- React.lazy integration
- Error handling
- Loading state management

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | (required) | Lazy-loaded components |
| `loadingFallback` | ReactNode | Default spinner | Component to show while loading |
| `errorFallback` | ReactNode | Default error | Component to show on error |

#### Example Usage with lazyImport

```jsx
import { lazyImport, LazyLoadWrapper } from 'core/utils/lazyImport';

// Import components lazily
const { UserProfile } = lazyImport(() => import('./pages/UserProfile'), 'UserProfile');
const Dashboard = lazyImport(() => import('./pages/Dashboard'));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={
          <LazyLoadWrapper
            loadingFallback={<CustomSpinner />}
            errorFallback={<ErrorPage />}
          >
            <Dashboard />
          </LazyLoadWrapper>
        } />
        <Route path="/profile" element={
          <LazyLoadWrapper>
            <UserProfile />
          </LazyLoadWrapper>
        } />
      </Routes>
    </Router>
  );
}
```

This approach provides code-splitting, lazy loading, and error handling for a better user experience and smaller initial bundle size. 