package com.ecodb.eco_points.dto;

import java.time.LocalDateTime;

import com.ecodb.eco_points.model.enums.StatusDescarte;

public record DescarteResponseDTO(
    Long id,
    String descricaoEspecifica,
    Double quantidade,
    String unidadeMedida,
    StatusDescarte status,
    LocalDateTime dataCriacao,
    String materialNome,
    String pontoColetaNome,
    String pontoColetaEndereco
) {}
