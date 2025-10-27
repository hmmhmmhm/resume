import Image from "@/components/image";
import BlurFade from "@/components/magicui/blur-fade";
import type { SlideConfig } from "./types";

interface CuriosityDesignContent {
  requirement1Title: string;
  requirement1Detail1: string;
  requirement1Detail2: string;
  requirement1Detail3: string;
  requirement2Title: string;
  requirement2Detail1: string;
  requirement2Detail2: string;
  requirement2Detail3: string;
  requirement3Title: string;
  requirement3Detail1: string;
  requirement3Detail2: string;
  requirement3Detail3: string;
  requirement4Title: string;
  requirement4Detail1: string;
  requirement4Detail2: string;
  requirement4Detail3: string;
}

export const getCuriosityDesign = (content?: CuriosityDesignContent): SlideConfig => ({
  id: "curiosity-design",
  title: "큐리오시티 설계",
  subtitle: "요구사항과 해결 방안",
  icon: (isDark: boolean) => <div className="text-3xl">🏗️</div>,
  content: (isDark: boolean) => (
    <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-6 md:gap-8 items-start">
      <BlurFade delay={0.1}>
        <div className="relative w-full h-[280px] sm:h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl bg-white p-4 sm:p-6">
          <Image
            src="/image/curiosity-diagram.svg"
            alt="큐리오시티 아키텍처"
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
              {content?.requirement1Title || "1. 비개발자도 즉시 사용 가능한 환경"}
            </h2>
            <div
              className={`text-xs sm:text-sm space-y-1 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>{content?.requirement1Detail1 || "→ WebContainer API 기반 브라우저 내 Node.js 환경 구축"}</div>
              <div>{content?.requirement1Detail2 || "• 로컬 설치 없이 브라우저만으로 즉시 개발 환경 제공"}</div>
              <div>{content?.requirement1Detail3 || "• 전역 싱글톤 패턴으로 WebContainer 인스턴스 관리"}</div>
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
              {content?.requirement2Title || "2. 데이터 보안을 위한 온프레미스 배포"}
            </h2>
            <div
              className={`text-xs sm:text-sm space-y-1 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>{content?.requirement2Detail1 || "→ 자체 호스팅 가능한 API 서버 설계"}</div>
              <div>{content?.requirement2Detail2 || "• Hono 기반 경량 API 서버로 온프레미스 배포 용이"}</div>
              <div>{content?.requirement2Detail3 || "• 환경변수 기반 AI 프로바이더 설정"}</div>
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
              {content?.requirement3Title || "3. 실시간 AI 응답으로 빠른 피드백"}
            </h2>
            <div
              className={`text-xs sm:text-sm space-y-1 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>{content?.requirement3Detail1 || "→ SSE 기반 스트리밍 응답 시스템 설계"}</div>
              <div>{content?.requirement3Detail2 || "• AsyncGenerator 패턴으로 토큰 단위 실시간 스트리밍"}</div>
              <div>{content?.requirement3Detail3 || "• 부분 응답과 완료 응답 분리로 즉각적인 피드백"}</div>
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={0.3}>
          <div
            className={`${isDark ? "bg-zinc-900/50 border-zinc-700" : "bg-white border-zinc-200"} rounded-xl md:rounded-2xl p-4 md:p-5 border shadow-lg`}
          >
            <h2
              className={`text-base md:text-lg font-bold mb-2 md:mb-2.5 ${isDark ? "text-white" : "text-black"}`}
            >
              {content?.requirement4Title || "4. AI가 제안한 작업 자동 실행"}
            </h2>
            <div
              className={`text-xs sm:text-sm space-y-1 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>{content?.requirement4Detail1 || "→ 재귀적 도구 실행 엔진 설계"}</div>
              <div>{content?.requirement4Detail2 || "• API 호출 → 도구 실행 → API 호출 무한 반복 구조"}</div>
              <div>{content?.requirement4Detail3 || "• 반복 패턴 감지 알고리즘으로 무한 루프 방지"}</div>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  ),
});

export const curiosityDesign = getCuriosityDesign();
