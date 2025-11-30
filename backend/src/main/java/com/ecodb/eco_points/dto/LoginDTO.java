package com.ecodb.eco_points.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginDTO(
    @NotBlank(message = "O email é obrigatório")
    @Email(message = "O formato do email é inválido")
    String email,

    @NotBlank(message = "A senha é obrigatória")
    String senha
) {}