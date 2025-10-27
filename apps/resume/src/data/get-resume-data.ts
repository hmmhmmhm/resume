import { DATA } from "./resume";

type TFunction = (key: string, options?: any) => string;

export function getResumeData(t: TFunction) {
  return {
    ...DATA,
    location: t("data.location"),
    birthDate: t("data.birthDate"),
    age: t("data.age"),
    gender: t("data.gender"),
    description: t("data.description"),
    summary: t("data.summary"),
    work: DATA.work.map((work, index) => {
      const keys = ["poul", "abacus", "metamorp", "toss", "aha", "rightcode"];
      const key = keys[index];
      return {
        ...work,
        company: t(`data.work.${key}.company`),
        title: t(`data.work.${key}.title`),
        location: t(`data.work.${key}.location`),
        start: t(`data.work.${key}.start`),
        end: t(`data.work.${key}.end`),
        description: t(`data.work.${key}.description`),
      };
    }),
    education: DATA.education.map((edu) => ({
      ...edu,
      school: t("data.education.hanbat.school"),
      degree: t("data.education.hanbat.degree"),
    })),
    projects: DATA.projects.map((project, index) => {
      const keys = ["akaBrowser", "groundCodes", "postRun", "fridayGPT"];
      const key = keys[index];
      const titleKey = `data.projects.${key}.title`;
      return {
        ...project,
        ...(t(titleKey, { defaultValue: "" }) && { title: t(titleKey) }),
        description: t(`data.projects.${key}.description`),
      };
    }),
    hackathons: DATA.hackathons.map((hackathon, index) => {
      const keys = ["hanghae", "socialVenture", "police", "defense", "certification"];
      const key = keys[index];
      const result: any = {
        ...hackathon,
        title: t(`data.hackathons.${key}.title`),
        dates: t(`data.hackathons.${key}.dates`),
        location: t(`data.hackathons.${key}.location`),
        description: t(`data.hackathons.${key}.description`),
      };
      if ('win' in hackathon) {
        result.win = t(`data.hackathons.${key}.win`);
      }
      return result;
    }),
    publications: DATA.publications.map((pub, index) => {
      const keys = ["cleanVibeCoding", "mugunghwa"];
      const key = keys[index];
      return {
        ...pub,
        title: t(`data.publications.${key}.title`),
        author: t(`data.publications.${key}.author`),
        publisher: t(`data.publications.${key}.publisher`),
        publishDate: t(`data.publications.${key}.publishDate`),
        description: t(`data.publications.${key}.description`),
      };
    }),
  };
}
