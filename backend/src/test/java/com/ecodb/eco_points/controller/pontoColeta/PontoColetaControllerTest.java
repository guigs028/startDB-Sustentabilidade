package com.ecodb.eco_points.controller.pontoColeta;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.ecodb.eco_points.dto.PontoColetaDTO;
import com.ecodb.eco_points.dto.PontoColetaResponseDTO;
import com.ecodb.eco_points.service.PontoColetaService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(PontoColetaController.class)
class PontoColetaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private PontoColetaService pontoColetaService;

    @MockitoBean
    private com.ecodb.eco_points.service.JwtService jwtService;

    @MockitoBean
    private com.ecodb.eco_points.service.UserDetailsServiceImpl userDetailsService;

    private PontoColetaResponseDTO pontoColetaResponse;

    @BeforeEach
    void setUp() {
        List<PontoColetaResponseDTO.MaterialResponseDTO> materiais = Arrays.asList(
            new PontoColetaResponseDTO.MaterialResponseDTO(1L, "Plástico", "PLASTICO", "RECICLAGEM"),
            new PontoColetaResponseDTO.MaterialResponseDTO(2L, "Papel", "PAPEL", "RECICLAGEM")
        );

        pontoColetaResponse = new PontoColetaResponseDTO(
            1L,
            "Ponto Eco",
            "Rua Test, 123",
            "1234-5678",
            "A definir",
            null,
            null,
            "João Coletor",
            "joao@example.com",
            materiais
        );
    }

    @Test
    @DisplayName("POST /pontos - Should create collection point successfully")
    @WithMockUser(username = "joao@example.com", authorities = {"COLETOR"})
    void shouldCreatePontoColetaSuccessfully() throws Exception {
        // Arrange
        PontoColetaDTO dto = new PontoColetaDTO(
            "Ponto Eco",
            "Rua Test, 123",
            "1234-5678",
            Arrays.asList(1L, 2L)
        );

        when(pontoColetaService.criarPontoColeta(any(PontoColetaDTO.class)))
            .thenReturn(pontoColetaResponse);

        // Act & Assert
        mockMvc.perform(post("/pontos")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.nome").value("Ponto Eco"))
            .andExpect(jsonPath("$.endereco").value("Rua Test, 123"))
            .andExpect(jsonPath("$.contato").value("1234-5678"))
            .andExpect(jsonPath("$.donoNome").value("João Coletor"))
            .andExpect(jsonPath("$.materiais").isArray())
            .andExpect(jsonPath("$.materiais[0].nome").value("Plástico"));
    }

    @Test
    @DisplayName("POST /pontos - Should return 400 when validation fails")
    @WithMockUser(username = "joao@example.com", authorities = {"COLETOR"})
    void shouldReturn400WhenValidationFails() throws Exception {
        // Arrange - DTO inválido (nome vazio)
        PontoColetaDTO dto = new PontoColetaDTO(
            "",
            "Rua Test, 123",
            "1234-5678",
            Arrays.asList(1L, 2L)
        );

        // Act & Assert
        mockMvc.perform(post("/pontos")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("GET /pontos/meus - Should list user's collection points")
    @WithMockUser(username = "joao@example.com", authorities = {"COLETOR"})
    void shouldListUserCollectionPoints() throws Exception {
        // Arrange
        when(pontoColetaService.listarMeusPontosColeta())
            .thenReturn(Arrays.asList(pontoColetaResponse));

        // Act & Assert
        mockMvc.perform(get("/pontos/meus"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$[0].id").value(1))
            .andExpect(jsonPath("$[0].nome").value("Ponto Eco"))
            .andExpect(jsonPath("$[0].materiais").isArray());
    }

}
