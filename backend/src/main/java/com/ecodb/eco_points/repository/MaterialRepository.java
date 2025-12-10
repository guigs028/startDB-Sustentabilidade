package com.ecodb.eco_points.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecodb.eco_points.model.Material;
import com.ecodb.eco_points.model.Usuario;

public interface  MaterialRepository extends JpaRepository<Material, Long> {
    Optional<Material> findByNome(String nome);
    List<Material> findByUsuario(Usuario usuario);
    
    @Query("SELECT m FROM Material m WHERE m.usuario = :usuario AND m.id NOT IN " +
           "(SELECT d.material.id FROM Descarte d WHERE d.usuario = :usuario)")
    List<Material> findByUsuarioSemDescartes(@Param("usuario") Usuario usuario);
}
