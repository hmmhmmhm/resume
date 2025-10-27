import Image from "@/components/image";
import BlurFade from "@/components/magicui/blur-fade";
import type { SlideConfig } from "./types";

export const llamiAppProblem: SlideConfig = {
  id: "problem",
  title: "라미앱 개발 배경",
  subtitle: "비즈니스 문제 정의",
  icon: (isDark: boolean) => <div className="text-3xl">🎯</div>,
  content: (isDark: boolean) => (
    <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-6 md:gap-8 items-start">
      <BlurFade delay={0.1}>
        <div className="relative w-full h-[280px] sm:h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl bg-white p-4 sm:p-6">
          <Image
            src="/image/llami-app-store.webp"
            alt="라미 앱 스토어"
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
            <div
              className={`space-y-2 md:space-y-3 text-xs sm:text-sm ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>
                <div className="font-semibold mb-1">진행기간</div>
                <div>2025.05.04 ~ 2025.06.17 출시</div>
              </div>
              <div>
                <div className="font-semibold mb-1">맡은 역할</div>
                <div>CTO 및 리드 개발자</div>
              </div>
              <div>
                <div className="font-semibold mb-1">프로젝트 기여도</div>
                <div>30% (네이티브 앱 아키텍팅 및 PoC 구현)</div>
              </div>
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
              비즈니스 문제
            </h2>
            <div
              className={`space-y-2 md:space-y-3 text-xs sm:text-sm ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>
                • 결제 페이지에서 <span className="font-bold text-red-700 dark:text-red-400">95% 이탈률</span>
              </div>
              <div>• 고객 인터뷰: "무료 AI 서비스가 많아 결제 망설임"</div>
              <div>
                • CAC가 투자자 요구 대비 <span className="font-bold text-red-700 dark:text-red-400">5배 초과</span>
              </div>
              <div>• 기존 AI 서비스 고정비 절감 방안은 대규모 서비스에만 특화</div>
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={0.25}>
          <div className="text-center">
            <p
              className={`${isDark ? "text-zinc-300" : "text-zinc-600"} text-sm md:text-base italic font-medium text-balance keep-all`}
            >
              "AI 서비스 고정비를 획기적으로 줄일 새로운 방안이 요구됨"
            </p>
          </div>
        </BlurFade>
      </div>
    </div>
  ),
};
