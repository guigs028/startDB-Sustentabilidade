package com.ecodb.eco_points.dto;

import java.time.LocalDateTime;

import com.ecodb.eco_points.model.Descarte;
import com.ecodb.eco_points.model.enums.CategoriaMaterial;
import com.ecodb.eco_points.model.enums.StatusDescarte;

public record DescarteResponseDTO(
    Long id,
    String descricaoEspecifica,
    Double quantidade,
    String unidadeMedida,
    StatusDescarte status,
    LocalDateTime dataCriacao,
    MaterialInfo material,
    PontoColetaInfo pontoColeta
) {

    public record MaterialInfo(
        Long id,
        String nome,
        CategoriaMaterial categoria
    ) {}

    public record PontoColetaInfo(
        Long id,
        String nome,
        String endereco
    ) {}

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
            new MaterialInfo(
                descarte.getMaterial().getId(),
                descarte.getMaterial().getNome(),
                descarte.getMaterial().getCategoria()
            ),
            new PontoColetaInfo(
                descarte.getPontoColeta().getId(),
                descarte.getPontoColeta().getNome(),
                descarte.getPontoColeta().getEndereco()
            )
        );
    }

}
