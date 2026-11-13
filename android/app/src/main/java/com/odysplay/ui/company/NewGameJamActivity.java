package com.odysplay.ui.company;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

import com.odysplay.OdysPlayApplication;
import com.odysplay.R;

/**
 * Company Feature: Launch a new Game Jam.
 * Fields: 1. Nome, 2. Max participantes, 3. Prêmios, 4. Tema, 5. Data final inscrições, 6. Data vencedores, 7. Regras.
 */
public class NewGameJamActivity extends AppCompatActivity {

    private EditText etJamTitle, etJamTheme, etJamMaxParticipants, etJamPrizes, etJamEndDate, etJamWinnersDate, etJamRules;
    private Button btnSubmitGameJam;
    private ImageButton btnBackGameJam;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_new_game_jam);

        initViews();
        setupListeners();
    }

    private void initViews() {
        etJamTitle = findViewById(R.id.etJamTitle);
        etJamTheme = findViewById(R.id.etJamTheme);
        etJamMaxParticipants = findViewById(R.id.etJamMaxParticipants);
        etJamPrizes = findViewById(R.id.etJamPrizes);
        etJamEndDate = findViewById(R.id.etJamEndDate);
        etJamWinnersDate = findViewById(R.id.etJamWinnersDate);
        etJamRules = findViewById(R.id.etJamRules);
        btnSubmitGameJam = findViewById(R.id.btnSubmitGameJam);
        btnBackGameJam = findViewById(R.id.btnBackGameJam);
    }

    private void setupListeners() {
        btnBackGameJam.setOnClickListener(v -> finish());

        btnSubmitGameJam.setOnClickListener(v -> {
            String title = etJamTitle.getText().toString().trim();
            String theme = etJamTheme.getText().toString().trim();
            String maxPartStr = etJamMaxParticipants.getText().toString().trim();
            String prizes = etJamPrizes.getText().toString().trim();
            String endDate = etJamEndDate.getText().toString().trim();
            String winnersDate = etJamWinnersDate.getText().toString().trim();
            String rules = etJamRules.getText().toString().trim();

            if (title.isEmpty()) {
                etJamTitle.setError("Informe o nome da Game Jam");
                return;
            }
            if (theme.isEmpty()) {
                etJamTheme.setError("Informe o tema principal");
                return;
            }

            int maxParticipants = 100;
            try {
                maxParticipants = Integer.parseInt(maxPartStr);
            } catch (Exception ignored) {}

            boolean ok = OdysPlayApplication.getInstance().getRepository().publishGameJam(
                    title, theme, maxParticipants, prizes, endDate, winnersDate, rules
            );

            if (ok) {
                Toast.makeText(this, "Game Jam publicada com sucesso!", Toast.LENGTH_LONG).show();
                finish();
            } else {
                Toast.makeText(this, "Erro ao publicar Game Jam.", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
