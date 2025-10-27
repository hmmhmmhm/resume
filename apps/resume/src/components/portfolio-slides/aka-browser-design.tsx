import Image from "@/components/image";
import BlurFade from "@/components/magicui/blur-fade";
import type { SlideConfig } from "./types";

interface AkaBrowserDesignContent {
  decision1Title: string;
  decision1Detail1: string;
  decision1Detail2: string;
  decision1Detail3: string;
  decision1Detail4: string;
  decision2Title: string;
  decision2Detail1: string;
  decision2Detail2: string;
  decision2Detail3: string;
  decision3Title: string;
  decision3Detail1: string;
  decision3Detail2: string;
  decision3Detail3: string;
}

export const getAkaBrowserDesign = (content?: AkaBrowserDesignContent): SlideConfig => ({
  id: "aka-browser-design",
  title: "aka-browser 설계",
  subtitle: "시스템 아키텍처",
  icon: (isDark: boolean) => <div className="text-3xl">🏗️</div>,
  content: (isDark: boolean) => (
    <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-6 md:gap-8 items-start">
      <BlurFade delay={0.1}>
        <div className="relative w-full h-[280px] sm:h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl bg-white p-4 sm:p-6">
          <Image
            src="/image/aka-browser-diagram.svg"
            alt="aka-browser 아키텍처"
            fill
            className="object-contain pointer-events-none"
            draggable={false}
          />
        </div>
      </BlurFade>
      <div className="space-y-3 md:space-y-3">
        <BlurFade delay={0.15}>
          <div
            className={`${isDark ? "bg-zinc-900/50 border-zinc-700" : "bg-white border-zinc-200"} rounded-xl md:rounded-2xl p-4 md:p-5 border shadow-lg`}
          >
            <h2
              className={`text-base md:text-lg font-bold mb-2 md:mb-2.5 ${isDark ? "text-white" : "text-black"}`}
            >
              {content?.decision1Title || "1. 관심사 분리"}
            </h2>
            <div
              className={`text-xs sm:text-sm space-y-1 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>{content?.decision1Detail1 || "• TabManager: 탭 생명주기 관리"}</div>
              <div>{content?.decision1Detail2 || "• WindowManager: 윈도우 레이아웃 관리"}</div>
              <div>{content?.decision1Detail3 || "• SecurityManager: URL 검증 + CSP"}</div>
              <div>{content?.decision1Detail4 || "• BookmarkManager: 즐겨찾기 CRUD"}</div>
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={0.2}>
          <div
            className={`${isDark ? "bg-zinc-900/50 border-zinc-700" : "bg-white border-zinc-200"} rounded-xl md:rounded-2xl p-4 md:p-5 border shadow-lg`}
          >
            <h2
              className={`text-base md:text-lg font-bold mb-2 md:mb-2.5 ${isDark ? "text-white" : "text-black"}`}
            >
              {content?.decision2Title || "2. 이벤트 기반 통신"}
            </h2>
            <div
              className={`text-xs sm:text-sm space-y-1 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>{content?.decision2Detail1 || "• IPC 채널: 메인 ↔ 렌더러 프로세스 분리"}</div>
              <div>{content?.decision2Detail2 || "• 타입 안전성: TypeScript 인터페이스 정의"}</div>
              <div>{content?.decision2Detail3 || "• 보안 검증: 모든 IPC 요청에서 sender 검증"}</div>
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={0.25}>
          <div
            className={`${isDark ? "bg-zinc-900/50 border-zinc-700" : "bg-white border-zinc-200"} rounded-xl md:rounded-2xl p-4 md:p-5 border shadow-lg`}
          >
            <h2
              className={`text-base md:text-lg font-bold mb-2 md:mb-2.5 ${isDark ? "text-white" : "text-black"}`}
            >
              {content?.decision3Title || "3. 메모리 최적화"}
            </h2>
            <div
              className={`text-xs sm:text-sm space-y-1 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>{content?.decision3Detail1 || "• 비활성 탭: removeChildView()로 렌더링 중단"}</div>
              <div>{content?.decision3Detail2 || "• LRU 캐시: 테마 컬러 100개 도메인 저장"}</div>
              <div>{content?.decision3Detail3 || "• 탭 프리뷰: 800x1200 해상도 제한"}</div>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  ),
});

export const akaBrowserDesign = getAkaBrowserDesign();
