import React from 'react';
import { Smartphone, CheckCircle, Terminal, Cpu, Usb, AlertTriangle } from 'lucide-react';

export const AndroidRunGuide: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      
      <div className="bg-[#072946] border border-[#1C3E60] rounded-3xl p-6 space-y-2 shadow-xl">
        <div className="flex items-center space-x-2 text-[#D4AF37]">
          <Smartphone className="w-6 h-6" />
          <h2 className="text-xl font-bold font-gaming text-white">Guia de Compilação, Execução & Testes no Android Studio</h2>
        </div>
        <p className="text-xs text-slate-300">
          Siga estas instruções para compilar o projeto Java nativo, configurar emuladores e rodar em dispositivos físicos Android.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Card 1: Emulador Android */}
        <div className="bg-[#072946]/80 p-5 rounded-2xl border border-[#1C3E60] space-y-3">
          <div className="flex items-center space-x-2 text-[#4DDDE0]">
            <Cpu className="w-5 h-5" />
            <h3 className="font-bold text-sm text-white">Execução no Emulador (AVD)</h3>
          </div>
          <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
            <li>Abra o Android Studio e vá em <strong>Tools &gt; Device Manager</strong>.</li>
            <li>Clique em <strong>Create Device</strong> e selecione um modelo recomendado (ex: <em>Pixel 7</em> ou <em>Pixel 8</em>).</li>
            <li>Baixe a imagem de sistema com <strong>API 34 (Android 14)</strong> ou <strong>API 33 (Android 13)</strong>.</li>
            <li>Conclua a criação do AVD e inicie o emulador clicando no botão de Play verde.</li>
            <li>Selecione o dispositivo na barra superior e pressione <kbd className="px-1.5 py-0.5 bg-[#0B1B2B] border border-[#1C3E60] rounded text-[10px] text-[#D4AF37]">Shift + F10</kbd> para compilar e rodar!</li>
          </ol>
        </div>

        {/* Card 2: Celular Físico USB */}
        <div className="bg-[#072946]/80 p-5 rounded-2xl border border-[#1C3E60] space-y-3">
          <div className="flex items-center space-x-2 text-[#00D9C0]">
            <Usb className="w-5 h-5" />
            <h3 className="font-bold text-sm text-white">Execução em Celular Físico via USB</h3>
          </div>
          <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
            <li>No seu celular Android, acesse <strong>Configurações &gt; Sobre o Telefone</strong>.</li>
            <li>Toque 7 vezes consecutivas em <strong>Número da Versão</strong> para liberar o modo desenvolvedor.</li>
            <li>Volte em <strong>Sistema &gt; Opções do Desenvolvedor</strong> e ative <strong>Depuração USB</strong>.</li>
            <li>Conecte o smartphone ao computador via cabo USB e aceite o prompt de permissão RSA na tela.</li>
            <li>O nome do seu aparelho aparecerá no Android Studio. Clique em <strong>Run 'app'</strong>.</li>
          </ol>
        </div>

      </div>

      {/* Feature Validation Checklist */}
      <div className="bg-[#072946] border border-[#1C3E60] rounded-2xl p-5 space-y-3">
        <h3 className="font-bold text-sm text-[#D4AF37] flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-[#00D9C0]" />
          <span>Roteiro de Validação dos Fluxos Obrigatórios</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1C3E60] flex items-start space-x-2">
            <span className="text-[#00D9C0] font-bold">✓</span>
            <div>
              <p className="font-bold text-white">Abertura e Splash</p>
              <p className="text-[11px] text-slate-400">Verificação de sessão e transição automática</p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1C3E60] flex items-start space-x-2">
            <span className="text-[#00D9C0] font-bold">✓</span>
            <div>
              <p className="font-bold text-white">Login e Cadastro</p>
              <p className="text-[11px] text-slate-400">Seleção de Gamer, Dev e Empresa com descrições</p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1C3E60] flex items-start space-x-2">
            <span className="text-[#00D9C0] font-bold">✓</span>
            <div>
              <p className="font-bold text-white">Feed e Curtidas</p>
              <p className="text-[11px] text-slate-400">Incremento de curtidas e abertura da tela detalhada</p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1C3E60] flex items-start space-x-2">
            <span className="text-[#00D9C0] font-bold">✓</span>
            <div>
              <p className="font-bold text-white">Comentários</p>
              <p className="text-[11px] text-slate-400">Validação de texto vazio e atualização instantânea</p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1C3E60] flex items-start space-x-2">
            <span className="text-[#00D9C0] font-bold">✓</span>
            <div>
              <p className="font-bold text-white">Novo Projeto (Dev)</p>
              <p className="text-[11px] text-slate-400">Nome, sinopse, gêneros e hashtags com validação</p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1C3E60] flex items-start space-x-2">
            <span className="text-[#00D9C0] font-bold">✓</span>
            <div>
              <p className="font-bold text-white">Nova Game Jam</p>
              <p className="text-[11px] text-slate-400">Tema, prêmios, datas e regras da maratona</p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1C3E60] flex items-start space-x-2">
            <span className="text-[#00D9C0] font-bold">✓</span>
            <div>
              <p className="font-bold text-white">Notificações por Cor</p>
              <p className="text-[11px] text-slate-400">Verde (Sucesso), Vermelho, Amarelo e Dourado</p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1C3E60] flex items-start space-x-2">
            <span className="text-[#00D9C0] font-bold">✓</span>
            <div>
              <p className="font-bold text-white">Alternar Perfis (4.12)</p>
              <p className="text-[11px] text-slate-400">Troca imediata entre Gamer, Dev e Estúdio</p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#0B1B2B] border border-[#1C3E60] flex items-start space-x-2">
            <span className="text-[#00D9C0] font-bold">✓</span>
            <div>
              <p className="font-bold text-white">Denúncia & Moderação</p>
              <p className="text-[11px] text-slate-400">Registro de ocorrências para manter o app saudável</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
