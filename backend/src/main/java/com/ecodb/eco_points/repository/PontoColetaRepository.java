package com.ecodb.eco_points.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecodb.eco_points.model.PontoColeta;

public interface PontoColetaRepository extends JpaRepository<PontoColeta, Long> {
    
}
