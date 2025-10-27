import BlurFade from "@/components/magicui/blur-fade";
import Image from "@/components/image";
import type { SlideConfig } from "./types";

export const curiosityResults: SlideConfig = {
  id: "curiosity-results",
  title: "큐리오시티 결과",
  subtitle: "비즈니스 임팩트 및 성과",
  icon: (isDark: boolean) => <div className="text-3xl">🚀</div>,
  content: (isDark: boolean) => (
    <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start lg:items-center">
      {/* Left side - Image */}
      <div className="lg:w-2/5 flex-shrink-0 flex items-center justify-center">
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
      <div className="flex-1 space-y-4 md:space-y-5">
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
                0초
              </div>
              <div
                className={`text-xs md:text-sm font-bold mb-1 ${isDark ? "text-white" : "text-black"}`}
              >
                환경 설정 시간
              </div>
              <div
                className={`text-[10px] md:text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
              >
                브라우저만으로 즉시 시작
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
                실시간
              </div>
              <div
                className={`text-xs md:text-sm font-bold mb-1 ${isDark ? "text-white" : "text-black"}`}
              >
                AI 응답 표시
              </div>
              <div
                className={`text-[10px] md:text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
              >
                토큰 단위 스트리밍
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
                95%+
              </div>
              <div
                className={`text-xs md:text-sm font-bold mb-1 ${isDark ? "text-white" : "text-black"}`}
              >
                파일 접근 성공률
              </div>
              <div
                className={`text-[10px] md:text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
              >
                다중 경로 시도
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
              프로젝트를 통해 배운 점
            </h3>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-xs sm:text-sm ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>
                <div className="font-semibold mb-1.5 md:mb-2">아키텍처 설계</div>
                <div>• WebContainer 싱글톤 패턴으로 리소스 효율성 극대화</div>
                <div>• 재귀 구조로 복잡한 비즈니스 로직을 단순하게 표현</div>
                <div>• 클라이언트-서버 도구 분리로 확장 가능한 구조 설계</div>
              </div>
              <div>
                <div className="font-semibold mb-1.5 md:mb-2">안정성과 사용성의 균형</div>
                <div>• 무한 재귀의 위험성을 패턴 감지로 해결</div>
                <div>• 개별 도구 실패가 전체 플로우를 중단시키지 않도록 설계</div>
                <div>• 비개발자도 이해할 수 있는 직관적인 피드백 제공</div>
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
              아쉬운 점 및 중단 사유
            </h3>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-xs sm:text-sm ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>
                <div className="font-semibold mb-1.5 md:mb-2">프로젝트 중단 (2025년 9월 12일)</div>
                <div>• 온프레미스 LLM 통합 작업 미완료</div>
                <div>• 외부 API 의존성 제거 목표 미달성</div>
                <div>• 라미앱 프로젝트로 리소스 집중</div>
              </div>
              <div>
                <div className="font-semibold mb-1.5 md:mb-2">향후 개선 방향 (중단 전 계획)</div>
                <div>• 온프레미스 LLM 서버 통합</div>
                <div>• 폐쇄망 환경 완전 독립 실행</div>
                <div>• 도구 실행 병렬화</div>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  ),
};
