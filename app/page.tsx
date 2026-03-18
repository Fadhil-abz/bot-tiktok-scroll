"use client";

import React, { useState, useEffect, useRef } from 'react';

// Komponen Ikon SVG Internal
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
  
  // Ref untuk menyimpan ID timer agar tidak kena error TypeScript/Linter
  const automationTimer = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (automationTimer.current) {
        window.clearInterval(automationTimer.current);
      }
    };
  }, []);

  const handlePaste = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        setTargetText(text);
      }
    } catch (err) {
      console.error("Gagal membaca clipboard", err);
    }
  };

  const startAutomation = () => {
    if (!targetText.trim()) {
      alert("Masukkan atau tempel teks dulu!");
      return;
    }
    setIsRunning(true);
    setIsMenuOpen(false);
    
    // Gunakan window.setInterval agar kompatibel dengan lingkungan browser/HP
    automationTimer.current = window.setInterval(() => {
      console.log(`[BOT] Mengirim: ${targetText}`);
      // Simulasi scroll ke bawah seukuran layar HP
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
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
    <div className="relative h-screen w-full bg-black overflow-hidden font-sans flex items-center justify-center">
      
      {isRunning && (
        <div className="text-white/20 text-center animate-pulse">
          <p className="text-sm uppercase tracking-widest font-bold">Bot sedang bekerja...</p>
          <p className="text-xs mt-2 italic">{targetText}</p>
        </div>
      )}

      {isRunning && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-bold animate-pulse flex items-center gap-2 z-40 shadow-lg border border-red-400">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          OTOMATISASI AKTIF
        </div>
      )}

      <div className="absolute bottom-8 right-6 flex flex-col items-end gap-4 z-50">
        {isMenuOpen && (
          <div className="bg-slate-900 border border-white/10 p-5 rounded-3xl shadow-2xl w-72 mb-2">
            <div className="flex justify-between items-center mb-4 text-white">
              <h3 className="font-bold flex items-center gap-2 text-sm uppercase">
                <IconSettings /> Menu Kontrol
              </h3>
              <button onClick={() => setIsMenuOpen(false)}><IconX /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-white/40 mb-1.5 block uppercase tracking-widest font-bold">Teks Komentar</label>
                <div className="relative">
                  <textarea 
                    value={targetText}
                    onChange={(e) => setTargetText(e.target.value)}
                    placeholder="Tulis pesan..."
                    className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-blue-500 h-28 resize-none transition-all"
                  />
                  <button onClick={handlePaste} className="absolute bottom-3 right-3 p-2 bg-white/5 rounded-xl text-white/70 border border-white/5">
                    <IconClipboard />
                  </button>
                </div>
              </div>

              {!isRunning ? (
                <button onClick={startAutomation} className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-blue-900/20">
                  <IconPlay /> Mulai
                </button>
              ) : (
                <button onClick={stopAutomation} className="w-full bg-red-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-red-900/20">
                  <IconSquare /> Berhenti
                </button>
              )}
            </div>
          </div>
        )}

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all active:scale-90 border-4 border-white/5 ${isRunning ? 'bg-red-600 animate-pulse' : 'bg-blue-600'}`}
        >
          {isRunning ? <IconSquare /> : <IconMessage />}
        </button>
      </div>
    </div>
  );
}