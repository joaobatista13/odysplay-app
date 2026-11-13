package com.odysplay.ui.splash;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import androidx.appcompat.app.AppCompatActivity;

import com.odysplay.OdysPlayApplication;
import com.odysplay.R;
import com.odysplay.ui.auth.LoginActivity;
import com.odysplay.ui.main.MainActivity;

/**
 * Splash Screen Activity
 * Displays cosmic branding, initializes repository, checks active session.
 */
public class SplashActivity extends AppCompatActivity {

    private static final int SPLASH_DELAY_MS = 1800;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        new Handler(Looper.getMainLooper()).postDelayed(() -> {
            boolean hasSession = OdysPlayApplication.getInstance()
                    .getRepository()
                    .getCurrentUser()
                    .getValue() != null;

            Intent intent;
            if (hasSession) {
                intent = new Intent(SplashActivity.this, MainActivity.class);
            } else {
                intent = new Intent(SplashActivity.this, LoginActivity.class);
            }
            startActivity(intent);
            finish();
        }, SPLASH_DELAY_MS);
    }
}
