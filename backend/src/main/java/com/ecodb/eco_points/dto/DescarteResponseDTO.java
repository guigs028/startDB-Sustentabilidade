package com.ecodb.eco_points.dto;

import com.ecodb.eco_points.model.enums.StatusDescarte;

public record DescarteResponseDTO(
    Long id,
    String pontoColetaNome,
    String materialNome,
    Long quantidade,
    String unMedida,
    Enum<StatusDescarte> descricao,
    String dataDescarte
) {}
