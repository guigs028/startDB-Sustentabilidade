package com.ecodb.eco_points.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record DescarteDTO (

    @NotNull(message = "O tipo de descarte é obrigatório")
    Long pontoColeta,

    @NotNull(message = "O material é obrigatório")
    Long materialId,

    @NotNull(message = "A quantidade é obrigatória")
    @Positive(message = "A quantidade deve ser um valor positivo")
    Double quantidade,

    @NotBlank(message = "A unidade de medida é obrigatória")
    String unMedida,

    @NotBlank(message = "A data do descarte é obrigatória")
    String descricao
) {}

