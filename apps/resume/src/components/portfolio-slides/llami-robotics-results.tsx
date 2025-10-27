import Image from "@/components/image";
import BlurFade from "@/components/magicui/blur-fade";
import type { SlideConfig } from "./types";

interface LlamiRoboticsResultsContent {
  businessImpactTitle: string;
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
  technicalDecisionTitle: string;
  technical1: string;
  technical2: string;
  technical3: string;
  technical4: string;
  learningsTitle: string;
  learning1: string;
  learning2: string;
  learning3: string;
}

export const getLlamiRoboticsResults = (content?: LlamiRoboticsResultsContent): SlideConfig => ({
  id: "robot-results",
  title: "라미 로보틱스 결과",
  subtitle: "비즈니스 임팩트 및 학습",
  icon: (isDark: boolean) => <div className="text-3xl">🚀</div>,
  content: (isDark: boolean) => (
    <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-6 md:gap-8 items-start">
      <BlurFade delay={0.1}>
        <div className="relative w-full h-[280px] sm:h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl bg-white p-4 sm:p-6">
          <Image
            src="/image/llami-robot-dog-bid.webp"
            alt="라미 로보틱스 비드"
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
              {content?.businessImpactTitle || "비즈니스 임팩트"}
            </h2>
            <div
              className={`grid grid-cols-2 gap-3 text-xs sm:text-sm ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div
                className="text-center p-3 rounded-lg"
                style={{
                  backgroundColor: isDark ? "rgba(234, 86, 18, 0.15)" : "rgba(234, 86, 18, 0.08)",
                }}
              >
                <div className="text-2xl font-black mb-1" style={{ color: "#EA5612" }}>
                  {content?.metric1Value || "90%"}
                </div>
                <div className="font-semibold">{content?.metric1Title || "영상 지연 감소"}</div>
                <div className="text-[10px] opacity-70">{content?.metric1Desc || "3~5초 → 300~500ms"}</div>
              </div>
              <div
                className="text-center p-3 rounded-lg"
                style={{
                  backgroundColor: isDark ? "rgba(234, 86, 18, 0.15)" : "rgba(234, 86, 18, 0.08)",
                }}
              >
                <div className="text-2xl font-black mb-1" style={{ color: "#EA5612" }}>
                  {content?.metric2Value || "45ms"}
                </div>
                <div className="font-semibold">{content?.metric2Title || "경로 계획 속도"}</div>
                <div className="text-[10px] opacity-70">{content?.metric2Desc || "실시간 대응 가능"}</div>
              </div>
              <div
                className="text-center p-3 rounded-lg"
                style={{
                  backgroundColor: isDark ? "rgba(234, 86, 18, 0.15)" : "rgba(234, 86, 18, 0.08)",
                }}
              >
                <div className="text-2xl font-black mb-1" style={{ color: "#EA5612" }}>
                  {content?.metric3Value || "30fps"}
                </div>
                <div className="font-semibold">{content?.metric3Title || "영상 처리 성능"}</div>
                <div className="text-[10px] opacity-70">{content?.metric3Desc || "CPU 5% 이하"}</div>
              </div>
              <div
                className="text-center p-3 rounded-lg"
                style={{
                  backgroundColor: isDark ? "rgba(234, 86, 18, 0.15)" : "rgba(234, 86, 18, 0.08)",
                }}
              >
                <div className="text-2xl font-black mb-1" style={{ color: "#EA5612" }}>
                  {content?.metric4Value || "500ms"}
                </div>
                <div className="font-semibold">{content?.metric4Title || "제어 응답성"}</div>
                <div className="text-[10px] opacity-70">{content?.metric4Desc || "실시간 양방향 통신"}</div>
              </div>
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
              {content?.technicalDecisionTitle || "기술적 의사결정"}
            </h2>
            <div
              className={`text-xs sm:text-sm space-y-1.5 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>{content?.technical1 || "• Turborepo 모노레포로 apps 분리 (web, motion-host, proxy)"}</div>
              <div>{content?.technical2 || "• LegendState Observable 패턴으로 반응형 상태 관리"}</div>
              <div>{content?.technical3 || "• WebGL GPU 가속으로 CPU 부하 최소화"}</div>
              <div>{content?.technical4 || "• mediasoup SFU로 다중 클라이언트 확장 가능"}</div>
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
              {content?.learningsTitle || "프로젝트를 통해 배운 점"}
            </h2>
            <div
              className={`text-xs sm:text-sm space-y-1.5 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>{content?.learning1 || "• 저수준 UDP 프로토콜 구현 및 바이너리 데이터 파싱 경험"}</div>
              <div>{content?.learning2 || "• WebRTC SFU 아키텍처 설계 및 실시간 스트리밍 최적화"}</div>
              <div>{content?.learning3 || "• 경로 계획 알고리즘의 실제 로봇 제어 적용"}</div>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  ),
});

export const llamiRoboticsResults = getLlamiRoboticsResults();
