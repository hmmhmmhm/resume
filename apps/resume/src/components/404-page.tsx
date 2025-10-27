"use client"

import { useState } from "react"
import Waves from "@/components/waves"

interface NotFoundPageProps {
  translations?: {
    title: string;
    description: string;
    goHome: string;
    goBack: string;
    contactAdmin: string;
  };
}

export default function NotFoundPage({ translations }: NotFoundPageProps = {}) {
  const [config] = useState({
    lineColor: "rgba(0, 0, 0, 0.15)",
    backgroundColor: "#ffffff",
    waveSpeedX: 0.015,
    waveSpeedY: 0.008,
    waveAmpX: 40,
    waveAmpY: 20,
    xGap: 12,
    yGap: 28,
    friction: 0.925,
    tension: 0.005,
    maxCursorMove: 100,
  })

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Waves {...config} />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-black px-4">
        <div className="text-center space-y-6 max-w-2xl">
          {/* 404 Number */}
          <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent">
            404
          </h1>

          {/* Main Message */}
          <h2 className="text-3xl md:text-5xl font-bold text-black/90">
            {translations?.title || '페이지를 찾을 수 없습니다'}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600/80 max-w-md mx-auto">
            {translations?.description || '요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a
              href="/"
              className="group relative px-8 py-4 bg-black text-white rounded-lg font-semibold shadow-lg hover:shadow-black/50 transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">{translations?.goHome || '홈으로 돌아가기'}</span>
              <div className="absolute inset-0 bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            <button
              onClick={() => window.history.back()}
              className="px-8 py-4 bg-black/10 backdrop-blur-sm border border-black/20 rounded-lg font-semibold text-black hover:bg-black/20 transition-all duration-300 hover:scale-105"
            >
              {translations?.goBack || '이전 페이지로'}
            </button>
          </div>

          {/* Additional Info */}
          <div className="pt-12 text-sm text-gray-500/60">
            <p>{translations?.contactAdmin || '문제가 계속되면 관리자에게 문의해주세요.'}</p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-black/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-black/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-black/10 rounded-full blur-3xl animate-pulse delay-500" />
    </div>
  )
}
