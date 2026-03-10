'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Key, Save, LogOut, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AdminDashboard() {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth !== 'true') {
      router.push('/admin/login');
    } else {
      const savedKey = localStorage.getItem('custom_gemini_api_key');
      if (savedKey) setApiKey(savedKey);
      setIsLoading(false);
    }
  }, [router]);

  const handleSave = () => {
    localStorage.setItem('custom_gemini_api_key', apiKey);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    router.push('/admin/login');
  };

  if (isLoading) return null;

  return (
    <main className="min-h-screen bg-[#0a0502] text-[#f5f2ed] p-6 md:p-12 relative overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[#ff4e00]/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#ff4e00]/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#ff4e00]" />
            </div>
            <div>
              <h1 className="font-serif text-4xl">Painel Administrativo</h1>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Configurações do Sistema</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </header>

        <div className="grid gap-8">
          {/* API Key Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-8">
              <Key className="w-6 h-6 text-[#ff4e00]" />
              <h2 className="font-serif text-2xl">Configuração de API</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-3 ml-1">
                  Chave API do Gemini
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Cole sua chave API aqui..."
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-[#f5f2ed] focus:outline-none focus:border-[#ff4e00]/50 transition-all font-mono text-sm"
                  />
                </div>
                <p className="mt-4 text-xs text-white/30 flex items-start gap-2 leading-relaxed">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  Esta chave será usada para gerar as interpretações das cartas. Se deixada em branco, o sistema tentará usar a chave padrão configurada no ambiente.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-2">
                  {isSaved && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-emerald-400 text-xs uppercase tracking-widest"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Salvo com sucesso
                    </motion.div>
                  )}
                </div>
                
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-[#ff4e00] text-white px-8 py-3 rounded-full font-serif text-lg hover:bg-[#ff6321] transition-all active:scale-95 shadow-lg shadow-[#ff4e00]/20"
                >
                  <Save className="w-5 h-5" />
                  Salvar Alterações
                </button>
              </div>
            </div>
          </motion.section>

          {/* Stats/Info Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-[2rem] p-8"
            >
              <h3 className="font-serif text-xl mb-4">Status do Sistema</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-xs uppercase tracking-widest text-white/40">Versão</span>
                  <span className="text-xs font-mono">1.0.0-aura</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-xs uppercase tracking-widest text-white/40">Modelo IA</span>
                  <span className="text-xs font-mono">gemini-3-flash-preview</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs uppercase tracking-widest text-white/40">Ambiente</span>
                  <span className="text-xs font-mono text-emerald-400">Produção</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-[2rem] p-8"
            >
              <h3 className="font-serif text-xl mb-4">Dica de Segurança</h3>
              <p className="text-sm text-white/60 leading-relaxed font-serif italic">
                "Nunca compartilhe sua chave API com terceiros. O Aura Tarot armazena esta chave localmente no seu navegador para garantir que suas interpretações continuem fluindo sem interrupções."
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
