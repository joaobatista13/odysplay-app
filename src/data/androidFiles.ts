export interface AndroidFileRecord {
  path: string;
  category: 'gradle' | 'manifest' | 'java' | 'xml' | 'sql' | 'doc';
  description: string;
  content: string;
}

export const ANDROID_PROJECT_FILES: AndroidFileRecord[] = [
  {
    path: 'build.gradle',
    category: 'gradle',
    description: 'Configuração Gradle do projeto raiz',
    content: `// Top-level build file where you can add configuration options common to all sub-projects/modules.
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.2.2'
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

tasks.register('clean', Delete) {
    delete rootProject.buildDir
}`
  },
  {
    path: 'settings.gradle',
    category: 'gradle',
    description: 'Configurações do projeto e inclusão do módulo :app',
    content: `pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}
rootProject.name = "OdysPlay"
include ':app'`
  },
  {
    path: 'gradle.properties',
    category: 'gradle',
    description: 'Configurações de memória JVM e flags do AndroidX',
    content: `org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
android.enableJetifier=true
android.nonTransitiveRClass=true`
  },
  {
    path: 'app/build.gradle',
    category: 'gradle',
    description: 'Dependências AndroidX, Retrofit, Glide e Material Design',
    content: `plugins {
    id 'com.android.application'
}

android {
    namespace 'com.odysplay'
    compileSdk 34

    defaultConfig {
        applicationId "com.odysplay"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
        debug {
            applicationIdSuffix ".debug"
            debuggable true
        }
    }

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }

    buildFeatures {
        viewBinding true
    }
}

dependencies {
    // AndroidX & Material Design
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation 'androidx.recyclerview:recyclerview:1.3.2'
    implementation 'androidx.cardview:cardview:1.0.0'
    implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0'

    // Architecture Components (MVVM)
    implementation 'androidx.lifecycle:lifecycle-viewmodel:2.7.0'
    implementation 'androidx.lifecycle:lifecycle-livedata:2.7.0'

    // Networking & Supabase REST API (Retrofit + OkHttp + Gson)
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
    implementation 'com.squareup.okhttp3:okhttp:4.12.0'
    implementation 'com.squareup.okhttp3:logging-interceptor:4.12.0'
    implementation 'com.google.code.gson:gson:2.10.1'

    // Image Loading
    implementation 'com.github.bumptech.glide:glide:4.16.0'
    annotationProcessor 'com.github.bumptech.glide:compiler:4.16.0'

    // Testing
    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
}`
  },
  {
    path: 'app/src/main/AndroidManifest.xml',
    category: 'manifest',
    description: 'Manifesto do Android com permissões e activities',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:name=".OdysPlayApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.OdysPlay">

        <activity
            android:name=".ui.splash.SplashActivity"
            android:exported="true"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.OdysPlay.Splash">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <activity
            android:name=".ui.auth.LoginActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:windowSoftInputMode="adjustResize" />

        <activity
            android:name=".ui.auth.RegisterActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:windowSoftInputMode="adjustResize" />

        <activity
            android:name=".ui.main.MainActivity"
            android:exported="false"
            android:screenOrientation="portrait" />

        <activity
            android:name=".ui.post.PostDetailActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:windowSoftInputMode="adjustResize" />

        <activity
            android:name=".ui.notifications.NotificationsActivity"
            android:exported="false"
            android:screenOrientation="portrait" />

        <activity
            android:name=".ui.dev.NewProjectActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:windowSoftInputMode="adjustResize" />

        <activity
            android:name=".ui.company.NewGameJamActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:windowSoftInputMode="adjustResize" />

    </application>

</manifest>`
  },
  {
    path: 'app/src/main/res/values/colors.xml',
    category: 'xml',
    description: 'Paleta oficial OdysPlay (#122C45, #D4AF37, etc.)',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- Paleta Oficial OdysPlay -->
    <color name="cosmic_blue">#122C45</color>
    <color name="noble_gold">#D4AF37</color>
    <color name="emerald_cyan">#4DDDE0</color>
    <color name="metallic_blue">#072946</color>
    <color name="turquoise">#00D9C0</color>
    <color name="alert_red">#AF0000</color>

    <color name="dark_background">#0B1B2B</color>
    <color name="card_surface">#0E243A</color>
    <color name="card_stroke">#1C3E60</color>
    <color name="divider_color">#193959</color>

    <color name="text_primary">#F8FAFC</color>
    <color name="text_secondary">#94A3B8</color>
    <color name="text_muted">#64748B</color>
    <color name="white">#FFFFFF</color>
    <color name="black">#000000</color>

    <color name="notify_success">#00D9C0</color>
    <color name="notify_error">#AF0000</color>
    <color name="notify_warning">#EAB308</color>
    <color name="notify_info">#D4AF37</color>
</resources>`
  },
  {
    path: 'app/src/main/java/com/odysplay/OdysPlayApplication.java',
    category: 'java',
    description: 'Classe Application e inicialização do singleton do repositório',
    content: `package com.odysplay;

import android.app.Application;
import com.odysplay.data.repository.OdysPlayRepository;

public class OdysPlayApplication extends Application {

    private static OdysPlayApplication instance;
    private OdysPlayRepository repository;

    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;
        this.repository = new OdysPlayRepository(this);
    }

    public static OdysPlayApplication getInstance() {
        return instance;
    }

    public OdysPlayRepository getRepository() {
        return repository;
    }
}`
  },
  {
    path: 'app/src/main/java/com/odysplay/data/model/ProfileType.java',
    category: 'java',
    description: 'Enum com os 3 pilares: GAMER, DEV, EMPRESA',
    content: `package com.odysplay.data.model;

public enum ProfileType {
    GAMER("Gamer", "🎮"),
    DEV("Desenvolvedor", "🛠️"),
    EMPRESA("Estúdio / Empresa", "🏢");

    private final String label;
    private final String icon;

    ProfileType(String label, String icon) {
        this.label = label;
        this.icon = icon;
    }

    public String getLabel() { return label; }
    public String getIcon() { return icon; }
}`
  },
  {
    path: 'app/src/main/java/com/odysplay/data/repository/OdysPlayRepository.java',
    category: 'java',
    description: 'Repositório central MVVM com suporte a múltiplos perfis e Supabase',
    content: `package com.odysplay.data.repository;

import android.content.Context;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import com.odysplay.data.model.*;
import com.odysplay.data.remote.SupabaseConfig;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class OdysPlayRepository {

    private final Context context;
    private final MutableLiveData<User> currentUserLiveData = new MutableLiveData<>();
    private final MutableLiveData<List<Post>> postsLiveData = new MutableLiveData<>(new ArrayList<>());
    private final MutableLiveData<List<News>> newsLiveData = new MutableLiveData<>(new ArrayList<>());
    private final MutableLiveData<List<Community>> communitiesLiveData = new MutableLiveData<>(new ArrayList<>());
    private final MutableLiveData<List<GameProject>> projectsLiveData = new MutableLiveData<>(new ArrayList<>());
    private final MutableLiveData<List<GameJam>> gameJamsLiveData = new MutableLiveData<>(new ArrayList<>());
    private final MutableLiveData<List<NotificationItem>> notificationsLiveData = new MutableLiveData<>(new ArrayList<>());

    private User currentUser;
    private final List<Post> localPosts = new ArrayList<>();
    private final List<News> localNews = new ArrayList<>();
    private final List<Community> localCommunities = new ArrayList<>();
    private final List<GameProject> localProjects = new ArrayList<>();
    private final List<GameJam> localGameJams = new ArrayList<>();
    private final List<NotificationItem> localNotifications = new ArrayList<>();

    public OdysPlayRepository(Context context) {
        this.context = context;
        initializeData();
    }

    private void initializeData() {
        localPosts.addAll(DemoDataRepository.getDemoPosts());
        postsLiveData.setValue(new ArrayList<>(localPosts));

        localNews.addAll(DemoDataRepository.getDemoNews());
        newsLiveData.setValue(new ArrayList<>(localNews));

        localCommunities.addAll(DemoDataRepository.getDemoCommunities());
        communitiesLiveData.setValue(new ArrayList<>(localCommunities));

        localProjects.addAll(DemoDataRepository.getDemoProjects());
        projectsLiveData.setValue(new ArrayList<>(localProjects));

        localGameJams.addAll(DemoDataRepository.getDemoGameJams());
        gameJamsLiveData.setValue(new ArrayList<>(localGameJams));

        localNotifications.addAll(DemoDataRepository.getDemoNotifications());
        notificationsLiveData.setValue(new ArrayList<>(localNotifications));

        this.currentUser = new User("usr_demo_1", "gamer@odysplay.com.br");
        this.currentUser.setProfiles(DemoDataRepository.getDemoProfiles());
        this.currentUser.setActiveProfileId(this.currentUser.getProfiles().get(0).getId());
        currentUserLiveData.setValue(this.currentUser);
    }

    public boolean isUsingRemoteSupabase() {
        return SupabaseConfig.isConfigured();
    }

    public LiveData<User> getCurrentUser() { return currentUserLiveData; }
    public LiveData<List<Post>> getPosts() { return postsLiveData; }
    public LiveData<List<News>> getNews() { return newsLiveData; }
    public LiveData<List<Community>> getCommunities() { return communitiesLiveData; }
    public LiveData<List<NotificationItem>> getNotifications() { return notificationsLiveData; }

    public void switchActiveProfile(ProfileType type) {
        if (currentUser == null) return;
        for (UserProfile profile : currentUser.getProfiles()) {
            if (profile.getProfileType() == type) {
                currentUser.setActiveProfileId(profile.getId());
                currentUserLiveData.setValue(currentUser);
                return;
            }
        }
    }

    public void toggleLike(String postId) {
        for (Post p : localPosts) {
            if (p.getId().equals(postId)) {
                boolean cur = p.isLikedByCurrentUser();
                p.setLikedByCurrentUser(!cur);
                p.setLikesCount(cur ? Math.max(0, p.getLikesCount() - 1) : p.getLikesCount() + 1);
                postsLiveData.setValue(new ArrayList<>(localPosts));
                return;
            }
        }
    }

    public void addComment(String postId, String commentText) {
        if (commentText == null || commentText.trim().isEmpty() || currentUser == null) return;
        UserProfile p = currentUser.getActiveProfile();
        for (Post post : localPosts) {
            if (post.getId().equals(postId)) {
                Comment comment = new Comment(
                    UUID.randomUUID().toString(),
                    postId,
                    p.getId(),
                    p.getDisplayName(),
                    p.getProfileType(),
                    commentText.trim(),
                    System.currentTimeMillis()
                );
                post.getComments().add(comment);
                postsLiveData.setValue(new ArrayList<>(localPosts));
                return;
            }
        }
    }
}`
  },
  {
    path: 'app/src/main/java/com/odysplay/data/remote/SupabaseConfig.java',
    category: 'java',
    description: 'Configuração da URL e Chave Pública Anon do Supabase',
    content: `package com.odysplay.data.remote;

public class SupabaseConfig {
    public static final String SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
    public static final String SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_PUBLIC_KEY";

    public static boolean isConfigured() {
        return SUPABASE_URL != null &&
               !SUPABASE_URL.contains("YOUR_PROJECT_ID") &&
               SUPABASE_ANON_KEY != null &&
               !SUPABASE_ANON_KEY.contains("YOUR_SUPABASE_ANON_PUBLIC_KEY") &&
               !SUPABASE_ANON_KEY.trim().isEmpty();
    }
}`
  },
  {
    path: 'supabase/schema.sql',
    category: 'sql',
    description: 'Esquema completo SQL com Row Level Security (RLS) para o Supabase',
    content: `-- ODYSPLAY - ESQUEMA SUPABASE POSTGRESQL NATIVO COM ROW LEVEL SECURITY (RLS)
CREATE TYPE profile_type AS ENUM ('GAMER', 'DEV', 'EMPRESA');
CREATE TYPE notification_severity AS ENUM ('SUCESSO', 'ERRO', 'AVISO', 'GERAL');

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

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Perfis públicos são visíveis para todos" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Usuários podem atualizar seus próprios perfis" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

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
);`
  },
  {
    path: 'README_ANDROID_STUDIO.md',
    category: 'doc',
    description: 'Guia passo a passo para compilar, executar e testar no Android Studio',
    content: `# OdysPlay — Guia de Execução no Android Studio

1. Abra o Android Studio (versão Hedgehog, Iguana, Jellyfish ou superior).
2. Selecione 'File > Open...' e escolha a pasta 'android'.
3. Aguarde o término do 'Gradle Sync'.
4. Conecte um aparelho via USB com Depuração ativada ou inicie o Emulador Android.
5. Pressione Shift + F10 (Run 'app').
6. O aplicativo iniciará na SplashActivity e carregará os dados de demonstração automaticamente!`
  }
];
