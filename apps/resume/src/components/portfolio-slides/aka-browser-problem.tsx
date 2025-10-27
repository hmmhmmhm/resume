import Image from "@/components/image";
import BlurFade from "@/components/magicui/blur-fade";
import type { SlideConfig } from "./types";

export const akaBrowserProblem: SlideConfig = {
  id: "aka-browser-problem",
  title: "aka-browser: 미니 브라우저 개발",
  subtitle: "프로젝트 개요 및 배경",
  icon: (isDark: boolean) => <div className="text-3xl">🎯</div>,
  content: (isDark: boolean) => (
    <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-6 md:gap-8 items-start">
      <BlurFade delay={0.1}>
        <div className="relative w-full h-[280px] sm:h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl bg-white p-4 sm:p-6">
          <Image
            src="/image/aka-browser.webp"
            alt="aka-browser"
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
                <div>2025.10월 2주 진행 (오픈소스)</div>
              </div>
              <div>
                <div className="font-semibold mb-1">맡은 역할</div>
                <div>개인 프로젝트 (설계, 개발, 배포)</div>
              </div>
              <div>
                <div className="font-semibold mb-1">기술 스택</div>
                <div>Electron (Castlabs), React 18, TypeScript, Vite</div>
              </div>
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={0.2}>
          <div
            className={`${isDark ? "bg-zinc-900/50 border-zinc-700" : "bg-white border-zinc-200"} rounded-xl md:rounded-2xl p-4 md:p-6 border shadow-lg`}
          >
            <h3
              className={`text-base md:text-lg font-bold mb-2 md:mb-3 ${isDark ? "text-white" : "text-black"}`}
            >
              사용자 페인 포인트
            </h3>
            <div
              className={`space-y-2 md:space-y-3 text-xs sm:text-sm ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>• 웹 / Expo 개발 시 iOS 시뮬레이터는 노트북에서 항상켜기 너무 무거움</div>
              <div>• Netflix를 PiP 모드로 볼 경우 자막이 PiP에 표시되지 않음</div>
              <div>• DRM 콘텐츠 재생이 가능하며 항상 위에 떠있는 미니 브라우저 부재</div>
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={0.25}>
          <div className="text-center">
            <p
              className={`${isDark ? "text-zinc-300" : "text-zinc-600"} text-sm md:text-base italic font-medium text-balance keep-all`}
            >
              "작업하면서 항상 위에 떠있는, 가벼운 세컨드 브라우저가 필요하다"
            </p>
          </div>
        </BlurFade>
      </div>
    </div>
  ),
};
