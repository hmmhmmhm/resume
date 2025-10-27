type TFunction = (key: string) => string;

// Helper function to extract all fields from a translation key prefix
function extractFields(t: TFunction, prefix: string, fields: string[]) {
  const result: Record<string, string> = {};
  fields.forEach(field => {
    result[field] = t(`${prefix}.${field}`);
  });
  return result;
}

export function getSlideTranslations(t: TFunction) {
  return {
    llamiApp: {
      problem: extractFields(t, "slides.llamiApp.problem", [
        "title", "subtitle", "period", "periodValue", "role", "roleValue",
        "contribution", "contributionValue", "businessProblem",
        "problem1", "problem2", "problem3", "problem4", "quote"
      ]),
      design: extractFields(t, "slides.llamiApp.design", [
        "title", "subtitle", "requirement1", "solution1",
        "requirement2", "solution2", "requirement3", "solution3"
      ]),
      implementation: extractFields(t, "slides.llamiApp.implementation", [
        "title", "subtitle", "coreTitle", "item1Title", "item1Detail1", "item1Detail2",
        "item2Title", "item2Detail1", "item2Detail2", "item3Title", "item3Detail1", "item3Detail2",
        "item4Title", "item4Detail1", "item4Detail2", "decisionTitle",
        "decision1", "decision2", "decision3", "decision4"
      ]),
      results: extractFields(t, "slides.llamiApp.results", [
        "title", "subtitle", "metric1Value", "metric1Title", "metric1Desc",
        "metric2Value", "metric2Title", "metric2Desc", "metric3Value", "metric3Title", "metric3Desc",
        "learningsTitle", "businessTitle", "business1", "business2", "business3",
        "technicalTitle", "technical1", "technical2", "technical3"
      ]),
    },
    llamiRobotics: {
      problem: extractFields(t, "slides.llamiRobotics.problem", [
        "title", "subtitle", "period", "periodValue", "role", "roleValue",
        "contribution", "contributionValue", "challengesTitle",
        "challenge1Title", "challenge1Desc", "challenge2Title", "challenge2Desc",
        "challenge3Title", "challenge3Desc", "challenge4Title", "challenge4Desc"
      ]),
      design: extractFields(t, "slides.llamiRobotics.design", [
        "title", "subtitle", "decision1", "detail1", "decision2", "detail2",
        "decision3", "detail3", "decision4", "detail4"
      ]),
      implementation: extractFields(t, "slides.llamiRobotics.implementation", [
        "title", "subtitle", "challenge1Title", "challenge1Situation", "challenge1Action", "challenge1Impact",
        "challenge2Title", "challenge2Situation", "challenge2Action", "challenge2Impact",
        "challenge3Title", "challenge3Situation", "challenge3Action", "challenge3Impact",
        "challenge4Title", "challenge4Situation", "challenge4Action", "challenge4Impact"
      ]),
      results: extractFields(t, "slides.llamiRobotics.results", [
        "title", "subtitle", "businessImpactTitle",
        "metric1Value", "metric1Title", "metric1Desc",
        "metric2Value", "metric2Title", "metric2Desc", "metric3Value", "metric3Title", "metric3Desc",
        "metric4Value", "metric4Title", "metric4Desc",
        "technicalDecisionTitle", "technical1", "technical2", "technical3", "technical4",
        "learningsTitle", "learning1", "learning2", "learning3"
      ]),
    },
    akaBrowser: {
      problem: extractFields(t, "slides.akaBrowser.problem", [
        "title", "subtitle", "period", "periodValue", "role", "roleValue",
        "techStack", "techStackValue", "painPointTitle",
        "painPoint1", "painPoint2", "painPoint3", "quote"
      ]),
      design: extractFields(t, "slides.akaBrowser.design", [
        "title", "subtitle",
        "decision1Title", "decision1Detail1", "decision1Detail2", "decision1Detail3", "decision1Detail4",
        "decision2Title", "decision2Detail1", "decision2Detail2", "decision2Detail3",
        "decision3Title", "decision3Detail1", "decision3Detail2", "decision3Detail3"
      ]),
      implementation: extractFields(t, "slides.akaBrowser.implementation", [
        "title", "subtitle", "coreTitle",
        "feature1Title", "feature1Detail1", "feature1Detail2", "feature1Detail3",
        "feature2Title", "feature2Detail1", "feature2Detail2", "feature2Detail3",
        "feature3Title", "feature3Detail1", "feature3Detail2",
        "feature4Title", "feature4Detail1", "feature4Detail2",
        "challengesTitle", "problemLabel", "solutionLabel",
        "challenge1Title", "challenge1Problem", "challenge1Solution",
        "challenge2Title", "challenge2Problem", "challenge2Solution",
        "challenge3Title", "challenge3Problem", "challenge3Solution"
      ]),
      results: extractFields(t, "slides.akaBrowser.results", [
        "title", "subtitle", "metric1Value", "metric1Title", "metric1Desc",
        "metric2Value", "metric2Title", "metric2Desc", "metric3Value", "metric3Title", "metric3Desc",
        "metric4Value", "metric4Title", "metric4Desc",
        "achievementsTitle", "achievement1Title", "achievement1", "achievement2Title", "achievement2",
        "achievement3Title", "achievement3", "learningsTitle",
        "learning1Title", "learning1Detail", "learning2Title", "learning2Detail",
        "learning3Title", "learning3Detail", "learning4Title", "learning4Detail"
      ]),
    },
    curiosity: {
      problem: extractFields(t, "slides.curiosity.problem", [
        "title", "subtitle", "businessProblemTitle", "businessProblemSubtitle",
        "problem1", "problem2", "problem3", "existingToolsTitle",
        "existingTool1", "existingTool2", "existingTool3", "existingTool4", "quote"
      ]),
      design: extractFields(t, "slides.curiosity.design", [
        "title", "subtitle",
        "requirement1Title", "requirement1Detail1", "requirement1Detail2", "requirement1Detail3",
        "requirement2Title", "requirement2Detail1", "requirement2Detail2", "requirement2Detail3",
        "requirement3Title", "requirement3Detail1", "requirement3Detail2", "requirement3Detail3",
        "requirement4Title", "requirement4Detail1", "requirement4Detail2", "requirement4Detail3"
      ]),
      implementation: extractFields(t, "slides.curiosity.implementation", [
        "title", "subtitle",
        "feature1Title", "feature1Detail1", "feature1Detail2", "feature1Detail3",
        "feature2Title", "feature2Detail1", "feature2Detail2", "feature2Detail3",
        "feature3Title", "feature3Detail1", "feature3Detail2", "feature3Detail3",
        "decisionTitle", "decision1", "decision2", "decision3"
      ]),
      results: extractFields(t, "slides.curiosity.results", [
        "title", "subtitle", "metric1Value", "metric1Title", "metric1Desc",
        "metric2Value", "metric2Title", "metric2Desc", "metric3Value", "metric3Title", "metric3Desc",
        "learningsTitle", "architectureTitle", "architecture1", "architecture2", "architecture3",
        "balanceTitle", "balance1", "balance2", "balance3",
        "discontinuedTitle", "discontinuedSubtitle", "discontinued1", "discontinued2", "discontinued3",
        "futureTitle", "future1", "future2", "future3"
      ]),
    },
  };
}
