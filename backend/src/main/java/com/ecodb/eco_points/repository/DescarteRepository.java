package com.ecodb.eco_points.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecodb.eco_points.model.Descarte;
import com.ecodb.eco_points.model.Usuario;

public interface DescarteRepository extends JpaRepository<Descarte, Long> {
    
    List<Descarte> findByUsuarioOrderByDataCriacaoDesc(Usuario usuario);
    
}
