import Image from "@/components/image";
import BlurFade from "@/components/magicui/blur-fade";
import type { SlideConfig } from "./types";

export const akaBrowserDesign: SlideConfig = {
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
            <h3
              className={`text-base md:text-lg font-bold mb-2 md:mb-2.5 ${isDark ? "text-white" : "text-black"}`}
            >
              1. 관심사 분리
            </h3>
            <div
              className={`text-xs sm:text-sm space-y-1 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>• TabManager: 탭 생명주기 관리</div>
              <div>• WindowManager: 윈도우 레이아웃 관리</div>
              <div>• SecurityManager: URL 검증 + CSP</div>
              <div>• BookmarkManager: 즐겨찾기 CRUD</div>
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={0.2}>
          <div
            className={`${isDark ? "bg-zinc-900/50 border-zinc-700" : "bg-white border-zinc-200"} rounded-xl md:rounded-2xl p-4 md:p-5 border shadow-lg`}
          >
            <h3
              className={`text-base md:text-lg font-bold mb-2 md:mb-2.5 ${isDark ? "text-white" : "text-black"}`}
            >
              2. 이벤트 기반 통신
            </h3>
            <div
              className={`text-xs sm:text-sm space-y-1 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>• IPC 채널: 메인 ↔ 렌더러 프로세스 분리</div>
              <div>• 타입 안전성: TypeScript 인터페이스 정의</div>
              <div>• 보안 검증: 모든 IPC 요청에서 sender 검증</div>
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={0.25}>
          <div
            className={`${isDark ? "bg-zinc-900/50 border-zinc-700" : "bg-white border-zinc-200"} rounded-xl md:rounded-2xl p-4 md:p-5 border shadow-lg`}
          >
            <h3
              className={`text-base md:text-lg font-bold mb-2 md:mb-2.5 ${isDark ? "text-white" : "text-black"}`}
            >
              3. 메모리 최적화
            </h3>
            <div
              className={`text-xs sm:text-sm space-y-1 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>• 비활성 탭: removeChildView()로 렌더링 중단</div>
              <div>• LRU 캐시: 테마 컬러 100개 도메인 저장</div>
              <div>• 탭 프리뷰: 800x1200 해상도 제한</div>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  ),
};
