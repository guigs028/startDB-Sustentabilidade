package com.ecodb.eco_points.dto;

import com.ecodb.eco_points.model.enums.StatusDescarte;

import jakarta.validation.constraints.NotNull;

public record AtualizaStatusDTO( 
    @NotNull(message = "O status é obrigatório")
    StatusDescarte status
) {}
