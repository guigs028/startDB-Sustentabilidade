package com.ecodb.eco_points.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecodb.eco_points.model.Descarte;

public interface DescarteRepository extends JpaRepository<Descarte, Long> {
    
}
