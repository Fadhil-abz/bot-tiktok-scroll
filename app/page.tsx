"use client";

import React, { useState, useEffect, useRef } from 'react';

// Ikon-ikon tetap sama
const IconPlay = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;
const IconSquare = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>;
const IconMessage = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;
const IconClipboard = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>;
const IconSettings = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="2" y1="14" x2="6" y2="14"></line><line x1="10" y1="8" x2="14" y2="8"></line><line x1="18" y1="16" x2="22" y2="16"></line></svg>;
const IconX = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [targetText, setTargetText] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const automationTimer = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (automationTimer.current) window.clearInterval(automationTimer.current);
    };
  }, []);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setTargetText(text);
    } catch (err) {
      console.error("Gagal baca clipboard", err);
    }
  };

  const startAutomation = () => {
    if (!targetText.trim()) return alert("Teks kosong!");
    setIsRunning(true);
    setIsMenuOpen(false);
    
    automationTimer.current = window.setInterval(() => {
      // Scroll dilakukan di dalam window utama aplikasi
      window.scrollBy({ top: 600, behavior: 'smooth' });
    }, 4000); 
  };

  const stopAutomation = () => {
    setIsRunning(false);
    if (automationTimer.current) {
      window.clearInterval(automationTimer.current);
      automationTimer.current = null;
    }
  };

  return (
    <div className="relative h-screen w-full bg-black flex flex-col overflow-hidden">
      
      {/* JENDELA TIKTOK - Ini yang membuat seolah-olah bot mengembang di TikTok */}
      <div className="flex-1 w-full bg-slate-800">
        <iframe 
          ref={iframeRef}
          src="https://www.tiktok.com/foryou" 
          className="w-full h-full border-none"
          title="TikTok"
          allow="autoplay; clipboard-write"
        />
      </div>

      {/* OVERLAY INDIKATOR */}
      {isRunning && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600/90 text-white px-5 py-2 rounded-full text-[10px] font-bold animate-pulse z-50 shadow-2xl border border-red-400 backdrop-blur-md">
          OTOMATISASI AKTIF
        </div>
      )}

      {/* MENU KONTROL MELAYANG */}
      <div className="absolute bottom-10 right-6 flex flex-col items-end gap-4 z-50">
        {isMenuOpen && (
          <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-2xl w-72 mb-2 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4 text-white">
              <h3 className="font-bold flex items-center gap-2 text-xs uppercase tracking-tighter">
                <IconSettings /> Pengaturan Bot
              </h3>
              <button onClick={() => setIsMenuOpen(false)} className="text-white/40"><IconX /></button>
            </div>

            <div className="space-y-4">
              <textarea 
                value={targetText}
                onChange={(e) => setTargetText(e.target.value)}
                placeholder="Isi komentar otomatis..."
                className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none h-24 resize-none"
              />
              
              {!isRunning ? (
                <button onClick={startAutomation} className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
                  <IconPlay /> AKTIFKAN BOT
                </button>
              ) : (
                <button onClick={stopAutomation} className="w-full bg-red-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-red-500/20">
                  <IconSquare /> MATIKAN BOT
                </button>
              )}
            </div>
          </div>
        )}

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all ${isRunning ? 'bg-red-600 animate-bounce' : 'bg-white text-black'}`}
        >
          {isRunning ? <IconSquare /> : <IconMessage />}
        </button>
      </div>
    </div>
  );
}