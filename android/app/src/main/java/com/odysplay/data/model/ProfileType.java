package com.odysplay.data.model;

/**
 * The three core pillars of the OdysPlay ecosystem:
 * - GAMER: Players, community enthusiasts, content consumers.
 * - DEV: Game developers, indie creators, designers, programmers.
 * - EMPRESA: Game studios, publishers, organizers of Game Jams and recruiters.
 */
public enum ProfileType {
    GAMER("Gamer", "🎮"),
    DEV("Desenvolvedor", "🛠️"),
    EMPRESA("Estúdio / Empresa", "🏢");

    private final String label;
    private final String icon;

    ProfileType(String label, String icon) {
        this.label = label;
        this.icon = icon;
    }

    public String getLabel() {
        return label;
    }

    public String getIcon() {
        return icon;
    }
}
