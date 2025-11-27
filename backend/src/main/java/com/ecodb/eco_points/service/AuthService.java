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
        //Buscar usuário pelo email
        Usuario usuario = usuarioRepository.findByEmail(dto.email())
                .orElseThrow(() -> new IllegalArgumentException("Credenciais inválidas"));

        //Verificar se a senha está correta
        // passwordHasher.matches compara a senha em texto plano com a hasheada
        if (!passwordHasher.matches(dto.senha(), usuario.getSenha())) {
            throw new IllegalArgumentException("Credenciais inválidas");
        }

        //Gerar o token JWT
        String token = jwtService.gerarToken(usuario);

        //Retornar a resposta com token e dados do usuário
        return new LoginResponseDTO(
            token,
            usuario.getEmail(),
            usuario.getNome(),
            usuario.getRole()
        );
    }
}
