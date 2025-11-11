import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  return rss({
    title: 'Hamin Lee - Full Stack Engineer',
    description: 'Professional resume and portfolio updates for Hamin Lee, Full Stack Engineer specializing in Web, On-device LLM, Real-time Streaming, and Robotics',
    site: context.site || 'https://hmart.app',
    items: [
      {
        title: 'Resume - Full Stack Engineer',
        link: '/en',
        description: 'Professional resume of Hamin Lee, Full Stack Engineer with expertise in React, Next.js, TypeScript, Node.js, WebRTC, and On-device AI',
        pubDate: new Date('2025-11-11'),
        categories: ['Resume', 'Full Stack', 'Engineering'],
      },
      {
        title: '이력서 - 풀스택 엔지니어',
        link: '/ko',
        description: '웹, 온디바이스 LLM, 실시간 스트리밍, 로보틱스 전문 풀스택 엔지니어 이하민의 이력서',
        pubDate: new Date('2025-11-11'),
        categories: ['이력서', '풀스택', '엔지니어링'],
      },
      {
        title: 'Portfolio - Projects & Work',
        link: '/en/portfolio',
        description: 'Portfolio showcasing projects including Lami App (On-device LLM), Lami Robotics (Robot Control System), and Curiosity (AI Coding Agent)',
        pubDate: new Date('2025-11-11'),
        categories: ['Portfolio', 'Projects', 'AI', 'Robotics'],
      },
      {
        title: '포트폴리오 - 프로젝트 및 작업물',
        link: '/ko/portfolio',
        description: '라미앱(온디바이스 LLM), 라미 로보틱스(로봇 제어 시스템), 큐리오시티(AI 코딩 에이전트) 등 프로젝트 포트폴리오',
        pubDate: new Date('2025-11-11'),
        categories: ['포트폴리오', '프로젝트', 'AI', '로보틱스'],
      },
      {
        title: 'Side Projects - Open Source Contributions',
        link: '/en/side',
        description: 'Open source projects and NPM packages including Mugunghwa, Gauss Spiral, Edge Crypto, and more',
        pubDate: new Date('2025-11-11'),
        categories: ['Open Source', 'Side Projects', 'NPM'],
      },
      {
        title: '사이드 프로젝트 - 오픈소스 기여',
        link: '/ko/side',
        description: '무궁화, 가우스 나선, 엣지 크립토 등 오픈소스 프로젝트 및 NPM 패키지',
        pubDate: new Date('2025-11-11'),
        categories: ['오픈소스', '사이드 프로젝트', 'NPM'],
      },
    ],
    customData: `
      <language>en</language>
      <copyright>Copyright ${new Date().getFullYear()} Hamin Lee. All rights reserved.</copyright>
      <managingEditor>pm2@kakao.com (Hamin Lee)</managingEditor>
      <webMaster>pm2@kakao.com (Hamin Lee)</webMaster>
      <category>Technology</category>
      <category>Software Engineering</category>
      <category>Full Stack Development</category>
      <image>
        <url>https://hmart.app/en/og.png</url>
        <title>Hamin Lee - Full Stack Engineer</title>
        <link>https://hmart.app</link>
      </image>
    `,
  });
}
