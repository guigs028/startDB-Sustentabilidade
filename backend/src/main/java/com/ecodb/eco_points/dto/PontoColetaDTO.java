package com.ecodb.eco_points.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

public record PontoColetaDTO(
    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
    String nome,

    @NotBlank(message = "Endereço é obrigatório")
    @Size(min = 10, max = 255, message = "Endereço deve ter entre 10 e 255 caracteres")
    String endereco,

    @NotBlank(message = "Contato é obrigatório")
    @Size(min = 8, max = 50, message = "Contato deve ter entre 8 e 50 caracteres")
    String contato,

    @NotNull(message = "Lista de materiais aceitos é obrigatória")
    @Size(min = 1, message = "Pelo menos um material deve ser informado")
    List<Long> materiaisAceitos
) {
}
