'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bot, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('token', 'demo-jwt-token');
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex relative overflow-hidden text-white">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 z-10 w-full lg:w-1/2 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-sm lg:w-96 glass-card p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">SupplySense</span>
          </div>

          <h2 className="text-2xl font-semibold mb-2">Welcome back</h2>
          <p className="text-gray-400 text-sm mb-8">Enter your details to access your account.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  required
                  defaultValue="admin@supplysense.ai"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-300">Password</label>
                <Link href="/forgot-password" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  required
                  defaultValue="demo123"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3 mt-4"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign in <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
              Sign up
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden z-10 border-l border-white/10 bg-white/[0.02] backdrop-blur-sm">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] rounded-full border border-white/5 border-dashed"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] rounded-full border border-white/10 border-dashed"
        />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          className="absolute w-[400px] h-[400px] rounded-full border border-white/10 border-dashed"
        />
        
        <div className="relative z-20 text-center animate-float">
          <div className="w-32 h-32 mx-auto glass rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(59,130,246,0.3)]">
            <Bot className="w-16 h-16 text-blue-400" />
          </div>
          <h2 className="text-4xl font-bold mb-4 text-white">AI-Powered Supply Chain</h2>
          <p className="text-gray-400 max-w-md mx-auto text-lg">
            Predictive analytics, automated procurement, and intelligent inventory management.
          </p>
        </div>
      </div>
    </div>
  );
}
