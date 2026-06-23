"use client";

import React from "react";
import { ConnectButton } from "@/components/ConnectButton";

export default function XourceXLanding() {
  return (
    <div className="relative min-h-screen bg-[#161E22] text-slate-300 selection:text-black overflow-x-hidden">
      {/* ambient glow background */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-cyan-950/20 to-transparent pointer-events-none z-0" />

      {/* Rebranded Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#161E22]/60 border-b border-[#2A3338]" role="banner">
        <nav className="flex justify-between items-center px-6 md:px-40 py-6 mx-auto" role="navigation">
          <div className="flex items-center gap-12">
            <span className="text-2xl font-black text-white tracking-widest bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">XOURCEX</span>
          </div>
          <ConnectButton />
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto relative z-10 pt-28 md:pt-40 px-6 pb-20 md:pb-28 text-center md:text-left flex flex-col items-center md:items-start">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
          Grow your legacy.<br />
          <span className="bg-gradient-to-r from-cyan-400 to-cyan-100 bg-clip-text text-transparent">Pass it on automatically.</span>
        </h1>
        <p className="text-[18px] md:text-[20px] text-slate-400 mb-8 leading-relaxed max-w-2xl">
          Secure, yield-bearing inheritance plans built on Stellar. Lock digital assets, earn yield continuously, and distribute funds to mass beneficiaries directly in fiat local currencies using Stellar Anchors.
        </p>
      </section>

      {/* DApp Simulator Skeleton */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="border border-cyan-400/20 bg-slate-950/70 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 text-center">Interactive Plan Creator & Simulator</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-center text-base">
            Contributors: Implement the interactive inheritance widget here. Refer to Issue #4 for task requirements.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
            <div className="p-8 bg-[#1B2529]/80 border border-[#2E3C42] rounded-2xl hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold text-lg mb-6">1</div>
              <h3 className="font-bold text-lg text-white mb-3">Plan Builder</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Select tokens (USDC, EURC, XLM), set deposit amount, and add multiple heirs with custom split percentages (must total 100%).
              </p>
            </div>
            
            <div className="p-8 bg-[#1B2529]/80 border border-[#2E3C42] rounded-2xl hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold text-lg mb-6">2</div>
              <h3 className="font-bold text-lg text-white mb-3">Yield & Timer Settings</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Toggle yield-bearing capability (e.g. 5.5% APY) and configure inactivity thresholds for proof-of-life ping limits.
              </p>
            </div>
            
            <div className="p-8 bg-[#1B2529]/80 border border-[#2E3C42] rounded-2xl hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold text-lg mb-6">3</div>
              <h3 className="font-bold text-lg text-white mb-3">Anchor Fiat Off-Ramp</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Connect heirs to local currencies (NGN, KES, BRL, USD) via Stellar Anchors to payout directly to bank accounts or mobile money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2A3338] bg-[#101618] py-8 text-center text-sm text-slate-500 relative z-10">
        <p>&copy; {new Date().getFullYear()} XourceX. Built on Stellar.</p>
      </footer>
    </div>
  );
}
