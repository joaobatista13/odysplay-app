import React, { useState } from 'react';
import {
  Gamepad2,
  Code2,
  Building2,
  Heart,
  MessageSquare,
  Share2,
  Bell,
  Search,
  PlusCircle,
  Trophy,
  ArrowLeft,
  Send,
  Flag,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  ExternalLink,
  ChevronRight,
  Eye,
  EyeOff,
  UserCheck,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import {
  ProfileType,
  UserProfile,
  Post,
  NewsItem,
  NotificationItem,
  Community,
  GameProject,
  GameJam,
  INITIAL_PROFILES,
  INITIAL_POSTS,
  INITIAL_NEWS,
  INITIAL_COMMUNITIES,
  INITIAL_PROJECTS,
  INITIAL_GAME_JAMS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

type Screen = 'splash' | 'login' | 'register' | 'main';
type Tab = 'feed' | 'communities' | 'news' | 'search' | 'profile';

export const AndroidSimulator: React.FC = () => {
  // Navigation & Screen States
  const [currentScreen, setCurrentScreen] = useState<Screen>('main');
  const [currentTab, setCurrentTab] = useState<Tab>('feed');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // Modals
  const [showProfileSwitcher, setShowProfileSwitcher] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showNewGameJamModal, setShowNewGameJamModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportingPostId, setReportingPostId] = useState<string | null>(null);

  // App Data State
  const [profiles, setProfiles] = useState<UserProfile[]>(INITIAL_PROFILES);
  const [activeProfileId, setActiveProfileId] = useState<string>('p_gamer_1');
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [communities, setCommunities] = useState<Community[]>(INITIAL_COMMUNITIES);
  const [projects, setProjects] = useState<GameProject[]>(INITIAL_PROJECTS);
  const [gameJams, setGameJams] = useState<GameJam[]>(INITIAL_GAME_JAMS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Input states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Register Form
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regType, setRegType] = useState<ProfileType>('GAMER');
  const [regError, setRegError] = useState('');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState<'ALL' | 'DEVS' | 'PROJECTS' | 'COMPANIES' | 'COMMUNITIES'>('ALL');
  const [newsFilter, setNewsFilter] = useState<'ALL' | 'Lançamentos' | 'Mercado' | 'Hardware' | 'Tendências'>('ALL');
  const [notifFilter, setNotifFilter] = useState<'ALL' | 'SUCESSO' | 'AVISO' | 'GERAL' | 'ERRO'>('ALL');

  // New Comment input
  const [commentInput, setCommentInput] = useState('');
  // Report input
  const [reportReason, setReportReason] = useState('');

  // New Project Form
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjSynopsis, setNewProjSynopsis] = useState('');
  const [newProjGenres, setNewProjGenres] = useState('');
  const [newProjHashtags, setNewProjHashtags] = useState('');
  const [projError, setProjError] = useState('');

  // New Game Jam Form
  const [newJamTitle, setNewJamTitle] = useState('');
  const [newJamTheme, setNewJamTheme] = useState('');
  const [newJamMax, setNewJamMax] = useState('200');
  const [newJamPrizes, setNewJamPrizes] = useState('');
  const [newJamDeadline, setNewJamDeadline] = useState('2026-11-30');
  const [newJamWinnersDate, setNewJamWinnersDate] = useState('2026-12-05');
  const [newJamRules, setNewJamRules] = useState('');
  const [jamError, setJamError] = useState('');

  // Toast banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const activeProfile = profiles.find(p => p.id === activeProfileId) || profiles[0];
  const unreadNotifsCount = notifications.filter(n => !n.isRead).length;

  // Actions
  const handleLikeToggle = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isLiked = !p.isLikedByCurrentUser;
        return {
          ...p,
          isLikedByCurrentUser: isLiked,
          likesCount: isLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1)
        };
      }
      return p;
    }));
  };

  const handleAddComment = (postId: string) => {
    if (!commentInput.trim()) return;
    const newComment = {
      id: `c_${Date.now()}`,
      postId,
      authorId: activeProfile.id,
      authorName: activeProfile.displayName,
      authorRole: activeProfile.profileType,
      content: commentInput.trim(),
      timestamp: Date.now()
    };
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    }));
    setCommentInput('');
    showToast('Comentário publicado no post!');

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: 'usr_1',
      title: 'Comentário enviado',
      message: `Você comentou no post de ${activeProfile.displayName}`,
      severity: 'SUCESSO',
      timestamp: Date.now(),
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleToggleCommunity = (communityId: string) => {
    setCommunities(prev => prev.map(c => {
      if (c.id === communityId) {
        const joined = !c.isMember;
        showToast(joined ? `Você entrou na comunidade ${c.name}!` : `Você saiu da comunidade ${c.name}`);
        return {
          ...c,
          isMember: joined,
          membersCount: joined ? c.membersCount + 1 : c.membersCount - 1
        };
      }
      return c;
    }));
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle.trim() || !newProjSynopsis.trim() || !newProjGenres.trim()) {
      setProjError('Preencha os campos obrigatórios (*)');
      return;
    }
    const newProject: GameProject = {
      id: `proj_${Date.now()}`,
      devProfileId: activeProfile.id,
      devName: activeProfile.displayName,
      title: newProjTitle.trim(),
      synopsis: newProjSynopsis.trim(),
      genres: newProjGenres.trim(),
      hashtags: newProjHashtags.trim() || '#indiedev #odysplay',
      createdAt: Date.now()
    };
    setProjects(prev => [newProject, ...prev]);

    // Also post to Feed
    const announcementPost: Post = {
      id: `post_${Date.now()}`,
      authorId: activeProfile.id,
      authorName: activeProfile.displayName,
      authorUsername: activeProfile.username,
      authorRole: 'DEV',
      content: `🎮 NOVO PROJETO DE JOGO: "${newProjTitle.trim()}" (${newProjGenres.trim()})!\n${newProjSynopsis.trim()}\n${newProjHashtags.trim()}`,
      timestamp: Date.now(),
      likesCount: 1,
      isLikedByCurrentUser: true,
      comments: []
    };
    setPosts(prev => [announcementPost, ...prev]);

    setShowNewProjectModal(false);
    setNewProjTitle('');
    setNewProjSynopsis('');
    setNewProjGenres('');
    setNewProjHashtags('');
    setProjError('');
    showToast('Jogo cadastrado e divulgado no Feed!');
  };

  const handleCreateGameJam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJamTitle.trim() || !newJamTheme.trim() || !newJamPrizes.trim()) {
      setJamError('Preencha os campos obrigatórios (*)');
      return;
    }
    const newJam: GameJam = {
      id: `jam_${Date.now()}`,
      companyProfileId: activeProfile.id,
      companyName: activeProfile.displayName,
      title: newJamTitle.trim(),
      theme: newJamTheme.trim(),
      maxParticipants: parseInt(newJamMax) || 150,
      prizes: newJamPrizes.trim(),
      registrationDeadline: newJamDeadline,
      winnersDate: newJamWinnersDate,
      rules: newJamRules.trim() || 'Equipes de 1 a 4 desenvolvedores.',
      registeredCount: 1,
      createdAt: Date.now()
    };
    setGameJams(prev => [newJam, ...prev]);

    // Announce on feed
    const jamPost: Post = {
      id: `post_${Date.now()}`,
      authorId: activeProfile.id,
      authorName: activeProfile.displayName,
      authorUsername: activeProfile.username,
      authorRole: 'EMPRESA',
      content: `🏆 NOVA GAME JAM ABERTA: "${newJamTitle.trim()}"!\nTema Oficial: ${newJamTheme.trim()}\nPrêmios: ${newJamPrizes.trim()}\nInscrições abertas até ${newJamDeadline}!`,
      timestamp: Date.now(),
      likesCount: 3,
      isLikedByCurrentUser: true,
      comments: []
    };
    setPosts(prev => [jamPost, ...prev]);

    setShowNewGameJamModal(false);
    setNewJamTitle('');
    setNewJamTheme('');
    setNewJamPrizes('');
    setJamError('');
    showToast('Game Jam anunciada com sucesso!');
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Preencha e-mail e senha.');
      return;
    }
    if (loginPassword.length < 6) {
      setLoginError('A senha deve possuir ao menos 6 caracteres.');
      return;
    }
    setLoginError('');
    setCurrentScreen('main');
    showToast('Bem-vindo de volta ao OdysPlay!');
  };

  const handleQuickLogin = (role: ProfileType) => {
    const target = profiles.find(p => p.profileType === role);
    if (target) {
      setActiveProfileId(target.id);
    }
    setCurrentScreen('main');
    showToast(`Conectado no perfil ${role}!`);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regUsername.trim() || !regEmail.trim() || regPassword.length < 6) {
      setRegError('Preencha todos os campos com senha de no mínimo 6 dígitos.');
      return;
    }
    const newProfile: UserProfile = {
      id: `p_${Date.now()}`,
      userId: 'usr_new',
      displayName: regName.trim(),
      username: regUsername.replace('@', ''),
      bio: 'Novo membro da comunidade gamer OdysPlay!',
      profileType: regType,
      interests: ['Lançamentos', 'Indie Games', 'Game Jams']
    };
    setProfiles(prev => [newProfile, ...prev]);
    setActiveProfileId(newProfile.id);
    setCurrentScreen('main');
    showToast(`Conta criada! Perfil inicial: ${regType}`);
  };

  const handleReportSubmit = () => {
    if (!reportReason.trim()) return;
    showToast('Denúncia recebida. A equipe de moderação irá avaliar.');
    setReportReason('');
    setShowReportModal(false);
    setReportingPostId(null);
  };

  const selectedPost = posts.find(p => p.id === selectedPostId);

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-6">
      {/* Phone Shell */}
      <div className="relative w-full max-w-[420px] h-[840px] bg-[#072946] rounded-[44px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-[4px] border-[#1C3E60] flex flex-col overflow-hidden">
        
        {/* Dynamic Android Speaker & Camera Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-5 bg-[#051624] rounded-full z-50 flex items-center justify-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#122C45] border border-[#1C3E60]/50" />
          <div className="w-12 h-1 bg-[#1C3E60]/60 rounded-full" />
        </div>

        {/* Android Status Bar */}
        <div className="w-full h-8 pt-1 px-6 flex justify-between items-center text-[11px] font-medium text-[#E6F1F8] z-40 bg-[#122C45]">
          <span>12:00</span>
          <div className="flex items-center space-x-1.5 text-xs text-[#4DDDE0]">
            <span className="text-[10px]">5G</span>
            <span>📶</span>
            <span>98% 🔋</span>
          </div>
        </div>

        {/* Phone Content Screen */}
        <div className="relative flex-1 bg-[#0B1B2B] overflow-hidden flex flex-col text-slate-100 font-sans">
          
          {/* TOAST POPUP */}
          {toastMessage && (
            <div className="absolute top-14 left-4 right-4 z-50 bg-[#00D9C0] text-[#072946] px-4 py-2.5 rounded-xl shadow-lg font-bold text-xs flex items-center space-x-2 animate-bounce">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* ============================================================ */}
          {/* 1. SCREEN: SPLASH */}
          {/* ============================================================ */}
          {currentScreen === 'splash' && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#122C45] via-[#0B1B2B] to-[#072946] text-center">
              <div className="relative mb-6">
                <div className="w-28 h-28 rounded-3xl bg-[#072946] border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                  <Gamepad2 className="w-16 h-16 text-[#D4AF37]" />
                </div>
                <div className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-[#4DDDE0] text-[#072946] font-extrabold text-[10px] rounded-full">
                  JAVA NATIVO
                </div>
              </div>
              <h1 className="text-3xl font-extrabold text-[#D4AF37] tracking-wider font-gaming">ODYSPLAY</h1>
              <p className="text-sm text-[#4DDDE0] mt-1">A Comunidade Gamer Brasileira</p>
              <p className="text-xs text-slate-400 mt-4 max-w-[260px]">
                Conectando Gamers, Desenvolvedores Indie e Estúdios em uma só plataforma.
              </p>
              
              <div className="mt-12 w-full space-y-3 max-w-[280px]">
                <button
                  onClick={() => setCurrentScreen('main')}
                  className="w-full py-3 bg-[#D4AF37] hover:bg-[#c39e2d] text-[#072946] font-bold rounded-xl text-sm transition shadow-md"
                >
                  Entrar no OdysPlay
                </button>
                <button
                  onClick={() => setCurrentScreen('login')}
                  className="w-full py-2.5 border border-[#4DDDE0] text-[#4DDDE0] font-semibold rounded-xl text-xs hover:bg-[#4DDDE0]/10 transition"
                >
                  Fazer Login / Cadastrar
                </button>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 2. SCREEN: LOGIN */}
          {/* ============================================================ */}
          {currentScreen === 'login' && (
            <div className="flex-1 overflow-y-auto p-5 bg-gradient-to-b from-[#122C45] to-[#0B1B2B] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <button onClick={() => setCurrentScreen('main')} className="p-1 text-[#D4AF37]">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <span className="text-xs text-[#D4AF37] font-semibold">OdysPlay Auth</span>
                </div>

                <div className="text-center mb-6">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-[#072946] border border-[#D4AF37] flex items-center justify-center mb-2">
                    <Gamepad2 className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Bem-vindo de volta</h2>
                  <p className="text-xs text-slate-400">Acesse sua conta gamer</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-3.5 bg-[#072946]/90 p-4 rounded-2xl border border-[#1C3E60]">
                  <div>
                    <label className="text-[11px] text-slate-300 font-medium">E-mail</label>
                    <input
                      type="email"
                      placeholder="seu.email@exemplo.com"
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-[#0B1B2B] border border-[#1C3E60] focus:border-[#D4AF37] rounded-xl text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 font-medium">Senha</label>
                    <div className="relative mt-1">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-[#0B1B2B] border border-[#1C3E60] focus:border-[#D4AF37] rounded-xl text-xs text-white outline-none pr-9"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {loginError && (
                    <div className="text-xs text-[#AF0000] bg-red-950/40 border border-[#AF0000]/50 p-2 rounded-lg flex items-center space-x-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#D4AF37] text-[#072946] font-bold text-xs rounded-xl shadow mt-2 hover:bg-[#c5a12e]"
                  >
                    Entrar no OdysPlay
                  </button>

                  <div className="pt-2 text-center">
                    <p className="text-[10px] text-slate-400 mb-2">Acesso Rápido para Demonstração:</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleQuickLogin('GAMER')}
                        className="py-1.5 px-1 bg-[#122C45] border border-[#4DDDE0] text-[#4DDDE0] rounded-lg text-[10px] font-semibold hover:bg-[#4DDDE0]/20"
                      >
                        🎮 Gamer
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickLogin('DEV')}
                        className="py-1.5 px-1 bg-[#122C45] border border-[#D4AF37] text-[#D4AF37] rounded-lg text-[10px] font-semibold hover:bg-[#D4AF37]/20"
                      >
                        🛠️ Dev
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickLogin('EMPRESA')}
                        className="py-1.5 px-1 bg-[#122C45] border border-[#00D9C0] text-[#00D9C0] rounded-lg text-[10px] font-semibold hover:bg-[#00D9C0]/20"
                      >
                        🏢 Estúdio
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="text-center py-4">
                <button
                  onClick={() => setCurrentScreen('register')}
                  className="text-xs text-[#4DDDE0] font-medium hover:underline"
                >
                  Não tem conta? Cadastre-se aqui
                </button>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 3. SCREEN: REGISTER */}
          {/* ============================================================ */}
          {currentScreen === 'register' && (
            <div className="flex-1 overflow-y-auto p-5 bg-gradient-to-b from-[#122C45] to-[#0B1B2B]">
              <div className="flex items-center justify-between mb-3">
                <button onClick={() => setCurrentScreen('login')} className="p-1 text-[#D4AF37]">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <span className="text-xs text-[#D4AF37] font-semibold">Novo Cadastro</span>
              </div>

              <h2 className="text-lg font-bold text-white mb-1">Crie sua Conta</h2>
              <p className="text-[11px] text-slate-400 mb-4">Escolha seu tipo de perfil inicial:</p>

              <form onSubmit={handleRegister} className="space-y-3">
                <div className="bg-[#072946]/90 p-3.5 rounded-2xl border border-[#1C3E60] space-y-2.5">
                  <div>
                    <label className="text-[11px] text-slate-300">Nome ou Apelido</label>
                    <input
                      type="text"
                      placeholder="Ex: Lucas Rocha"
                      value={regName}
                      onChange={e => setRegName(e.target.value)}
                      className="w-full mt-0.5 px-3 py-1.5 bg-[#0B1B2B] border border-[#1C3E60] rounded-lg text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-300">@usuário (único)</label>
                    <input
                      type="text"
                      placeholder="Ex: valkyrie_br"
                      value={regUsername}
                      onChange={e => setRegUsername(e.target.value)}
                      className="w-full mt-0.5 px-3 py-1.5 bg-[#0B1B2B] border border-[#1C3E60] rounded-lg text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-300">E-mail</label>
                    <input
                      type="email"
                      placeholder="gamer@odysplay.com"
                      value={regEmail}
                      onChange={e => setRegEmail(e.target.value)}
                      className="w-full mt-0.5 px-3 py-1.5 bg-[#0B1B2B] border border-[#1C3E60] rounded-lg text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-300">Senha (mínimo 6 dígitos)</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={regPassword}
                      onChange={e => setRegPassword(e.target.value)}
                      className="w-full mt-0.5 px-3 py-1.5 bg-[#0B1B2B] border border-[#1C3E60] rounded-lg text-xs text-white"
                    />
                  </div>
                </div>

                {/* Profile selection cards as mandated */}
                <div className="space-y-2 pt-1">
                  <p className="text-[11px] font-semibold text-[#D4AF37]">Selecione o Pilar de Atuação:</p>

                  <div
                    onClick={() => setRegType('GAMER')}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      regType === 'GAMER'
                        ? 'bg-[#122C45] border-[#4DDDE0] shadow-[0_0_12px_rgba(77,221,224,0.2)]'
                        : 'bg-[#072946]/70 border-[#1C3E60]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#4DDDE0] flex items-center gap-1.5">
                        <Gamepad2 className="w-4 h-4" /> GAMER
                      </span>
                      <input type="radio" checked={regType === 'GAMER'} readOnly className="accent-[#4DDDE0]" />
                    </div>
                    <p className="text-[10px] text-slate-300 mt-1">
                      Para jogadores: participe de guildas, acompanhe lançamentos, comente e interaja.
                    </p>
                  </div>

                  <div
                    onClick={() => setRegType('DEV')}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      regType === 'DEV'
                        ? 'bg-[#122C45] border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                        : 'bg-[#072946]/70 border-[#1C3E60]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#D4AF37] flex items-center gap-1.5">
                        <Code2 className="w-4 h-4" /> DESENVOLVEDOR (DEV)
                      </span>
                      <input type="radio" checked={regType === 'DEV'} readOnly className="accent-[#D4AF37]" />
                    </div>
                    <p className="text-[10px] text-slate-300 mt-1">
                      Para criadores indie: cadastre jogos, monte portfólio, recrute membros e divulgue projetos.
                    </p>
                  </div>

                  <div
                    onClick={() => setRegType('EMPRESA')}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      regType === 'EMPRESA'
                        ? 'bg-[#122C45] border-[#00D9C0] shadow-[0_0_12px_rgba(0,217,192,0.2)]'
                        : 'bg-[#072946]/70 border-[#1C3E60]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#00D9C0] flex items-center gap-1.5">
                        <Building2 className="w-4 h-4" /> ESTÚDIO / EMPRESA
                      </span>
                      <input type="radio" checked={regType === 'EMPRESA'} readOnly className="accent-[#00D9C0]" />
                    </div>
                    <p className="text-[10px] text-slate-300 mt-1">
                      Para estúdios e editoras: organize Game Jams, divulgue vagas e encontre talentos.
                    </p>
                  </div>
                </div>

                {regError && (
                  <p className="text-[11px] text-[#AF0000]">{regError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#D4AF37] text-[#072946] font-bold text-xs rounded-xl shadow mt-2"
                >
                  Concluir Cadastro
                </button>
              </form>
            </div>
          )}

          {/* ============================================================ */}
          {/* 4. SCREEN: MAIN HUB (WITH BOTTOM NAVIGATION) */}
          {/* ============================================================ */}
          {currentScreen === 'main' && (
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              
              {/* TOP APP BAR */}
              <div className="h-13 bg-[#072946] border-b border-[#1C3E60] px-4 flex items-center justify-between shrink-0 shadow-md">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-[#122C45] border border-[#D4AF37] flex items-center justify-center">
                    <Gamepad2 className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <span className="font-gaming font-extrabold text-base text-[#D4AF37] tracking-wider">ODYSPLAY</span>
                  
                  {/* Active Profile Switcher Chip */}
                  <button
                    onClick={() => setShowProfileSwitcher(true)}
                    className="flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#122C45] border border-[#4DDDE0] text-[#4DDDE0] hover:bg-[#4DDDE0]/20 transition"
                  >
                    <span>
                      {activeProfile.profileType === 'GAMER' ? '🎮' : activeProfile.profileType === 'DEV' ? '🛠️' : '🏢'}
                    </span>
                    <span className="uppercase">{activeProfile.profileType}</span>
                    <span className="text-[9px] text-[#D4AF37]">▼</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowNotifications(true)}
                    className="relative p-1.5 text-[#D4AF37] hover:text-white transition"
                    title="Notificações"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadNotifsCount > 0 && (
                      <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#AF0000] text-white text-[9px] font-extrabold flex items-center justify-center">
                        {unreadNotifsCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* TAB CONTENT CONTAINER */}
              <div className="flex-1 overflow-y-auto">

                {/* -------------------- TAB: FEED -------------------- */}
                {currentTab === 'feed' && !selectedPostId && (
                  <div className="p-3.5 space-y-3">
                    {/* Welcome banner depending on active role */}
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-[#122C45] to-[#072946] border border-[#1C3E60] flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-[#4DDDE0] font-medium">Logado como {activeProfile.displayName}</p>
                        <p className="text-xs font-bold text-white">Feed da Comunidade Gamer</p>
                      </div>
                      {activeProfile.profileType === 'DEV' && (
                        <button
                          onClick={() => setShowNewProjectModal(true)}
                          className="px-2.5 py-1 bg-[#D4AF37] text-[#072946] font-bold text-[10px] rounded-lg flex items-center gap-1 shadow"
                        >
                          <PlusCircle className="w-3.5 h-3.5" /> Novo Projeto
                        </button>
                      )}
                      {activeProfile.profileType === 'EMPRESA' && (
                        <button
                          onClick={() => setShowNewGameJamModal(true)}
                          className="px-2.5 py-1 bg-[#D4AF37] text-[#072946] font-bold text-[10px] rounded-lg flex items-center gap-1 shadow"
                        >
                          <Trophy className="w-3.5 h-3.5" /> Nova Jam
                        </button>
                      )}
                    </div>

                    {/* Posts List */}
                    {posts.map(post => (
                      <div
                        key={post.id}
                        className="bg-[#072946]/80 rounded-2xl border border-[#1C3E60] p-3.5 hover:border-[#4DDDE0]/40 transition space-y-2.5 shadow-sm"
                      >
                        {/* Author info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#122C45] border border-[#4DDDE0] flex items-center justify-center font-bold text-xs text-[#D4AF37]">
                              {post.authorName.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center space-x-1.5">
                                <span className="font-bold text-xs text-white">{post.authorName}</span>
                                <span className="text-[9px] px-1.5 py-0.2 rounded font-bold uppercase bg-[#122C45] text-[#4DDDE0] border border-[#1C3E60]">
                                  {post.authorRole}
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-400">@{post.authorUsername} • Há pouco</span>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setReportingPostId(post.id);
                              setShowReportModal(true);
                            }}
                            className="text-slate-400 hover:text-[#AF0000] p-1"
                            title="Denunciar publicação"
                          >
                            <Flag className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Content */}
                        <p
                          onClick={() => setSelectedPostId(post.id)}
                          className="text-xs text-slate-200 leading-relaxed cursor-pointer hover:text-white"
                        >
                          {post.content}
                        </p>

                        {/* Actions footer */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#1C3E60]/70 text-xs">
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleLikeToggle(post.id)}
                              className={`flex items-center space-x-1 font-bold ${
                                post.isLikedByCurrentUser ? 'text-[#D4AF37]' : 'text-slate-400 hover:text-[#D4AF37]'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${post.isLikedByCurrentUser ? 'fill-[#D4AF37]' : ''}`} />
                              <span>{post.likesCount}</span>
                            </button>

                            <button
                              onClick={() => setSelectedPostId(post.id)}
                              className="flex items-center space-x-1 text-[#4DDDE0] hover:text-white"
                            >
                              <MessageSquare className="w-4 h-4" />
                              <span>{post.comments.length}</span>
                            </button>
                          </div>

                          <button
                            onClick={() => setSelectedPostId(post.id)}
                            className="text-[11px] font-bold text-[#D4AF37] flex items-center hover:underline"
                          >
                            Ver detalhes <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* -------------------- DEDICATED POST DETAIL VIEW -------------------- */}
                {selectedPostId && selectedPost && (
                  <div className="p-3.5 space-y-4">
                    <button
                      onClick={() => setSelectedPostId(null)}
                      className="flex items-center space-x-1 text-xs text-[#D4AF37] font-bold hover:underline mb-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Voltar ao Feed</span>
                    </button>

                    <div className="bg-[#072946] p-4 rounded-2xl border border-[#1C3E60] space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-9 h-9 rounded-full bg-[#122C45] border border-[#4DDDE0] flex items-center justify-center text-sm font-bold text-[#D4AF37]">
                            {selectedPost.authorName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-xs text-white">{selectedPost.authorName}</p>
                            <span className="text-[10px] text-[#4DDDE0] uppercase font-semibold">
                              {selectedPost.authorRole}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setReportingPostId(selectedPost.id);
                            setShowReportModal(true);
                          }}
                          className="text-slate-400 hover:text-[#AF0000]"
                        >
                          <Flag className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-slate-100 leading-relaxed whitespace-pre-line">
                        {selectedPost.content}
                      </p>

                      <div className="flex items-center space-x-4 pt-2 border-t border-[#1C3E60]">
                        <button
                          onClick={() => handleLikeToggle(selectedPost.id)}
                          className={`flex items-center space-x-1 text-xs font-bold ${
                            selectedPost.isLikedByCurrentUser ? 'text-[#D4AF37]' : 'text-slate-300'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${selectedPost.isLikedByCurrentUser ? 'fill-[#D4AF37]' : ''}`} />
                          <span>{selectedPost.likesCount} Curtidas</span>
                        </button>
                        <span className="text-xs text-slate-400">
                          {selectedPost.comments.length} Comentários
                        </span>
                      </div>
                    </div>

                    {/* Comments Thread */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-[#D4AF37]">Comentários da Comunidade</h3>
                      {selectedPost.comments.length === 0 ? (
                        <p className="text-xs text-slate-400 py-4 text-center">Nenhum comentário ainda. Seja o primeiro a responder!</p>
                      ) : (
                        selectedPost.comments.map(c => (
                          <div key={c.id} className="p-2.5 rounded-xl bg-[#072946]/60 border border-[#1C3E60] text-xs space-y-1">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-bold text-[#4DDDE0]">{c.authorName}</span>
                              <span className="text-[9px] text-slate-400">Agora</span>
                            </div>
                            <p className="text-slate-200">{c.content}</p>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Comment Input */}
                    <div className="sticky bottom-1 flex items-center space-x-2 bg-[#072946] p-2 rounded-xl border border-[#1C3E60]">
                      <input
                        type="text"
                        placeholder="Escreva um comentário construtivo..."
                        value={commentInput}
                        onChange={e => setCommentInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleAddComment(selectedPost.id)}
                        className="flex-1 bg-[#0B1B2B] px-3 py-2 rounded-lg text-xs text-white outline-none border border-[#1C3E60] focus:border-[#4DDDE0]"
                      />
                      <button
                        onClick={() => handleAddComment(selectedPost.id)}
                        className="p-2 bg-[#D4AF37] text-[#072946] rounded-lg font-bold hover:bg-[#c39e2d]"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* -------------------- TAB: COMUNIDADES -------------------- */}
                {currentTab === 'communities' && (
                  <div className="p-3.5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-bold text-[#D4AF37]">Comunidades & Guildas</h2>
                      <span className="text-[10px] text-slate-400">{communities.length} ativas</span>
                    </div>

                    {communities.map(comm => (
                      <div key={comm.id} className="bg-[#072946] p-3.5 rounded-2xl border border-[#1C3E60] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-9 h-9 rounded-xl bg-[#122C45] border border-[#4DDDE0] flex items-center justify-center text-[#4DDDE0]">
                              <Gamepad2 className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-bold text-xs text-white">{comm.name}</p>
                              <span className="text-[10px] text-[#4DDDE0]">{comm.membersCount.toLocaleString()} membros • {comm.category}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleToggleCommunity(comm.id)}
                            className={`px-3 py-1 text-xs font-bold rounded-lg border transition ${
                              comm.isMember
                                ? 'bg-[#122C45] text-slate-300 border-[#1C3E60]'
                                : 'bg-[#D4AF37] text-[#072946] border-[#D4AF37]'
                            }`}
                          >
                            {comm.isMember ? 'Participando' : 'Entrar'}
                          </button>
                        </div>
                        <p className="text-xs text-slate-300">{comm.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* -------------------- TAB: NOTÍCIAS -------------------- */}
                {currentTab === 'news' && (
                  <div className="p-3.5 space-y-3">
                    {/* Demo Banner Requirement */}
                    <div className="p-2 rounded-xl bg-[#122C45] border border-[#D4AF37]/50 flex items-center space-x-2 text-[11px] text-[#D4AF37]">
                      <Info className="w-4 h-4 shrink-0 text-[#D4AF37]" />
                      <span>Notícias demonstrativas da Central OdysPlay Gamer.</span>
                    </div>

                    {/* Filter categories */}
                    <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {(['ALL', 'Lançamentos', 'Mercado', 'Hardware', 'Tendências'] as const).map(cat => (
                        <button
                          key={cat}
                          onClick={() => setNewsFilter(cat)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap transition ${
                            newsFilter === cat
                              ? 'bg-[#D4AF37] text-[#072946]'
                              : 'bg-[#072946] text-slate-300 border border-[#1C3E60]'
                          }`}
                        >
                          {cat === 'ALL' ? 'Todas' : cat}
                        </button>
                      ))}
                    </div>

                    {/* News items */}
                    {news
                      .filter(item => newsFilter === 'ALL' || item.category === newsFilter)
                      .map(item => (
                        <div key={item.id} className="bg-[#072946] p-3.5 rounded-2xl border border-[#1C3E60] space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#122C45] text-[#4DDDE0] border border-[#1C3E60]">
                              {item.category}
                            </span>
                            <span className="text-[10px] text-slate-400">{item.date}</span>
                          </div>
                          <h3 className="font-bold text-xs text-white leading-snug">{item.title}</h3>
                          <p className="text-xs text-slate-300 leading-relaxed">{item.summary}</p>
                          <div className="text-[10px] text-[#D4AF37] font-semibold pt-1">
                            Radar Gamer OdysPlay
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {/* -------------------- TAB: EXPLORAR / PESQUISA -------------------- */}
                {currentTab === 'search' && (
                  <div className="p-3.5 space-y-3">
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Buscar devs, jogos, estúdios ou guildas..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-[#072946] border border-[#1C3E60] focus:border-[#D4AF37] rounded-xl text-xs text-white outline-none"
                      />
                    </div>

                    <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {(['ALL', 'DEVS', 'PROJECTS', 'COMPANIES', 'COMMUNITIES'] as const).map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSearchCategory(cat)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${
                            searchCategory === cat
                              ? 'bg-[#4DDDE0] text-[#072946]'
                              : 'bg-[#072946] text-slate-300 border border-[#1C3E60]'
                          }`}
                        >
                          {cat === 'ALL' ? 'Tudo' : cat === 'DEVS' ? 'Devs' : cat === 'PROJECTS' ? 'Jogos' : cat === 'COMPANIES' ? 'Estúdios' : 'Comunidades'}
                        </button>
                      ))}
                    </div>

                    {/* Results list */}
                    <div className="space-y-2">
                      <p className="text-[11px] font-bold text-[#D4AF37]">Destaques Recomendados:</p>

                      {/* Projects Showcase */}
                      {(searchCategory === 'ALL' || searchCategory === 'PROJECTS') &&
                        projects.map(p => (
                          <div key={p.id} className="p-3 bg-[#072946] rounded-xl border border-[#1C3E60] space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-white">🎮 {p.title}</span>
                              <span className="text-[9px] text-[#4DDDE0] bg-[#122C45] px-1.5 py-0.5 rounded border border-[#1C3E60]">
                                {p.genres}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-300">{p.synopsis}</p>
                            <span className="text-[10px] text-[#00D9C0]">{p.hashtags}</span>
                          </div>
                        ))}

                      {/* Game Jams Showcase */}
                      {(searchCategory === 'ALL' || searchCategory === 'COMPANIES') &&
                        gameJams.map(j => (
                          <div key={j.id} className="p-3 bg-[#072946] rounded-xl border border-[#1C3E60] space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-[#D4AF37]">🏆 {j.title}</span>
                              <span className="text-[9px] text-[#00D9C0]">Inscrições Abertas</span>
                            </div>
                            <p className="text-[11px] text-slate-300">Tema: {j.theme}</p>
                            <p className="text-[10px] text-[#4DDDE0]">{j.prizes}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* -------------------- TAB: PERFIL (DYNAMIC BY ROLE) -------------------- */}
                {currentTab === 'profile' && (
                  <div className="p-3.5 space-y-3.5">
                    
                    {/* Header Card */}
                    <div className="bg-[#072946] p-4 rounded-2xl border border-[#1C3E60] space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-14 h-14 rounded-2xl bg-[#122C45] border-2 border-[#D4AF37] flex items-center justify-center font-bold text-xl text-[#D4AF37]">
                          {activeProfile.profileType === 'GAMER' ? '🎮' : activeProfile.profileType === 'DEV' ? '🛠️' : '🏢'}
                        </div>
                        <div className="flex-1">
                          <h2 className="font-bold text-sm text-white">{activeProfile.displayName}</h2>
                          <p className="text-xs text-[#4DDDE0]">@{activeProfile.username}</p>
                          <span className="inline-block mt-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#122C45] text-[#D4AF37] border border-[#D4AF37]/40">
                            Perfil {activeProfile.profileType}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">{activeProfile.bio}</p>

                      {/* Quick Profile Switcher Trigger */}
                      <button
                        onClick={() => setShowProfileSwitcher(true)}
                        className="w-full py-2 bg-[#122C45] border border-[#4DDDE0] text-[#4DDDE0] rounded-xl text-xs font-bold hover:bg-[#4DDDE0]/10 flex items-center justify-center space-x-1.5"
                      >
                        <UserCheck className="w-4 h-4" />
                        <span>Alternar Perfil da Conta (Gamer/Dev/Empresa)</span>
                      </button>
                    </div>

                    {/* DYNAMIC CONTENT FOR GAMER */}
                    {activeProfile.profileType === 'GAMER' && (
                      <div className="space-y-3">
                        <div className="bg-[#072946] p-3.5 rounded-2xl border border-[#1C3E60] space-y-2">
                          <h3 className="text-xs font-bold text-[#D4AF37]">Jogos Favoritos & Interesses</h3>
                          <div className="flex flex-wrap gap-1.5">
                            {activeProfile.interests?.map(g => (
                              <span key={g} className="px-2.5 py-1 bg-[#122C45] border border-[#1C3E60] text-xs text-slate-200 rounded-lg">
                                {g}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="bg-[#072946] p-3.5 rounded-2xl border border-[#1C3E60] space-y-2">
                          <h3 className="text-xs font-bold text-[#4DDDE0]">Comunidades Inscritas</h3>
                          <p className="text-xs text-slate-300">
                            Você participa de {communities.filter(c => c.isMember).length} guildas gamer no OdysPlay.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* DYNAMIC CONTENT FOR DEV */}
                    {activeProfile.profileType === 'DEV' && (
                      <div className="space-y-3">
                        <button
                          onClick={() => setShowNewProjectModal(true)}
                          className="w-full py-2.5 bg-[#D4AF37] text-[#072946] font-bold text-xs rounded-xl shadow flex items-center justify-center space-x-1.5"
                        >
                          <PlusCircle className="w-4 h-4" />
                          <span>Cadastrar Novo Projeto de Jogo</span>
                        </button>

                        <div className="bg-[#072946] p-3.5 rounded-2xl border border-[#1C3E60] space-y-2">
                          <h3 className="text-xs font-bold text-[#D4AF37]">Habilidades & Motores</h3>
                          <div className="flex flex-wrap gap-1.5">
                            {activeProfile.skills?.map(s => (
                              <span key={s} className="px-2 py-0.5 bg-[#122C45] border border-[#D4AF37]/50 text-xs text-[#D4AF37] rounded-md font-medium">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-xs font-bold text-white">Meus Projetos Cadastrados</h3>
                          {projects.map(proj => (
                            <div key={proj.id} className="p-3 bg-[#072946] rounded-xl border border-[#1C3E60] space-y-1">
                              <span className="font-bold text-xs text-white">🎮 {proj.title}</span>
                              <p className="text-[11px] text-slate-300">{proj.synopsis}</p>
                              <div className="flex items-center justify-between text-[10px] text-[#4DDDE0] pt-1">
                                <span>{proj.genres}</span>
                                <span>{proj.hashtags}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* DYNAMIC CONTENT FOR EMPRESA */}
                    {activeProfile.profileType === 'EMPRESA' && (
                      <div className="space-y-3">
                        <button
                          onClick={() => setShowNewGameJamModal(true)}
                          className="w-full py-2.5 bg-[#D4AF37] text-[#072946] font-bold text-xs rounded-xl shadow flex items-center justify-center space-x-1.5"
                        >
                          <Trophy className="w-4 h-4" />
                          <span>Organizar Nova Game Jam</span>
                        </button>

                        <div className="bg-[#072946] p-3.5 rounded-2xl border border-[#1C3E60] space-y-2">
                          <h3 className="text-xs font-bold text-[#00D9C0]">Website Oficial</h3>
                          <p className="text-xs text-[#4DDDE0] flex items-center space-x-1">
                            <span>{activeProfile.companyWebsite}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-xs font-bold text-white">Game Jams Criadas pelo Estúdio</h3>
                          {gameJams.map(jam => (
                            <div key={jam.id} className="p-3 bg-[#072946] rounded-xl border border-[#1C3E60] space-y-1">
                              <span className="font-bold text-xs text-[#D4AF37]">🏆 {jam.title}</span>
                              <p className="text-[11px] text-slate-300">Tema: {jam.theme}</p>
                              <p className="text-[10px] text-[#00D9C0]">Prêmios: {jam.prizes}</p>
                              <p className="text-[10px] text-slate-400">Inscrições até: {jam.registrationDeadline}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Logout button */}
                    <button
                      onClick={() => setCurrentScreen('login')}
                      className="w-full py-2 border border-[#AF0000]/60 text-[#AF0000] text-xs font-bold rounded-xl hover:bg-red-950/20"
                    >
                      Sair da Conta
                    </button>
                  </div>
                )}
              </div>

              {/* BOTTOM NAVIGATION BAR */}
              <div className="h-14 bg-[#072946] border-t border-[#1C3E60] grid grid-cols-5 items-center px-1 shrink-0">
                <button
                  onClick={() => {
                    setCurrentTab('feed');
                    setSelectedPostId(null);
                  }}
                  className={`flex flex-col items-center justify-center py-1 transition ${
                    currentTab === 'feed' ? 'text-[#D4AF37]' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Gamepad2 className="w-5 h-5" />
                  <span className="text-[10px] mt-0.5 font-medium">Feed</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentTab('communities');
                    setSelectedPostId(null);
                  }}
                  className={`flex flex-col items-center justify-center py-1 transition ${
                    currentTab === 'communities' ? 'text-[#D4AF37]' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Share2 className="w-5 h-5" />
                  <span className="text-[10px] mt-0.5 font-medium">Guildas</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentTab('news');
                    setSelectedPostId(null);
                  }}
                  className={`flex flex-col items-center justify-center py-1 transition ${
                    currentTab === 'news' ? 'text-[#D4AF37]' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Info className="w-5 h-5" />
                  <span className="text-[10px] mt-0.5 font-medium">Notícias</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentTab('search');
                    setSelectedPostId(null);
                  }}
                  className={`flex flex-col items-center justify-center py-1 transition ${
                    currentTab === 'search' ? 'text-[#D4AF37]' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Search className="w-5 h-5" />
                  <span className="text-[10px] mt-0.5 font-medium">Explorar</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentTab('profile');
                    setSelectedPostId(null);
                  }}
                  className={`flex flex-col items-center justify-center py-1 transition ${
                    currentTab === 'profile' ? 'text-[#D4AF37]' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <UserCheck className="w-5 h-5" />
                  <span className="text-[10px] mt-0.5 font-medium">Perfil</span>
                </button>
              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* MODAL: PROFILE SWITCHER (4.12 Múltiplos Perfis) */}
          {/* ============================================================ */}
          {showProfileSwitcher && (
            <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
              <div className="w-full bg-[#072946] border border-[#D4AF37] rounded-3xl p-4.5 space-y-3.5 shadow-2xl">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#D4AF37]">Alternar Perfil Ativo</h3>
                  <button onClick={() => setShowProfileSwitcher(false)} className="text-slate-400 text-xs">✕</button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Sua conta OdysPlay permite alternar livremente entre suas personas sem deslogar:
                </p>

                <div className="space-y-2">
                  {profiles.map(p => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setActiveProfileId(p.id);
                        setShowProfileSwitcher(false);
                        showToast(`Perfil alterado para ${p.profileType}!`);
                      }}
                      className={`p-3 rounded-xl border cursor-pointer transition flex items-center space-x-3 ${
                        p.id === activeProfileId
                          ? 'bg-[#122C45] border-[#4DDDE0]'
                          : 'bg-[#0B1B2B] border-[#1C3E60] hover:border-[#D4AF37]'
                      }`}
                    >
                      <div className="text-xl">
                        {p.profileType === 'GAMER' ? '🎮' : p.profileType === 'DEV' ? '🛠️' : '🏢'}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-white">{p.displayName}</p>
                        <p className="text-[10px] text-slate-400">Modo {p.profileType}</p>
                      </div>
                      {p.id === activeProfileId && (
                        <CheckCircle2 className="w-4 h-4 text-[#4DDDE0]" />
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowProfileSwitcher(false)}
                  className="w-full py-2 bg-[#122C45] text-slate-300 text-xs rounded-xl font-semibold"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* MODAL: NOTIFICATIONS (Categorized by Verde, Vermelho, Amarelo, Dourado) */}
          {/* ============================================================ */}
          {showNotifications && (
            <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
              <div className="w-full h-[520px] bg-[#072946] border border-[#1C3E60] rounded-3xl p-4 flex flex-col shadow-2xl">
                <div className="flex items-center justify-between pb-2 border-b border-[#1C3E60]">
                  <h3 className="font-bold text-sm text-[#D4AF37]">Central de Notificações</h3>
                  <button onClick={() => setShowNotifications(false)} className="text-slate-400 text-xs">✕</button>
                </div>

                {/* Severity Filter Chips */}
                <div className="flex items-center space-x-1.5 overflow-x-auto py-2 scrollbar-none">
                  {(['ALL', 'SUCESSO', 'AVISO', 'GERAL', 'ERRO'] as const).map(sev => (
                    <button
                      key={sev}
                      onClick={() => setNotifFilter(sev)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${
                        notifFilter === sev
                          ? 'bg-[#D4AF37] text-[#072946]'
                          : 'bg-[#122C45] text-slate-300'
                      }`}
                    >
                      {sev === 'ALL' ? 'Todas' : sev === 'SUCESSO' ? '🟢 Sucesso' : sev === 'AVISO' ? '🟡 Avisos' : sev === 'GERAL' ? '🟡 Geral' : '🔴 Erros'}
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 py-2">
                  {notifications
                    .filter(n => notifFilter === 'ALL' || n.severity === notifFilter)
                    .map(notif => (
                      <div
                        key={notif.id}
                        className="p-3 bg-[#0B1B2B] rounded-xl border border-[#1C3E60] space-y-1 relative pl-4"
                      >
                        {/* Colored indicator bar */}
                        <div
                          className="absolute left-1.5 top-3 bottom-3 w-1 rounded-full"
                          style={{
                            backgroundColor:
                              notif.severity === 'SUCESSO'
                                ? '#00D9C0'
                                : notif.severity === 'AVISO'
                                ? '#EAB308'
                                : notif.severity === 'ERRO'
                                ? '#AF0000'
                                : '#D4AF37'
                          }}
                        />
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-white">{notif.title}</span>
                          <span className="text-[9px] text-slate-400">Recente</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-snug">{notif.message}</p>
                      </div>
                    ))}
                </div>

                <button
                  onClick={() => {
                    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
                    setShowNotifications(false);
                    showToast('Todas as notificações foram lidas.');
                  }}
                  className="w-full py-2 bg-[#122C45] text-[#D4AF37] text-xs font-bold rounded-xl"
                >
                  Marcar Todas como Lidas
                </button>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* MODAL: NOVO PROJETO (DEV FEATURE) */}
          {/* ============================================================ */}
          {showNewProjectModal && (
            <div className="absolute inset-0 z-50 bg-black/85 flex items-center justify-center p-3.5">
              <div className="w-full max-h-[580px] bg-[#072946] border border-[#D4AF37] rounded-3xl p-4 overflow-y-auto space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#D4AF37]">Novo Projeto de Jogo (Dev)</h3>
                  <button onClick={() => setShowNewProjectModal(false)} className="text-slate-400 text-xs">✕</button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Preencha as informações do seu jogo para cadastrá-lo no portfólio e divulgá-lo na comunidade:
                </p>

                <form onSubmit={handleCreateProject} className="space-y-2.5 text-xs">
                  <div>
                    <label className="text-slate-300 font-semibold">1. Nome do Jogo *</label>
                    <input
                      type="text"
                      placeholder="Ex: Chrono Blade"
                      value={newProjTitle}
                      onChange={e => setNewProjTitle(e.target.value)}
                      className="w-full mt-1 p-2 bg-[#0B1B2B] border border-[#1C3E60] rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold">2. Sinopse da História & Gameplay *</label>
                    <textarea
                      rows={3}
                      placeholder="Descreva a premissa, mecânicas inovadoras e público-alvo..."
                      value={newProjSynopsis}
                      onChange={e => setNewProjSynopsis(e.target.value)}
                      className="w-full mt-1 p-2 bg-[#0B1B2B] border border-[#1C3E60] rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold">3. Gêneros *</label>
                    <input
                      type="text"
                      placeholder="Ex: Roguelike, Ação 2D, Metroidvania"
                      value={newProjGenres}
                      onChange={e => setNewProjGenres(e.target.value)}
                      className="w-full mt-1 p-2 bg-[#0B1B2B] border border-[#1C3E60] rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold">4. Hashtags Relacionadas</label>
                    <input
                      type="text"
                      placeholder="Ex: #indiedev #unity #pixelart"
                      value={newProjHashtags}
                      onChange={e => setNewProjHashtags(e.target.value)}
                      className="w-full mt-1 p-2 bg-[#0B1B2B] border border-[#1C3E60] rounded-lg text-white"
                    />
                  </div>

                  {projError && <p className="text-[11px] text-[#AF0000]">{projError}</p>}

                  <div className="pt-2 flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowNewProjectModal(false)}
                      className="flex-1 py-2 bg-[#122C45] text-slate-300 rounded-xl"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-[#D4AF37] text-[#072946] font-bold rounded-xl"
                    >
                      Publicar Projeto
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* MODAL: NOVA GAME JAM (EMPRESA FEATURE) */}
          {/* ============================================================ */}
          {showNewGameJamModal && (
            <div className="absolute inset-0 z-50 bg-black/85 flex items-center justify-center p-3.5">
              <div className="w-full max-h-[600px] bg-[#072946] border border-[#00D9C0] rounded-3xl p-4 overflow-y-auto space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#00D9C0]">Nova Game Jam (Estúdio)</h3>
                  <button onClick={() => setShowNewGameJamModal(false)} className="text-slate-400 text-xs">✕</button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Organize uma maratona oficial para descobrir os melhores desenvolvedores do Brasil:
                </p>

                <form onSubmit={handleCreateGameJam} className="space-y-2 text-xs">
                  <div>
                    <label className="text-slate-300 font-semibold">1. Nome da Game Jam *</label>
                    <input
                      type="text"
                      placeholder="Ex: OdysJam Brasil 2026"
                      value={newJamTitle}
                      onChange={e => setNewJamTitle(e.target.value)}
                      className="w-full mt-1 p-1.5 bg-[#0B1B2B] border border-[#1C3E60] rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold">2. Tema da Jam *</label>
                    <input
                      type="text"
                      placeholder="Ex: Reversão Temporal"
                      value={newJamTheme}
                      onChange={e => setNewJamTheme(e.target.value)}
                      className="w-full mt-1 p-1.5 bg-[#0B1B2B] border border-[#1C3E60] rounded-lg text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-300 font-semibold">3. Máx. Participantes</label>
                      <input
                        type="number"
                        value={newJamMax}
                        onChange={e => setNewJamMax(e.target.value)}
                        className="w-full mt-1 p-1.5 bg-[#0B1B2B] border border-[#1C3E60] rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold">4. Prêmios *</label>
                      <input
                        type="text"
                        placeholder="Ex: R$ 10.000 + Mentoria"
                        value={newJamPrizes}
                        onChange={e => setNewJamPrizes(e.target.value)}
                        className="w-full mt-1 p-1.5 bg-[#0B1B2B] border border-[#1C3E60] rounded-lg text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-300 font-semibold">5. Fim Inscrições</label>
                      <input
                        type="date"
                        value={newJamDeadline}
                        onChange={e => setNewJamDeadline(e.target.value)}
                        className="w-full mt-1 p-1.5 bg-[#0B1B2B] border border-[#1C3E60] rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold">6. Anúncio Vencedores</label>
                      <input
                        type="date"
                        value={newJamWinnersDate}
                        onChange={e => setNewJamWinnersDate(e.target.value)}
                        className="w-full mt-1 p-1.5 bg-[#0B1B2B] border border-[#1C3E60] rounded-lg text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold">7. Regras da Competição</label>
                    <textarea
                      rows={2}
                      placeholder="Regras de envio, motores permitidos e critérios de avaliação..."
                      value={newJamRules}
                      onChange={e => setNewJamRules(e.target.value)}
                      className="w-full mt-1 p-1.5 bg-[#0B1B2B] border border-[#1C3E60] rounded-lg text-white"
                    />
                  </div>

                  {jamError && <p className="text-[11px] text-[#AF0000]">{jamError}</p>}

                  <div className="pt-2 flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowNewGameJamModal(false)}
                      className="flex-1 py-2 bg-[#122C45] text-slate-300 rounded-xl"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-[#D4AF37] text-[#072946] font-bold rounded-xl"
                    >
                      Lançar Game Jam
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* MODAL: MODERATION & REPORT (8. Moderação) */}
          {/* ============================================================ */}
          {showReportModal && (
            <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
              <div className="w-full bg-[#072946] border border-[#AF0000] rounded-3xl p-4 space-y-3 shadow-2xl">
                <div className="flex items-center space-x-2 text-[#AF0000]">
                  <Flag className="w-4 h-4" />
                  <h3 className="font-bold text-sm">Denunciar Conteúdo</h3>
                </div>
                <p className="text-[11px] text-slate-300">
                  Ajude a manter a comunidade OdysPlay livre de assédio, toxicidade ou spam.
                </p>

                <textarea
                  rows={3}
                  placeholder="Explique o motivo da denúncia..."
                  value={reportReason}
                  onChange={e => setReportReason(e.target.value)}
                  className="w-full p-2 bg-[#0B1B2B] border border-[#1C3E60] rounded-xl text-xs text-white"
                />

                <div className="flex items-center space-x-2 text-xs">
                  <button
                    onClick={() => {
                      setShowReportModal(false);
                      setReportingPostId(null);
                    }}
                    className="flex-1 py-2 bg-[#122C45] text-slate-300 rounded-xl"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleReportSubmit}
                    className="flex-1 py-2 bg-[#AF0000] text-white font-bold rounded-xl"
                  >
                    Enviar Denúncia
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Android Virtual Bottom Navigation Bar Pill */}
        <div className="w-full h-5 flex justify-center items-center bg-[#072946]">
          <div className="w-28 h-1 bg-slate-500/50 rounded-full" />
        </div>

      </div>
    </div>
  );
};
