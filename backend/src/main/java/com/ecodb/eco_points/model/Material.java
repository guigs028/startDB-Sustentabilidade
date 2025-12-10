package com.ecodb.eco_points.model;

import com.ecodb.eco_points.model.enums.CategoriaMaterial;
import com.ecodb.eco_points.model.enums.DestinoMaterial;
import com.ecodb.eco_points.model.enums.UnidadeMedida;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "materiais")
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CategoriaMaterial categoria;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DestinoMaterial destino;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UnidadeMedida unidadePadrao;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
    
}
