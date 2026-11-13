package com.odysplay.data.model;

import java.io.Serializable;

/**
 * Gaming industry and tech news item.
 */
public class News implements Serializable {
    private String id;
    private String title;
    private String summary;
    private String category; // "Lançamentos", "Mercado", "Hardware", "Tendências"
    private String imageUrl;
    private String date;
    private boolean isDemo;

    public News() {}

    public News(String id, String title, String summary, String category, String date, boolean isDemo) {
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.category = category;
        this.date = date;
        this.isDemo = isDemo;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public boolean isDemo() {
        return isDemo;
    }

    public void setDemo(boolean demo) {
        isDemo = demo;
    }
}
