package com.ecodb.eco_points.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record DescarteDTO (

    @NotNull(message = "O Ponto de coleta é obrigatório")
    Long pontoColetaId,

    @NotNull(message = "O material é obrigatório")
    Long materialId,

    @NotNull(message = "A quantidade é obrigatória")
    @Positive(message = "A quantidade deve ser um valor positivo")
    Double quantidade,

    @NotBlank(message = "A unidade de medida é obrigatória")
    String unidadeMedida,

    String descricao
) {}

