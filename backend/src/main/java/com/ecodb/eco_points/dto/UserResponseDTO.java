package com.ecodb.eco_points.dto;

import com.ecodb.eco_points.model.enums.TipoUsuario;

public record UserResponseDTO(
    String nome,
    String email,
    String telefone,
    String endereco,
    TipoUsuario tipo
) {}
