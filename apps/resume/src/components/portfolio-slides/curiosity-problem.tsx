import Image from "@/components/image";
import BlurFade from "@/components/magicui/blur-fade";
import type { SlideConfig } from "./types";

interface CuriosityProblemContent {
  businessProblemTitle: string;
  businessProblemSubtitle: string;
  problem1: string;
  problem2: string;
  problem3: string;
  existingToolsTitle: string;
  existingTool1: string;
  existingTool2: string;
  existingTool3: string;
  existingTool4: string;
  quote: string;
}

export const getCuriosityProblem = (content?: CuriosityProblemContent): SlideConfig => ({
  id: "curiosity-problem",
  title: "큐리오시티 개발 배경",
  subtitle: "비개발자의 빠른 MVP 검증을 위한 온프레미스 AI 코딩 플랫폼",
  icon: (isDark: boolean) => <div className="text-3xl">🎯</div>,
  content: (isDark: boolean) => (
    <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-6 md:gap-8 items-start">
      <BlurFade delay={0.1}>
        <div className="relative w-full h-[280px] sm:h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl bg-white p-4 sm:p-6">
          <Image
            src="/image/curiosity-0.webp"
            alt="큐리오시티"
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
              {content?.businessProblemTitle || "비즈니스 문제 정의"}
            </h2>
            <div
              className={`space-y-2 md:space-y-3 text-xs sm:text-sm ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div className="font-semibold">{content?.businessProblemSubtitle || "비개발자의 MVP 검증 장벽"}</div>
              <div>{content?.problem1 || "• 외주 개발 비용: 최소 500만원 이상, 2-3개월 소요"}</div>
              <div>{content?.problem2 || "• 노코드 툴의 한계: 커스터마이징 불가능"}</div>
              <div>{content?.problem3 || "• 개발자 채용: 스타트업 초기 단계에서 인건비 부담"}</div>
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
              {content?.existingToolsTitle || "기존 AI 코딩 도구의 한계"}
            </h2>
            <div
              className={`space-y-2 md:space-y-3 text-xs sm:text-sm ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>{content?.existingTool1 || "• 로컬 환경 설정 필수: Node.js, Git, IDE 등 진입장벽"}</div>
              <div>{content?.existingTool2 || "• 클라우드 API 의존: 외부 API 비용 및 데이터 보안 우려"}</div>
              <div>{content?.existingTool3 || "• 수동 도구 실행: AI 제안 명령어를 직접 실행해야 함"}</div>
              <div>{content?.existingTool4 || "• 실시간 피드백 부족: AI 응답 완료까지 대기"}</div>
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={0.25}>
          <div className="text-center">
            <p
              className={`${isDark ? "text-zinc-300" : "text-zinc-600"} text-sm md:text-base italic font-medium text-balance keep-all`}
            >
              {content?.quote || "\"비개발자도 브라우저에서 즉시 사용 가능하고, 온프레미스 환경에서 데이터 보안을 지키며, AI가 자동으로 MVP를 구축해주는 플랫폼이 필요함\""}
            </p>
          </div>
        </BlurFade>
      </div>
    </div>
  ),
});

export const curiosityProblem = getCuriosityProblem();
