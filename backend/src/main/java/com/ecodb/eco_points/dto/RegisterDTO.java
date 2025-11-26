package com.ecodb.eco_points.dto;

import com.ecodb.eco_points.model.enums.TipoUsuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterDTO (
    @NotBlank(message = "O nome é obrigatório")
    String nome,

    @NotBlank(message = "O email é obrigatório")
    @Email(message = "O formato do email é inválido")
    String email,

    @NotBlank(message = "A senha é obrigatória")
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
    String senha,

    @NotNull(message = "O tipo de usuário é obrigatório")
    TipoUsuario tipo
) {}
