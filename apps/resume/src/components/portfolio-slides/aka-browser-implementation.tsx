import BlurFade from "@/components/magicui/blur-fade";
import type { SlideConfig } from "./types";

interface AkaBrowserImplementationContent {
  coreTitle: string;
  feature1Title: string;
  feature1Detail1: string;
  feature1Detail2: string;
  feature1Detail3: string;
  feature2Title: string;
  feature2Detail1: string;
  feature2Detail2: string;
  feature2Detail3: string;
  feature3Title: string;
  feature3Detail1: string;
  feature3Detail2: string;
  feature4Title: string;
  feature4Detail1: string;
  feature4Detail2: string;
  challengesTitle: string;
  problemLabel: string;
  solutionLabel: string;
  challenge1Title: string;
  challenge1Problem: string;
  challenge1Solution: string;
  challenge2Title: string;
  challenge2Problem: string;
  challenge2Solution: string;
  challenge3Title: string;
  challenge3Problem: string;
  challenge3Solution: string;
}

export const getAkaBrowserImplementation = (content?: AkaBrowserImplementationContent): SlideConfig => ({
  id: "aka-browser-implementation",
  title: "aka-browser 구현",
  subtitle: "핵심 구현 사항",
  icon: (isDark: boolean) => <div className="text-3xl">💻</div>,
  content: (isDark: boolean) => (
    <div className="space-y-4 md:space-y-5">
      <BlurFade delay={0.1}>
        <div
          className={`${isDark ? "bg-zinc-900/50 border-zinc-700" : "bg-white border-zinc-200"} rounded-xl md:rounded-2xl p-4 md:p-6 border shadow-lg hover:shadow-xl transition-shadow duration-300`}
        >
          <h2
            className={`text-base md:text-lg font-bold mb-3 md:mb-4 ${isDark ? "text-white" : "text-black"}`}
          >
            {content?.coreTitle || "핵심 구현 사항"}
          </h2>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-xs sm:text-sm ${isDark ? "text-zinc-300" : "text-black"}`}
          >
            <div>
              <div className="font-semibold mb-1">{content?.feature1Title || "Widevine DRM 통합"}</div>
              <div>{content?.feature1Detail1 || "• Castlabs Electron + Component Updater"}</div>
              <div>{content?.feature1Detail2 || "• EVS VMP 서명 자동화 (afterPack 훅)"}</div>
              <div>{content?.feature1Detail3 || "• 도메인별 User Agent 전환"}</div>
            </div>
            <div>
              <div className="font-semibold mb-1">{content?.feature2Title || "멀티탭 시스템"}</div>
              <div>{content?.feature2Detail1 || "• WebContentsView 생성 + 이벤트 등록"}</div>
              <div>{content?.feature2Detail2 || "• 프리뷰 캡처 → 탭 교체 → 테마 적용"}</div>
              <div>{content?.feature2Detail3 || "• 탭 전환 <100ms, LRU 캠시 최적화"}</div>
            </div>
            <div>
              <div className="font-semibold mb-1">{content?.feature3Title || "보안 시스템"}</div>
              <div>{content?.feature3Detail1 || "• 프로토콜/도메인 검증 + IPC sender 검증"}</div>
              <div>{content?.feature3Detail2 || "• CSP: 개발/프로덕션 환경 분리"}</div>
            </div>
            <div>
              <div className="font-semibold mb-1">{content?.feature4Title || "추가 기능"}</div>
              <div>{content?.feature4Detail1 || "• 북마크: JSON CRUD + IPC 동기화"}</div>
              <div>{content?.feature4Detail2 || "• 에러 페이지: 100+ 에러 코드 매핑"}</div>
            </div>
          </div>
        </div>
      </BlurFade>
      <BlurFade delay={0.15}>
        <div
          className={`${isDark ? "bg-zinc-900/50 border-zinc-700" : "bg-white border-zinc-200"} rounded-xl md:rounded-2xl p-4 md:p-6 border shadow-lg hover:shadow-xl transition-shadow duration-300`}
        >
          <h2
            className={`text-base md:text-lg font-bold mb-3 md:mb-4 ${isDark ? "text-white" : "text-black"}`}
          >
            {content?.challengesTitle || "기술적 도전과 해결"}
          </h2>
          <div
            className={`space-y-2.5 md:space-y-3 text-xs sm:text-sm ${isDark ? "text-zinc-300" : "text-black"}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-2 md:gap-3 items-center">
              <div className="font-semibold text-center md:text-left" style={{ color: "#ef4444" }}>
                {content?.challenge1Title || "🔴 Widevine 서명 실패"}
              </div>
              <div className="text-center md:text-left">
                <div className="font-semibold mb-0.5">{content?.problemLabel || "문제"}</div>
                <div className="text-[10px] sm:text-xs opacity-90">
                  {content?.challenge1Problem || "수동 VMP 서명 시 빌드마다 반복 작업 필요"}
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="font-semibold mb-0.5" style={{ color: "#22c55e" }}>
                  {content?.solutionLabel || "✓ 해결"}
                </div>
                <div className="text-[10px] sm:text-xs opacity-90">
                  {content?.challenge1Solution || "electron-builder afterPack 훅으로 서명 자동화"}
                </div>
              </div>
            </div>
            <div className="h-px bg-zinc-700/30"></div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-2 md:gap-3 items-center">
              <div className="font-semibold text-center md:text-left" style={{ color: "#ef4444" }}>
                {content?.challenge2Title || "🔴 화면 깜빡임"}
              </div>
              <div className="text-center md:text-left">
                <div className="font-semibold mb-0.5">{content?.problemLabel || "문제"}</div>
                <div className="text-[10px] sm:text-xs opacity-90">
                  {content?.challenge2Problem || "탭 전환 시 테마 컬러 재계산으로 UI 지연"}
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="font-semibold mb-0.5" style={{ color: "#22c55e" }}>
                  {content?.solutionLabel || "✓ 해결"}
                </div>
                <div className="text-[10px] sm:text-xs opacity-90">
                  {content?.challenge2Solution || "LRU 캐시로 도메인별 테마 컬러 저장 (100개)"}
                </div>
              </div>
            </div>
            <div className="h-px bg-zinc-700/30"></div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-2 md:gap-3 items-center">
              <div className="font-semibold text-center md:text-left" style={{ color: "#ef4444" }}>
                {content?.challenge3Title || "🔴 보안 vs 기능"}
              </div>
              <div className="text-center md:text-left">
                <div className="font-semibold mb-0.5">{content?.problemLabel || "문제"}</div>
                <div className="text-[10px] sm:text-xs opacity-90">
                  {content?.challenge3Problem || "DRM 재생 위해 sandbox 비활성화 필요"}
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="font-semibold mb-0.5" style={{ color: "#22c55e" }}>
                  {content?.solutionLabel || "✓ 해결"}
                </div>
                <div className="text-[10px] sm:text-xs opacity-90">
                  {content?.challenge3Solution || "프로토콜/도메인/IPC/CSP 4중 검증 체계 구축"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BlurFade>
    </div>
  ),
});

export const akaBrowserImplementation = getAkaBrowserImplementation();
