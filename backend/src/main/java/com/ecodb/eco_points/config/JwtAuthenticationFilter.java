package com.ecodb.eco_points.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ecodb.eco_points.service.JwtService;
import com.ecodb.eco_points.service.UserDetailsServiceImpl;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        // 1. Extrair o token do header Authorization
        String authHeader = request.getHeader("Authorization");
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2. Remover "Bearer " do início
        String token = authHeader.substring(7);

        // 3. Validar o token e extrair o email
        String email = jwtService.validarToken(token);

        // 4. Se o token for válido e não houver autenticação ainda
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // 5. Carregar os detalhes do usuário
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            // 6. Criar o objeto de autenticação
            UsernamePasswordAuthenticationToken authentication = 
                new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
                );

            authentication.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request)
            );

            // 7. Definir a autenticação no contexto de segurança
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        // 8. Continuar a cadeia de filtros
        filterChain.doFilter(request, response);
    }
}
