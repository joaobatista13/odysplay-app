package com.odysplay.data.model;

import java.io.Serializable;

/**
 * Moderation report item.
 */
public class ReportItem implements Serializable {
    private String id;
    private String reporterProfileId;
    private String targetContentType; // "POST", "COMMENT", "USER"
    private String targetContentId;
    private String reason;
    private long timestamp;
    private String status; // "PENDING", "REVIEWED", "DISMISSED"

    public ReportItem() {}

    public ReportItem(String id, String reporterProfileId, String targetContentType, String targetContentId, String reason) {
        this.id = id;
        this.reporterProfileId = reporterProfileId;
        this.targetContentType = targetContentType;
        this.targetContentId = targetContentId;
        this.reason = reason;
        this.timestamp = System.currentTimeMillis();
        this.status = "PENDING";
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getReporterProfileId() {
        return reporterProfileId;
    }

    public void setReporterProfileId(String reporterProfileId) {
        this.reporterProfileId = reporterProfileId;
    }

    public String getTargetContentType() {
        return targetContentType;
    }

    public void setTargetContentType(String targetContentType) {
        this.targetContentType = targetContentType;
    }

    public String getTargetContentId() {
        return targetContentId;
    }

    public void setTargetContentId(String targetContentId) {
        this.targetContentId = targetContentId;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
