package com.odysplay.data.model;

/**
 * Visual severity and meaning for notifications:
 * - SUCESSO (Verde #00D9C0)
 * - ERRO (Vermelho #AF0000)
 * - AVISO (Amarelo #EAB308)
 * - GERAL (Dourado #D4AF37)
 */
public enum NotificationSeverity {
    SUCESSO("Sucesso", "#00D9C0"),
    ERRO("Erro", "#AF0000"),
    AVISO("Aviso", "#EAB308"),
    GERAL("Informação", "#D4AF37");

    private final String label;
    private final String hexColor;

    NotificationSeverity(String label, String hexColor) {
        this.label = label;
        this.hexColor = hexColor;
    }

    public String getLabel() {
        return label;
    }

    public String getHexColor() {
        return hexColor;
    }
}
