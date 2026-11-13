package com.odysplay.ui.dev;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

import com.odysplay.OdysPlayApplication;
import com.odysplay.R;

/**
 * Dev Feature: Register a new indie game project.
 * Fields: 1. Nome do jogo, 2. Sinopse, 3. Gêneros, 4. Hashtags relacionadas.
 */
public class NewProjectActivity extends AppCompatActivity {

    private EditText etProjectTitle, etProjectSynopsis, etProjectGenres, etProjectHashtags;
    private Button btnSubmitProject;
    private ImageButton btnBackProject;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_new_project);

        initViews();
        setupListeners();
    }

    private void initViews() {
        etProjectTitle = findViewById(R.id.etProjectTitle);
        etProjectSynopsis = findViewById(R.id.etProjectSynopsis);
        etProjectGenres = findViewById(R.id.etProjectGenres);
        etProjectHashtags = findViewById(R.id.etProjectHashtags);
        btnSubmitProject = findViewById(R.id.btnSubmitProject);
        btnBackProject = findViewById(R.id.btnBackProject);
    }

    private void setupListeners() {
        btnBackProject.setOnClickListener(v -> finish());

        btnSubmitProject.setOnClickListener(v -> {
            String title = etProjectTitle.getText().toString().trim();
            String synopsis = etProjectSynopsis.getText().toString().trim();
            String genres = etProjectGenres.getText().toString().trim();
            String hashtags = etProjectHashtags.getText().toString().trim();

            if (title.isEmpty()) {
                etProjectTitle.setError("Informe o nome do jogo");
                etProjectTitle.requestFocus();
                return;
            }

            if (synopsis.isEmpty()) {
                etProjectSynopsis.setError("Descreva a sinopse do jogo");
                etProjectSynopsis.requestFocus();
                return;
            }

            if (genres.isEmpty()) {
                etProjectGenres.setError("Informe os gêneros principais");
                etProjectGenres.requestFocus();
                return;
            }

            boolean ok = OdysPlayApplication.getInstance().getRepository().publishProject(
                    title, synopsis, genres, hashtags
            );

            if (ok) {
                Toast.makeText(this, "Projeto publicado com sucesso no OdysPlay!", Toast.LENGTH_LONG).show();
                finish();
            } else {
                Toast.makeText(this, "Erro ao publicar projeto. Verifique os campos.", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
