import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { Markdown } from "./markdown";
import { QRCodeSVG } from "@/components/qrcode-react";
import { MessageCircle as MessageCircleIcon, Download as DownloadIcon } from "lucide-preact";

// Wrapper components to handle className -> class conversion
const MessageCircle = ({ className, ...props }: any) => (
  <MessageCircleIcon class={className} {...props} />
);
const Download = ({ className, ...props }: any) => <DownloadIcon class={className} {...props} />;

const BLUR_FADE_DELAY = 0.04;

export default function ResumePage() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 max-w-2xl mx-auto py-12 sm:pt-[50px] sm:pb-24 px-6">
      <a
        href="/resume.pdf"
        download="이하민_이력서.pdf"
        className="fixed top-6 right-6 flex items-center gap-2 px-4 py-2 bg-background/95 border border-border rounded-lg hover:bg-muted transition-colors shadow-sm backdrop-blur-sm print:hidden z-50"
      >
        <Download className="size-4" />
        <span className="text-sm font-medium">인쇄용 PDF 다운로드</span>
      </a>
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-balance [word-break:keep-all] mb-5"
                yOffset={8}
                text="풀스택 엔지니어 이하민입니다."
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-black dark:text-white mt-4">
                  <div className="flex items-center gap-1">
                    <span>
                      {DATA.birthDate} ({DATA.age})
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{DATA.gender}</span>
                  </div>
                </div>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-36 border">
                <AvatarImage
                  alt={DATA.name}
                  src={DATA.avatarUrl}
                  className="object-cover object-top"
                />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">소개</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-black dark:text-white dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">경력</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade key={work.company} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">학력</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade key={education.school} delay={BLUR_FADE_DELAY * 8 + id * 0.05}>
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">기술 스택</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge
                  key={skill.name}
                  variant="outline"
                  className="flex items-center gap-2 px-3 py-1.5"
                >
                  {typeof skill.icon === "string" ? (
                    <img 
                      src={skill.icon} 
                      alt={skill.name} 
                      width={16} 
                      height={16} 
                      loading="lazy" 
                      decoding="async" 
                      className="size-4" 
                    />
                  ) : (
                    <skill.icon className="size-4" />
                  )}
                  {skill.name}
                </Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  프로젝트
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  사이드 프로젝트 이력
                </h2>
                <p className="text-black dark:text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-balance [word-break:keep-all]">
                  다양한 사이드 프로젝트를 진행하며 새로운 기술을 탐구하고 아이디어를
                  실현해왔습니다.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto pt-[20px]">
            {DATA.projects.map((project, id) => (
              <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 12 + id * 0.05}>
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="publications">
        <div className="space-y-8 w-full py-6" style={{ marginTop: "-60px" }}>
          <BlurFade delay={BLUR_FADE_DELAY * 11.5}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  출판
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">출판 이력</h2>
                <p className="text-black dark:text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-balance [word-break:keep-all]">
                  기술과 개발에 대한 인사이트를 담은 저서입니다.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-6 max-w-[800px] mx-auto">
            {DATA.publications.map((publication, id) => (
              <BlurFade key={publication.title} delay={BLUR_FADE_DELAY * 12.5 + id * 0.05}>
                <div className="block p-6 border rounded-lg">
                  <div className="flex gap-6 mb-4">
                    {publication.image && (
                      <div className="flex-shrink-0">
                        <img
                          src={publication.image}
                          alt={publication.title}
                          width={300}
                          height={420}
                          loading="lazy"
                          decoding="async"
                          className="rounded-lg object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{publication.title}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-black dark:text-white mb-4">
                        <span>저자: {publication.author}</span>
                        <span>출판사: {publication.publisher}</span>
                        <span>출간일: {publication.publishDate}</span>
                      </div>
                      <p className="text-sm text-black dark:text-white leading-relaxed text-balance [word-break:keep-all]">
                        {publication.description}
                      </p>
                    </div>
                  </div>
                  {publication.links && publication.links.length > 0 ? (
                    <div className="flex flex-col gap-3">
                      {publication.links.map((link, linkId) => (
                        <a
                          key={linkId}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors border print:border-gray-300"
                        >
                          <div className="flex-shrink-0">
                            <QRCodeSVG value={link.href} size={48} level="M" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-black dark:text-white mb-1">
                              {link.type}
                            </div>
                            <div className="text-xs text-black dark:text-white font-bold break-all text-balance">
                              {link.href}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <a
                      href={publication.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors border print:border-gray-300"
                    >
                      <div className="flex-shrink-0">
                        <QRCodeSVG value={publication.url} size={48} level="M" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-black dark:text-white mb-1">
                          E-Book 링크
                        </div>
                        <div className="text-xs text-black dark:text-white font-bold break-all text-balance">
                          {publication.url}
                        </div>
                      </div>
                    </a>
                  )}
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="hackathons">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  수상 및 자격증
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">수상 이력</h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  다양한 공모전과 대회에서 수상한 경력과 보유 자격증입니다.
                </p>
              </div>
            </div>
          </BlurFade>
          <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
            {DATA.hackathons.map((project, id) => (
              <BlurFade
                key={project.title + project.dates}
                delay={BLUR_FADE_DELAY * 14 + id * 0.05}
              >
                <HackathonCard
                  title={project.title}
                  description={project.description}
                  location={project.location}
                  dates={project.dates}
                  image={project.image}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </ul>
        </div>
      </section>
      <section id="contact">
        <div className="w-full pt-4" style={{ marginTop: "-80px" }}>
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="flex flex-col items-center justify-center text-center mb-4">
              <h2 className="text-2xl font-bold tracking-tight">연락처</h2>
            </div>
          </BlurFade>
          <div className="max-w-[400px] mx-auto px-4">
            <BlurFade delay={BLUR_FADE_DELAY * 17}>
              <a
                href={DATA.contact.kakao}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg border hover:bg-muted transition-colors print:border-gray-300"
              >
                <div className="flex-shrink-0">
                  <QRCodeSVG
                    value={DATA.contact.kakao}
                    size={48}
                    level="M"
                    className="print:block"
                  />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-xs font-medium text-muted-foreground mb-0.5 flex items-center gap-1">
                    <MessageCircle className="size-3" />
                    카카오톡
                  </div>
                  <div className="text-xs text-black dark:text-white font-bold">
                    {DATA.contact.kakao}
                  </div>
                </div>
              </a>
            </BlurFade>
          </div>
        </div>
      </section>
    </main>
  );
}
