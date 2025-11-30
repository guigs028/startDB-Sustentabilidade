package com.ecodb.eco_points.controller.pontoColeta;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecodb.eco_points.dto.PontoColetaDTO;
import com.ecodb.eco_points.dto.PontoColetaResponseDTO;
import com.ecodb.eco_points.service.PontoColetaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/pontos")
public class PontoColetaController {

    @Autowired
    private PontoColetaService pontoColetaService;

    @PostMapping
    @PreAuthorize("hasAuthority('COLETOR')")
    public ResponseEntity<PontoColetaResponseDTO> criarPontoColeta(
            @Valid @RequestBody PontoColetaDTO dto) {
        PontoColetaResponseDTO response = pontoColetaService.criarPontoColeta(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/meus")
    @PreAuthorize("hasAuthority('COLETOR')")
    public ResponseEntity<List<PontoColetaResponseDTO>> listarMeusPontosColeta() {
        List<PontoColetaResponseDTO> pontos = pontoColetaService.listarMeusPontosColeta();
        return ResponseEntity.ok(pontos);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('COLETOR')")
    public ResponseEntity<Void> deletarPontoColeta(@PathVariable Long id) {
        pontoColetaService.deletarPontoColeta(id);
        return ResponseEntity.noContent().build();
    }
}
