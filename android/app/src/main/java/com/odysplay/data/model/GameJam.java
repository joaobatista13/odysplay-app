package com.odysplay.data.model;

import java.io.Serializable;

/**
 * Game Jam event organized by a Company / Studio profile.
 */
public class GameJam implements Serializable {
    private String id;
    private String companyProfileId;
    private String companyName;
    private String title;
    private String theme;
    private int maxParticipants;
    private String prizes;
    private String registrationDeadline;
    private String winnersDate;
    private String rules;
    private int registeredParticipantsCount;
    private long createdAt;

    public GameJam() {}

    public GameJam(String id, String companyProfileId, String companyName, String title, String theme,
                   int maxParticipants, String prizes, String registrationDeadline, String winnersDate, String rules) {
        this.id = id;
        this.companyProfileId = companyProfileId;
        this.companyName = companyName;
        this.title = title;
        this.theme = theme;
        this.maxParticipants = maxParticipants;
        this.prizes = prizes;
        this.registrationDeadline = registrationDeadline;
        this.winnersDate = winnersDate;
        this.rules = rules;
        this.registeredParticipantsCount = 12;
        this.createdAt = System.currentTimeMillis();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCompanyProfileId() {
        return companyProfileId;
    }

    public void setCompanyProfileId(String companyProfileId) {
        this.companyProfileId = companyProfileId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public int getMaxParticipants() {
        return maxParticipants;
    }

    public void setMaxParticipants(int maxParticipants) {
        this.maxParticipants = maxParticipants;
    }

    public String getPrizes() {
        return prizes;
    }

    public void setPrizes(String prizes) {
        this.prizes = prizes;
    }

    public String getRegistrationDeadline() {
        return registrationDeadline;
    }

    public void setRegistrationDeadline(String registrationDeadline) {
        this.registrationDeadline = registrationDeadline;
    }

    public String getWinnersDate() {
        return winnersDate;
    }

    public void setWinnersDate(String winnersDate) {
        this.winnersDate = winnersDate;
    }

    public String getRules() {
        return rules;
    }

    public void setRules(String rules) {
        this.rules = rules;
    }

    public int getRegisteredParticipantsCount() {
        return registeredParticipantsCount;
    }

    public void setRegisteredParticipantsCount(int registeredParticipantsCount) {
        this.registeredParticipantsCount = registeredParticipantsCount;
    }

    public long getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(long createdAt) {
        this.createdAt = createdAt;
    }
}
