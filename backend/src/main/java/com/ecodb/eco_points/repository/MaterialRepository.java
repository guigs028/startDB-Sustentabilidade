package com.ecodb.eco_points.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecodb.eco_points.model.Material;

public interface  MaterialRepository extends JpaRepository<Material, Long> {
    Optional<Material> findByNome(String nome);
    
    @Query("SELECT DISTINCT m FROM PontoColeta p JOIN p.materiais m WHERE p.dono.email = :email")
    List<Material> findAllByDonoEmail(@Param("email") String email);
}
