package com.ecodb.eco_points.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecodb.eco_points.dto.MaterialDTO;
import com.ecodb.eco_points.service.MaterialService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/v1/materiais")
public class MaterialController {

    private MaterialService materialService;

    public MaterialController(MaterialService materialService) {
        this.materialService = materialService;
    }

    @GetMapping
    public ResponseEntity<List<MaterialDTO>> getMaterials() {
        List<MaterialDTO> materials = materialService.getAllMaterials();
        return ResponseEntity.ok(materials);
    }

    @GetMapping("/meus")
    @PreAuthorize("hasAnyAuthority('GERADOR', 'COLETOR')")
    public ResponseEntity<List<MaterialDTO>> getMeusMateriais(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<MaterialDTO> materials = materialService.getMaterialsByUsuario(userDetails.getUsername());
        return ResponseEntity.ok(materials);
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('GERADOR', 'COLETOR')")
    public ResponseEntity<MaterialDTO> createMaterial(
            @Valid @RequestBody MaterialDTO materialDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        MaterialDTO created = materialService.createMaterial(materialDTO, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}