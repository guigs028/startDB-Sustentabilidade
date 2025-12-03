package com.ecodb.eco_points.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecodb.eco_points.dto.MaterialDTO;
import com.ecodb.eco_points.repository.MaterialRepository;

@Service
public class MaterialService {
    
    @Autowired
    private MaterialRepository materialRepository;
    
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
