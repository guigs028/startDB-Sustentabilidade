package com.ecodb.eco_points.dto;

import com.ecodb.eco_points.model.enums.CategoriaMaterial;
import com.ecodb.eco_points.model.enums.DestinoMaterial;
import com.ecodb.eco_points.model.enums.UnidadeMedida;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record MaterialDTO(
    Long id,
    
    @NotBlank(message = "O nome do material é obrigatório")
    String nome,
    
    @NotNull(message = "A categoria é obrigatória")
    CategoriaMaterial categoria,
    
    @NotNull(message = "O destino é obrigatório")
    DestinoMaterial destino,
    
    @NotNull(message = "A unidade padrão é obrigatória")
    UnidadeMedida unidadePadrao
) {}