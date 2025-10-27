import BlurFade from "@/components/magicui/blur-fade";
import type { SlideConfig } from "./types";

export const akaBrowserResults: SlideConfig = {
  id: "aka-browser-results",
  title: "aka-browser 결과",
  subtitle: "프로젝트 성과",
  icon: (isDark: boolean) => <div className="text-3xl">🚀</div>,
  content: (isDark: boolean) => (
    <div className="space-y-6 md:space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <BlurFade delay={0.1}>
          <div
            className="rounded-xl md:rounded-2xl p-4 md:p-6 border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
            style={{
              borderColor: isDark ? "rgba(241, 108, 50, 0.5)" : "rgba(241, 108, 50, 0.3)",
              backgroundColor: isDark ? "rgba(241, 108, 50, 0.15)" : "rgba(241, 108, 50, 0.08)",
            }}
          >
            <div
              className="text-2xl sm:text-3xl md:text-4xl font-black mb-2"
              style={{ color: "#F16C32" }}
            >
              &lt;100ms
            </div>
            <div
              className={`text-xs md:text-sm font-bold mb-1 ${isDark ? "text-white" : "text-black"}`}
            >
              탭 전환
            </div>
            <div className={`text-[10px] md:text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              프리뷰 캐싱
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={0.15}>
          <div
            className="rounded-xl md:rounded-2xl p-4 md:p-6 border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
            style={{
              borderColor: isDark ? "rgba(241, 108, 50, 0.5)" : "rgba(241, 108, 50, 0.3)",
              backgroundColor: isDark ? "rgba(241, 108, 50, 0.15)" : "rgba(241, 108, 50, 0.08)",
            }}
          >
            <div
              className="text-2xl sm:text-3xl md:text-4xl font-black mb-2"
              style={{ color: "#F16C32" }}
            >
              ~150MB
            </div>
            <div
              className={`text-xs md:text-sm font-bold mb-1 ${isDark ? "text-white" : "text-black"}`}
            >
              메모리
            </div>
            <div className={`text-[10px] md:text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              3탭 기준
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={0.2}>
          <div
            className="rounded-xl md:rounded-2xl p-4 md:p-6 border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
            style={{
              borderColor: isDark ? "rgba(241, 108, 50, 0.5)" : "rgba(241, 108, 50, 0.3)",
              backgroundColor: isDark ? "rgba(241, 108, 50, 0.15)" : "rgba(241, 108, 50, 0.08)",
            }}
          >
            <div
              className="text-2xl sm:text-3xl md:text-4xl font-black mb-2"
              style={{ color: "#F16C32" }}
            >
              100%
            </div>
            <div
              className={`text-xs md:text-sm font-bold mb-1 ${isDark ? "text-white" : "text-black"}`}
            >
              빌드 자동화
            </div>
            <div className={`text-[10px] md:text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              수동 작업 제로
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={0.25}>
          <div
            className="rounded-xl md:rounded-2xl p-4 md:p-6 border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
            style={{
              borderColor: isDark ? "rgba(241, 108, 50, 0.5)" : "rgba(241, 108, 50, 0.3)",
              backgroundColor: isDark ? "rgba(241, 108, 50, 0.15)" : "rgba(241, 108, 50, 0.08)",
            }}
          >
            <div
              className="text-2xl sm:text-3xl md:text-4xl font-black mb-2"
              style={{ color: "#F16C32" }}
            >
              4중
            </div>
            <div
              className={`text-xs md:text-sm font-bold mb-1 ${isDark ? "text-white" : "text-black"}`}
            >
              보안 검증
            </div>
            <div className={`text-[10px] md:text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              프로토콜/도메인/IPC/CSP
            </div>
          </div>
        </BlurFade>
      </div>
      <BlurFade delay={0.3}>
        <div
          className={`${isDark ? "bg-zinc-900/50 border-zinc-700" : "bg-white border-zinc-200"} rounded-xl md:rounded-2xl p-5 md:p-8 border shadow-lg hover:shadow-xl transition-shadow duration-300`}
        >
          <h3
            className={`text-lg md:text-xl font-bold mb-4 md:mb-5 ${isDark ? "text-white" : "text-black"}`}
          >
            정성적 성과
          </h3>
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-xs sm:text-sm ${isDark ? "text-zinc-300" : "text-black"}`}
          >
            <div>
              <div className="font-semibold mb-1.5 md:mb-2">✅ 실제 서비스 운영</div>
              <div>GitHub 오픈소스 + macOS 배포</div>
            </div>
            <div>
              <div className="font-semibold mb-1.5 md:mb-2">✅ 기술 부채 관리</div>
              <div>TypeScript 엄격 모드 + 모듈화</div>
            </div>
            <div>
              <div className="font-semibold mb-1.5 md:mb-2">✅ 성능 최적화</div>
              <div>LRU 캐시 + 렌더링 최적화</div>
            </div>
          </div>
        </div>
      </BlurFade>
      <BlurFade delay={0.35}>
        <div
          className={`${isDark ? "bg-zinc-900/50 border-zinc-700" : "bg-white border-zinc-200"} rounded-xl md:rounded-2xl p-5 md:p-8 border shadow-lg hover:shadow-xl transition-shadow duration-300`}
        >
          <h3
            className={`text-lg md:text-xl font-bold mb-4 md:mb-5 ${isDark ? "text-white" : "text-black"}`}
          >
            핵심 인사이트
          </h3>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-xs sm:text-sm ${isDark ? "text-zinc-300" : "text-black"}`}
          >
            <div>
              <div className="font-semibold mb-1.5 md:mb-2">빠른 변화 대응</div>
              <div>Netflix UA 정책 변경 → 도메인별 UA 전환 (2시간)</div>
            </div>
            <div>
              <div className="font-semibold mb-1.5 md:mb-2">서비스 안정성</div>
              <div>Widevine 검증 실패 → EVS 서명 자동화</div>
            </div>
            <div>
              <div className="font-semibold mb-1.5 md:mb-2">기술 부채 예방</div>
              <div>정적 HTML → React TSX 동적 생성</div>
            </div>
            <div>
              <div className="font-semibold mb-1.5 md:mb-2">보안과 기능 균형</div>
              <div>sandbox 비활성화 → 4중 검증으로 보안 유지</div>
            </div>
          </div>
        </div>
      </BlurFade>
    </div>
  ),
};
