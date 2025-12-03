package com.ecodb.eco_points.controller.auth;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecodb.eco_points.dto.MaterialDTO;
import com.ecodb.eco_points.service.MaterialService;

@RestController
@RequestMapping("api/v1/materials")
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    @GetMapping
    public ResponseEntity<List<MaterialDTO>> getMaterials() {
        List<MaterialDTO> materials = materialService.getAllMaterials();
        return ResponseEntity.ok(materials);
    }
}