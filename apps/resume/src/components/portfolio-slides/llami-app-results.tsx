import BlurFade from "@/components/magicui/blur-fade";
import type { SlideConfig } from "./types";

interface LlamiAppResultsContent {
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
  businessTitle: string;
  business1: string;
  business2: string;
  business3: string;
  technicalTitle: string;
  technical1: string;
  technical2: string;
  technical3: string;
}

export const getLlamiAppResults = (content?: LlamiAppResultsContent): SlideConfig => ({
  id: "results",
  title: "라미앱 결과",
  subtitle: "비즈니스 임팩트",
  icon: (isDark: boolean) => <div className="text-3xl">🚀</div>,
  content: (isDark: boolean) => (
    <div className="space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <BlurFade delay={0.1}>
          <div
            className={`${isDark ? "border-[#EA5612]/50" : "border-[#EA5612]/30"} rounded-xl md:rounded-2xl p-6 md:p-8 border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center`}
            style={{
              backgroundColor: isDark ? "rgba(234, 86, 18, 0.15)" : "rgba(234, 86, 18, 0.08)",
            }}
          >
            <div
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 md:mb-3"
              style={{ color: "#EA5612" }}
            >
              {content?.metric1Value || "0원"}
            </div>
            <div
              className={`text-sm md:text-base font-bold mb-1.5 md:mb-2 ${isDark ? "text-white" : "text-black"}`}
            >
              {content?.metric1Title || "AI 고정비 달성"}
            </div>
            <div className={`text-xs md:text-sm ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              {content?.metric1Desc || "100% 온디바이스 기술"}
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={0.15}>
          <div
            className={`${isDark ? "border-[#EA5612]/50" : "border-[#EA5612]/30"} rounded-xl md:rounded-2xl p-6 md:p-8 border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center`}
            style={{
              backgroundColor: isDark ? "rgba(234, 86, 18, 0.15)" : "rgba(234, 86, 18, 0.08)",
            }}
          >
            <div
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 md:mb-3"
              style={{ color: "#EA5612" }}
            >
              {content?.metric2Value || "500%"}
            </div>
            <div
              className={`text-sm md:text-base font-bold mb-1.5 md:mb-2 ${isDark ? "text-white" : "text-black"}`}
            >
              {content?.metric2Title || "고객 참여도 향상"}
            </div>
            <div className={`text-xs md:text-sm ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              {content?.metric2Desc || "유료 AI 대비 5배"}
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={0.2}>
          <div
            className={`${isDark ? "border-[#EA5612]/50" : "border-[#EA5612]/30"} rounded-xl md:rounded-2xl p-6 md:p-8 border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center`}
            style={{
              backgroundColor: isDark ? "rgba(234, 86, 18, 0.15)" : "rgba(234, 86, 18, 0.08)",
            }}
          >
            <div
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 md:mb-3"
              style={{ color: "#EA5612" }}
            >
              {content?.metric3Value || "2.6배"}
            </div>
            <div
              className={`text-sm md:text-base font-bold mb-1.5 md:mb-2 ${isDark ? "text-white" : "text-black"}`}
            >
              {content?.metric3Title || "개발 생산성 향상"}
            </div>
            <div className={`text-xs md:text-sm ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              {content?.metric3Desc || "MVP 6주 → 2.3주"}
            </div>
          </div>
        </BlurFade>
      </div>
      <BlurFade delay={0.25}>
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
              <div className="font-semibold mb-1.5 md:mb-2">{content?.businessTitle || "비즈니스 임팩트"}</div>
              <div>{content?.business1 || "• 기술적 제약을 비즈니스 기회로 전환"}</div>
              <div>{content?.business2 || "• 온디바이스 AI로 고정비 제로화 달성"}</div>
              <div>{content?.business3 || "• Cloudflare R2로 배포 비용 최적화"}</div>
            </div>
            <div>
              <div className="font-semibold mb-1.5 md:mb-2">{content?.technicalTitle || "기술적 의사결정"}</div>
              <div>{content?.technical1 || "• 빠른 개발 vs 좋은 설계의 균형점 찾기"}</div>
              <div>{content?.technical2 || "• 점진적 마이그레이션 전략의 중요성"}</div>
              <div>{content?.technical3 || "• 팀 역량에 맞는 기술 스택 선택"}</div>
            </div>
          </div>
        </div>
      </BlurFade>
    </div>
  ),
});

export const llamiAppResults = getLlamiAppResults();
