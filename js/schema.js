(() => {
  const page = window.location.pathname.split("/").pop() || "index.html";
  const baseUrl = "http://ivytrainingconsulting.com";

  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ivy Training & Consulting UK",
    url: baseUrl,
    logo: `${baseUrl}/assets/logo.jpg`,
    email: "support@ivytrainingconsulting.com",
    telephone: "+1-346-546-6197",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@ivytrainingconsulting.com",
        telephone: "+1-346-546-6197",
        availableLanguage: ["en-GB", "en-US"],
      },
    ],
    areaServed: ["GB", "US"],
  };

  const courseMap = {
    "cloud-computing.html": {
      name: "Cloud Computing",
      description:
        "A structured 10-week, hands-on program with labs, projects and career support.",
    },
    "devops-engineering.html": {
      name: "DevOps Engineering",
      description:
        "A structured 10-week, hands-on program with labs, projects and career support.",
    },
    "solution-architecture.html": {
      name: "Solution Architecture",
      description:
        "A structured 10-week, hands-on program with labs, projects and career support.",
    },
    "data-science.html": {
      name: "Data Science",
      description:
        "A structured 10-week, hands-on program with labs, projects and career support.",
    },
    "ai-for-engineers.html": {
      name: "AI for Engineers",
      description:
        "A structured 10-week, hands-on program with labs, projects and career support.",
    },
  };

  const scripts = [];
  scripts.push(org);

  if (courseMap[page]) {
    scripts.push({
      "@context": "https://schema.org",
      "@type": "Course",
      name: courseMap[page].name,
      description: courseMap[page].description,
      provider: {
        "@type": "Organization",
        name: org.name,
        url: org.url,
      },
      url: `${baseUrl}/${page}`,
    });
  }

  const el = document.createElement("script");
  el.type = "application/ld+json";
  el.text = JSON.stringify(scripts.length === 1 ? scripts[0] : scripts);
  document.head.appendChild(el);
})();

