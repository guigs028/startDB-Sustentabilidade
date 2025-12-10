package com.ecodb.eco_points.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecodb.eco_points.dto.PontoColetaDTO;
import com.ecodb.eco_points.dto.PontoColetaResponseDTO;
import com.ecodb.eco_points.exception.MaterialNotFoundException;
import com.ecodb.eco_points.exception.PontoColetaNotFoundException;
import com.ecodb.eco_points.exception.UnauthorizedAccessException;
import com.ecodb.eco_points.model.Material;
import com.ecodb.eco_points.model.PontoColeta;
import com.ecodb.eco_points.model.Usuario;
import com.ecodb.eco_points.repository.MaterialRepository;
import com.ecodb.eco_points.repository.PontoColetaRepository;
import com.ecodb.eco_points.repository.UsuarioRepository;
import com.ecodb.eco_points.repository.spec.PontoColetaSpecs;

@Service
public class PontoColetaService {

    private PontoColetaRepository pontoColetaRepository;
    private MaterialRepository materialRepository;
    private UsuarioRepository usuarioRepository;

    public PontoColetaService(PontoColetaRepository pontoColetaRepository, 
        MaterialRepository materialRepository, UsuarioRepository usuarioRepository) {
            this.materialRepository = materialRepository;
            this.pontoColetaRepository = pontoColetaRepository;
            this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    public PontoColetaResponseDTO criarPontoColeta(PontoColetaDTO dto) {
        Usuario usuarioLogado = obterUsuarioLogado();

        PontoColeta pontoColeta = new PontoColeta();
        pontoColeta.setNome(dto.nome());
        pontoColeta.setEndereco(dto.endereco());
        pontoColeta.setContato(dto.contato());
        pontoColeta.setHorarios("A definir"); // Valor padrão
        pontoColeta.setDono(usuarioLogado);
        pontoColeta.setCategoriasAceitas(new HashSet<>(dto.categoriasAceitas()));

        PontoColeta pontoSalvo = pontoColetaRepository.save(pontoColeta);

        return converterParaResponseDTO(pontoSalvo);
    }

    @Transactional(readOnly = true)
    public List<PontoColetaResponseDTO> listarMeusPontosColeta() {
        Usuario usuarioLogado = obterUsuarioLogado();
        
        List<PontoColeta> pontos = pontoColetaRepository.findByDono(usuarioLogado);

        return pontos.stream()
                .map(this::converterParaResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public PontoColetaResponseDTO editarPontoColeta(Long pontoId, PontoColetaDTO dto) {
        Usuario usuarioLogado = obterUsuarioLogado();

        PontoColeta ponto = pontoColetaRepository.findById(pontoId)
                .orElseThrow(() -> new PontoColetaNotFoundException(pontoId));

        // Verificar se o ponto pertence ao usuário logado
        if (!ponto.getDono().getId().equals(usuarioLogado.getId())) {
            throw new UnauthorizedAccessException(
                "Você não tem permissão para editar este ponto de coleta"
            );
        }

        // Atualizar dados do ponto
        ponto.setNome(dto.nome());
        ponto.setEndereco(dto.endereco());
        ponto.setContato(dto.contato());
        ponto.setCategoriasAceitas(new HashSet<>(dto.categoriasAceitas()));

        PontoColeta pontoAtualizado = pontoColetaRepository.save(ponto);

        return converterParaResponseDTO(pontoAtualizado);
    }

    @Transactional
    public void deletarPontoColeta(Long pontoId) {
        Usuario usuarioLogado = obterUsuarioLogado();

        PontoColeta ponto = pontoColetaRepository.findById(pontoId)
                .orElseThrow(() -> new PontoColetaNotFoundException(pontoId));

        if (!ponto.getDono().getId().equals(usuarioLogado.getId())) {
            throw new UnauthorizedAccessException(
                "Você não tem permissão para deletar este ponto de coleta"
            );
        }

        pontoColetaRepository.delete(ponto);
    }

    private Usuario obterUsuarioLogado() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
    }

    private PontoColetaResponseDTO converterParaResponseDTO(PontoColeta ponto) {
        return new PontoColetaResponseDTO(
            ponto.getId(),
            ponto.getNome(),
            ponto.getEndereco(),
            ponto.getContato(),
            ponto.getHorarios(),
            ponto.getLatitude(),
            ponto.getLongitude(),
            ponto.getDono().getNome(),
            ponto.getDono().getEmail(),
            ponto.getCategoriasAceitas().stream().collect(Collectors.toList())
        );
    }

    // Método de busca pública
    public List<PontoColetaResponseDTO> buscarPontosDeColeta(String nome, Long materialId) {
        var pontos = pontoColetaRepository.findAll(PontoColetaSpecs.pontosColetaFiltro(nome, materialId));
        return pontos.stream()
                .map(this::converterParaResponseDTO)
                .collect(Collectors.toList());
    }
}
