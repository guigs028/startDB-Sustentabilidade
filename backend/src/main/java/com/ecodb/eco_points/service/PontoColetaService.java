package com.ecodb.eco_points.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
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

@Service
public class PontoColetaService {

    @Autowired
    private PontoColetaRepository pontoColetaRepository;

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public PontoColetaResponseDTO criarPontoColeta(PontoColetaDTO dto) {
        Usuario usuarioLogado = obterUsuarioLogado();

        // Validar se os materiais existem
        Set<Material> materiais = validarEObterMateriais(dto.materiaisAceitos());

        PontoColeta pontoColeta = new PontoColeta();
        pontoColeta.setNome(dto.nome());
        pontoColeta.setEndereco(dto.endereco());
        pontoColeta.setContato(dto.contato());
        pontoColeta.setHorarios("A definir"); // Valor padrão
        pontoColeta.setDono(usuarioLogado);
        pontoColeta.setMateriais(materiais);

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
    public void deletarPontoColeta(Long pontoId) {
        Usuario usuarioLogado = obterUsuarioLogado();

        PontoColeta ponto = pontoColetaRepository.findById(pontoId)
                .orElseThrow(() -> new PontoColetaNotFoundException(pontoId));

        // Verificar se o ponto pertence ao usuário logado
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

    private Set<Material> validarEObterMateriais(List<Long> materiaisIds) {
        Set<Material> materiais = new HashSet<>();

        for (Long materialId : materiaisIds) {
            Material material = materialRepository.findById(materialId)
                    .orElseThrow(() -> new MaterialNotFoundException(materialId));
            materiais.add(material);
        }

        return materiais;
    }

    private PontoColetaResponseDTO converterParaResponseDTO(PontoColeta ponto) {
        List<PontoColetaResponseDTO.MaterialResponseDTO> materiaisDTO = ponto.getMateriais()
                .stream()
                .map(material -> new PontoColetaResponseDTO.MaterialResponseDTO(
                    material.getId(),
                    material.getNome(),
                    material.getCategoria().name(),
                    material.getDestino().name()
                ))
                .collect(Collectors.toList());

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
            materiaisDTO
        );
    }
}
