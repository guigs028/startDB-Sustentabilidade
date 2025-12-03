package com.ecodb.eco_points.dto;

import com.ecodb.eco_points.model.enums.CategoriaMaterial;
import com.ecodb.eco_points.model.enums.DestinoMaterial;

public record MaterialDTO(
    Long id,
    String nome,
    CategoriaMaterial categoria,
    DestinoMaterial destino
) {}