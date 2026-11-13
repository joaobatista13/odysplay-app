export type ProfileType = 'GAMER' | 'DEV' | 'EMPRESA';

export interface UserProfile {
  id: string;
  userId: string;
  displayName: string;
  username: string;
  bio: string;
  avatarUrl?: string;
  profileType: ProfileType;
  interests?: string[];
  skills?: string[];
  companyWebsite?: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorRole: ProfileType;
  content: string;
  timestamp: number;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorAvatar?: string;
  authorRole: ProfileType;
  content: string;
  imageUrl?: string;
  timestamp: number;
  likesCount: number;
  isLikedByCurrentUser: boolean;
  comments: Comment[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'Lançamentos' | 'Mercado' | 'Hardware' | 'Tendências';
  imageUrl?: string;
  date: string;
  isDemo: boolean;
}

export type NotificationSeverity = 'SUCESSO' | 'ERRO' | 'AVISO' | 'GERAL';

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  severity: NotificationSeverity;
  timestamp: number;
  isRead: boolean;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  membersCount: number;
  isMember: boolean;
  category: string;
}

export interface GameProject {
  id: string;
  devProfileId: string;
  devName: string;
  title: string;
  synopsis: string;
  genres: string;
  hashtags: string;
  bannerUrl?: string;
  createdAt: number;
}

export interface GameJam {
  id: string;
  companyProfileId: string;
  companyName: string;
  title: string;
  theme: string;
  maxParticipants: number;
  prizes: string;
  registrationDeadline: string;
  winnersDate: string;
  rules: string;
  registeredCount: number;
  createdAt: number;
}

export const INITIAL_PROFILES: UserProfile[] = [
  {
    id: 'p_gamer_1',
    userId: 'usr_1',
    displayName: "Lucas 'Valkyrie' Rocha",
    username: 'valkyrie_br',
    bio: 'Gamer competitivo de Roguelikes e entusiasta de Soulslike e indies brasileiros. Sempre em busca de desafios!',
    profileType: 'GAMER',
    interests: ['Hollow Knight', 'Elden Ring', 'Dead Cells', 'Chrono Blade', 'Celeste']
  },
  {
    id: 'p_dev_1',
    userId: 'usr_1',
    displayName: 'Renata Souza (PixelForge)',
    username: 'renata_indiedev',
    bio: 'Desenvolvedora Unity & Godot. Especialista em pixel art 2D e shaders HLSL. Criando o jogo Chrono Blade.',
    profileType: 'DEV',
    skills: ['C# / Unity', 'Godot Engine', 'Pixel Art / Aseprite', 'HLSL Shaders', 'Level Design']
  },
  {
    id: 'p_empresa_1',
    userId: 'usr_1',
    displayName: 'Nebula Interactive Studios',
    username: 'nebulagames_br',
    bio: 'Estúdio indie brasileiro com sede em São Paulo e Florianópolis. Desenvolvemos jogos de ação e organizamos Game Jams anuais.',
    profileType: 'EMPRESA',
    companyWebsite: 'https://nebulagames.com.br'
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post_1',
    authorId: 'p_dev_1',
    authorName: 'Renata Souza (PixelForge)',
    authorUsername: 'renata_indiedev',
    authorRole: 'DEV',
    content: '⚔️ Acabamos de finalizar o novo sistema de esquiva fluida e contra-ataque rítmico em "Chrono Blade"! O que acharam do impacto sonoro e do flash de faíscas em pixel art?',
    timestamp: Date.now() - 1000 * 60 * 45,
    likesCount: 28,
    isLikedByCurrentUser: true,
    comments: [
      {
        id: 'c1',
        postId: 'post_1',
        authorId: 'p_gamer_1',
        authorName: "Lucas 'Valkyrie' Rocha",
        authorRole: 'GAMER',
        content: 'Ficou sensacional! O timing do contra-ataque parece super responsivo, lembra muito Dead Cells.',
        timestamp: Date.now() - 1000 * 60 * 25
      },
      {
        id: 'c2',
        postId: 'post_1',
        authorId: 'p_empresa_1',
        authorName: 'Nebula Interactive Studios',
        authorRole: 'EMPRESA',
        content: 'Parabéns Renata! Adoraríamos ver esse projeto inscrito na OdysJam de Inverno.',
        timestamp: Date.now() - 1000 * 60 * 12
      }
    ]
  },
  {
    id: 'post_2',
    authorId: 'p_empresa_1',
    authorName: 'Nebula Interactive Studios',
    authorUsername: 'nebulagames_br',
    authorRole: 'EMPRESA',
    content: '🚀 INSCRIÇÕES ABERTAS para a OdysJam Brasil 2026! 48 horas de desenvolvimento frenético, tema misterioso e premiação de R$ 10.000 + mentoria para os 3 primeiros colocados. Monte sua equipe no OdysPlay!',
    timestamp: Date.now() - 1000 * 60 * 60 * 3,
    likesCount: 94,
    isLikedByCurrentUser: false,
    comments: [
      {
        id: 'c3',
        postId: 'post_2',
        authorId: 'p_dev_1',
        authorName: 'Renata Souza (PixelForge)',
        authorRole: 'DEV',
        content: 'Estou procurando animador 2D para formar time nessa Jam! Quem tiver interesse me manda mensagem.',
        timestamp: Date.now() - 1000 * 60 * 60 * 2
      }
    ]
  },
  {
    id: 'post_3',
    authorId: 'p_gamer_1',
    authorName: "Lucas 'Valkyrie' Rocha",
    authorUsername: 'valkyrie_br',
    authorRole: 'GAMER',
    content: 'Acabei de zerar o jogo nacional "Enigma do Medo". O trabalho de dublagem, trilha sonora e direção de arte brasileira está num nível inacreditável. Mais alguém aqui jogou?',
    timestamp: Date.now() - 1000 * 60 * 60 * 8,
    likesCount: 53,
    isLikedByCurrentUser: false,
    comments: []
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Brasil Game Show confirma recorde de estúdios independentes nacionais',
    summary: 'A feira anunciou uma expansão de 40% na Avenida Indie, com mais de 80 estúdios brasileiros demonstrando projetos ao público e investidores.',
    category: 'Mercado',
    date: 'Hoje, 11:30',
    isDemo: true
  },
  {
    id: 'n2',
    title: 'Novo processador gráfico móvel promete Ray Tracing eficiente em celulares',
    summary: 'Arquitetura de 3nm foca em redução térmica e renderização de iluminação global realista sem drenar bateria excessiva durante jogatinas prolongadas.',
    category: 'Hardware',
    date: 'Ontem',
    isDemo: true
  },
  {
    id: 'n3',
    title: 'Chrono Blade Demo ganha data oficial de teste beta na Steam',
    summary: 'Roguelike de ação 2D criado por desenvolvedores brasileiros entra em fase beta aberta para a comunidade gamer testar novas mecânicas temporais.',
    category: 'Lançamentos',
    date: '14 Out',
    isDemo: true
  },
  {
    id: 'n4',
    title: 'Mercado gamer no Brasil cresce 12% impulsionado por jogos mobile e indies',
    summary: 'Pesquisa aponta aumento no número de jogadores que apoiam produções nacionais no PC e consoles.',
    category: 'Tendências',
    date: '12 Out',
    isDemo: true
  }
];

export const INITIAL_COMMUNITIES: Community[] = [
  {
    id: 'comm_1',
    name: 'Indie Game Devs BR',
    description: 'O maior ponto de encontro para programadores, artistas e game designers do Brasil.',
    membersCount: 4250,
    isMember: true,
    category: 'Desenvolvimento'
  },
  {
    id: 'comm_2',
    name: 'Roguelike & Soulslike Brasil',
    description: 'Comunidade focada em gameplay hardcore, builds, speedruns e lore profunda.',
    membersCount: 8120,
    isMember: false,
    category: 'Gamers'
  },
  {
    id: 'comm_3',
    name: 'Pixel Art & Shaders Lab',
    description: 'Espaço de troca de spritesheets, tutoriais de paletas e iluminação dinâmica.',
    membersCount: 2940,
    isMember: true,
    category: 'Arte'
  },
  {
    id: 'comm_4',
    name: 'Game Jam Brasil Hub',
    description: 'Equipes, avisos de maratonas, temas e divulgação dos vencedores.',
    membersCount: 5130,
    isMember: false,
    category: 'Competições'
  }
];

export const INITIAL_PROJECTS: GameProject[] = [
  {
    id: 'proj_1',
    devProfileId: 'p_dev_1',
    devName: 'Renata Souza (PixelForge)',
    title: 'Chrono Blade',
    synopsis: 'Um roguelike de ação rápida com combate focado em esquivas perfeitas e manipulação de fluxos temporais no universo cyberpunk retro.',
    genres: 'Ação, Roguelike, Pixel Art 2D',
    hashtags: '#indiedev #pixelart #unity #roguelike #gamedev',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5
  },
  {
    id: 'proj_2',
    devProfileId: 'p_dev_1',
    devName: 'Renata Souza (PixelForge)',
    title: 'Echoes of Neo-Sampa',
    synopsis: 'Aventura cyberpunk point-and-click investigativa ambientada numa São Paulo futurista e chuvosa de 2099.',
    genres: 'Narrativo, Cyberpunk, Point-and-Click',
    hashtags: '#cyberpunk #brasil #godot #storyrich #indiegame',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14
  }
];

export const INITIAL_GAME_JAMS: GameJam[] = [
  {
    id: 'jam_1',
    companyProfileId: 'p_empresa_1',
    companyName: 'Nebula Interactive Studios',
    title: 'OdysJam Brasil 2026 - Edição Inverno',
    theme: 'Reversão Temporal & Efeito Borboleta',
    maxParticipants: 250,
    prizes: 'R$ 10.000 em prêmios + Licenças Unity Pro + Mentoria Executiva',
    registrationDeadline: '2026-11-20',
    winnersDate: '2026-11-25',
    rules: 'Todos os assets devem ser produzidos durante as 48h da maratona. Equipes de 1 a 4 membros. Motores permitidos: Unity, Godot ou Unreal.',
    registeredCount: 42,
    createdAt: Date.now() - 1000 * 60 * 60 * 48
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    userId: 'usr_1',
    title: 'Bem-vindo ao OdysPlay!',
    message: 'Sua conta foi criada com sucesso e seu perfil Gamer está ativo.',
    severity: 'SUCESSO',
    timestamp: Date.now() - 1000 * 60 * 60,
    isRead: false
  },
  {
    id: 'notif_2',
    userId: 'usr_1',
    title: 'Inscrição confirmada na OdysJam',
    message: 'Sua equipe foi cadastrada para a maratona OdysJam Brasil 2026.',
    severity: 'AVISO',
    timestamp: Date.now() - 1000 * 60 * 35,
    isRead: false
  },
  {
    id: 'notif_3',
    userId: 'usr_1',
    title: 'Novo comentário no seu post',
    message: "Lucas 'Valkyrie' Rocha elogiou o sistema de combate de Chrono Blade.",
    severity: 'GERAL',
    timestamp: Date.now() - 1000 * 60 * 18,
    isRead: true
  },
  {
    id: 'notif_4',
    userId: 'usr_1',
    title: 'Aviso de segurança',
    message: 'Tentativa de login incomum bloqueada por precaução.',
    severity: 'ERRO',
    timestamp: Date.now() - 1000 * 60 * 8,
    isRead: false
  }
];
