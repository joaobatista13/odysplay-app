package com.odysplay;

import android.app.Application;
import com.odysplay.data.repository.OdysPlayRepository;

/**
 * OdysPlay Native Android Application class
 * Initializes repositories, dependency injection, and application-level singletons.
 */
public class OdysPlayApplication extends Application {

    private static OdysPlayApplication instance;
    private OdysPlayRepository repository;

    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;
        // Initializes the main data repository (manages demo mode & Supabase backend)
        this.repository = new OdysPlayRepository(this);
    }

    public static OdysPlayApplication getInstance() {
        return instance;
    }

    public OdysPlayRepository getRepository() {
        return repository;
    }
}
