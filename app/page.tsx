"use client";

import React, { useState, useEffect, useRef } from 'react';

// Ikon tetap sama (Play, Square, Message, dll)
const IconPlay = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;
const IconSquare = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>;

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [targetText, setTargetText] = useState("");
  const automationTimer = useRef<any>(null);

  const startAutomation = () => {
    if (!targetText.trim()) return alert("Isi teks dulu!");
    
    // LANGKAH 1: Buka TikTok di Tab Baru
    const tiktokWindow = window.open("https://www.tiktok.com/foryou", "_blank");

    if (!tiktokWindow) {
      alert("Mohon izinkan 'Pop-up' di browser Chrome Anda!");
      return;
    }

    setIsRunning(true);

    // LANGKAH 2: Jalankan perintah scroll di Tab Baru tersebut
    automationTimer.current = window.setInterval(() => {
      tiktokWindow.postMessage('scroll', '*'); // Mengirim sinyal (Jika diizinkan)
      // Karena keterbatasan browser, cara terbaik adalah melakukan scroll di tab bot ini
      // lalu Anda pindah ke tab TikTok secara manual.
      window.scrollBy({ top: 500, behavior: 'smooth' });
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
    <div className="h-screen w-full bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">TikTok Bot Controller</h1>
      
      <div className="w-full max-w-sm bg-slate-900 border border-white/10 p-6 rounded-3xl shadow-2xl">
        <textarea 
          value={targetText}
          onChange={(e) => setTargetText(e.target.value)}
          placeholder="Tulis pesan komentar..."
          className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm mb-4 h-32 outline-none focus:border-blue-500"
        />

        {!isRunning ? (
          <button 
            onClick={startAutomation}
            className="w-full bg-blue-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
          >
            <IconPlay /> BUKA TIKTOK & MULAI
          </button>
        ) : (
          <button 
            onClick={stopAutomation}
            className="w-full bg-red-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
          >
            <IconSquare /> BERHENTI
          </button>
        )}
      </div>

      <p className="mt-6 text-xs text-white/40 leading-relaxed">
        *Karena TikTok menolak Iframe, tombol di atas akan membuka TikTok di tab baru.<br/>
        Pastikan izin Pop-up di Chrome sudah AKTIF.
      </p>
    </div>
  );
}