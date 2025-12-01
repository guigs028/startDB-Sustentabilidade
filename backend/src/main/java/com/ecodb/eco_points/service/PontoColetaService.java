package com.ecodb.eco_points.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ecodb.eco_points.dto.PontoColetaResponseDTO;
import com.ecodb.eco_points.repository.PontoColetaRepository;
import com.ecodb.eco_points.repository.spec.PontoColetaSpecs;

@Service
public class PontoColetaService {

    private PontoColetaRepository pontoColetaRepository;

    public PontoColetaService(PontoColetaRepository pontoColetaRepository) {
        this.pontoColetaRepository = pontoColetaRepository;
    }

    public List<PontoColetaResponseDTO> buscarPontosDeColeta(String nome, Long materialId) {

        var pontos = pontoColetaRepository.findAll(PontoColetaSpecs.pontosColetaFiltro(nome, materialId));

        return pontos.stream()
                .map(PontoColetaResponseDTO::fromEntity)
                .toList();
    }
}
