package com.ecodb.eco_points.controller.material;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get; 
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.hasSize; 

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType; 
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.ecodb.eco_points.controller.MaterialController;
import com.ecodb.eco_points.dto.MaterialDTO;
import com.ecodb.eco_points.model.enums.CategoriaMaterial;
import com.ecodb.eco_points.model.enums.DestinoMaterial;
import com.ecodb.eco_points.service.JwtService;
import com.ecodb.eco_points.service.MaterialService;
import com.ecodb.eco_points.service.UserDetailsServiceImpl;

@WebMvcTest(MaterialController.class)
public class MaterialControllerTest {
    
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private MaterialService materialService;

    @MockitoBean 
    private JwtService jwtService;

    @MockitoBean 
    private UserDetailsServiceImpl userDetailsService;

    @Test
    @WithMockUser(username = "joao@example.com", authorities = {"COLETOR"})
    void getMateriaisShouldReturnMaterials() throws Exception {
        
        MaterialDTO material1 = new MaterialDTO(1L, "Plástico", 
            CategoriaMaterial.PLASTICO, DestinoMaterial.RECICLAGEM);
        MaterialDTO material2 = new MaterialDTO(2L, "Papelão", 
            CategoriaMaterial.PAPEL, DestinoMaterial.RECICLAGEM);
        
        List<MaterialDTO> materiaisMock = Arrays.asList(material1, material2);

        when(materialService.getAllMaterials())
            .thenReturn(materiaisMock);
        
        mockMvc.perform(get("/api/v1/materiais")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].nome").value("Plástico"))
                .andExpect(jsonPath("$[1].nome").value("Papelão"));
    }

    @Test
    @WithMockUser(username = "joao@example.com", authorities = {"COLETOR"})
    void getMaterialsShouldReturnEmptyList () throws Exception {
        when(materialService.getAllMaterials()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/materiais")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(0)));

    }
}