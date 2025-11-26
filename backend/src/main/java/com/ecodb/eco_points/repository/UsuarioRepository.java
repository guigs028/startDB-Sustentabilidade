package com.ecodb.eco_points.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecodb.eco_points.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
}
