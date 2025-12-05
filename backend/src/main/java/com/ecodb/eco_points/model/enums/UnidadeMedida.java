package com.ecodb.eco_points.model.enums;

public enum UnidadeMedida {
    KILOGRAMA("kg"),
    LITRO("L"),
    UNIDADE("Un");

    private final String abreviacao;

    UnidadeMedida(String abreviacao) {
        this.abreviacao = abreviacao;
    }

    public String getAbreviacao() {
        return abreviacao;
    }
}
