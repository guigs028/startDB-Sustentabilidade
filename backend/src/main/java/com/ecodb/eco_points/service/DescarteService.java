package com.ecodb.eco_points.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecodb.eco_points.dto.DescarteDTO;
import com.ecodb.eco_points.dto.DescarteResponseDTO;
import com.ecodb.eco_points.model.Descarte;
import com.ecodb.eco_points.model.Material;
import com.ecodb.eco_points.model.PontoColeta;
import com.ecodb.eco_points.model.Usuario;
import com.ecodb.eco_points.model.enums.StatusDescarte;
import com.ecodb.eco_points.repository.DescarteRepository;
import com.ecodb.eco_points.repository.MaterialRepository;
import com.ecodb.eco_points.repository.PontoColetaRepository;
import com.ecodb.eco_points.repository.UsuarioRepository;

@Service
public class DescarteService {

    @Autowired
    private DescarteRepository descarteRepository;

    @Autowired
    private PontoColetaRepository pontoColetaRepository;

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public Descarte criarSolicitacao(DescarteDTO dto, String emailUsuario) {
        //verificar se o Ponto de Coleta existe
        PontoColeta pontoColeta = pontoColetaRepository.findById(dto.pontoColeta())
                .orElseThrow(() -> new IllegalArgumentException("Ponto de coleta não encontrado"));

        //verificar se o Material existe
        Material material = materialRepository.findById(dto.materialId())
                .orElseThrow(() -> new IllegalArgumentException("Material não encontrado"));

        // validar se o Ponto aceita este tipo de material
        if (!pontoColeta.getMateriais().contains(material)) {
            throw new IllegalArgumentException("Este ponto não aceita este tipo de material");
        }

        //recuperar usuário logado
        Usuario usuario = usuarioRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        // criar o descarte
        Descarte descarte = new Descarte();
        descarte.setPontoColeta(pontoColeta);
        descarte.setMaterial(material);
        descarte.setUsuario(usuario);
        descarte.setDescricaoEspecifica(dto.descricao());
        descarte.setQuantidade(dto.quantidade());
        descarte.setUnidadeMedida(dto.unMedida());
        descarte.setStatus(StatusDescarte.PENDENTE);
        descarte.setDataCriacao(LocalDateTime.now());

        return descarteRepository.save(descarte);
    }

    public List<DescarteResponseDTO> listarHistorico(String emailUsuario) {
        // recuperar usuário logado
        Usuario usuario = usuarioRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        //buscar descartes do usuário ordenados por data (mais recentes primeiro)
        List<Descarte> descartes = descarteRepository
                .findByUsuarioOrderByDataCriacaoDesc(usuario);

        //converter para DTO
        return descartes.stream()
                .map(d -> new DescarteResponseDTO(
                        d.getId(),
                        d.getDescricaoEspecifica(),
                        d.getQuantidade(),
                        d.getUnidadeMedida(),
                        d.getStatus(),
                        d.getDataCriacao(),
                        d.getMaterial().getNome(),
                        d.getPontoColeta().getNome(),
                        d.getPontoColeta().getEndereco()
                ))
                .toList();
    }
}
