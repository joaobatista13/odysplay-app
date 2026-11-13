package com.odysplay.data.model;

import java.io.Serializable;

/**
 * Gamer & Dev Community / Hub.
 */
public class Community implements Serializable {
    private String id;
    private String name;
    private String description;
    private String imageUrl;
    private int membersCount;
    private boolean isMember;
    private String category;

    public Community() {}

    public Community(String id, String name, String description, int membersCount, boolean isMember, String category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.membersCount = membersCount;
        this.isMember = isMember;
        this.category = category;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public int getMembersCount() {
        return membersCount;
    }

    public void setMembersCount(int membersCount) {
        this.membersCount = membersCount;
    }

    public boolean isMember() {
        return isMember;
    }

    public void setMember(boolean member) {
        isMember = member;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
