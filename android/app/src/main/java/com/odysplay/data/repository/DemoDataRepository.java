package com.odysplay.data.repository;

import com.odysplay.data.model.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Isolated demo data provider for testing without an active Supabase backend.
 * Provides realistic data for Gamers, Devs, and Game Studios.
 */
public class DemoDataRepository {

    public static List<UserProfile> getDemoProfiles() {
        List<UserProfile> list = new ArrayList<>();

        // 1. Gamer Profile
        UserProfile gamer = new UserProfile(
                "p_gamer_1",
                "usr_lucas",
                "Lucas 'Valkyrie' Rocha",
                "valkyrie_br",
                "Gamer competitivo de Roguelikes e entusiasta de Soulslike e indies brasileiros. Sempre em busca de desafios!",
                ProfileType.GAMER
        );
        gamer.getInterests().add("Hollow Knight");
        gamer.getInterests().add("Elden Ring");
        gamer.getInterests().add("Dead Cells");
        list.add(gamer);

        // 2. Dev Profile
        UserProfile dev = new UserProfile(
                "p_dev_1",
                "usr_lucas",
                "Renata Souza (PixelForge)",
                "renata_indiedev",
                "Desenvolvedora Unity & Godot. Especialista em pixel art 2D e shaders HLSL. Criando o jogo 'Chrono Blade'.",
                ProfileType.DEV
        );
        dev.getSkills().add("C# / Unity");
        dev.getSkills().add("Godot Engine");
        dev.getSkills().add("Pixel Art / Aseprite");
        dev.getSkills().add("Level Design");
        list.add(dev);

        // 3. Empresa Profile
        UserProfile empresa = new UserProfile(
                "p_empresa_1",
                "usr_lucas",
                "Nebula Interactive Studios",
                "nebulagames_br",
                "Estúdio indie brasileiro com sede em São Paulo e Florianópolis. Desenvolvemos jogos de ação e organizamos Game Jams anuais.",
                ProfileType.EMPRESA
        );
        empresa.setCompanyWebsite("https://nebulagames.example.br");
        list.add(empresa);

        return list;
    }

    public static List<Post> getDemoPosts() {
        List<Post> posts = new ArrayList<>();

        // Post 1: Dev showcasing a gameplay teaser
        Post p1 = new Post(
                "post_1",
                "p_dev_1",
                "Renata Souza (PixelForge)",
                "renata_indiedev",
                ProfileType.DEV,
                "⚔️ Acabamos de finalizar o novo sistema de esquiva fluida e parry rítmico em 'Chrono Blade'! O que acharam do impacto sonoro e do flash de faíscas em pixel art?",
                System.currentTimeMillis() - 1000 * 60 * 45 // 45 min ago
        );
        p1.setLikesCount(24);
        p1.setLikedByCurrentUser(true);
        p1.getComments().add(new Comment("c1", "post_1", "p_gamer_1", "Lucas 'Valkyrie' Rocha", ProfileType.GAMER, "Ficou sensacional! O timing do contra-ataque parece super responsivo, lembra muito Dead Cells.", System.currentTimeMillis() - 1000 * 60 * 20));
        p1.getComments().add(new Comment("c2", "post_1", "p_empresa_1", "Nebula Interactive Studios", ProfileType.EMPRESA, "Parabéns Renata! Adoraríamos ver esse projeto inscrito na OdysJam de Inverno.", System.currentTimeMillis() - 1000 * 60 * 10));
        posts.add(p1);

        // Post 2: Studio announcing Game Jam
        Post p2 = new Post(
                "post_2",
                "p_empresa_1",
                "Nebula Interactive Studios",
                "nebulagames_br",
                ProfileType.EMPRESA,
                "🚀 INSCRIÇÕES ABERTAS para a OdysJam Brasil 2026! 48 horas de desenvolvimento frenético, tema misterioso e premiação de R$ 10.000 + mentoria para os 3 primeiros colocados. Monte sua equipe!",
                System.currentTimeMillis() - 1000 * 60 * 60 * 3
        );
        p2.setLikesCount(89);
        p2.getComments().add(new Comment("c3", "post_2", "p_dev_1", "Renata Souza (PixelForge)", ProfileType.DEV, "Estou procurando animador 2D para formar time nessa Jam! Quem tiver interesse me manda mensagem.", System.currentTimeMillis() - 1000 * 60 * 60 * 2));
        posts.add(p2);

        // Post 3: Gamer community recommendation
        Post p3 = new Post(
                "post_3",
                "p_gamer_1",
                "Lucas 'Valkyrie' Rocha",
                "valkyrie_br",
                ProfileType.GAMER,
                "Acabei de zerar o jogo nacional 'Enigma do Medo'. O trabalho de dublagem e direção de arte brasileira está num nível inacreditável. Mais alguém aqui jogou?",
                System.currentTimeMillis() - 1000 * 60 * 60 * 8
        );
        p3.setLikesCount(42);
        posts.add(p3);

        return posts;
    }

    public static List<News> getDemoNews() {
        List<News> news = new ArrayList<>();
        news.add(new News(
                "n1",
                "Brasil Game Show confirma recorde de estúdios independentes nacionais",
                "A feira anunciou uma expansão de 40% na Avenida Indie, com mais de 80 estúdios brasileiros demonstrando projetos ao público e investidores.",
                "Mercado",
                "Hoje",
                true
        ));
        news.add(new News(
                "n2",
                "Novo processador gráfico móvel promete Ray Tracing eficiente em celulares",
                "Arquitetura de 3nm foca em redução térmica e renderização de iluminação global realista sem drenar bateria excessiva.",
                "Hardware",
                "Ontem",
                true
        ));
        news.add(new News(
                "n3",
                "Chrono Blade Demo ganha data oficial de teste na Steam",
                "Roguelike de ação 2D criado por desenvolvedores brasileiros entra em fase beta aberta para a comunidade gamer.",
                "Lançamentos",
                "14 Out",
                true
        ));
        return news;
    }

    public static List<Community> getDemoCommunities() {
        List<Community> communities = new ArrayList<>();
        communities.add(new Community("comm_1", "Indie Game Devs BR", "O maior ponto de encontro para programadores, artistas e game designers do Brasil.", 4250, true, "Desenvolvimento"));
        communities.add(new Community("comm_2", "Roguelike & Soulslike Brasil", "Comunidade focada em gameplay hardcore, builds, speedruns e lore profunda.", 8120, false, "Gamers"));
        communities.add(new Community("comm_3", "Pixel Art & Shaders Lab", "Espaço de troca de spritesheets, tutoriais de paletas e iluminação dinâmica.", 2940, true, "Arte"));
        communities.add(new Community("comm_4", "Game Jam Brasil Hub", "Equipes, avisos de maratonas, temas e divulgação dos vencedores.", 5130, false, "Competições"));
        return communities;
    }

    public static List<GameProject> getDemoProjects() {
        List<GameProject> projects = new ArrayList<>();
        projects.add(new GameProject(
                "proj_1",
                "p_dev_1",
                "Renata Souza (PixelForge)",
                "Chrono Blade",
                "Um roguelike de ação rápida com combate focado em esquivas perfeitas e manipulação de fluxos temporais.",
                "Ação, Roguelike, Pixel Art 2D",
                "#indiedev #pixelart #unity #roguelike"
        ));
        projects.add(new GameProject(
                "proj_2",
                "p_dev_1",
                "Renata Souza (PixelForge)",
                "Echoes of Neo-Sampa",
                "Aventura cyberpunk point-and-click ambientada numa São Paulo futurista e chuvosa de 2099.",
                "Narrativo, Cyberpunk, Point-and-Click",
                "#cyberpunk #brasil #godot #storyrich"
        ));
        return projects;
    }

    public static List<GameJam> getDemoGameJams() {
        List<GameJam> jams = new ArrayList<>();
        jams.add(new GameJam(
                "jam_1",
                "p_empresa_1",
                "Nebula Interactive Studios",
                "OdysJam Brasil 2026 - Edição Inverno",
                "Reversão Temporal & Efeito Borboleta",
                250,
                "R$ 10.000 em prêmios + Licenças de software + Mentoria",
                "2026-11-20",
                "2026-11-25",
                "Todos os assets devem ser produzidos durante as 48h da maratona. Equipes de 1 a 4 membros."
        ));
        return jams;
    }

    public static List<NotificationItem> getDemoNotifications() {
        List<NotificationItem> items = new ArrayList<>();
        items.add(new NotificationItem("notif_1", "usr_lucas", "Bem-vindo ao OdysPlay!", "Sua conta foi criada com sucesso e seu perfil Gamer está ativo.", NotificationSeverity.SUCESSO, System.currentTimeMillis() - 1000 * 60 * 60));
        items.add(new NotificationItem("notif_2", "usr_lucas", "Inscrição confirmada na OdysJam", "Sua equipe foi cadastrada para a OdysJam Brasil 2026.", NotificationSeverity.AVISO, System.currentTimeMillis() - 1000 * 60 * 40));
        items.add(new NotificationItem("notif_3", "usr_lucas", "Novo comentário no seu post", "Lucas Rocha respondeu à sua publicação sobre Chrono Blade.", NotificationSeverity.GERAL, System.currentTimeMillis() - 1000 * 60 * 20));
        items.add(new NotificationItem("notif_4", "usr_lucas", "Aviso de segurança", "Tentativa de login bloqueada por precaução. Altere sua senha se não foi você.", NotificationSeverity.ERRO, System.currentTimeMillis() - 1000 * 60 * 10));
        return items;
    }
}
