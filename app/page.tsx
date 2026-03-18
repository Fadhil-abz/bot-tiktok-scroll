"use client";

import React, { useState, useEffect, useRef } from 'react';

// --- Komponen Ikon SVG (Internal) ---
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
  const automationTimer = useRef<any>(null);

  // Membersihkan timer saat aplikasi ditutup
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
    if (!targetText.trim()) return alert("Masukkan teks komentar dulu!");
    setIsRunning(true);
    setIsMenuOpen(false);
    
    // Kecepatan scroll otomatis (4 detik sekali)
    automationTimer.current = window.setInterval(() => {
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
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
    <div className="relative h-screen w-full bg-black flex flex-col overflow-hidden select-none">
      
      {/* 1. JENDELA TIKTOK (UTAMA) */}
      <div className="flex-1 w-full relative z-10">
        <iframe 
          src="https://www.tiktok.com/explore" 
          className="w-full h-full border-none"
          title="TikTok"
          allow="autoplay; clipboard-write"
          style={{ pointerEvents: isMenuOpen ? 'none' : 'auto' }}
        />
      </div>

      {/* 2. OVERLAY STATUS (WAKTU BOT AKTIF) */}
      {isRunning && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-bold animate-pulse flex items-center gap-2 shadow-xl border border-red-400">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            BOT SCROLL AKTIF
          </div>
        </div>
      )}

      {/* 3. MENU KONTROL (FLOATING) */}
      <div className="absolute bottom-10 right-6 flex flex-col items-end gap-4 z-50">
        
        {/* Panel Pengaturan */}
        {isMenuOpen && (
          <div className="bg-slate-900/95 backdrop-blur-md border border-white/10 p-5 rounded-[2.5rem] shadow-2xl w-72 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center mb-4 text-white">
              <h3 className="font-bold flex items-center gap-2 text-[11px] uppercase tracking-widest opacity-70">
                <IconSettings /> Menu Otomatisasi
              </h3>
              <button onClick={() => setIsMenuOpen(false)} className="hover:rotate-90 transition-transform">
                <IconX />
              </button>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <textarea 
                  value={targetText}
                  onChange={(e) => setTargetText(e.target.value)}
                  placeholder="Isi teks komentar di sini..."
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-blue-500 h-28 resize-none transition-all"
                />
                <button 
                  onClick={handlePaste} 
                  className="absolute bottom-3 right-3 p-2 bg-white/5 hover:bg-white/10 rounded-xl text-white/50 border border-white/5"
                >
                  <IconClipboard />
                </button>
              </div>

              {!isRunning ? (
                <button 
                  onClick={startAutomation} 
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-blue-600/20"
                >
                  <IconPlay /> MULAI SCROLL
                </button>
              ) : (
                <button 
                  onClick={stopAutomation} 
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-red-600/20"
                >
                  <IconSquare /> BERHENTI
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tombol Utama (Buka/Tutup Menu) */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 border-4 border-white/10 ${
            isRunning 
              ? 'bg-red-600 animate-pulse scale-110 rotate-0' 
              : 'bg-white text-black hover:scale-105 active:scale-90'
          }`}
        >
          {isRunning ? <IconSquare /> : (isMenuOpen ? <IconX /> : <IconMessage />)}
        </button>
      </div>

    </div>
  );
}