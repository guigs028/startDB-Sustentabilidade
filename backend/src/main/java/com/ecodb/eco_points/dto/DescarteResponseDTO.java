package com.ecodb.eco_points.dto;

import java.time.LocalDateTime;

import com.ecodb.eco_points.model.Descarte;
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
    String pontoColetaEndereco,
    String pontoColetaTelefone, 
    String geradorNome
) {

    /**
     * Construtor auxiliar para conversão de entidades para DTO
     */
    public DescarteResponseDTO(Descarte descarte) {
        this(
            descarte.getId(),
            descarte.getDescricaoEspecifica(),
            descarte.getQuantidade(),
            descarte.getUnidadeMedida().getAbreviacao(),
            descarte.getStatus(),
            descarte.getDataCriacao(),
            descarte.getMaterial().getNome(),
            descarte.getPontoColeta().getNome(),
            descarte.getPontoColeta().getEndereco(),
            descarte.getPontoColeta().getContato(),
            descarte.getUsuario() != null ? descarte.getUsuario().getNome() : "Usuário Desconhecido"
        );
    }

}
