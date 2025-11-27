package com.ecodb.eco_points.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ecodb.eco_points.model.Usuario;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    // Chave secreta vinda do application.properties
    @Value("${jwt.secret:minha-chave-secreta-super-segura-change-me-in-production}")
    private String secretKey;

    public String gerarToken(Usuario usuario) {
        return Jwts.builder()
                .subject(usuario.getEmail()) // Quem é o dono do token
                .claim("nome", usuario.getNome()) // Informações extras
                .claim("tipo", usuario.getRole().toString())
                .issuedAt(new Date()) // Quando foi criado
                .expiration(gerarDataExpiracao()) // Quando expira
                .signWith(getSigningKey()) // Assina com a chave secreta
                .compact(); // Cria o token
    }

    public String validarToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            return claims.getSubject(); // Retorna o email
        } catch (Exception e) {
            return null; // Token inválido
        }
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    private Date gerarDataExpiracao() {
        Instant expiracao = LocalDateTime.now()
                .plusHours(2)
                .toInstant(ZoneOffset.of("-03:00"));
        return Date.from(expiracao);
    }
}

