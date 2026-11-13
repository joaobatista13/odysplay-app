package com.odysplay.data.model;

import java.io.Serializable;

/**
 * Game project registered by a Dev profile.
 * Contains: Nome do jogo, Sinopse, Gêneros, Hashtags relacionadas.
 */
public class GameProject implements Serializable {
    private String id;
    private String devProfileId;
    private String devName;
    private String title;
    private String synopsis;
    private String genres;
    private String hashtags;
    private String bannerUrl;
    private long createdAt;

    public GameProject() {}

    public GameProject(String id, String devProfileId, String devName, String title, String synopsis, String genres, String hashtags) {
        this.id = id;
        this.devProfileId = devProfileId;
        this.devName = devName;
        this.title = title;
        this.synopsis = synopsis;
        this.genres = genres;
        this.hashtags = hashtags;
        this.createdAt = System.currentTimeMillis();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDevProfileId() {
        return devProfileId;
    }

    public void setDevProfileId(String devProfileId) {
        this.devProfileId = devProfileId;
    }

    public String getDevName() {
        return devName;
    }

    public void setDevName(String devName) {
        this.devName = devName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSynopsis() {
        return synopsis;
    }

    public void setSynopsis(String synopsis) {
        this.synopsis = synopsis;
    }

    public String getGenres() {
        return genres;
    }

    public void setGenres(String genres) {
        this.genres = genres;
    }

    public String getHashtags() {
        return hashtags;
    }

    public void setHashtags(String hashtags) {
        this.hashtags = hashtags;
    }

    public String getBannerUrl() {
        return bannerUrl;
    }

    public void setBannerUrl(String bannerUrl) {
        this.bannerUrl = bannerUrl;
    }

    public long getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(long createdAt) {
        this.createdAt = createdAt;
    }
}
