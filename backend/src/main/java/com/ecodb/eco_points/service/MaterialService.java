package com.ecodb.eco_points.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ecodb.eco_points.dto.MaterialDTO;
import com.ecodb.eco_points.exception.UsuarioNotFoundException;
import com.ecodb.eco_points.model.Material;
import com.ecodb.eco_points.model.Usuario;
import com.ecodb.eco_points.repository.MaterialRepository;
import com.ecodb.eco_points.repository.UsuarioRepository;

@Service
public class MaterialService {
    
    private MaterialRepository materialRepository;
    private UsuarioRepository usuarioRepository;

    public MaterialService(MaterialRepository materialRepository, UsuarioRepository usuarioRepository) {
        this.materialRepository = materialRepository;
        this.usuarioRepository = usuarioRepository;
    }
    
    public List<MaterialDTO> getAllMaterials() {
        return materialRepository.findAll().stream()
            .map(material -> new MaterialDTO(
                material.getId(),
                material.getNome(),
                material.getCategoria(),
                material.getDestino(),
                material.getUnidadePadrao()
            ))
            .toList();
    }

    public List<MaterialDTO> getMaterialsByUsuario(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new UsuarioNotFoundException("Usuário não encontrado"));
        
        // Retorna apenas materiais que NÃO têm descartes associados
        return materialRepository.findByUsuarioSemDescartes(usuario).stream()
            .map(material -> new MaterialDTO(
                material.getId(),
                material.getNome(),
                material.getCategoria(),
                material.getDestino(),
                material.getUnidadePadrao()
            ))
            .toList();
    }

    public MaterialDTO createMaterial(MaterialDTO materialDTO, String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new UsuarioNotFoundException("Usuário não encontrado"));
        
        Material material = new Material();
        material.setNome(materialDTO.nome());
        material.setCategoria(materialDTO.categoria());
        material.setDestino(materialDTO.destino());
        material.setUnidadePadrao(materialDTO.unidadePadrao());
        material.setUsuario(usuario);
        
        Material saved = materialRepository.save(material);
        
        return new MaterialDTO(
            saved.getId(),
            saved.getNome(),
            saved.getCategoria(),
            saved.getDestino(),
            saved.getUnidadePadrao()
        );
    }
}
