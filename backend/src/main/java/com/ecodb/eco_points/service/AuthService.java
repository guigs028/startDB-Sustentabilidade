package com.ecodb.eco_points.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecodb.eco_points.dto.LoginDTO;
import com.ecodb.eco_points.dto.LoginResponseDTO;
import com.ecodb.eco_points.dto.RegisterDTO;
import com.ecodb.eco_points.model.Usuario;
import com.ecodb.eco_points.repository.UsuarioRepository;

@Service
public class AuthService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordHasher;

    @Autowired
    private JwtService jwtService;

    public void registrarUsuario (RegisterDTO dto) {
        if (usuarioRepository.existsByEmail(dto.email())) {
            throw new IllegalArgumentException("email em uso");
        }

        String senhaHasheada = passwordHasher.encode(dto.senha());

        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(dto.nome());
        novoUsuario.setEmail(dto.email());
        novoUsuario.setSenha(senhaHasheada);
        novoUsuario.setRole(dto.tipo());

        usuarioRepository.save(novoUsuario);
    }

    public LoginResponseDTO login(LoginDTO dto) {
        Usuario usuario = usuarioRepository.findByEmail(dto.email())
                .orElseThrow(() -> new IllegalArgumentException("Credenciais inválidas"));

        if (!passwordHasher.matches(dto.senha(), usuario.getSenha())) {
            throw new IllegalArgumentException("Credenciais inválidas");
        }

        String token = jwtService.gerarToken(usuario);

        return new LoginResponseDTO(
            token,
            usuario.getEmail(),
            usuario.getNome(),
            usuario.getRole()
        );
    }
}
