import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";

const BLUR_FADE_DELAY = 0.04;

interface SideProject {
  title: string;
  href: string;
  description: string;
  image: string;
  tags: readonly string[];
  dates: string;
  isExternal?: boolean;
}

interface SidePageProps {
  lang?: string;
  translations?: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
      websiteLink?: string;
      backToResume?: string;
    };
    projects?: any;
  };
}

const getSideProjects = (lang: string, translations?: any): SideProject[] => {
  const t = translations?.projects || {};
  
  return [
    {
      title: t.mugunghwa?.title || "Mugunghwa",
      href: "/mugunghwa",
      description: t.mugunghwa?.description || (lang === "ko" 
        ? "영어와 숫자를 혼합한 32진법 Base 32를 모방해 순수 한글로 72진법 인코드 체계 개발한 오픈소스 모듈입니다."
        : "An open-source module that implements a base-72 encoding system using pure Korean characters, inspired by Base 32 which combines English letters and numbers."),
      image: "https://hmart.app/ko/mugunghwa/og.png",
      tags: ["TypeScript", "Korean", "Encoding"],
      dates: "",
    },
    {
      title: t.biggest?.title || "Biggest",
      href: "/biggest",
      description: t.biggest?.description || (lang === "ko"
        ? "2kb의 가벼운 크기로 무한 정밀도의 큰 정수와 큰 소수를 안전하게 계산할 수 있는 라이브러리입니다."
        : "A lightweight 2kb library for safely calculating arbitrary-precision large integers and decimals."),
      image: "https://hmart.app/ko/biggest/og.png",
      tags: ["TypeScript", "Math", "Big Numbers"],
      dates: "",
    },
    {
      title: t.pseudoShuffle?.title || "Pseudo Shuffle",
      href: "/pseudo-shuffle",
      description: t.pseudoShuffle?.description || (lang === "ko"
        ? "실제로 섞지 않고도 범위에 따라 섞인 것처럼 보이는 인덱스를 만드는 결정론적 유사난수 셔플 라이브러리입니다."
        : "A deterministic pseudo-random shuffle library that creates shuffled-looking indices without actually shuffling."),
      image: "https://hmart.app/ko/pseudo-shuffle/og.png",
      tags: ["TypeScript", "FPE", "Cryptography"],
      dates: "",
    },
    {
      title: t.edgeCrypto?.title || "Edge Crypto",
      href: "/edge-crypto",
      description: t.edgeCrypto?.description || (lang === "ko"
        ? "Node.js, 브라우저, Cloudflare Workers에서 외부 의존성 없이 사용할 수 있는 통합 SubtleCrypto 유틸리티입니다."
        : "A unified SubtleCrypto utility that works across Node.js, browsers, and Cloudflare Workers without external dependencies."),
      image: "https://hmart.app/en/edge-crypto/og.png",
      tags: ["TypeScript", "Crypto", "Edge Computing"],
      dates: "",
    },
    {
      title: t.gaussSpiral?.title || "Gauss Spiral",
      href: "/gauss-spiral",
      description: t.gaussSpiral?.description || (lang === "ko"
        ? "중심에서 바깥으로 원을 점으로 채우는 나선형 열거를 위한 (x, y) ↔ n 매핑을 효율적으로 계산합니다."
        : "Efficiently computes (x, y) ↔ n mapping for spiral enumeration filling circles with points from center outward."),
      image: "https://hmart.app/ko/gauss-spiral/og.png",
      tags: ["TypeScript", "Algorithm", "Math"],
      dates: "",
    },
    {
      title: t.curseScript?.title || "Curse Script",
      href: "/curse-script",
      description: t.curseScript?.description || (lang === "ko"
        ? "코드를 주문과 같은 난독화된 문법으로 변환하는 JavaScript 난독화 도구입니다."
        : "A JavaScript obfuscator that transforms code into spell-like obfuscated syntax."),
      image: "https://hmart.app/en/curse-script/og.png",
      tags: ["TypeScript", "Obfuscation", "Fun"],
      dates: "",
    },
    {
      title: t.akaBrowser?.title || "Aka Browser",
      href: "https://browser.aka.page",
      description: t.akaBrowser?.description || (lang === "ko"
        ? "크로미엄 엔진 기반으로 오픈소스 브라우저를 만들었습니다. 메인 브라우저를 대체하지 않고 항상 위에 고정되는 보조 브라우저 컨셉이며, 일렉트론으로 베타 출시까지 완료했습니다. Widevine DRM 기반으로 Netflix/Disney+/Prime Video의 암호화 콘텐츠 스트리밍 재생을 구현했습니다."
        : "Created an open-source browser based on the Chromium engine. It's a secondary browser concept that stays always on top without replacing the main browser, and completed beta release with Electron. Implemented encrypted content streaming playback for Netflix/Disney+/Prime Video based on Widevine DRM."),
      image: "/image/aka-browser.webp",
      tags: ["Electron", "React", "TypeScript", "Vite", "TailwindCSS"],
      dates: "",
      isExternal: true,
    },
  ];
};

export default function SidePage({ lang = "ko", translations }: SidePageProps = {}) {
  const defaultTranslations = {
    hero: {
      title: lang === "ko" ? "사이드 프로젝트" : "Side Projects",
      subtitle: lang === "ko" ? "오픈소스 라이브러리 컬렉션" : "Open Source Library Collection",
      description: lang === "ko" 
        ? "개발하면서 필요했던 기능들을 범용적인 오픈소스 라이브러리로 만들어 공개했습니다. 각 프로젝트는 실제 문제를 해결하기 위해 설계되었으며, TypeScript로 작성되어 타입 안정성을 보장합니다."
        : "I've created and published general-purpose open-source libraries for functionality I needed during development. Each project is designed to solve real problems and is written in TypeScript to ensure type safety.",
      websiteLink: lang === "ko" ? "웹사이트" : "Website",
      backToResume: lang === "ko" ? "이력서로 돌아가기" : "Back to Resume",
    },
  };

  const t = translations || defaultTranslations;
  const sideProjects = getSideProjects(lang, translations);

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 max-w-4xl mx-auto pt-30 pb-12 sm:pt-24 sm:pb-24 px-6">
      <section id="hero">
        <div className="mx-auto w-full max-w-4xl space-y-8">
          <div className="flex-col flex flex-1 space-y-1.5">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-balance [word-break:keep-all] mb-5"
              yOffset={8}
              text={t.hero.title}
            />
            <BlurFadeText
              className="text-xl sm:text-2xl font-semibold text-muted-foreground"
              delay={BLUR_FADE_DELAY * 2}
              text={t.hero.subtitle}
            />
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <p className="text-base text-black dark:text-white leading-relaxed text-balance [word-break:keep-all] mt-4">
                {t.hero.description}
              </p>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
            {sideProjects.map((project: SideProject, id: number) => {
              const projectHref = project.isExternal ? project.href : `/${lang}${project.href}`;
              return (
              <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 4 + id * 0.05}>
                <ProjectCard
                  href={projectHref}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.tags}
                  image={project.image}
                  fullImage={true}
                  isExternal={project.isExternal}
                  links={[
                    {
                      type: t.hero.websiteLink || (lang === "ko" ? "웹사이트" : "Website"),
                      href: projectHref,
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                      ),
                    },
                  ]}
                />
              </BlurFade>
            );
            })}
          </div>
        </div>
      </section>

      <section id="back-link" className="print:hidden">
        <div className="w-full pb-16 sm:pb-8">
          <div className="max-w-[400px] mx-auto px-4">
            <BlurFade delay={BLUR_FADE_DELAY * 10}>
              <a
                href={`/${lang}`}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg hover:opacity-90 transition-all shadow-md font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
                <span>{t.hero.backToResume || (lang === "ko" ? "이력서로 돌아가기" : "Back to Resume")}</span>
              </a>
            </BlurFade>
          </div>
        </div>
      </section>
    </main>
  );
}
