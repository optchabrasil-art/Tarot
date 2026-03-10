'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Sparkles, RefreshCw, BookOpen, Moon, Sun, Info } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { TAROT_CARDS, TarotCardData } from '@/lib/tarot-data';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Card = ({ card, isFlipped, isReversed, onClick, index }: { 
  card: TarotCardData | null, 
  isFlipped: boolean, 
  isReversed?: boolean,
  onClick?: () => void,
  index?: number
}) => {
  return (
    <div 
      className="relative w-48 h-80 cursor-pointer perspective-1000 group"
      onClick={onClick}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-700"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0, rotateZ: isReversed ? 180 : 0 }}
      >
        {/* Card Back */}
        <div className="absolute inset-0 backface-hidden bg-[#1a0f0a] border-2 border-[#ff4e00]/20 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
          <div className="absolute inset-2 border border-[#ff4e00]/10 rounded-lg flex items-center justify-center">
            <Moon className="w-12 h-12 text-[#ff4e00]/20" />
          </div>
          <div className="w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
        </div>

        {/* Card Front */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#15100d] border-2 border-[#ff4e00]/40 rounded-xl overflow-hidden shadow-2xl">
          {card && (
            <div className="w-full h-full flex flex-col">
              <div className="relative flex-1 overflow-hidden">
                <Image 
                  src={card.image} 
                  alt={card.name} 
                  fill
                  className="object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15100d] via-transparent to-transparent"></div>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-serif text-xl text-[#f5f2ed] tracking-wide">{card.name}</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#ff4e00]/60 mt-1">
                  {isReversed ? 'Invertida' : 'Vertical'}
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Page ---

export default function TarotPage() {
  const [question, setQuestion] = useState('');
  const [drawnCards, setDrawnCards] = useState<{ card: TarotCardData, isReversed: boolean }[]>([]);
  const [isReading, setIsReading] = useState(false);
  const [reading, setReading] = useState('');
  const [isFlipping, setIsFlipping] = useState(false);
  const [spreadType, setSpreadType] = useState<'single' | 'three'>('single');

  const drawCards = () => {
    if (!question.trim()) {
      alert('Por favor, faça uma pergunta ao oráculo.');
      return;
    }

    setIsFlipping(true);
    setDrawnCards([]);
    setReading('');

    setTimeout(() => {
      const count = spreadType === 'single' ? 1 : 3;
      const shuffled = [...TAROT_CARDS].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, count).map(card => ({
        card,
        isReversed: Math.random() > 0.7
      }));
      
      setDrawnCards(selected);
      setIsFlipping(false);
      generateReading(selected);
    }, 800);
  };

  const generateReading = async (cards: { card: TarotCardData, isReversed: boolean }[]) => {
    setIsReading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! });
      const model = "gemini-3-flash-preview";
      
      const cardsStr = cards.map(c => `${c.card.name} (${c.isReversed ? 'Invertida' : 'Vertical'})`).join(', ');
      const prompt = `Você é um mestre de Tarot experiente e intuitivo. 
      Pergunta do consulente: "${question}"
      Cartas tiradas: ${cardsStr}
      
      Forneça uma interpretação profunda, mística e acolhedora em Português. 
      Use Markdown para formatar a resposta. 
      Se for uma tiragem de 3 cartas, interprete-as como Passado, Presente e Futuro ou como diferentes aspectos da situação.
      Seja poético mas direto.`;

      const response = await ai.models.generateContent({
        model,
        contents: [{ parts: [{ text: prompt }] }],
      });

      setReading(response.text || 'O oráculo está em silêncio no momento. Tente novamente.');
    } catch (error) {
      console.error('Erro na leitura:', error);
      setReading('Houve uma interferência nas energias astrais. Por favor, tente novamente mais tarde.');
    } finally {
      setIsReading(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center py-12 px-4">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#0a0502]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#ff4e00]/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#3a1510]/20 blur-[150px] rounded-full"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-6xl md:text-8xl mb-4 tracking-tighter text-[#f5f2ed]">
            Aura Tarot
          </h1>
          <p className="font-sans text-sm uppercase tracking-[0.4em] text-[#ff4e00] opacity-80">
            Conecte-se com o Invisível
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl mb-12"
        >
          <div className="mb-6">
            <label className="block text-xs uppercase tracking-widest text-[#ff4e00]/60 mb-2 ml-1">
              Sua Pergunta
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="O que você deseja saber hoje?"
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-[#f5f2ed] focus:outline-none focus:border-[#ff4e00]/50 transition-colors resize-none h-24 font-serif text-lg"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex bg-black/40 p-1 rounded-full border border-white/5">
              <button
                onClick={() => setSpreadType('single')}
                className={cn(
                  "px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all",
                  spreadType === 'single' ? "bg-[#ff4e00] text-white shadow-lg" : "text-white/40 hover:text-white/60"
                )}
              >
                Carta Única
              </button>
              <button
                onClick={() => setSpreadType('three')}
                className={cn(
                  "px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all",
                  spreadType === 'three' ? "bg-[#ff4e00] text-white shadow-lg" : "text-white/40 hover:text-white/60"
                )}
              >
                Três Cartas
              </button>
            </div>

            <button
              onClick={drawCards}
              disabled={isFlipping || isReading}
              className="flex items-center gap-2 bg-[#f5f2ed] text-[#0a0502] px-8 py-3 rounded-full font-serif text-lg hover:bg-white transition-all active:scale-95 disabled:opacity-50"
            >
              {isReading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Lendo...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Tirar Cartas
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Cards Display */}
        <div className="flex flex-wrap justify-center gap-8 mb-16 min-h-[320px]">
          <AnimatePresence mode="wait">
            {drawnCards.length > 0 ? (
              drawnCards.map((item, idx) => (
                <motion.div
                  key={`${item.card.id}-${idx}`}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card 
                    card={item.card} 
                    isFlipped={true} 
                    isReversed={item.isReversed} 
                  />
                </motion.div>
              ))
            ) : (
              <div className="flex gap-8">
                {[...Array(spreadType === 'single' ? 1 : 3)].map((_, i) => (
                  <motion.div
                    key={`placeholder-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                  >
                    <Card card={null} isFlipped={false} />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Reading Section */}
        <AnimatePresence>
          {reading && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-3xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-10 shadow-2xl mb-24"
            >
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
                <BookOpen className="w-6 h-6 text-[#ff4e00]" />
                <h2 className="font-serif text-3xl tracking-tight">A Voz do Oráculo</h2>
              </div>
              <div className="prose prose-invert prose-p:font-serif prose-p:text-xl prose-p:leading-relaxed prose-p:text-[#f5f2ed]/90 prose-headings:font-serif prose-headings:text-[#ff4e00] max-w-none">
                <ReactMarkdown>{reading}</ReactMarkdown>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Info */}
        <footer className="w-full border-t border-white/5 pt-12 pb-24 flex flex-col items-center opacity-40">
          <div className="flex gap-8 mb-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest">
              <Sun className="w-4 h-4" />
              Consciência
            </div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest">
              <Moon className="w-4 h-4" />
              Intuição
            </div>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-center">
            Aura Tarot © 2026 • Sabedoria Ancestral via Inteligência Artificial
          </p>
        </footer>
      </div>

      {/* Custom Styles for 3D Flip */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </main>
  );
}
