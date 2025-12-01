package com.ecodb.eco_points.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.ecodb.eco_points.model.Material;
import com.ecodb.eco_points.model.PontoColeta;

public record PontoColetaResponseDTO(
    Long id,
    String nome,
    String endereco,
    List<String> materiais
) {
    public static PontoColetaResponseDTO fromEntity(PontoColeta pontoColeta) {
        List<String> nomesMateriais = pontoColeta.getMateriais().stream()
            .map(Material::getNome)
            .collect(Collectors.toList());
        
            return new PontoColetaResponseDTO(
                pontoColeta.getId(),
                pontoColeta.getNome(), 
                pontoColeta.getEndereco(), 
                nomesMateriais
            );
    }
}
