package com.ecodb.eco_points.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ecodb.eco_points.model.Usuario;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private static final Logger logger = LoggerFactory.getLogger(JwtService.class);

    @Value("${jwt.secret}")
    private String secretKey;

    public String gerarToken(Usuario usuario) {
        return Jwts.builder()
                .subject(usuario.getEmail()) 
                .claim("nome", usuario.getNome()) 
                .claim("tipo", usuario.getRole().toString())
                .issuedAt(new Date()) 
                .expiration(gerarDataExpiracao()) 
                .signWith(getSigningKey()) 
                .compact(); 
    }

    public String validarToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            return claims.getSubject(); 
        } catch (Exception e) {
            logger.error("Token inválido: {}", e.getMessage());
            return null; 
        }
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    private Date gerarDataExpiracao() {
       return Date.from(Instant.now().plus(2, ChronoUnit.HOURS));
    }
}

