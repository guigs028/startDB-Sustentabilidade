package com.ecodb.eco_points.dto;

import jakarta.validation.constraints.Size;

public record UpdateUserDTO(
    @Size(max = 100, message = "O nome deve ter no máximo 100 caracteres")
    String nome,
    
    @Size(min = 10, max = 15, message = "O telefone deve ter entre 10 e 15 caracteres")
    String telefone,

    @Size(max = 200, message = "O endereço deve ter no máximo 200 caracteres")
    String endereco
) {
}
