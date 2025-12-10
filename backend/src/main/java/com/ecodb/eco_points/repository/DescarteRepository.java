package com.ecodb.eco_points.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.ecodb.eco_points.model.Descarte;
import com.ecodb.eco_points.model.PontoColeta;
import com.ecodb.eco_points.model.Usuario;

public interface DescarteRepository extends JpaRepository<Descarte, Long>, JpaSpecificationExecutor<Descarte> {
    
    List<Descarte> findByUsuarioOrderByDataCriacaoDesc(Usuario usuario);
    void deleteByPontoColeta(PontoColeta pontoColeta);
}
