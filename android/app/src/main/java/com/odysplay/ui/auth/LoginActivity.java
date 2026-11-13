package com.odysplay.ui.auth;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

import com.odysplay.OdysPlayApplication;
import com.odysplay.R;
import com.odysplay.data.model.ProfileType;
import com.odysplay.ui.main.MainActivity;

/**
 * Login Activity with email/password validation, demo quick logins, and navigation to register.
 */
public class LoginActivity extends AppCompatActivity {

    private EditText etEmail;
    private EditText etPassword;
    private Button btnLogin;
    private TextView tvLoginError;
    private TextView tvGoToRegister;
    private Button btnQuickGamer, btnQuickDev, btnQuickEmpresa;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        initViews();
        setupListeners();
    }

    private void initViews() {
        etEmail = findViewById(R.id.etEmail);
        etPassword = findViewById(R.id.etPassword);
        btnLogin = findViewById(R.id.btnLogin);
        tvLoginError = findViewById(R.id.tvLoginError);
        tvGoToRegister = findViewById(R.id.tvGoToRegister);

        btnQuickGamer = findViewById(R.id.btnQuickGamer);
        btnQuickDev = findViewById(R.id.btnQuickDev);
        btnQuickEmpresa = findViewById(R.id.btnQuickEmpresa);
    }

    private void setupListeners() {
        btnLogin.setOnClickListener(v -> performLogin());

        tvGoToRegister.setOnClickListener(v -> {
            Intent intent = new Intent(LoginActivity.this, RegisterActivity.class);
            startActivity(intent);
        });

        // Quick demo logins for seamless presentation
        btnQuickGamer.setOnClickListener(v -> {
            etEmail.setText("gamer@odysplay.com.br");
            etPassword.setText("senha12345");
            performLogin();
        });

        btnQuickDev.setOnClickListener(v -> {
            etEmail.setText("dev@odysplay.com.br");
            etPassword.setText("senha12345");
            performLogin();
            OdysPlayApplication.getInstance().getRepository().switchActiveProfile(ProfileType.DEV);
        });

        btnQuickEmpresa.setOnClickListener(v -> {
            etEmail.setText("estudio@odysplay.com.br");
            etPassword.setText("senha12345");
            performLogin();
            OdysPlayApplication.getInstance().getRepository().switchActiveProfile(ProfileType.EMPRESA);
        });
    }

    private void performLogin() {
        String email = etEmail.getText().toString().trim();
        String password = etPassword.getText().toString().trim();

        tvLoginError.setVisibility(View.GONE);

        if (email.isEmpty()) {
            tvLoginError.setText("Por favor, informe seu e-mail.");
            tvLoginError.setVisibility(View.VISIBLE);
            etEmail.requestFocus();
            return;
        }

        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            tvLoginError.setText("Formato de e-mail inválido.");
            tvLoginError.setVisibility(View.VISIBLE);
            etEmail.requestFocus();
            return;
        }

        if (password.isEmpty() || password.length() < 6) {
            tvLoginError.setText("A senha deve possuir pelo menos 6 caracteres.");
            tvLoginError.setVisibility(View.VISIBLE);
            etPassword.requestFocus();
            return;
        }

        boolean success = OdysPlayApplication.getInstance().getRepository().login(email, password);
        if (success) {
            Toast.makeText(this, "Login realizado com sucesso!", Toast.LENGTH_SHORT).show();
            Intent intent = new Intent(LoginActivity.this, MainActivity.class);
            startActivity(intent);
            finish();
        } else {
            tvLoginError.setText("Credenciais inválidas ou erro de conexão.");
            tvLoginError.setVisibility(View.VISIBLE);
        }
    }
}
