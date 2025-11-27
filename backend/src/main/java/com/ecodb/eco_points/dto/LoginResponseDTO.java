package com.ecodb.eco_points.dto;

import com.ecodb.eco_points.model.enums.TipoUsuario;

public record LoginResponseDTO(
    String token,
    String email,
    String nome,
    TipoUsuario tipo
) {}