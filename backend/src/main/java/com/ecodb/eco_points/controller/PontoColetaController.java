package com.ecodb.eco_points.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecodb.eco_points.dto.PontoColetaResponseDTO;
import com.ecodb.eco_points.service.PontoColetaService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/v1/pontos")
public class PontoColetaController {
    
    private PontoColetaService pontoColetaService;

    public PontoColetaController(PontoColetaService pontoColetaService) {
        this.pontoColetaService = pontoColetaService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('GERADOR', 'COLETOR')")
    public ResponseEntity<List<PontoColetaResponseDTO>> listarPontosDeColeta ( 
        @RequestParam(required = false) String nome,
        @RequestParam(required = false) Long materialId) {
        
            List<PontoColetaResponseDTO> resultadosDaLista = pontoColetaService.buscarPontosDeColeta(nome, materialId);

            return ResponseEntity.ok(resultadosDaLista);
    }
    
}
