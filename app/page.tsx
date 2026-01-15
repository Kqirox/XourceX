"use client";

import { motion } from "framer-motion";
import { Shield, Globe, Clock, Banknote, Users, Layers } from "lucide-react";

export default function XourceXLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-28 pb-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold leading-tight"
        >
          Programmable Inheritance<br />Built for the Real World
        </motion.h1>
        <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
          XourceX is a fiat‑native, non‑custodial inheritance infrastructure on Stellar.
          Lock assets on‑chain and automatically settle to bank accounts or mobile money
          when real‑world conditions are met.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <button className="px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-slate-200 transition">
            Launch App
          </button>
          <button className="px-6 py-3 rounded-2xl border border-slate-700 hover:bg-slate-900 transition">
            Read the Docs
          </button>
        </div>
      </section>

      {/* WHY */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-semibold text-center">Why XourceX Exists</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            "Inheritance is slow, manual, and legally opaque",
            "Cross‑border estate settlement is expensive and unclear",
            "Existing crypto tools are not fiat‑native or accessible"
          ].map((text, i) => (
            <div
              key={i}
              className="rounded-2xl bg-slate-900/50 border border-slate-800 p-6 text-slate-300"
            >
              {text}
            </div>
          ))}
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="bg-slate-950 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-center">Core Capabilities</h2>
          <div className="grid md:grid-cols-3 gap-12 mt-16">

            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-800">
                <Layers />
              </div>
              <h3 className="font-semibold text-lg">Inheritance Vaults</h3>
              <p className="mt-2 text-slate-400">
                Soroban‑controlled vaults lock assets non‑custodially until conditions are met.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-800">
                <Clock />
              </div>
              <h3 className="font-semibold text-lg">Programmable Triggers</h3>
              <p className="mt-2 text-slate-400">
                Time‑based and proof‑of‑life triggers enforced on‑chain or via attestations.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-800">
                <Banknote />
              </div>
              <h3 className="font-semibold text-lg">Fiat Settlement</h3>
              <p className="mt-2 text-slate-400">
                Automatic payouts to bank accounts or mobile money via Stellar anchors.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-800">
                <Shield />
              </div>
              <h3 className="font-semibold text-lg">Transparent & Secure</h3>
              <p className="mt-2 text-slate-400">
                Explicit, auditable, and immutable on‑chain state transitions.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-800">
                <Globe />
              </div>
              <h3 className="font-semibold text-lg">Cross‑Border Native</h3>
              <p className="mt-2 text-slate-400">
                Built for diaspora families and global asset ownership.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-800">
                <Users />
              </div>
              <h3 className="font-semibold text-lg">Non‑Crypto Beneficiaries</h3>
              <p className="mt-2 text-slate-400">
                Beneficiaries receive funds without wallets or crypto knowledge.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* USERS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-semibold text-center">Who It’s For</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-12">

          <div className="rounded-2xl bg-slate-900/50 border border-slate-800 p-6">
            <h3 className="font-semibold text-lg">Families & Diaspora</h3>
            <p className="mt-2 text-slate-400">
              Seamless cross‑border inheritance without months of legal friction.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/50 border border-slate-800 p-6">
            <h3 className="font-semibold text-lg">Founders & SMEs</h3>
            <p className="mt-2 text-slate-400">
              Business continuity and programmable succession planning.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/50 border border-slate-800 p-6">
            <h3 className="font-semibold text-lg">Institutions & NGOs</h3>
            <p className="mt-2 text-slate-400">
              Transparent and automated asset distribution infrastructure.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 py-24 text-center">
        <h2 className="text-4xl font-bold">Inheritance, Re‑Engineered</h2>
        <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
          Build inheritance plans that execute automatically, globally, and transparently.
        </p>
        <div className="mt-8">
          <button className="px-8 py-4 rounded-2xl bg-white text-black font-semibold hover:bg-slate-200 transition">
            Get Early Access
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-slate-500 text-sm">
        Built on Stellar • Designed for the real world
      </footer>

    </div>
  );
}
