package com.ecodb.eco_points.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecodb.eco_points.dto.DescarteDTO;
import com.ecodb.eco_points.dto.DescarteResponseDTO;
import com.ecodb.eco_points.exception.DescarteNotFoundException;
import com.ecodb.eco_points.exception.UnauthorizedAccessException;
import com.ecodb.eco_points.exception.UsuarioNotFoundException;
import com.ecodb.eco_points.model.Descarte;
import com.ecodb.eco_points.model.Material;
import com.ecodb.eco_points.model.PontoColeta;
import com.ecodb.eco_points.model.Usuario;
import com.ecodb.eco_points.model.enums.StatusDescarte;
import com.ecodb.eco_points.repository.DescarteRepository;
import com.ecodb.eco_points.repository.MaterialRepository;
import com.ecodb.eco_points.repository.PontoColetaRepository;
import com.ecodb.eco_points.repository.UsuarioRepository;
import com.ecodb.eco_points.repository.spec.DescarteSpecs;

@Service
public class DescarteService {

        private DescarteRepository descarteRepository;
        private PontoColetaRepository pontoColetaRepository;
        private MaterialRepository materialRepository;
        private UsuarioRepository usuarioRepository;

        public DescarteService(DescarteRepository descarteRepository, PontoColetaRepository pontoColetaRepository, 
                MaterialRepository materialRepository, UsuarioRepository usuarioRepository) {
                this.descarteRepository = descarteRepository;
                this.pontoColetaRepository = pontoColetaRepository;
                this.materialRepository = materialRepository;
                this.usuarioRepository = usuarioRepository;
        }

        @Transactional
        public Descarte criarSolicitacao(DescarteDTO dto, String emailUsuario) {
                PontoColeta pontoColeta = pontoColetaRepository.findById(dto.pontoColetaId())
                                .orElseThrow(() -> new IllegalArgumentException("Ponto de coleta não encontrado"));

                Material material = materialRepository.findById(dto.materialId())
                                .orElseThrow(() -> new IllegalArgumentException("Material não encontrado"));

                // validar se o Ponto aceita esta CATEGORIA de material
                if (!pontoColeta.getMateriais().contains(material)) {
                        throw new IllegalArgumentException("Este ponto não aceita este tipo de material");
                }

                // recuperar usuário logado
                Usuario usuario = usuarioRepository.findByEmail(emailUsuario)
                                .orElseThrow(() -> new UsuarioNotFoundException(emailUsuario));

                // criar o descarte
                Descarte descarte = new Descarte();
                descarte.setPontoColeta(pontoColeta);
                descarte.setMaterial(material);
                descarte.setUsuario(usuario);
                descarte.setDescricaoEspecifica(dto.descricao());
                descarte.setQuantidade(dto.quantidade());
                descarte.setUnidadeMedida(material.getUnidadePadrao()); // Usa unidade padrão do material
                descarte.setStatus(StatusDescarte.PENDENTE);
                descarte.setDataCriacao(LocalDateTime.now());

                return descarteRepository.save(descarte);
        }

        public List<DescarteResponseDTO> listarHistorico(String emailUsuario) {
                Usuario usuario = usuarioRepository.findByEmail(emailUsuario)
                                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

                // buscar descartes do usuário ordenados por data (mais recentes primeiro)
                List<Descarte> descartes = descarteRepository
                                .findByUsuarioOrderByDataCriacaoDesc(usuario);

                return descartes.stream()
                                .map(DescarteResponseDTO::new)
                                .toList();
        }

        public List<DescarteResponseDTO> listarPendentesColetor(String emailDoColetor) {
                var encontraPendentePorDono = DescarteSpecs.encontraPendentePorDono(emailDoColetor);

                List<Descarte> pendentes = descarteRepository.findAll(encontraPendentePorDono);

                return pendentes.stream()
                                .map(DescarteResponseDTO::new)
                                .toList();
        }

        @Transactional
        public void atualizaStatus(Long idDescarte, StatusDescarte novoStatus, String emailDoColetor) {

                Descarte descarte = descarteRepository.findById(idDescarte)
                                .orElseThrow(() -> new DescarteNotFoundException(idDescarte));

                String emailDonoPontoDeColeta = descarte.getPontoColeta().getDono().getEmail();

                if (!emailDonoPontoDeColeta.equals(emailDoColetor)) {
                        throw new UnauthorizedAccessException("Acesso negado: Este descarte não pertence aos seus pontos de coleta.");
                }

                if (descarte.getStatus() != StatusDescarte.PENDENTE) {
                        throw new IllegalArgumentException("Não é possível alterar um descarte que já foi finalizado (Concluído ou Cancelado).");
                }

                descarte.setStatus(novoStatus);
                descarteRepository.save(descarte);
        }

}
