package com.ecodb.eco_points.dto;

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
    List<MaterialResponseDTO> materiais
) {
    public record MaterialResponseDTO(
        Long id,
        String nome,
        String categoria,
        String destino
    ) {
    }
}
