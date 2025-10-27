import Image from "@/components/image";
import BlurFade from "@/components/magicui/blur-fade";
import type { SlideConfig } from "./types";

export const curiosityImplementation: SlideConfig = {
  id: "curiosity-implementation",
  title: "큐리오시티 구현",
  subtitle: "기술적 도전과 해결",
  icon: (isDark: boolean) => <div className="text-3xl">💻</div>,
  content: (isDark: boolean) => (
    <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-6 md:gap-8 items-start">
      <BlurFade delay={0.1}>
        <div className="relative w-full h-[280px] sm:h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl bg-white p-4 sm:p-6">
          <Image
            src="/image/curiosity-1.webp"
            alt="큐리오시티 UI"
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
              1. WebContainer 통합 및 파일시스템 프록시
            </h3>
            <div
              className={`text-xs sm:text-sm space-y-1 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>• 전역 인스턴스 관리: 여러 컴포넌트에서 동일한 WebContainer 재사용</div>
              <div>• 다중 경로 시도 로직: /path, path, ./path 등 4가지 형식 자동 시도</div>
              <div>• 커스텀 명령어 지원: .curiosity 폴더에 스크립트 배치</div>
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
              2. 실시간 스트리밍 응답 처리
            </h3>
            <div
              className={`text-xs sm:text-sm space-y-1 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>• AsyncGenerator 기반 스트리밍: OpenAI/Anthropic API 청크 단위 응답</div>
              <div>• 부분 메시지 누적: accumulatedText로 토큰 누적 및 실시간 UI 업데이트</div>
              <div>• 비용 및 시간 추적: 최종 응답에서 토큰 사용량 기반 비용 계산</div>
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
              3. 재귀적 도구 실행 자동화
            </h3>
            <div
              className={`text-xs sm:text-sm space-y-1 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>
                • 무제한 깊이 재귀: processMessageRecursively(depth) 함수로 도구 체인 자동 실행
              </div>
              <div>• 반복 패턴 감지: 최근 5회 히스토리 추적, 동일 패턴 3회 반복 시 중단</div>
              <div>• 개별 도구 타임아웃: 각 도구 실행에 30초 타임아웃 적용</div>
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={0.3}>
          <div
            className={`${isDark ? "bg-zinc-900/50 border-zinc-700" : "bg-white border-zinc-200"} rounded-xl md:rounded-2xl p-4 md:p-5 border shadow-lg`}
          >
            <h3
              className={`text-base md:text-lg font-bold mb-2 md:mb-2.5 ${isDark ? "text-white" : "text-black"}`}
            >
              기술적 의사결정
            </h3>
            <div
              className={`text-xs sm:text-sm space-y-1 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>• 빠른 MVP vs 완벽한 설계: 재귀 패턴으로 복잡도 감소</div>
              <div>• 성능 vs 안정성: 타임아웃과 반복 감지로 안정성 우선</div>
              <div>• 클라우드 vs 온프레미스: 데이터 보안을 위해 온프레미스 우선 설계</div>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  ),
};
