import { PROFILE } from '../data/portfolio'

export function Seo() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PROFILE.name,
    jobTitle: PROFILE.title,
    description:
      'Senior Full Stack Developer from Mexico with 7+ years building web platforms, commerce systems, and cloud-backed products.',
    image: PROFILE.avatar,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mexico City',
      addressCountry: 'MX',
    },
    knowsLanguage: ['Spanish', 'English'],
    knowsAbout: [
      'Full Stack Development',
      'React',
      'Next.js',
      'Node.js',
      'Cloud Architecture',
      'E-commerce',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
