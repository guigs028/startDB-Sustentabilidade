package com.ecodb.eco_points.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecodb.eco_points.model.Material;

public interface  MaterialRepository extends JpaRepository<Material, Long> {
    Optional<Material> findByNome(String nome);
}
