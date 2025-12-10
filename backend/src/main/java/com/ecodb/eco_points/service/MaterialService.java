package com.ecodb.eco_points.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ecodb.eco_points.dto.MaterialDTO;
import com.ecodb.eco_points.repository.MaterialRepository;

@Service
public class MaterialService {
    
    private MaterialRepository materialRepository;

    public MaterialService(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }
    
    public List<MaterialDTO> getAllMaterials() {
        return materialRepository.findAll().stream()
            .map(material -> new MaterialDTO(
                material.getId(),
                material.getNome(),
                material.getCategoria(),
                material.getDestino()
            ))
            .toList();
    }

}
