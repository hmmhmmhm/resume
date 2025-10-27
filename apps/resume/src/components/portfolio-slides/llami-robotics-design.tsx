import Image from "@/components/image";
import BlurFade from "@/components/magicui/blur-fade";
import type { SlideConfig } from "./types";

export const llamiRoboticsDesign: SlideConfig = {
  id: "robot-design",
  title: "라미 로보틱스 설계",
  subtitle: "핵심 설계 결정",
  icon: (isDark: boolean) => <div className="text-3xl">🏗️</div>,
  content: (isDark: boolean) => (
    <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-6 md:gap-8 items-start">
      <BlurFade delay={0.1}>
        <div className="relative w-full h-[280px] sm:h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl bg-white p-4 sm:p-6">
          <Image
            src="/image/llami-robot-dog-diagram.svg"
            alt="라미 로보틱스 아키텍처"
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
              1. UDP 프로토콜 직접 구현
            </h3>
            <div
              className={`text-xs sm:text-sm space-y-1 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>• Node.js dgram 모듈로 UDP 클라이언트 구현</div>
              <div>• 프로토콜 헤더 구조 분석 (12바이트 헤더 + 가변 데이터)</div>
              <div>• 500ms 주기 Heartbeat로 연결 유지</div>
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
              2. mediasoup SFU 기반 WebRTC 스트리밍
            </h3>
            <div
              className={`text-xs sm:text-sm space-y-1 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>• RTSP → RTP → WebRTC 변환 파이프라인</div>
              <div>• FFmpeg ultrafast preset으로 인코딩 지연 최소화</div>
              <div>• NACK/PLI 피드백으로 패킷 손실 복구</div>
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
              3. A* 알고리즘 + 다층 비용 맵
            </h3>
            <div
              className={`text-xs sm:text-sm space-y-1 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>• 5가지 Zone 타입: Obstacle, Avoidance, Preferred, Operation, Slow</div>
              <div>• 비용 맵 기반 경로 계획: Obstacle=∞, Avoidance=10, Preferred=0.5</div>
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
              4. WebGL 셰이더 기반 화이트밸런스
            </h3>
            <div
              className={`text-xs sm:text-sm space-y-1 ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>• GPU 가속으로 실시간 30fps 처리</div>
              <div>• Gray World Assumption 기반 자동 색온도 보정</div>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  ),
};
