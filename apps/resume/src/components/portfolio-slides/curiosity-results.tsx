import BlurFade from "@/components/magicui/blur-fade";
import Image from "@/components/image";
import type { SlideConfig } from "./types";

interface CuriosityResultsContent {
  metric1Value: string;
  metric1Title: string;
  metric1Desc: string;
  metric2Value: string;
  metric2Title: string;
  metric2Desc: string;
  metric3Value: string;
  metric3Title: string;
  metric3Desc: string;
  learningsTitle: string;
  architectureTitle: string;
  architecture1: string;
  architecture2: string;
  architecture3: string;
  balanceTitle: string;
  balance1: string;
  balance2: string;
  balance3: string;
  discontinuedTitle: string;
  discontinuedSubtitle: string;
  discontinued1: string;
  discontinued2: string;
  discontinued3: string;
  futureTitle: string;
  future1: string;
  future2: string;
  future3: string;
}

export const getCuriosityResults = (content?: CuriosityResultsContent): SlideConfig => ({
  id: "curiosity-results",
  title: "큐리오시티 결과",
  subtitle: "비즈니스 임팩트 및 성과",
  icon: (isDark: boolean) => <div className="text-3xl">🚀</div>,
  content: (isDark: boolean) => (
    <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start lg:items-center">
      {/* Left side - Image */}
      <div className="w-full max-w-md mx-auto lg:mx-0 lg:w-2/5 flex-shrink-0 flex items-center justify-center">
        <BlurFade delay={0.05}>
          <div className="relative w-full rounded-xl md:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <Image
              src="/image/curiosity-4.webp"
              alt="Curiosity Project"
              width={800}
              height={600}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </div>
        </BlurFade>
      </div>

      {/* Right side - Content */}
      <div className="flex-1 w-full space-y-4 md:space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <BlurFade delay={0.1}>
            <div
              className="rounded-xl md:rounded-2xl p-4 md:p-6 border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
              style={{
                borderColor: isDark ? "rgba(139, 92, 246, 0.5)" : "rgba(139, 92, 246, 0.3)",
                backgroundColor: isDark ? "rgba(139, 92, 246, 0.15)" : "rgba(139, 92, 246, 0.08)",
              }}
            >
              <div
                className="text-2xl sm:text-3xl md:text-4xl font-black mb-2"
                style={{ color: "#8B5CF6" }}
              >
                {content?.metric1Value || "0초"}
              </div>
              <div
                className={`text-xs md:text-sm font-bold mb-1 ${isDark ? "text-white" : "text-black"}`}
              >
                {content?.metric1Title || "환경 설정 시간"}
              </div>
              <div
                className={`text-[10px] md:text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
              >
                {content?.metric1Desc || "브라우저만으로 즉시 시작"}
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={0.15}>
            <div
              className="rounded-xl md:rounded-2xl p-4 md:p-6 border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
              style={{
                borderColor: isDark ? "rgba(139, 92, 246, 0.5)" : "rgba(139, 92, 246, 0.3)",
                backgroundColor: isDark ? "rgba(139, 92, 246, 0.15)" : "rgba(139, 92, 246, 0.08)",
              }}
            >
              <div
                className="text-2xl sm:text-3xl md:text-4xl font-black mb-2"
                style={{ color: "#8B5CF6" }}
              >
                {content?.metric2Value || "실시간"}
              </div>
              <div
                className={`text-xs md:text-sm font-bold mb-1 ${isDark ? "text-white" : "text-black"}`}
              >
                {content?.metric2Title || "AI 응답 표시"}
              </div>
              <div
                className={`text-[10px] md:text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
              >
                {content?.metric2Desc || "토큰 단위 스트리밍"}
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={0.2}>
            <div
              className="rounded-xl md:rounded-2xl p-4 md:p-6 border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
              style={{
                borderColor: isDark ? "rgba(139, 92, 246, 0.5)" : "rgba(139, 92, 246, 0.3)",
                backgroundColor: isDark ? "rgba(139, 92, 246, 0.15)" : "rgba(139, 92, 246, 0.08)",
              }}
            >
              <div
                className="text-2xl sm:text-3xl md:text-4xl font-black mb-2"
                style={{ color: "#8B5CF6" }}
              >
                {content?.metric3Value || "95%+"}
              </div>
              <div
                className={`text-xs md:text-sm font-bold mb-1 ${isDark ? "text-white" : "text-black"}`}
              >
                {content?.metric3Title || "파일 접근 성공률"}
              </div>
              <div
                className={`text-[10px] md:text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
              >
                {content?.metric3Desc || "다중 경로 시도"}
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
              {content?.learningsTitle || "프로젝트를 통해 배운 점"}
            </h2>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-xs sm:text-sm ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>
                <div className="font-semibold mb-1.5 md:mb-2">{content?.architectureTitle || "아키텍처 설계"}</div>
                <div>{content?.architecture1 || "• WebContainer 싱글톤 패턴으로 리소스 효율성 극대화"}</div>
                <div>{content?.architecture2 || "• 재귀 구조로 복잡한 비즈니스 로직을 단순하게 표현"}</div>
                <div>{content?.architecture3 || "• 클라이언트-서버 도구 분리로 확장 가능한 구조 설계"}</div>
              </div>
              <div>
                <div className="font-semibold mb-1.5 md:mb-2">{content?.balanceTitle || "안정성과 사용성의 균형"}</div>
                <div>{content?.balance1 || "• 무한 재귀의 위험성을 패턴 감지로 해결"}</div>
                <div>{content?.balance2 || "• 개별 도구 실패가 전체 플로우를 중단시키지 않도록 설계"}</div>
                <div>{content?.balance3 || "• 비개발자도 이해할 수 있는 직관적인 피드백 제공"}</div>
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
              {content?.discontinuedTitle || "아쉬운 점 및 중단 사유"}
            </h2>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-xs sm:text-sm ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>
                <div className="font-semibold mb-1.5 md:mb-2">{content?.discontinuedSubtitle || "프로젝트 중단 (2025년 9월 12일)"}</div>
                <div>{content?.discontinued1 || "• 온프레미스 LLM 통합 작업 미완료"}</div>
                <div>{content?.discontinued2 || "• 외부 API 의존성 제거 목표 미달성"}</div>
                <div>{content?.discontinued3 || "• 라미앱 프로젝트로 리소스 집중"}</div>
              </div>
              <div>
                <div className="font-semibold mb-1.5 md:mb-2">{content?.futureTitle || "향후 개선 방향 (중단 전 계획)"}</div>
                <div>{content?.future1 || "• 온프레미스 LLM 서버 통합"}</div>
                <div>{content?.future2 || "• 폐쇄망 환경 완전 독립 실행"}</div>
                <div>{content?.future3 || "• 도구 실행 병렬화"}</div>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  ),
});

export const curiosityResults = getCuriosityResults();
