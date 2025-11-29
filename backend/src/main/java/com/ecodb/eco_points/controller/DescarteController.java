package com.ecodb.eco_points.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecodb.eco_points.dto.DescarteDTO;
import com.ecodb.eco_points.dto.DescarteResponseDTO;
import com.ecodb.eco_points.model.Descarte;
import com.ecodb.eco_points.service.DescarteService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("descartes")
public class DescarteController {

    @Autowired
    private DescarteService descarteService;

    @PostMapping
    public ResponseEntity<DescarteResponseDTO> criarSolicitacaoDescarte(
            @RequestBody @Valid DescarteDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        Descarte descarte = descarteService.criarSolicitacao(dto, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(new DescarteResponseDTO(descarte));
    }

    @GetMapping("/historico")
    public ResponseEntity<List<DescarteResponseDTO>> listarHistorico(
            @AuthenticationPrincipal UserDetails userDetails) {
        
        List<DescarteResponseDTO> historico = descarteService.listarHistorico(userDetails.getUsername());
        return ResponseEntity.ok(historico);
    }
}
