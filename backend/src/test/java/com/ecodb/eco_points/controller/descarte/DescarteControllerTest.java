package com.ecodb.eco_points.controller.descarte;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.RETURNS_DEEP_STUBS;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import com.ecodb.eco_points.controller.DescarteController;
import com.ecodb.eco_points.dto.AtualizaStatusDTO;
import com.ecodb.eco_points.dto.DescarteDTO;
import com.ecodb.eco_points.dto.DescarteResponseDTO;
import com.ecodb.eco_points.model.Descarte;
import com.ecodb.eco_points.model.enums.StatusDescarte;
import com.ecodb.eco_points.service.DescarteService;
import com.ecodb.eco_points.service.JwtService;
import com.ecodb.eco_points.service.UserDetailsServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ecodb.eco_points.config.SecurityConfig;
import com.ecodb.eco_points.exception.GlobalExceptionHandler;
import com.ecodb.eco_points.exception.UnauthorizedAccessException;

@WebMvcTest(DescarteController.class)
@Import({SecurityConfig.class, GlobalExceptionHandler.class})
public class DescarteControllerTest {
    
    @Autowired
    private MockMvc mockMvc;

    @Autowired 
    private ObjectMapper objectMapper;

    @MockitoBean
    private DescarteService descarteService;

    @MockitoBean 
    private JwtService jwtService;

    @MockitoBean 
    private UserDetailsServiceImpl userDetailsService;

    private Descarte descarteMock; 

    @BeforeEach
    void setUp() {
        descarteMock = mock(Descarte.class, RETURNS_DEEP_STUBS); // RETURNS_DEEP_STUBS instrui o mockito a n retornar null p/ chamada de getter e met que retorna obj
        
        when(descarteMock.getId()).thenReturn(1L);
        when(descarteMock.getDescricaoEspecifica()).thenReturn("3 sacolas de PET");
        when(descarteMock.getQuantidade()).thenReturn(5.0);
        when(descarteMock.getStatus()).thenReturn(StatusDescarte.PENDENTE);
        when(descarteMock.getDataCriacao()).thenReturn(LocalDateTime.now());
        
        when(descarteMock.getMaterial().getNome()).thenReturn("Garrafa PET");
        when(descarteMock.getPontoColeta().getNome()).thenReturn("EcoPonto Central");
        when(descarteMock.getPontoColeta().getEndereco()).thenReturn("Av. Principal, 100");
        when(descarteMock.getUnidadeMedida().getAbreviacao()).thenReturn("UN"); 
    }

    @Test
    @DisplayName("POST /descartes - Should create an solicitation successfully")
    @WithMockUser(username = "gerador@test.com", authorities = {"GERADOR"})
    void criarSolicitacaoDescarte_deveRetornar201_eDescarteCriado() throws Exception {
        DescarteDTO dto = new DescarteDTO(2L, 5L, 5.0, "Plástico misto");

        when(descarteService.criarSolicitacao(any(DescarteDTO.class), any(String.class)))
            .thenReturn(descarteMock); 

        // ACT & ASSERT
        mockMvc.perform(post("/api/v1/descartes")
                .with(csrf()) 
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.id").value(1L)) 
            .andExpect(jsonPath("$.materialNome").value("Garrafa PET"));
        
        
        verify(descarteService, times(1))
            .criarSolicitacao(any(DescarteDTO.class), any(String.class));
    }

    @Test
    @DisplayName("GET descartes/historico - Should return a list of wastes")
    @WithMockUser(username = "gaucho@test.com", authorities = {"GERADOR"})
    void listaHistoricoShouldReturnDescarteLista() throws Exception {
        DescarteResponseDTO descarteResponseDTO = new DescarteResponseDTO(
            1L, 
            "3 sacolas de PET", 
            5.0, 
            "UN", 
            StatusDescarte.PENDENTE, 
            LocalDateTime.now(),
            "Garrafa PET",
            "EcoPonto Central",
            "Av. Principal, 100"
        );
        
        List<DescarteResponseDTO> listaMock = Collections.singletonList(descarteResponseDTO);
        
        // mock do service
        when(descarteService.listarHistorico(any(String.class)))
            .thenReturn(listaMock);

        mockMvc.perform(get("/api/v1/descartes/historico"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(1)))
            .andExpect(jsonPath("$[0].pontoColetaNome").value("EcoPonto Central"));

        verify(descarteService, times(1))
            .listarHistorico("gaucho@test.com");
    }

    @Test
    @DisplayName("GET /pendentes - Should return a list of pending wastes for COLETOR")
    @WithMockUser(username = "coletor@test.com", authorities = {"COLETOR"})
    void listarOsPendentesShouldReturnListaDescartes() throws Exception {

        DescarteResponseDTO pendenteDTO = new DescarteResponseDTO( 10L, "Material pendente", 
        2.0, "KG", StatusDescarte.PENDENTE, 
            LocalDateTime.now().minusDays(1), "Plástico", "Meu Ponto", "Rua X"
        );
        
        List<DescarteResponseDTO> listaMock = Collections.singletonList(pendenteDTO);
        
        when(descarteService.listarPendentesColetor(any(String.class)))
            .thenReturn(listaMock);

        mockMvc.perform(get("/api/v1/descartes/pendentes"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(1)))
            .andExpect(jsonPath("$[0].status").value("PENDENTE"));

        verify(descarteService, times(1)).listarPendentesColetor("coletor@test.com");
    }

    @Test
    @DisplayName("POST /{id}/status - Should return 204 when status is updated successfully")
    @WithMockUser(username = "coletor@test.com", authorities = {"COLETOR"})
    void atualizaStatusShouldReturn204() throws Exception {
        Long descarteId = 50L;
        AtualizaStatusDTO dto = new AtualizaStatusDTO(StatusDescarte.CONCLUIDO); 
        
        mockMvc.perform(post("/api/v1/descartes/{id}/status", descarteId)
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isNoContent()); // 204

        verify(descarteService, times(1))
            .atualizaStatus(descarteId, StatusDescarte.CONCLUIDO, "coletor@test.com");
    }

    // adicionar mais testes
}
