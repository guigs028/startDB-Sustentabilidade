package com.ecodb.eco_points.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecodb.eco_points.dto.UpdateUserDTO;
import com.ecodb.eco_points.dto.UserResponseDTO;
import com.ecodb.eco_points.exception.UsuarioNotFoundException;
import com.ecodb.eco_points.model.Usuario;
import com.ecodb.eco_points.repository.UsuarioRepository;

@Service
public class UserService {
    @Autowired
    private UsuarioRepository userRepository;

    private UserResponseDTO converterParaDTO(Usuario usuario) {
        return new UserResponseDTO(
            usuario.getNome(),
            usuario.getEmail(),
            usuario.getTelefone(),
            usuario.getEndereco(),
            usuario.getRole()
        );
    }

    public UserResponseDTO getUserByEmail(String email) {
        Usuario user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsuarioNotFoundException(email));
        
        return converterParaDTO(user);
    }

    public UserResponseDTO atualizarPerfil(String email, UpdateUserDTO dto) {
        Usuario usuario = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsuarioNotFoundException(email));

        if(dto.nome() != null && !dto.nome().isBlank()) {
            usuario.setNome(dto.nome());
        }

        if(dto.telefone() != null && !dto.telefone().isBlank()) {
            usuario.setTelefone(dto.telefone());
        }

        if(dto.endereco() != null && !dto.endereco().isBlank()) {
            usuario.setEndereco(dto.endereco());
        }

        userRepository.save(usuario);
        return converterParaDTO(usuario);   
    }


}
