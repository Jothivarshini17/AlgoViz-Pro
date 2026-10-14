"use client";

import { ArrowLeft, BrainCircuit, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <Link href="/login" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to login
        </Link>

        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <BrainCircuit className="h-8 w-8 text-indigo-500" />
          </div>
          <h1 className="text-3xl font-bold text-white">Reset your password</h1>
          <p className="mt-2 text-sm text-gray-400">We’ll send a reset link if that email is registered.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email address</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="you@example.com"
                className="block w-full rounded-xl border border-white/10 bg-black/50 py-3 pl-10 pr-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>
          </div>

          <button type="submit" className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700">
            Send reset link
          </button>
        </form>

        {submitted && (
          <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">
            If this account exists, a reset link has been sent.
          </div>
        )}
      </div>
    </div>
  );
}
