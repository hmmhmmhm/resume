import type { TFunction } from "i18next";

/**
 * Helper functions to extract translations for client:load components
 *
 * These helpers extract only translated strings from SSR and pass them to the client.
 * This prevents all language JSON files from being included in the client bundle.
 */

/**
 * Extract translations for LogoDownload component
 */
export function extractLogoTranslations(t: TFunction) {
  return {
    title: t("logo.title"),
    transparentSvg: {
      title: t("logo.transparentSvg.title"),
      description: t("logo.transparentSvg.description"),
      button: t("logo.transparentSvg.button"),
    },
    iconSvg: {
      title: t("logo.iconSvg.title"),
      description: t("logo.iconSvg.description"),
      button: t("logo.iconSvg.button"),
    },
  };
}

/**
 * Extract translations for Resume page component
 */
export function extractResumeTranslations(t: TFunction) {
  return {
    downloadPDF: t("resume.downloadPDF"),
    downloadFilename: t("resume.downloadFilename"),
    hero: {
      title: t("resume.hero.title"),
    },
    sections: {
      about: t("resume.sections.about"),
      work: t("resume.sections.work"),
      education: t("resume.sections.education"),
      skills: t("resume.sections.skills"),
      projects: t("resume.sections.projects"),
      projectsSubtitle: t("resume.sections.projectsSubtitle"),
      projectsDescription: t("resume.sections.projectsDescription"),
      publications: t("resume.sections.publications"),
      publicationsSubtitle: t("resume.sections.publicationsSubtitle"),
      publicationsDescription: t("resume.sections.publicationsDescription"),
      hackathons: t("resume.sections.hackathons"),
      hackathonsSubtitle: t("resume.sections.hackathonsSubtitle"),
      hackathonsDescription: t("resume.sections.hackathonsDescription"),
      contact: t("resume.sections.contact"),
    },
    publication: {
      author: t("resume.publication.author"),
      publisher: t("resume.publication.publisher"),
      publishDate: t("resume.publication.publishDate"),
      ebookLink: t("resume.publication.ebookLink"),
    },
    contact: {
      kakao: t("resume.contact.kakao"),
    },
    portfolioLink: t("resume.portfolioLink"),
  };
}

/**
 * Extract translations for Portfolio page component
 */
export function extractPortfolioTranslations(t: TFunction) {
  return {
    downloadPDF: t("portfolio.downloadPDF"),
    downloadFilename: t("portfolio.downloadFilename"),
    pageNumber: t("portfolio.pageNumber"),
  };
}

/**
 * Extract translations for 404 page component
 */
export function extractNotFoundTranslations(t: TFunction) {
  return {
    title: t("notFound.title"),
    description: t("notFound.description"),
    goHome: t("notFound.goHome"),
    goBack: t("notFound.goBack"),
    contactAdmin: t("notFound.contactAdmin"),
  };
}

/**
 * Extract translations for Navbar component
 */
export function extractNavbarTranslations(t: TFunction) {
  return {
    resume: t("navbar.resume"),
    portfolio: t("navbar.portfolio"),
    side: t("navbar.side"),
    github: t("navbar.github"),
    twitter: t("navbar.twitter"),
    kakao: t("navbar.kakao"),
    theme: t("navbar.theme"),
    language: t("navbar.language"),
    ko: t("navbar.ko"),
    en: t("navbar.en"),
  };
}
