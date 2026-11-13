import React, { useState } from 'react';
import {
  Smartphone,
  FolderCode,
  Database,
  BookOpen,
  Gamepad2,
  Download,
  Layers,
  Sparkles,
  ShieldAlert,
  CheckCircle2
} from 'lucide-react';
import { AndroidSimulator } from './components/AndroidSimulator';
import { AndroidCodeExplorer } from './components/AndroidCodeExplorer';
import { SupabaseGuide } from './components/SupabaseGuide';
import { AndroidRunGuide } from './components/AndroidRunGuide';
import JSZip from 'jszip';
import { ANDROID_PROJECT_FILES } from './data/androidFiles';

export default function App() {
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'simulator' | 'code' | 'supabase' | 'guide'>('simulator');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleQuickDownloadZip = async () => {
    setIsDownloading(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder('OdysPlay-Android') || zip;
      ANDROID_PROJECT_FILES.forEach(f => folder.file(f.path, f.content));
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'OdysPlay-Android-Studio-Java.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1B2B] text-slate-100 flex flex-col font-sans selection:bg-[#D4AF37] selection:text-[#072946]">
      
      {/* Top Navigation & Brand Header */}
      <header className="sticky top-0 z-40 bg-[#072946]/95 backdrop-blur border-b border-[#1C3E60] px-4 py-3 sm:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & App Info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#122C45] to-[#072946] border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.25)]">
              <Gamepad2 className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-extrabold text-[#D4AF37] font-gaming tracking-wider">ODYSPLAY</h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#122C45] text-[#4DDDE0] border border-[#4DDDE0]/40">
                  Android Java 17
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Plataforma Gamer: Gamers • Desenvolvedores (Devs) • Estúdios (Empresas)
              </p>
            </div>
          </div>

          {/* Tab Navigation Switcher */}
          <div className="flex items-center bg-[#0B1B2B] p-1 rounded-2xl border border-[#1C3E60]">
            <button
              onClick={() => setActiveWorkspaceTab('simulator')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                activeWorkspaceTab === 'simulator'
                  ? 'bg-[#122C45] text-[#4DDDE0] border border-[#4DDDE0]/50 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Simulador Android</span>
            </button>

            <button
              onClick={() => setActiveWorkspaceTab('code')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                activeWorkspaceTab === 'code'
                  ? 'bg-[#122C45] text-[#D4AF37] border border-[#D4AF37]/50 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FolderCode className="w-4 h-4" />
              <span>Código Android Studio</span>
            </button>

            <button
              onClick={() => setActiveWorkspaceTab('supabase')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                activeWorkspaceTab === 'supabase'
                  ? 'bg-[#122C45] text-[#00D9C0] border border-[#00D9C0]/50 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Supabase & SQL</span>
            </button>

            <button
              onClick={() => setActiveWorkspaceTab('guide')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                activeWorkspaceTab === 'guide'
                  ? 'bg-[#122C45] text-amber-300 border border-amber-300/50 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Guia de Execução</span>
            </button>
          </div>

          {/* Quick ZIP Download Button */}
          <button
            onClick={handleQuickDownloadZip}
            disabled={isDownloading}
            className="hidden lg:flex items-center space-x-1.5 px-3.5 py-2 bg-[#D4AF37] hover:bg-[#c39e2d] text-[#072946] font-bold text-xs rounded-xl shadow transition"
          >
            <Download className="w-4 h-4" />
            <span>{isDownloading ? 'Gerando ZIP...' : 'Baixar ZIP do Projeto'}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="flex-1 py-4">
        {activeWorkspaceTab === 'simulator' && <AndroidSimulator />}
        {activeWorkspaceTab === 'code' && <AndroidCodeExplorer />}
        {activeWorkspaceTab === 'supabase' && <SupabaseGuide />}
        {activeWorkspaceTab === 'guide' && <AndroidRunGuide />}
      </main>

      {/* Footer Info */}
      <footer className="bg-[#072946] border-t border-[#1C3E60] py-4 px-6 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            OdysPlay © 2026 — Projeto Nativo em Java para Android Studio com integração Supabase e dados de demonstração.
          </p>
          <div className="flex items-center space-x-3 text-[11px] text-[#4DDDE0]">
            <span>Paleta Oficial: #122C45 &amp; #D4AF37</span>
            <span>•</span>
            <span>Padrão MVVM</span>
            <span>•</span>
            <span>Row Level Security (RLS)</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
