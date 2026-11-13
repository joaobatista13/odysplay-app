package com.odysplay.data.repository;

import android.content.Context;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.odysplay.data.model.*;
import com.odysplay.data.remote.SupabaseConfig;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Main Repository for OdysPlay following MVVM architecture.
 * Manages data source coordination (Supabase Remote vs Demo Mode).
 */
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
    private final List<ReportItem> localReports = new ArrayList<>();

    public OdysPlayRepository(Context context) {
        this.context = context;
        initializeData();
    }

    private void initializeData() {
        // Initialize with realistic mock data
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

        // Default initial session with 3 switchable persona profiles
        this.currentUser = new User("usr_demo_1", "gamer@odysplay.com.br");
        this.currentUser.setProfiles(DemoDataRepository.getDemoProfiles());
        this.currentUser.setActiveProfileId(this.currentUser.getProfiles().get(0).getId());
        currentUserLiveData.setValue(this.currentUser);
    }

    public boolean isUsingRemoteSupabase() {
        return SupabaseConfig.isConfigured();
    }

    // --- Authentication & User Profiles ---
    public LiveData<User> getCurrentUser() {
        return currentUserLiveData;
    }

    public boolean login(String email, String password) {
        if (email == null || email.trim().isEmpty() || password == null || password.length() < 6) {
            return false;
        }
        // If Supabase configured, call auth endpoint; otherwise authenticate demo session
        this.currentUser = new User(UUID.randomUUID().toString(), email);
        this.currentUser.setProfiles(DemoDataRepository.getDemoProfiles());
        this.currentUser.setActiveProfileId(this.currentUser.getProfiles().get(0).getId());
        currentUserLiveData.postValue(this.currentUser);
        return true;
    }

    public boolean register(String name, String username, String email, String password, ProfileType initialType) {
        if (email == null || !email.contains("@") || password == null || password.length() < 6 || name.trim().isEmpty()) {
            return false;
        }
        this.currentUser = new User(UUID.randomUUID().toString(), email);
        UserProfile initialProfile = new UserProfile(
                UUID.randomUUID().toString(),
                this.currentUser.getId(),
                name,
                username.startsWith("@") ? username.substring(1) : username,
                "Novo membro da comunidade OdysPlay!",
                initialType
        );
        this.currentUser.getProfiles().add(initialProfile);

        // Prepopulate the other 2 types so the user can demonstrate multi-profile switching
        for (UserProfile p : DemoDataRepository.getDemoProfiles()) {
            if (p.getProfileType() != initialType) {
                this.currentUser.getProfiles().add(p);
            }
        }

        this.currentUser.setActiveProfileId(initialProfile.getId());
        currentUserLiveData.postValue(this.currentUser);

        // Add welcome notification
        addNotification("Boas-vindas!", "Conta criada com sucesso com perfil " + initialType.getLabel(), NotificationSeverity.SUCESSO);
        return true;
    }

    public void switchActiveProfile(ProfileType type) {
        if (currentUser == null) return;
        for (UserProfile profile : currentUser.getProfiles()) {
            if (profile.getProfileType() == type) {
                currentUser.setActiveProfileId(profile.getId());
                currentUserLiveData.setValue(currentUser);
                addNotification("Perfil Alternado", "Você agora está navegando no modo " + type.getLabel(), NotificationSeverity.GERAL);
                return;
            }
        }
    }

    // --- Posts & Feed ---
    public LiveData<List<Post>> getPosts() {
        return postsLiveData;
    }

    public Post getPostById(String postId) {
        for (Post p : localPosts) {
            if (p.getId().equals(postId)) return p;
        }
        return null;
    }

    public void toggleLike(String postId) {
        for (Post p : localPosts) {
            if (p.getId().equals(postId)) {
                boolean currentlyLiked = p.isLikedByCurrentUser();
                p.setLikedByCurrentUser(!currentlyLiked);
                p.setLikesCount(currentlyLiked ? Math.max(0, p.getLikesCount() - 1) : p.getLikesCount() + 1);
                postsLiveData.setValue(new ArrayList<>(localPosts));
                return;
            }
        }
    }

    public void addComment(String postId, String commentText) {
        if (commentText == null || commentText.trim().isEmpty() || currentUser == null) return;
        UserProfile activeProfile = currentUser.getActiveProfile();
        for (Post p : localPosts) {
            if (p.getId().equals(postId)) {
                Comment comment = new Comment(
                        UUID.randomUUID().toString(),
                        postId,
                        activeProfile.getId(),
                        activeProfile.getDisplayName(),
                        activeProfile.getProfileType(),
                        commentText.trim(),
                        System.currentTimeMillis()
                );
                p.getComments().add(comment);
                postsLiveData.setValue(new ArrayList<>(localPosts));
                addNotification("Novo Comentário", "Seu comentário foi publicado com sucesso.", NotificationSeverity.SUCESSO);
                return;
            }
        }
    }

    // --- Dev: New Project ---
    public boolean publishProject(String title, String synopsis, String genres, String hashtags) {
        if (title.trim().isEmpty() || synopsis.trim().isEmpty() || genres.trim().isEmpty()) {
            return false;
        }
        UserProfile devProfile = currentUser != null ? currentUser.getActiveProfile() : null;
        String devName = devProfile != null ? devProfile.getDisplayName() : "Dev OdysPlay";
        String devId = devProfile != null ? devProfile.getId() : "p_dev_default";

        GameProject project = new GameProject(
                UUID.randomUUID().toString(),
                devId,
                devName,
                title.trim(),
                synopsis.trim(),
                genres.trim(),
                hashtags.trim()
        );
        localProjects.add(0, project);
        projectsLiveData.setValue(new ArrayList<>(localProjects));

        // Also publish a companion announcement to the social feed
        Post devPost = new Post(
                UUID.randomUUID().toString(),
                devId,
                devName,
                devProfile != null ? devProfile.getUsername() : "dev",
                ProfileType.DEV,
                "🎮 NOVO PROJETO CADASTRADO: " + title.trim() + " (" + genres.trim() + ")! " + synopsis.trim() + " " + hashtags.trim(),
                System.currentTimeMillis()
        );
        localPosts.add(0, devPost);
        postsLiveData.setValue(new ArrayList<>(localPosts));

        addNotification("Projeto Publicado!", "O jogo '" + title.trim() + "' está no ar no OdysPlay.", NotificationSeverity.SUCESSO);
        return true;
    }

    // --- Company: New Game Jam ---
    public boolean publishGameJam(String title, String theme, int maxParticipants, String prizes,
                                  String endDate, String winnersDate, String rules) {
        if (title.trim().isEmpty() || theme.trim().isEmpty() || maxParticipants <= 0) {
            return false;
        }
        UserProfile companyProfile = currentUser != null ? currentUser.getActiveProfile() : null;
        String companyName = companyProfile != null ? companyProfile.getDisplayName() : "Estúdio OdysPlay";
        String companyId = companyProfile != null ? companyProfile.getId() : "p_empresa_default";

        GameJam jam = new GameJam(
                UUID.randomUUID().toString(),
                companyId,
                companyName,
                title.trim(),
                theme.trim(),
                maxParticipants,
                prizes.trim(),
                endDate.trim(),
                winnersDate.trim(),
                rules.trim()
        );
        localGameJams.add(0, jam);
        gameJamsLiveData.setValue(new ArrayList<>(localGameJams));

        // Announce on feed
        Post jamPost = new Post(
                UUID.randomUUID().toString(),
                companyId,
                companyName,
                companyProfile != null ? companyProfile.getUsername() : "estudio",
                ProfileType.EMPRESA,
                "🏆 NOVA GAME JAM: " + title.trim() + "! Tema: '" + theme.trim() + "'. Inscrições até " + endDate + ". Prêmios: " + prizes,
                System.currentTimeMillis()
        );
        localPosts.add(0, jamPost);
        postsLiveData.setValue(new ArrayList<>(localPosts));

        addNotification("Game Jam Criada!", "A competição '" + title.trim() + "' já está aceitando inscrições.", NotificationSeverity.SUCESSO);
        return true;
    }

    // --- Communities ---
    public LiveData<List<Community>> getCommunities() {
        return communitiesLiveData;
    }

    public void toggleCommunityMembership(String communityId) {
        for (Community c : localCommunities) {
            if (c.getId().equals(communityId)) {
                boolean wasMember = c.isMember();
                c.setMember(!wasMember);
                c.setMembersCount(wasMember ? c.getMembersCount() - 1 : c.getMembersCount() + 1);
                communitiesLiveData.setValue(new ArrayList<>(localCommunities));
                addNotification(wasMember ? "Você saiu da guilda" : "Bem-vindo à guilda!",
                        (wasMember ? "Você deixou " : "Você entrou em ") + c.getName(),
                        NotificationSeverity.GERAL);
                return;
            }
        }
    }

    // --- News ---
    public LiveData<List<News>> getNews() {
        return newsLiveData;
    }

    // --- Notifications ---
    public LiveData<List<NotificationItem>> getNotifications() {
        return notificationsLiveData;
    }

    public void addNotification(String title, String message, NotificationSeverity severity) {
        NotificationItem item = new NotificationItem(
                UUID.randomUUID().toString(),
                currentUser != null ? currentUser.getId() : "usr_default",
                title,
                message,
                severity,
                System.currentTimeMillis()
        );
        localNotifications.add(0, item);
        notificationsLiveData.setValue(new ArrayList<>(localNotifications));
    }

    public void markAllNotificationsAsRead() {
        for (NotificationItem item : localNotifications) {
            item.setRead(true);
        }
        notificationsLiveData.setValue(new ArrayList<>(localNotifications));
    }

    // --- Moderation ---
    public void submitReport(String targetContentType, String targetContentId, String reason) {
        ReportItem report = new ReportItem(
                UUID.randomUUID().toString(),
                currentUser != null ? currentUser.getActiveProfileId() : "anon",
                targetContentType,
                targetContentId,
                reason
        );
        localReports.add(report);
        addNotification("Denúncia Recebida", "Nossa equipe revisará o conteúdo reportado. Obrigado por manter o OdysPlay saudável!", NotificationSeverity.AVISO);
    }
}
