# OdysPlay — Projeto Android Studio Nativo (Java)

Bem-vindo ao repositório nativo do **OdysPlay**, a plataforma de comunidade gamer brasileira que conecta **Gamers**, **Devs** e **Empresas**.

---

## 📁 Estrutura do Projeto

```
android/
├── build.gradle                   # Gradle raiz com repositórios Google e MavenCentral
├── settings.gradle                # Inclusão do módulo ':app'
├── gradle.properties              # JVM args e compatibilidade AndroidX
├── supabase/
│   └── schema.sql                 # Esquema SQL com RLS pronto para rodar no Supabase
└── app/
    ├── build.gradle               # Dependências AndroidX, Material, Retrofit, Glide, ViewModel
    └── src/main/
        ├── AndroidManifest.xml    # Declaração das Activities, temas e permissões
        ├── java/com/odysplay/
        │   ├── OdysPlayApplication.java
        │   ├── data/
        │   │   ├── model/         # User, UserProfile, ProfileType, Post, Comment, News, etc.
        │   │   ├── remote/        # SupabaseConfig, SupabaseApiService
        │   │   └── repository/    # OdysPlayRepository, DemoDataRepository
        │   └── ui/
        │       ├── splash/        # SplashActivity (abertura com branding cósmico)
        │       ├── auth/          # LoginActivity, RegisterActivity (escolha de Gamer, Dev, Empresa)
        │       ├── main/          # MainActivity (barra inferior: Feed, Comunidades, Notícias, Pesquisa, Perfil)
        │       ├── post/          # PostDetailActivity, PostAdapter, CommentAdapter
        │       ├── dev/           # NewProjectActivity (cadastro de projetos com validação)
        │       ├── company/       # NewGameJamActivity (criação de Game Jams com regras e prazos)
        │       └── notifications/ # NotificationsActivity, NotificationAdapter (cores Verde/Amarelo/Dourado/Vermelho)
        └── res/
            ├── values/            # colors.xml (#122C45, #D4AF37, etc.), strings.xml, themes.xml
            ├── drawable/          # Ícone de vetor OdysPlay, backgrounds degradê e cards metálicos
            ├── menu/              # bottom_nav_menu.xml
            └── layout/            # Layouts XML nativos para todas as telas e itens de lista
```

---

## 🚀 Como Abrir e Executar no Android Studio

### 1. Pré-requisitos
- **Android Studio** (Flamingo, Hedgehog, Iguana, Jellyfish ou superior).
- **JDK 17** (padrão em versões modernas do Android Studio).
- **Android SDK** com suporte a API 24 a 34.

### 2. Passo a Passo para Abrir
1. Abra o Android Studio.
2. Selecione **File > Open...** (ou "Open" na tela de boas-vindas).
3. Navegue até a pasta `android` deste projeto e clique em **OK**.
4. Aguarde a sincronização do Gradle (**Gradle Sync**). O Android Studio baixará automaticamente as dependências declaradas no `app/build.gradle`.

### 3. Executando no Emulador ou Celular Físico
- **No Emulador:** Crie um AVD (ex: Pixel 7 rodando Android 14 / API 34) no *Device Manager* e clique no botão verde de **Run** (Shift + F10).
- **No Celular Físico:** Ative as *Opções do Desenvolvedor* no aparelho, ative a *Depuração USB*, conecte via cabo e clique em **Run**.

---

## 🗄️ Integração com Supabase (Opcional)

O aplicativo funciona imediatamente em **Modo Demonstração** de fábrica com dados ricos de teste (Gamers, Devs e Estúdios) caso o backend não esteja configurado.

Para conectar seu próprio banco de dados Supabase:
1. Crie um projeto gratuito em [supabase.com](https://supabase.com).
2. Acesse o **SQL Editor** do Supabase e execute todo o conteúdo de `supabase/schema.sql`.
3. Abra o arquivo `android/app/src/main/java/com/odysplay/data/remote/SupabaseConfig.java`.
4. Substitua as constantes `SUPABASE_URL` e `SUPABASE_ANON_KEY` com os valores da sua aba **Project Settings > API**.
5. O aplicativo detectará automaticamente as chaves e sincronizará diretamente com o banco de dados Postgres!

---

## 🎮 Paleta Visual Oficial
- **Azul Cósmico:** `#122C45` (Fundo imersivo principal)
- **Dourado Nobre:** `#D4AF37` (Marca, troféus, botões e destaques)
- **Esmeralda Ciano:** `#4DDDE0` (Foco, conectividade e presença)
- **Azul Metálico:** `#072946` (Cards, bordas e divisórias)
- **Turquesa:** `#00D9C0` (Confirmações e notificações de sucesso)
- **Vermelho:** `#AF0000` (Alertas e moderação)
