'use client'

import Link from 'next/link'
import { ArrowRight, Zap, Shield, Rocket } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8 fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/5">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold text-blue-400">Enterprise IT Solutions</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-white">Transform Your</span>
                <span className="block gradient-text">Enterprise With</span>
                <span className="block text-white">Nexus Edge</span>
              </h1>

              <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                We deliver cutting-edge IT infrastructure, hardware solutions, and enterprise services tailored for SACCOs, financial institutions, and healthcare providers.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-slate-600 text-white font-semibold hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300"
              >
                Explore Services
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-700">
              <div>
                <p className="text-3xl font-bold text-blue-400">500+</p>
                <p className="text-sm text-slate-400">Active Clients</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-cyan-400">10K+</p>
                <p className="text-sm text-slate-400">Devices Maintained</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-400">99.8%</p>
                <p className="text-sm text-slate-400">Uptime SLA</p>
              </div>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-4 slide-in-up">
            {[
              {
                icon: Shield,
                title: 'Enterprise Security',
                description: 'Military-grade security for your critical infrastructure',
              },
              {
                icon: Rocket,
                title: 'Rapid Deployment',
                description: 'Quick implementation with minimal downtime',
              },
              {
                icon: Zap,
                title: '24/7 Support',
                description: 'Round-the-clock technical support team',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/60 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}
