import Image from "@/components/image";
import BlurFade from "@/components/magicui/blur-fade";
import type { SlideConfig } from "./types";

export const llamiRoboticsProblem: SlideConfig = {
  id: "robot-problem",
  title: "라미 로보틱스 - 4족보행 로봇",
  subtitle: "DeepRobotics 로봇개 원격 제어 및 자율 주행 플랫폼",
  icon: (isDark: boolean) => <div className="text-3xl">🎯</div>,
  content: (isDark: boolean) => (
    <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-6 md:gap-8 items-start">
      <BlurFade delay={0.1}>
        <div className="relative w-full h-[280px] sm:h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl bg-white p-4 sm:p-6">
          <Image
            src="/image/llami-robot-dog.webp"
            alt="라미 로보틱스 로봇개"
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
            <div
              className={`space-y-2 md:space-y-3 text-xs sm:text-sm ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>
                <div className="font-semibold mb-1">프로젝트 기간</div>
                <div>2025.07.16 ~ 2025.09.01 (중단)</div>
              </div>
              <div>
                <div className="font-semibold mb-1">역할</div>
                <div>CTO 및 리드 개발자</div>
              </div>
              <div>
                <div className="font-semibold mb-1">프로젝트 기여도</div>
                <div>
                  이하민 50%: 딥로봇틱스 Lite3 로봇개 원격 제어 및 자율 주행 시스템 개발. WebRTC
                  기반 실시간 영상 스트리밍과 WebSocket 통신을 통한 로봇 제어, SLAM 기반 맵핑 및
                  경로 계획 기능 구현.
                </div>
              </div>
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={0.2}>
          <div
            className={`${isDark ? "bg-zinc-900/50 border-zinc-700" : "bg-white border-zinc-200"} rounded-xl md:rounded-2xl p-4 md:p-6 border shadow-lg`}
          >
            <h3
              className={`text-base md:text-lg font-bold mb-2 md:mb-3 ${isDark ? "text-white" : "text-black"}`}
            >
              핵심 기술 과제
            </h3>
            <div
              className={`space-y-2 md:space-y-3 text-xs sm:text-sm ${isDark ? "text-zinc-300" : "text-black"}`}
            >
              <div>
                <span className="font-bold">로봇 웹 통신 프로토콜 부재</span>
                <br />
                딥로봇틱스 Lite3는 UDP 바이너리 프로토콜 사용, 공식 웹 SDK 없음
              </div>
              <div>
                <span className="font-bold">실시간 영상 전송 지연</span>
                <br />
                RTSP 스트림을 웹에서 직접 재생 불가, HLS는 3~5초 지연
              </div>
              <div>
                <span className="font-bold">복잡한 환경에서의 경로 계획</span>
                <br />
                장애물 회피, 작업 영역 제약, 선호 경로 등 다층 제약 조건 처리
              </div>
              <div>
                <span className="font-bold">영상 품질 및 성능 문제</span>
                <br />
                로봇 카메라의 불안정한 화이트밸런스, CPU 기반 영상 처리는 30fps에서 프레임 드롭 발생
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  ),
};
