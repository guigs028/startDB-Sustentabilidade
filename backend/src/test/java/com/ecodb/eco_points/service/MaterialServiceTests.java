package com.ecodb.eco_points.service;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Collections;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.ecodb.eco_points.dto.MaterialDTO;
import com.ecodb.eco_points.model.Material;
import com.ecodb.eco_points.model.enums.CategoriaMaterial;
import com.ecodb.eco_points.model.enums.DestinoMaterial;
import com.ecodb.eco_points.model.enums.UnidadeMedida;
import com.ecodb.eco_points.repository.MaterialRepository;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
public class MaterialServiceTests {
    
    @Mock
    private MaterialRepository materialRepository;

    @InjectMocks // injecao necessaria para o teste
    private MaterialService materialService;

    private Material materialUm;
    private Material materialDois;

    @BeforeEach
    void setUp() {
        materialUm = new Material();
        materialUm.setId(1L);
        materialUm.setNome("Garrafa");
        materialUm.setCategoria(CategoriaMaterial.PLASTICO);
        materialUm.setDestino(DestinoMaterial.RECICLAGEM);
        materialUm.setUnidadePadrao(UnidadeMedida.UNIDADE);

        materialDois = new Material();
        materialDois.setId(2L);
        materialDois.setNome("Caixa");
        materialDois.setCategoria(CategoriaMaterial.PAPEL);
        materialDois.setDestino(DestinoMaterial.RECICLAGEM);
        materialDois.setUnidadePadrao(UnidadeMedida.UNIDADE);
    }

    @Test
    void getAllMaterialsShouldReturnListMapped() {
        List<Material> materiaisMock = Arrays.asList(materialUm, materialDois);

        when(materialRepository
            .findAll())
            .thenReturn(materiaisMock);
        
        // chama o metodo
        List<MaterialDTO> result = materialService.getAllMaterials();

        // validações
        assertThat(result).isNotNull();
        assertThat(result).hasSize(2);

        assertThat(result.get(0).id()).isEqualTo(1L); 
        assertThat(result.get(0).nome()).isEqualTo("Garrafa"); 
        assertThat(result.get(0).categoria()).isEqualTo(CategoriaMaterial.PLASTICO);

        assertThat(result.get(1).id()).isEqualTo(2L); 
        assertThat(result.get(1).nome()).isEqualTo("Caixa"); 
        assertThat(result.get(1).categoria()).isEqualTo(CategoriaMaterial.PAPEL);
        
        verify(materialRepository).findAll();
    }

    @Test
    void getAllMaterialsShouldReturnEmptyList() {
        when(materialRepository.findAll())
            .thenReturn(Collections.emptyList());
        
        List<MaterialDTO> result = materialService.getAllMaterials();

        assertThat(result).isNotNull();
        assertThat(result).isEmpty();

        verify(materialRepository).findAll();
    }
}
