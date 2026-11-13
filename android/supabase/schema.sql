-- ==============================================================================
-- ODYSPLAY - ESQUEMA SUPABASE POSTGRESQL NATIVO COM ROW LEVEL SECURITY (RLS)
-- ==============================================================================

-- 1. TIPOS ENUM
CREATE TYPE profile_type AS ENUM ('GAMER', 'DEV', 'EMPRESA');
CREATE TYPE notification_severity AS ENUM ('SUCESSO', 'ERRO', 'AVISO', 'GERAL');

-- 2. TABELA DE PERFIS DE USUÁRIO (VINCULADA AO auth.users DO SUPABASE)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    profile_type profile_type NOT NULL DEFAULT 'GAMER',
    company_website TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS em perfis
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Perfis públicos são visíveis para todos"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Usuários podem atualizar seus próprios perfis"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir novos perfis"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- 3. TABELA DE COMUNIDADES GAMER
CREATE TABLE IF NOT EXISTS public.communities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Comunidades são públicas para visualização" ON public.communities FOR SELECT USING (true);

-- 4. MEMBROS DA COMUNIDADE
CREATE TABLE IF NOT EXISTS public.community_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    community_id UUID REFERENCES public.communities(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(community_id, profile_id)
);

ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Membros visíveis para todos" ON public.community_members FOR SELECT USING (true);
CREATE POLICY "Usuários podem gerenciar sua participação" ON public.community_members FOR ALL USING (auth.uid() IS NOT NULL);

-- 5. TABELA DE PUBLICAÇÕES (POSTS)
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Posts visíveis para todos" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Autores podem criar posts" ON public.posts FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- 6. TABELA DE CURTIDAS (LIKES)
CREATE TABLE IF NOT EXISTS public.post_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(post_id, profile_id)
);

ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Likes são públicos" ON public.post_likes FOR SELECT USING (true);
CREATE POLICY "Usuários podem curtir posts" ON public.post_likes FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Usuários podem descurtir posts" ON public.post_likes FOR DELETE USING (auth.uid() IS NOT NULL);

-- 7. TABELA DE COMENTÁRIOS
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
    author_profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Comentários visíveis para todos" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Usuários podem comentar" ON public.comments FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- 8. TABELA DE PROJETOS DE JOGOS (DEV)
CREATE TABLE IF NOT EXISTS public.game_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dev_profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    synopsis TEXT NOT NULL,
    genres TEXT NOT NULL,
    hashtags TEXT,
    banner_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.game_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Projetos são públicos" ON public.game_projects FOR SELECT USING (true);
CREATE POLICY "Devs podem cadastrar projetos" ON public.game_projects FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- 9. TABELA DE GAME JAMS (EMPRESA / ESTÚDIO)
CREATE TABLE IF NOT EXISTS public.game_jams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    theme TEXT NOT NULL,
    max_participants INTEGER NOT NULL,
    prizes TEXT NOT NULL,
    registration_deadline DATE NOT NULL,
    winners_announcement_date DATE NOT NULL,
    rules TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.game_jams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Game Jams são públicas" ON public.game_jams FOR SELECT USING (true);
CREATE POLICY "Empresas autenticadas podem criar Game Jams" ON public.game_jams FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- 10. TABELA DE NOTIFICAÇÕES
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    severity notification_severity NOT NULL DEFAULT 'GERAL',
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuários veem suas próprias notificações" ON public.notifications FOR SELECT USING (auth.uid() = user_id);

-- 11. TABELA DE MODERAÇÃO E DENÚNCIAS
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    target_type TEXT NOT NULL, -- 'POST', 'COMMENT', 'PROFILE'
    target_id TEXT NOT NULL,
    reason TEXT NOT NULL,
    status TEXT DEFAULT 'PENDENTE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuários podem submeter denúncias" ON public.reports FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
