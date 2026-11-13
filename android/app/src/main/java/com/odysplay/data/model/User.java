package com.odysplay.data.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Represents an authenticated OdysPlay account.
 * A single user account can hold multiple persona profiles (e.g. Gamer + Dev + Empresa).
 */
public class User implements Serializable {
    private String id;
    private String email;
    private List<UserProfile> profiles;
    private String activeProfileId;

    public User() {
        this.profiles = new ArrayList<>();
    }

    public User(String id, String email) {
        this.id = id;
        this.email = email;
        this.profiles = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<UserProfile> getProfiles() {
        return profiles;
    }

    public void setProfiles(List<UserProfile> profiles) {
        this.profiles = profiles;
    }

    public String getActiveProfileId() {
        return activeProfileId;
    }

    public void setActiveProfileId(String activeProfileId) {
        this.activeProfileId = activeProfileId;
    }

    public UserProfile getActiveProfile() {
        if (profiles == null || profiles.isEmpty()) return null;
        if (activeProfileId == null) return profiles.get(0);
        for (UserProfile p : profiles) {
            if (p.getId().equals(activeProfileId)) {
                return p;
            }
        }
        return profiles.get(0);
    }
}
