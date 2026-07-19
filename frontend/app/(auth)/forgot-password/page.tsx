'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bot, Mail, ArrowLeft, Loader2, KeyRound } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'otp'>('email');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (step === 'email') setStep('otp');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex relative overflow-hidden text-white items-center justify-center">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-card p-8 z-10 mx-4"
      >
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-2 text-center">
          {step === 'email' ? 'Reset your password' : 'Enter verification code'}
        </h2>
        <p className="text-gray-400 text-sm mb-8 text-center">
          {step === 'email' 
            ? "Enter your email address and we'll send you a code." 
            : "We've sent a code to your email."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 'email' ? (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">OTP Code</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="123456"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary flex items-center justify-center gap-2 py-3 mt-6"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (step === 'email' ? 'Send Code' : 'Verify Code')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to log in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
