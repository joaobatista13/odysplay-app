import React, { useState } from 'react';
import { Database, ShieldCheck, CheckCircle2, Copy, Check, Terminal, ExternalLink, Key, Server } from 'lucide-react';
import { ANDROID_PROJECT_FILES } from '../data/androidFiles';

export const SupabaseGuide: React.FC = () => {
  const [copiedSql, setCopiedSql] = useState(false);
  const sqlFile = ANDROID_PROJECT_FILES.find(f => f.path === 'supabase/schema.sql');

  const handleCopySql = () => {
    if (sqlFile) {
      navigator.clipboard.writeText(sqlFile.content);
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Intro Banner */}
      <div className="bg-[#072946] border border-[#1C3E60] rounded-3xl p-6 space-y-3 shadow-xl">
        <div className="flex items-center space-x-2 text-[#00D9C0]">
          <Database className="w-6 h-6" />
          <h2 className="text-xl font-bold font-gaming text-white">Integração com Supabase (Backend & RLS)</h2>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          O OdysPlay foi arquitetado para operar em dois modos:
          <br />
          <strong>1. Modo Demonstração (Ativo por padrão):</strong> Permite abrir o app no Android Studio e testar todos os fluxos (Gamers, Devs, Estúdios, posts, curtidas, comentários, novos projetos e Game Jams) sem necessidade de credenciais prévias.
          <br />
          <strong>2. Modo Supabase Real:</strong> Persistência remota e autenticação segura via PostgREST e PostgreSQL com Row Level Security (RLS).
        </p>
      </div>

      {/* 3 Step Integration Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-[#072946]/90 p-5 rounded-2xl border border-[#1C3E60] space-y-2">
          <div className="w-8 h-8 rounded-xl bg-[#122C45] border border-[#D4AF37] flex items-center justify-center font-bold text-sm text-[#D4AF37]">
            1
          </div>
          <h3 className="font-bold text-sm text-white">Criar Projeto no Supabase</h3>
          <p className="text-xs text-slate-300">
            Acesse <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-[#4DDDE0] underline inline-flex items-center gap-0.5">supabase.com <ExternalLink className="w-3 h-3" /></a> e crie um projeto PostgreSQL gratuito.
          </p>
        </div>

        <div className="bg-[#072946]/90 p-5 rounded-2xl border border-[#1C3E60] space-y-2">
          <div className="w-8 h-8 rounded-xl bg-[#122C45] border border-[#4DDDE0] flex items-center justify-center font-bold text-sm text-[#4DDDE0]">
            2
          </div>
          <h3 className="font-bold text-sm text-white">Executar o Schema SQL</h3>
          <p className="text-xs text-slate-300">
            No painel do Supabase, abra o <strong>SQL Editor</strong> e cole o conteúdo de <code className="text-[#00D9C0]">supabase/schema.sql</code> para gerar as tabelas e regras RLS.
          </p>
        </div>

        <div className="bg-[#072946]/90 p-5 rounded-2xl border border-[#1C3E60] space-y-2">
          <div className="w-8 h-8 rounded-xl bg-[#122C45] border border-[#00D9C0] flex items-center justify-center font-bold text-sm text-[#00D9C0]">
            3
          </div>
          <h3 className="font-bold text-sm text-white">Configurar Chaves no Java</h3>
          <p className="text-xs text-slate-300">
            Abra a classe <code className="text-[#D4AF37]">SupabaseConfig.java</code> no Android Studio e insira sua URL e Anon Public Key. O app sincroniza na hora!
          </p>
        </div>

      </div>

      {/* SQL Script Box with Copy Button */}
      <div className="bg-[#072946] border border-[#1C3E60] rounded-2xl overflow-hidden shadow-lg">
        <div className="p-4 bg-[#0B1B2B] border-b border-[#1C3E60] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-[#00D9C0]" />
            <span className="font-mono text-xs font-bold text-white">supabase/schema.sql (PostgreSQL com RLS)</span>
          </div>
          <button
            onClick={handleCopySql}
            className="px-3 py-1.5 bg-[#122C45] hover:bg-[#1C3E60] border border-[#1C3E60] text-xs font-semibold rounded-xl text-slate-200 flex items-center space-x-1.5 transition"
          >
            {copiedSql ? <Check className="w-3.5 h-3.5 text-[#00D9C0]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSql ? 'Copiado!' : 'Copiar SQL Completo'}</span>
          </button>
        </div>

        <div className="p-4 bg-[#091A2B] overflow-x-auto max-h-[380px] font-mono text-xs text-slate-300">
          <pre>{sqlFile?.content}</pre>
        </div>
      </div>

    </div>
  );
};
