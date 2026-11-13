package com.odysplay.data.model;

import java.io.Serializable;

/**
 * In-app notification item.
 */
public class NotificationItem implements Serializable {
    private String id;
    private String userId;
    private String title;
    private String message;
    private NotificationSeverity severity;
    private long timestamp;
    private boolean isRead;

    public NotificationItem() {}

    public NotificationItem(String id, String userId, String title, String message, NotificationSeverity severity, long timestamp) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.message = message;
        this.severity = severity;
        this.timestamp = timestamp;
        this.isRead = false;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public NotificationSeverity getSeverity() {
        return severity;
    }

    public void setSeverity(NotificationSeverity severity) {
        this.severity = severity;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }
}
