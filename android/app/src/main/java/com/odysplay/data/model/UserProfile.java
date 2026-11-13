package com.odysplay.data.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Persona profile attached to an OdysPlay user.
 */
public class UserProfile implements Serializable {
    private String id;
    private String userId;
    private String displayName;
    private String username;
    private String bio;
    private String avatarUrl;
    private ProfileType profileType;
    private List<String> interests;
    private List<String> skills;
    private String companyWebsite;

    public UserProfile() {
        this.interests = new ArrayList<>();
        this.skills = new ArrayList<>();
    }

    public UserProfile(String id, String userId, String displayName, String username, String bio, ProfileType profileType) {
        this.id = id;
        this.userId = userId;
        this.displayName = displayName;
        this.username = username;
        this.bio = bio;
        this.profileType = profileType;
        this.interests = new ArrayList<>();
        this.skills = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public ProfileType getProfileType() {
        return profileType;
    }

    public void setProfileType(ProfileType profileType) {
        this.profileType = profileType;
    }

    public List<String> getInterests() {
        return interests;
    }

    public void setInterests(List<String> interests) {
        this.interests = interests;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public String getCompanyWebsite() {
        return companyWebsite;
    }

    public void setCompanyWebsite(String companyWebsite) {
        this.companyWebsite = companyWebsite;
    }
}
