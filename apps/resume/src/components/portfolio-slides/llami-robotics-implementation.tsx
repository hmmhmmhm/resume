import Image from "@/components/image";
import BlurFade from "@/components/magicui/blur-fade";
import type { SlideConfig } from "./types";

interface LlamiRoboticsImplementationContent {
  challenge1Title: string;
  challenge1Situation: string;
  challenge1Action: string;
  challenge1Impact: string;
  challenge2Title: string;
  challenge2Situation: string;
  challenge2Action: string;
  challenge2Impact: string;
  challenge3Title: string;
  challenge3Situation: string;
  challenge3Action: string;
  challenge3Impact: string;
  challenge4Title: string;
  challenge4Situation: string;
  challenge4Action: string;
  challenge4Impact: string;
}

export const getLlamiRoboticsImplementation = (content?: LlamiRoboticsImplementationContent): SlideConfig => ({
  id: "robot-implementation",
  title: "라미 로보틱스 구현",
  subtitle: "기술적 도전과 해결",
  icon: (isDark: boolean) => <div className="text-3xl">💻</div>,
  content: (isDark: boolean) => (
    <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-6 md:gap-8 items-start">
      <BlurFade delay={0.1}>
        <div className="relative w-full h-[280px] sm:h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl bg-white p-4 sm:p-6">
          <Image
            src="/image/llami-robot-dog-ui.webp"
            alt="라미 로보틱스 UI"
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
              {content?.challenge1Title || "도전 1: 바이너리 프로토콜 구현"}
            </h2>
            <div
              className={`text-xs sm:text-sm space-y-1 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>{content?.challenge1Situation || "상황: 공식 SDK 없이 바이너리 프로토콜 직접 구현 필요"}</div>
              <div>{content?.challenge1Action || "행동: Wireshark로 패킷 분석, 200+ 바이트 로봇 상태 데이터 파싱"}</div>
              <div>{content?.challenge1Impact || "영향: 실시간 양방향 통신 달성 (500ms 주기)"}</div>
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
              {content?.challenge2Title || "도전 2: 저지연 영상 스트리밍"}
            </h2>
            <div
              className={`text-xs sm:text-sm space-y-1 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>{content?.challenge2Situation || "상황: RTSP를 웹에서 재생 불가, HLS는 3~5초 지연"}</div>
              <div>{content?.challenge2Action || "행동: FFmpeg로 RTSP → H.264 RTP 트랜스코딩, mediasoup로 WebRTC 전송"}</div>
              <div>{content?.challenge2Impact || "영향: 지연 시간 3~5초 → 300~500ms (90% 감소)"}</div>
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
              {content?.challenge3Title || "도전 3: 경로 계획 알고리즘"}
            </h2>
            <div
              className={`text-xs sm:text-sm space-y-1 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>{content?.challenge3Situation || "상황: 복잡한 환경에서 자율 주행 필요"}</div>
              <div>{content?.challenge3Action || "행동: 다층 비용 맵 생성, 8방향 이웃 탐색 A* 알고리즘 구현"}</div>
              <div>{content?.challenge3Impact || "영향: 4000×4000 가상 월드에서 경로 계획 평균 45ms"}</div>
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
              {content?.challenge4Title || "도전 4: GPU 가속 영상 처리"}
            </h2>
            <div
              className={`text-xs sm:text-sm space-y-1 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>{content?.challenge4Situation || "상황: CPU 기반 영상 처리는 프레임 드롭 발생"}</div>
              <div>{content?.challenge4Action || "행동: WebGL Fragment Shader로 GPU 가속 구현"}</div>
              <div>{content?.challenge4Impact || "영향: 1920×1080 해상도 30fps 실시간 처리, CPU 사용률 5% 이하"}</div>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  ),
});

export const llamiRoboticsImplementation = getLlamiRoboticsImplementation();
