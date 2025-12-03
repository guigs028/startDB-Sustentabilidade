package com.ecodb.eco_points.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecodb.eco_points.dto.AtualizaStatusDTO;
import com.ecodb.eco_points.dto.DescarteDTO;
import com.ecodb.eco_points.dto.DescarteResponseDTO;
import com.ecodb.eco_points.model.Descarte;
import com.ecodb.eco_points.service.DescarteService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/v1/descartes")
public class DescarteController {

    private DescarteService descarteService;

    public DescarteController(DescarteService descarteService) {
        this.descarteService = descarteService;
    }

    @PostMapping
    @PreAuthorize("hasAuthority('GERADOR')")
    public ResponseEntity<DescarteResponseDTO> criarSolicitacaoDescarte(
            @RequestBody @Valid DescarteDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        Descarte descarte = descarteService.criarSolicitacao(dto, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(new DescarteResponseDTO(descarte));
    }

    @GetMapping("/historico")
    @PreAuthorize("hasAuthority('GERADOR')")
    public ResponseEntity<List<DescarteResponseDTO>> listarHistorico(
            @AuthenticationPrincipal UserDetails userDetails) {
        
        List<DescarteResponseDTO> historico = descarteService.listarHistorico(userDetails.getUsername());
        return ResponseEntity.ok(historico);
    }

    @GetMapping("/pendentes")
    @PreAuthorize("hasAuthority('COLETOR')")
    public ResponseEntity<List<DescarteResponseDTO>> listarOsPendentes(
        @AuthenticationPrincipal UserDetails userDetails) {

       List<DescarteResponseDTO> descartesPendentes = descarteService.listarPendentesColetor(userDetails.getUsername());

       return ResponseEntity.ok(descartesPendentes);
    }

    @PostMapping("/{id}/status")
    @PreAuthorize("hasAuthority('COLETOR')")
    public ResponseEntity<Void> atualizaStatus (
        @PathVariable Long id,
        @RequestBody @Valid AtualizaStatusDTO dto,
        @AuthenticationPrincipal UserDetails userDetails) {
        
        descarteService.atualizaStatus(id, dto.status(), userDetails.getUsername());

        return ResponseEntity.noContent().build();
    }
    
}
