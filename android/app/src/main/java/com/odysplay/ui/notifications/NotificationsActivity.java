package com.odysplay.ui.notifications;

import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.chip.Chip;
import com.odysplay.OdysPlayApplication;
import com.odysplay.R;
import com.odysplay.data.model.NotificationItem;
import com.odysplay.data.model.NotificationSeverity;

import java.util.ArrayList;
import java.util.List;

/**
 * Notifications Central Activity with Color Severity Classification:
 * - Verde (#00D9C0): Sucesso
 * - Vermelho (#AF0000): Erro
 * - Amarelo (#EAB308): Avisos
 * - Dourado (#D4AF37): Gerais
 */
public class NotificationsActivity extends AppCompatActivity {

    private RecyclerView rvNotifications;
    private NotificationAdapter adapter;
    private TextView tvEmptyNotifications;
    private Chip chipFilterAll, chipFilterSuccess, chipFilterAlert, chipFilterGeneral;
    private List<NotificationItem> allNotifications = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notifications);

        initViews();
        setupObservers();
        setupFilters();
    }

    private void initViews() {
        Toolbar toolbar = findViewById(R.id.toolbarNotifications);
        setSupportActionBar(toolbar);
        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        }
        toolbar.setNavigationOnClickListener(v -> finish());

        rvNotifications = findViewById(R.id.rvNotifications);
        rvNotifications.setLayoutManager(new LinearLayoutManager(this));
        adapter = new NotificationAdapter();
        rvNotifications.setAdapter(adapter);

        tvEmptyNotifications = findViewById(R.id.tvEmptyNotifications);
        chipFilterAll = findViewById(R.id.chipFilterAll);
        chipFilterSuccess = findViewById(R.id.chipFilterSuccess);
        chipFilterAlert = findViewById(R.id.chipFilterAlert);
        chipFilterGeneral = findViewById(R.id.chipFilterGeneral);
    }

    private void setupObservers() {
        OdysPlayApplication.getInstance().getRepository().getNotifications().observe(this, list -> {
            this.allNotifications = list != null ? list : new ArrayList<>();
            applyFilter(null);
            OdysPlayApplication.getInstance().getRepository().markAllNotificationsAsRead();
        });
    }

    private void setupFilters() {
        chipFilterAll.setOnClickListener(v -> applyFilter(null));
        chipFilterSuccess.setOnClickListener(v -> applyFilter(NotificationSeverity.SUCESSO));
        chipFilterAlert.setOnClickListener(v -> applyFilter(NotificationSeverity.AVISO));
        chipFilterGeneral.setOnClickListener(v -> applyFilter(NotificationSeverity.GERAL));
    }

    private void applyFilter(NotificationSeverity target) {
        List<NotificationItem> filtered = new ArrayList<>();
        for (NotificationItem item : allNotifications) {
            if (target == null || item.getSeverity() == target) {
                filtered.add(item);
            }
        }
        adapter.setNotifications(filtered);
        tvEmptyNotifications.setVisibility(filtered.isEmpty() ? View.VISIBLE : View.GONE);
    }
}
