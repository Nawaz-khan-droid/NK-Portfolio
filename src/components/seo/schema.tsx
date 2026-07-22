export function SeoSchemas() {
  const siteUrl = "https://nawaz-khan-droid.github.io/NK-Portfolio"
  const logoUrl = `${siteUrl}/logo.svg`
  const ogImageUrl = `${siteUrl}/og-image-v2.jpg`

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "Nawaz Khan — AI & Machine Learning Engineer Portfolio",
    alternateName: ["NK Portfolio", "Nawaz Khan AI Portfolio"],
    description:
      "Portfolio of Nawaz Khan — AI & Machine Learning Engineer specializing in RAG systems, agentic workflows, voice AI assistants, and automated AI solutions.",
    publisher: {
      "@type": "Person",
      name: "Nawaz Khan",
      logo: logoUrl,
    },
    inLanguage: "en-US",
  }

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Nawaz Khan",
    givenName: "Nawaz",
    familyName: "Khan",
    jobTitle: "AI & Machine Learning Engineer",
    description:
      "AI & Machine Learning Engineer specializing in RAG architectures, Agentic AI, Voice AI assistants, and automated Python applications.",
    url: siteUrl,
    image: ogImageUrl,
    sameAs: [
      "https://github.com/Nawaz-khan-droid",
      "https://in.linkedin.com/in/nawaz-n-khan",
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Retrieval-Augmented Generation (RAG)",
      "Agentic AI",
      "Python",
      "FastAPI",
      "Next.js",
      "LangChain",
      "Vector Databases (FAISS, ChromaDB)",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "B.K. Birla College of Arts, Science & Commerce (Autonomous), Kalyan, University of Mumbai",
    },
  }

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profilepage`,
    url: siteUrl,
    name: "Nawaz Khan | AI & Machine Learning Engineer Portfolio",
    mainEntity: {
      "@id": `${siteUrl}/#person`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImageUrl,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  )
}
