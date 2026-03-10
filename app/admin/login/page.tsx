'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'optchabrasil@gmail.com' && password === '1234') {
      // In a real app, use a proper session/cookie
      localStorage.setItem('admin_auth', 'true');
      router.push('/admin');
    } else {
      setError('Credenciais inválidas.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0502] p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff4e00]/5 blur-[120px] rounded-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#ff4e00]/10 mb-6">
              <Sparkles className="w-8 h-8 text-[#ff4e00]" />
            </div>
            <h1 className="font-serif text-4xl text-[#f5f2ed] mb-2">Aura Admin</h1>
            <p className="text-xs uppercase tracking-[0.3em] text-[#ff4e00]/60">Acesso Restrito</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-[#f5f2ed] focus:outline-none focus:border-[#ff4e00]/50 transition-all font-serif"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-[#f5f2ed] focus:outline-none focus:border-[#ff4e00]/50 transition-all font-serif"
                  placeholder="••••"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-xs text-center font-serif">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#ff4e00] text-white py-4 rounded-2xl font-serif text-lg hover:bg-[#ff6321] transition-all active:scale-[0.98] shadow-lg shadow-[#ff4e00]/20"
            >
              Entrar no Portal
            </button>
          </form>
        </div>
      </motion.div>
    </main>
  );
}
