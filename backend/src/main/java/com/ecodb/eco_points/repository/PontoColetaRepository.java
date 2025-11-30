package com.ecodb.eco_points.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecodb.eco_points.model.PontoColeta;
import com.ecodb.eco_points.model.Usuario;

public interface PontoColetaRepository extends JpaRepository<PontoColeta, Long> {
    List<PontoColeta> findByDono(Usuario dono);
}
