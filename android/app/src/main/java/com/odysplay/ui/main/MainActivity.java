package com.odysplay.ui.main;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.TextView;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.chip.Chip;
import com.odysplay.OdysPlayApplication;
import com.odysplay.R;
import com.odysplay.data.model.ProfileType;
import com.odysplay.data.model.User;
import com.odysplay.data.model.UserProfile;
import com.odysplay.ui.notifications.NotificationsActivity;

/**
 * Main Hub Activity
 * Holds the Bottom Navigation and coordinates the 5 core views:
 * Feed, Comunidades, Notícias, Pesquisa, Perfil.
 */
public class MainActivity extends AppCompatActivity {

    private Chip chipActiveProfile;
    private FrameLayout layoutNotificationBell;
    private View viewNotifyDot;
    private BottomNavigationView bottomNavigationView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initViews();
        setupObservers();
        setupNavigation();
    }

    private void initViews() {
        chipActiveProfile = findViewById(R.id.chipActiveProfile);
        layoutNotificationBell = findViewById(R.id.layoutNotificationBell);
        viewNotifyDot = findViewById(R.id.viewNotifyDot);
        bottomNavigationView = findViewById(R.id.bottom_navigation);

        layoutNotificationBell.setOnClickListener(v -> {
            Intent intent = new Intent(MainActivity.this, NotificationsActivity.class);
            startActivity(intent);
        });

        chipActiveProfile.setOnClickListener(v -> showProfileSwitcherDialog());
    }

    private void setupObservers() {
        OdysPlayApplication.getInstance().getRepository().getCurrentUser().observe(this, user -> {
            if (user != null) {
                UserProfile active = user.getActiveProfile();
                if (active != null) {
                    chipActiveProfile.setText(active.getProfileType().getIcon() + " " + active.getProfileType().name());
                }
            }
        });
    }

    private void setupNavigation() {
        bottomNavigationView.setOnItemSelectedListener(item -> {
            int itemId = item.getItemId();
            if (itemId == R.id.nav_feed) {
                // Switch to Feed
                return true;
            } else if (itemId == R.id.nav_communities) {
                // Switch to Communities
                return true;
            } else if (itemId == R.id.nav_news) {
                // Switch to News
                return true;
            } else if (itemId == R.id.nav_search) {
                // Switch to Search
                return true;
            } else if (itemId == R.id.nav_profile) {
                // Switch to Profile
                return true;
            }
            return false;
        });
    }

    private void showProfileSwitcherDialog() {
        CharSequence[] options = new CharSequence[]{
                "🎮 Gamer (Lucas 'Valkyrie')",
                "🛠️ Dev (Renata 'PixelForge')",
                "🏢 Empresa (Nebula Studios)"
        };

        new AlertDialog.Builder(this)
                .setTitle("Alternar Perfil Ativo")
                .setItems(options, (dialog, which) -> {
                    if (which == 0) {
                        OdysPlayApplication.getInstance().getRepository().switchActiveProfile(ProfileType.GAMER);
                    } else if (which == 1) {
                        OdysPlayApplication.getInstance().getRepository().switchActiveProfile(ProfileType.DEV);
                    } else if (which == 2) {
                        OdysPlayApplication.getInstance().getRepository().switchActiveProfile(ProfileType.EMPRESA);
                    }
                })
                .setNegativeButton("Cancelar", null)
                .show();
    }
}
