import BlurFade from "@/components/magicui/blur-fade";
import type { SlideConfig } from "./types";

interface LlamiAppImplementationContent {
  coreTitle: string;
  item1Title: string;
  item1Detail1: string;
  item1Detail2: string;
  item2Title: string;
  item2Detail1: string;
  item2Detail2: string;
  item3Title: string;
  item3Detail1: string;
  item3Detail2: string;
  item4Title: string;
  item4Detail1: string;
  item4Detail2: string;
  decisionTitle: string;
  decision1: string;
  decision2: string;
  decision3: string;
  decision4: string;
}

export const getLlamiAppImplementation = (content?: LlamiAppImplementationContent): SlideConfig => ({
  id: "implementation",
  title: "라미앱 구현",
  subtitle: "기술적 도전과 해결",
  icon: (isDark: boolean) => <div className="text-3xl">💻</div>,
  content: (isDark: boolean) => (
    <div className="space-y-6 md:space-y-8">
      <BlurFade delay={0.1}>
        <div
          className={`${isDark ? "bg-zinc-900/50 border-zinc-700" : "bg-white border-zinc-200"} rounded-xl md:rounded-2xl p-5 md:p-8 border shadow-lg hover:shadow-xl transition-shadow duration-300`}
        >
          <h2
            className={`text-lg md:text-xl font-bold mb-4 md:mb-5 ${isDark ? "text-white" : "text-black"}`}
          >
            {content?.coreTitle || "핵심 구현 사항"}
          </h2>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-xs sm:text-sm ${isDark ? "text-zinc-300" : "text-black"}`}
          >
            <div>
              <div className="font-semibold mb-1.5 md:mb-2">{content?.item1Title || "1. 상태 브릿지 시스템"}</div>
              <div>{content?.item1Detail1 || "• Observable State 기반 Expo ↔ React Native 상태 공유"}</div>
              <div>{content?.item1Detail2 || "• 점진적 마이그레이션 가능한 아키텍처"}</div>
            </div>
            <div>
              <div className="font-semibold mb-1.5 md:mb-2">{content?.item2Title || "2. AI 모델 업데이트 시스템"}</div>
              <div>{content?.item2Detail1 || "• Cloudflare R2 기반 GGUF 모델 배포"}</div>
              <div>{content?.item2Detail2 || "• 앱 재설치 없이 모델 업데이트 가능"}</div>
            </div>
            <div>
              <div className="font-semibold mb-1.5 md:mb-2">{content?.item3Title || "3. 크로스 플랫폼 AI 가속"}</div>
              <div>{content?.item3Detail1 || "• llama.cpp 통한 iOS Metal GPU 가속"}</div>
              <div>{content?.item3Detail2 || "• Android CPU 최적화 추론"}</div>
            </div>
            <div>
              <div className="font-semibold mb-1.5 md:mb-2">{content?.item4Title || "4. 개발 생산성 최적화"}</div>
              <div>{content?.item4Detail1 || "• 웹 개발자가 네이티브 지식 없이 개발"}</div>
              <div>{content?.item4Detail2 || "• 타입 안전성 보장된 브릿지 패턴"}</div>
            </div>
          </div>
        </div>
      </BlurFade>
      <BlurFade delay={0.15}>
        <div
          className={`${isDark ? "bg-zinc-900/50 border-zinc-700" : "bg-white border-zinc-200"} rounded-xl md:rounded-2xl p-5 md:p-8 border shadow-lg hover:shadow-xl transition-shadow duration-300`}
        >
          <h2
            className={`text-lg md:text-xl font-bold mb-4 md:mb-5 ${isDark ? "text-white" : "text-black"}`}
          >
            {content?.decisionTitle || "기술적 의사결정"}
          </h2>
          <div
            className={`text-xs sm:text-sm space-y-1.5 md:space-y-2 ${isDark ? "text-zinc-300" : "text-black"}`}
          >
            <div>{content?.decision1 || "• React 컴포넌트로 빠른 MVP 구현 → 점진적 React Native 전환"}</div>
            <div>{content?.decision2 || "• 브릿지 패턴 추상화로 중복 코드 60% 감소"}</div>
            <div>{content?.decision3 || "• EAS Build 자동화로 빌드 시간 50% 단축"}</div>
            <div>{content?.decision4 || "• Observable 기반 상태 관리로 타입 안전성 확보"}</div>
          </div>
        </div>
      </BlurFade>
    </div>
  ),
});

export const llamiAppImplementation = getLlamiAppImplementation();
