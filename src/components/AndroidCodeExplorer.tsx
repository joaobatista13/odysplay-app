import React, { useState } from 'react';
import {
  FileCode,
  FolderTree,
  Download,
  Copy,
  Check,
  Search,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Layers,
  Sparkles
} from 'lucide-react';
import JSZip from 'jszip';
import { ANDROID_PROJECT_FILES, AndroidFileRecord } from '../data/androidFiles';

export const AndroidCodeExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<AndroidFileRecord>(ANDROID_PROJECT_FILES[4]); // default to AndroidManifest.xml or Repository
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      // Add all project files into the root zip folder "OdysPlay-Android"
      const rootFolder = zip.folder('OdysPlay-Android') || zip;

      ANDROID_PROJECT_FILES.forEach(file => {
        rootFolder.file(file.path, file.content);
      });

      // Generate zip blob
      const content = await zip.generateAsync({ type: 'blob' });
      
      // Trigger download
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'OdysPlay-Android-Studio-Java.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating zip:', err);
    } finally {
      setIsZipping(false);
    }
  };

  const filteredFiles = ANDROID_PROJECT_FILES.filter(f =>
    f.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Top Banner with Download Button */}
      <div className="bg-gradient-to-r from-[#122C45] via-[#072946] to-[#0B1B2B] p-5 rounded-3xl border border-[#1C3E60] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#D4AF37] text-[#072946]">
              PROJETO NATIVO ANDROID STUDIO (JAVA)
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#4DDDE0]/20 text-[#4DDDE0] border border-[#4DDDE0]/40">
              Gradle 8.2 • SDK 34 • Java 17
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-2 font-gaming tracking-wide">
            Arquivos Completos do OdysPlay para Android Studio
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Explore as classes Java nativas (MVVM), layouts XML, recursos e esquema Supabase.
            Clique no botão abaixo para baixar o arquivo <strong>.ZIP</strong> e abrir direto na IDE.
          </p>
        </div>

        <button
          onClick={handleDownloadZip}
          disabled={isZipping}
          className="px-5 py-3 rounded-2xl bg-[#D4AF37] hover:bg-[#c39e2d] text-[#072946] font-bold text-sm shadow-lg flex items-center space-x-2 shrink-0 transition"
        >
          <Download className="w-5 h-5" />
          <span>{isZipping ? 'Gerando Pacote ZIP...' : 'Baixar Projeto Completo (.ZIP)'}</span>
        </button>
      </div>

      {/* Explorer Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: File Tree */}
        <div className="lg:col-span-4 bg-[#072946] border border-[#1C3E60] rounded-2xl p-4 flex flex-col h-[650px]">
          <div className="flex items-center justify-between pb-3 border-b border-[#1C3E60]">
            <div className="flex items-center space-x-2 text-sm font-bold text-[#D4AF37]">
              <FolderTree className="w-4 h-4" />
              <span>Estrutura de Pastas</span>
            </div>
            <span className="text-[11px] text-slate-400">{filteredFiles.length} arquivos</span>
          </div>

          {/* Search box */}
          <div className="relative my-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filtrar por nome de arquivo..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#0B1B2B] border border-[#1C3E60] focus:border-[#4DDDE0] rounded-xl text-xs text-white outline-none"
            />
          </div>

          {/* File List */}
          <div className="flex-1 overflow-y-auto space-y-1 pr-1">
            {filteredFiles.map(file => {
              const isSelected = selectedFile.path === file.path;
              return (
                <div
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`p-2.5 rounded-xl cursor-pointer text-xs transition flex items-start space-x-2.5 ${
                    isSelected
                      ? 'bg-[#122C45] border border-[#4DDDE0] text-white shadow-sm'
                      : 'hover:bg-[#122C45]/50 text-slate-300 border border-transparent'
                  }`}
                >
                  <FileCode className={`w-4 h-4 mt-0.5 shrink-0 ${
                    file.category === 'java' ? 'text-[#D4AF37]' :
                    file.category === 'xml' ? 'text-[#4DDDE0]' :
                    file.category === 'sql' ? 'text-[#00D9C0]' : 'text-slate-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs truncate font-medium">{file.path}</p>
                    <p className="text-[10px] text-slate-400 truncate">{file.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Code Viewer */}
        <div className="lg:col-span-8 bg-[#072946] border border-[#1C3E60] rounded-2xl flex flex-col h-[650px] overflow-hidden">
          
          {/* Header */}
          <div className="p-4 bg-[#0B1B2B] border-b border-[#1C3E60] flex items-center justify-between shrink-0">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-sm font-bold text-[#4DDDE0]">{selectedFile.path}</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#122C45] text-[#D4AF37] border border-[#1C3E60]">
                  {selectedFile.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{selectedFile.description}</p>
            </div>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-[#122C45] hover:bg-[#1C3E60] border border-[#1C3E60] rounded-xl text-xs text-slate-200 font-semibold flex items-center space-x-1.5 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00D9C0]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar Código'}</span>
            </button>
          </div>

          {/* Code Viewer with Line Numbers */}
          <div className="flex-1 overflow-auto bg-[#091A2B] p-4 font-mono text-xs text-slate-200 leading-relaxed">
            <pre className="whitespace-pre">
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </div>

      </div>

    </div>
  );
};
