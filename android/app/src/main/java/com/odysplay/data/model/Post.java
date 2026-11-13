package com.odysplay.data.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Social and technical feed post.
 */
public class Post implements Serializable {
    private String id;
    private String authorId;
    private String authorName;
    private String authorUsername;
    private String authorAvatar;
    private ProfileType authorRole;
    private String content;
    private String imageUrl;
    private long timestamp;
    private int likesCount;
    private boolean isLikedByCurrentUser;
    private List<Comment> comments;

    public Post() {
        this.comments = new ArrayList<>();
    }

    public Post(String id, String authorId, String authorName, String authorUsername, ProfileType authorRole, String content, long timestamp) {
        this.id = id;
        this.authorId = authorId;
        this.authorName = authorName;
        this.authorUsername = authorUsername;
        this.authorRole = authorRole;
        this.content = content;
        this.timestamp = timestamp;
        this.likesCount = 0;
        this.isLikedByCurrentUser = false;
        this.comments = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getAuthorUsername() {
        return authorUsername;
    }

    public void setAuthorUsername(String authorUsername) {
        this.authorUsername = authorUsername;
    }

    public String getAuthorAvatar() {
        return authorAvatar;
    }

    public void setAuthorAvatar(String authorAvatar) {
        this.authorAvatar = authorAvatar;
    }

    public ProfileType getAuthorRole() {
        return authorRole;
    }

    public void setAuthorRole(ProfileType authorRole) {
        this.authorRole = authorRole;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public int getLikesCount() {
        return likesCount;
    }

    public void setLikesCount(int likesCount) {
        this.likesCount = likesCount;
    }

    public boolean isLikedByCurrentUser() {
        return isLikedByCurrentUser;
    }

    public void setLikedByCurrentUser(boolean likedByCurrentUser) {
        isLikedByCurrentUser = likedByCurrentUser;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
