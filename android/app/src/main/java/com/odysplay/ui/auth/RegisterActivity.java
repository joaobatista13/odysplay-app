package com.odysplay.ui.auth;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

import com.odysplay.OdysPlayApplication;
import com.odysplay.R;
import com.odysplay.data.model.ProfileType;
import com.odysplay.ui.main.MainActivity;

/**
 * Registration Activity with profile persona selection.
 */
public class RegisterActivity extends AppCompatActivity {

    private EditText etRegName;
    private EditText etRegUsername;
    private EditText etRegEmail;
    private EditText etRegPassword;
    private RadioGroup rgProfileTypes;
    private Button btnSubmitRegister;
    private TextView tvBackToLogin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        initViews();
        setupListeners();
    }

    private void initViews() {
        etRegName = findViewById(R.id.etRegName);
        etRegUsername = findViewById(R.id.etRegUsername);
        etRegEmail = findViewById(R.id.etRegEmail);
        etRegPassword = findViewById(R.id.etRegPassword);
        rgProfileTypes = findViewById(R.id.rgProfileTypes);
        btnSubmitRegister = findViewById(R.id.btnSubmitRegister);
        tvBackToLogin = findViewById(R.id.tvBackToLogin);
    }

    private void setupListeners() {
        tvBackToLogin.setOnClickListener(v -> finish());

        btnSubmitRegister.setOnClickListener(v -> performRegister());
    }

    private void performRegister() {
        String name = etRegName.getText().toString().trim();
        String username = etRegUsername.getText().toString().trim();
        String email = etRegEmail.getText().toString().trim();
        String password = etRegPassword.getText().toString().trim();

        if (name.isEmpty()) {
            etRegName.setError("Nome é obrigatório");
            etRegName.requestFocus();
            return;
        }

        if (username.isEmpty()) {
            etRegUsername.setError("Nome de usuário é obrigatório");
            etRegUsername.requestFocus();
            return;
        }

        if (email.isEmpty() || !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            etRegEmail.setError("E-mail inválido");
            etRegEmail.requestFocus();
            return;
        }

        if (password.length() < 6) {
            etRegPassword.setError("A senha deve ter no mínimo 6 caracteres");
            etRegPassword.requestFocus();
            return;
        }

        ProfileType selectedType = ProfileType.GAMER;
        int checkedId = rgProfileTypes.getCheckedRadioButtonId();
        if (checkedId == R.id.rbDev) {
            selectedType = ProfileType.DEV;
        } else if (checkedId == R.id.rbEmpresa) {
            selectedType = ProfileType.EMPRESA;
        }

        boolean success = OdysPlayApplication.getInstance().getRepository().register(
                name, username, email, password, selectedType
        );

        if (success) {
            Toast.makeText(this, "Conta criada com sucesso no modo " + selectedType.getLabel() + "!", Toast.LENGTH_LONG).show();
            Intent intent = new Intent(RegisterActivity.this, MainActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            startActivity(intent);
            finish();
        } else {
            Toast.makeText(this, "Erro ao registrar conta. Tente novamente.", Toast.LENGTH_SHORT).show();
        }
    }
}
