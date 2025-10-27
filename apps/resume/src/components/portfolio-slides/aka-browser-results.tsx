import BlurFade from "@/components/magicui/blur-fade";
import type { SlideConfig } from "./types";

interface AkaBrowserResultsContent {
  metric1Value: string;
  metric1Title: string;
  metric1Desc: string;
  metric2Value: string;
  metric2Title: string;
  metric2Desc: string;
  metric3Value: string;
  metric3Title: string;
  metric3Desc: string;
  metric4Value: string;
  metric4Title: string;
  metric4Desc: string;
  achievementsTitle: string;
  achievement1Title: string;
  achievement1: string;
  achievement2Title: string;
  achievement2: string;
  achievement3Title: string;
  achievement3: string;
  learningsTitle: string;
  learning1Title: string;
  learning1Detail: string;
  learning2Title: string;
  learning2Detail: string;
  learning3Title: string;
  learning3Detail: string;
  learning4Title: string;
  learning4Detail: string;
}

export const getAkaBrowserResults = (content?: AkaBrowserResultsContent): SlideConfig => ({
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
              {content?.metric1Value || "<100ms"}
            </div>
            <div
              className={`text-xs md:text-sm font-bold mb-1 ${isDark ? "text-white" : "text-black"}`}
            >
              {content?.metric1Title || "탭 전환"}
            </div>
            <div className={`text-[10px] md:text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              {content?.metric1Desc || "프리뷰 캠싱"}
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
              {content?.metric2Value || "~150MB"}
            </div>
            <div
              className={`text-xs md:text-sm font-bold mb-1 ${isDark ? "text-white" : "text-black"}`}
            >
              {content?.metric2Title || "메모리"}
            </div>
            <div className={`text-[10px] md:text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              {content?.metric2Desc || "3탭 기준"}
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
              {content?.metric3Value || "100%"}
            </div>
            <div
              className={`text-xs md:text-sm font-bold mb-1 ${isDark ? "text-white" : "text-black"}`}
            >
              {content?.metric3Title || "빌드 자동화"}
            </div>
            <div className={`text-[10px] md:text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              {content?.metric3Desc || "수동 작업 제로"}
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
              {content?.metric4Value || "4중"}
            </div>
            <div
              className={`text-xs md:text-sm font-bold mb-1 ${isDark ? "text-white" : "text-black"}`}
            >
              {content?.metric4Title || "보안 검증"}
            </div>
            <div className={`text-[10px] md:text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              {content?.metric4Desc || "프로토콜/도메인/IPC/CSP"}
            </div>
          </div>
        </BlurFade>
      </div>
      <BlurFade delay={0.3}>
        <div
          className={`${isDark ? "bg-zinc-900/50 border-zinc-700" : "bg-white border-zinc-200"} rounded-xl md:rounded-2xl p-5 md:p-8 border shadow-lg hover:shadow-xl transition-shadow duration-300`}
        >
          <h2
            className={`text-lg md:text-xl font-bold mb-4 md:mb-5 ${isDark ? "text-white" : "text-black"}`}
          >
            {content?.achievementsTitle || "정성적 성과"}
          </h2>
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-xs sm:text-sm ${isDark ? "text-zinc-300" : "text-black"}`}
          >
            <div>
              <div className="font-semibold mb-1.5 md:mb-2">{content?.achievement1Title || "✅ 실제 서비스 운영"}</div>
              <div>{content?.achievement1 || "GitHub 오픈소스 + macOS 배포"}</div>
            </div>
            <div>
              <div className="font-semibold mb-1.5 md:mb-2">{content?.achievement2Title || "✅ 기술 부채 관리"}</div>
              <div>{content?.achievement2 || "TypeScript 엄격 모드 + 모듈화"}</div>
            </div>
            <div>
              <div className="font-semibold mb-1.5 md:mb-2">{content?.achievement3Title || "✅ 성능 최적화"}</div>
              <div>{content?.achievement3 || "LRU 캠시 + 렌더링 최적화"}</div>
            </div>
          </div>
        </div>
      </BlurFade>
      <BlurFade delay={0.35}>
        <div
          className={`${isDark ? "bg-zinc-900/50 border-zinc-700" : "bg-white border-zinc-200"} rounded-xl md:rounded-2xl p-5 md:p-8 border shadow-lg hover:shadow-xl transition-shadow duration-300`}
        >
          <h2
            className={`text-lg md:text-xl font-bold mb-4 md:mb-5 ${isDark ? "text-white" : "text-black"}`}
          >
            {content?.learningsTitle || "핵심 인사이트"}
          </h2>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-xs sm:text-sm ${isDark ? "text-zinc-300" : "text-black"}`}
          >
            <div>
              <div className="font-semibold mb-1.5 md:mb-2">{content?.learning1Title || "빠른 변화 대응"}</div>
              <div>{content?.learning1Detail || "Netflix UA 정책 변경 → 도메인별 UA 전환 (2시간)"}</div>
            </div>
            <div>
              <div className="font-semibold mb-1.5 md:mb-2">{content?.learning2Title || "서비스 안정성"}</div>
              <div>{content?.learning2Detail || "Widevine 검증 실패 → EVS 서명 자동화"}</div>
            </div>
            <div>
              <div className="font-semibold mb-1.5 md:mb-2">{content?.learning3Title || "기술 부채 예방"}</div>
              <div>{content?.learning3Detail || "정적 HTML → React TSX 동적 생성"}</div>
            </div>
            <div>
              <div className="font-semibold mb-1.5 md:mb-2">{content?.learning4Title || "보안과 기능 균형"}</div>
              <div>{content?.learning4Detail || "sandbox 비활성화 → 4중 검증으로 보안 유지"}</div>
            </div>
          </div>
        </div>
      </BlurFade>
    </div>
  ),
});

export const akaBrowserResults = getAkaBrowserResults();
