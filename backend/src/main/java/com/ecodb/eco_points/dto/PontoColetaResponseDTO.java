package com.ecodb.eco_points.dto;

import com.ecodb.eco_points.model.enums.CategoriaMaterial;

import java.util.List;

public record PontoColetaResponseDTO(
    Long id,
    String nome,
    String endereco,
    String contato,
    String horarios,
    Double latitude,
    Double longitude,
    String donoNome,
    String donoEmail,
    List<CategoriaMaterial> categoriasAceitas
) {
}
