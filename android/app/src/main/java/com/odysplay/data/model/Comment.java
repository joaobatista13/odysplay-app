package com.odysplay.data.model;

import java.io.Serializable;

/**
 * Comment on a post.
 */
public class Comment implements Serializable {
    private String id;
    private String postId;
    private String authorId;
    private String authorName;
    private ProfileType authorRole;
    private String content;
    private long timestamp;

    public Comment() {}

    public Comment(String id, String postId, String authorId, String authorName, ProfileType authorRole, String content, long timestamp) {
        this.id = id;
        this.postId = postId;
        this.authorId = authorId;
        this.authorName = authorName;
        this.authorRole = authorRole;
        this.content = content;
        this.timestamp = timestamp;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
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

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}
