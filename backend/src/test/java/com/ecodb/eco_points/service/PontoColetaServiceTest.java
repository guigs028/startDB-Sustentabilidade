package com.ecodb.eco_points.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import com.ecodb.eco_points.dto.PontoColetaDTO;
import com.ecodb.eco_points.dto.PontoColetaResponseDTO;
import com.ecodb.eco_points.exception.UnauthorizedAccessException;
import com.ecodb.eco_points.model.Material;
import com.ecodb.eco_points.model.PontoColeta;
import com.ecodb.eco_points.model.Usuario;
import com.ecodb.eco_points.model.enums.CategoriaMaterial;
import com.ecodb.eco_points.model.enums.DestinoMaterial;
import com.ecodb.eco_points.model.enums.TipoUsuario;
import com.ecodb.eco_points.repository.MaterialRepository;
import com.ecodb.eco_points.repository.PontoColetaRepository;
import com.ecodb.eco_points.repository.UsuarioRepository;

@ExtendWith(MockitoExtension.class)
class PontoColetaServiceTest {

    @Mock
    private PontoColetaRepository pontoColetaRepository;

    @Mock
    private MaterialRepository materialRepository;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private PontoColetaService pontoColetaService;

    private Usuario usuarioColetor;
    private Material material1;
    private Material material2;
    private PontoColeta pontoColeta;

    @BeforeEach
    void setUp() {
        // Setup usuario
        usuarioColetor = new Usuario();
        usuarioColetor.setId(1L);
        usuarioColetor.setNome("João Coletor");
        usuarioColetor.setEmail("joao@example.com");
        usuarioColetor.setRole(TipoUsuario.COLETOR);

        // Setup materiais
        material1 = new Material();
        material1.setId(1L);
        material1.setNome("Plástico");
        material1.setCategoria(CategoriaMaterial.PLASTICO);
        material1.setDestino(DestinoMaterial.RECICLAGEM);

        material2 = new Material();
        material2.setId(2L);
        material2.setNome("Papel");
        material2.setCategoria(CategoriaMaterial.PAPEL);
        material2.setDestino(DestinoMaterial.RECICLAGEM);

        // Setup ponto coleta
        pontoColeta = new PontoColeta();
        pontoColeta.setId(1L);
        pontoColeta.setNome("Ponto Eco");
        pontoColeta.setEndereco("Rua Test, 123");
        pontoColeta.setContato("1234-5678");
        pontoColeta.setHorarios("A definir");
        pontoColeta.setDono(usuarioColetor);
        
        // CORREÇÃO: Usamos Set<Material> e setMateriais
        Set<Material> materiais = new HashSet<>();
        materiais.add(material1);
        materiais.add(material2);
        pontoColeta.setMateriais(materiais);

        // Mock security context
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("joao@example.com");
        when(usuarioRepository.findByEmail("joao@example.com")).thenReturn(Optional.of(usuarioColetor));
    }

    @Test
    @DisplayName("Should create collection point successfully")
    void shouldCreatePontoColetaSuccessfully() {
        // Arrange - Passamos IDs (List<Long>)
        PontoColetaDTO dto = new PontoColetaDTO(
            "Ponto Eco",
            "Rua Test, 123",
            "1234-5678",
            Arrays.asList(1L, 2L) 
        );

        // Mocks necessários para o findById dentro do loop validarEObterMateriais
        when(materialRepository.findById(1L)).thenReturn(Optional.of(material1));
        when(materialRepository.findById(2L)).thenReturn(Optional.of(material2));
        
        when(pontoColetaRepository.save(any(PontoColeta.class))).thenReturn(pontoColeta);

        // Act
        PontoColetaResponseDTO response = pontoColetaService.criarPontoColeta(dto);

        // Assert
        assertNotNull(response);
        assertEquals("Ponto Eco", response.nome());
        assertEquals("Rua Test, 123", response.endereco());
        assertEquals("1234-5678", response.contato());
        assertEquals("João Coletor", response.donoNome());
        
        // Verificamos a lista de materiais
        assertEquals(2, response.materiais().size()); 
        
        verify(pontoColetaRepository, times(1)).save(any(PontoColeta.class));
    }

    @Test
    @DisplayName("Should throw UnauthorizedAccessException when user tries to delete another user's point")
    void shouldThrowUnauthorizedAccessExceptionWhenDeletingAnotherUsersPoint() {
        // Arrange
        Usuario outroUsuario = new Usuario();
        outroUsuario.setId(2L);
        outroUsuario.setNome("Outro Usuario");
        outroUsuario.setEmail("outro@example.com");

        // Precisamos criar um objeto novo ou alterar o mock para este teste específico
        PontoColeta pontoOutroDono = new PontoColeta();
        pontoOutroDono.setId(1L);
        pontoOutroDono.setDono(outroUsuario);

        when(pontoColetaRepository.findById(1L)).thenReturn(Optional.of(pontoOutroDono));

        // Act & Assert
        assertThrows(UnauthorizedAccessException.class, () -> {
            pontoColetaService.deletarPontoColeta(1L);
        });
        verify(pontoColetaRepository, never()).delete(any(PontoColeta.class));
    }
}