import Image from "@/components/image";
import BlurFade from "@/components/magicui/blur-fade";
import type { SlideConfig } from "./types";

interface LlamiAppDesignContent {
  requirement1: string;
  solution1: string;
  requirement2: string;
  solution2: string;
  requirement3: string;
  solution3: string;
}

export const getLlamiAppDesign = (content?: LlamiAppDesignContent): SlideConfig => ({
  id: "design",
  title: "라미앱 설계",
  subtitle: "요구사항과 해결 방안",
  icon: (isDark: boolean) => <div className="text-3xl">🏗️</div>,
  content: (isDark: boolean) => (
    <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-6 md:gap-8 items-start">
      <BlurFade delay={0.1}>
        <div className="relative w-full h-[280px] sm:h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl bg-white p-4 sm:p-6">
          <Image
            src="/image/llami-app-diagram.svg"
            alt="라미 앱 아키텍처"
            fill
            className="object-contain pointer-events-none"
            draggable={false}
          />
        </div>
      </BlurFade>
      <div className="space-y-4 md:space-y-6">
        <BlurFade delay={0.15}>
          <div
            className={`${isDark ? "bg-zinc-900/50 border-zinc-700" : "bg-white border-zinc-200"} rounded-xl md:rounded-2xl p-4 md:p-6 border shadow-lg`}
          >
            <h2
              className={`text-base md:text-lg font-bold mb-2 md:mb-3 ${isDark ? "text-white" : "text-black"}`}
            >
              {content?.requirement1 || "요구사항 1: 고정비 제로화"}
            </h2>
            <div className={`text-xs sm:text-sm ${isDark ? "text-zinc-300" : "text-black"}`}>
              {content?.solution1 || "→ 온디바이스 AI 앱 설계로 서버 비용 완전 제거"}
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={0.2}>
          <div
            className={`${isDark ? "bg-zinc-900/50 border-zinc-700" : "bg-white border-zinc-200"} rounded-xl md:rounded-2xl p-4 md:p-6 border shadow-lg`}
          >
            <h2
              className={`text-base md:text-lg font-bold mb-2 md:mb-3 ${isDark ? "text-white" : "text-black"}`}
            >
              {content?.requirement2 || "요구사항 2: 웹 팀으로 앱 개발"}
            </h2>
            <div className={`text-xs sm:text-sm ${isDark ? "text-zinc-300" : "text-black"}`}>
              {content?.solution2 || "→ Expo 웹뷰 + 핵심 모듈만 React Native/C++ 하이브리드 설계"}
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={0.25}>
          <div
            className={`${isDark ? "bg-zinc-900/50 border-zinc-700" : "bg-white border-zinc-200"} rounded-xl md:rounded-2xl p-4 md:p-6 border shadow-lg`}
          >
            <h2
              className={`text-base md:text-lg font-bold mb-2 md:mb-3 ${isDark ? "text-white" : "text-black"}`}
            >
              {content?.requirement3 || "요구사항 3: 자체 AI 모델 운용"}
            </h2>
            <div className={`text-xs sm:text-sm ${isDark ? "text-zinc-300" : "text-black"}`}>
              {content?.solution3 || "→ Gemma3 SLM 파인튜닝 후 GGUF 모델로 배포"}
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  ),
});

export const llamiAppDesign = getLlamiAppDesign();
