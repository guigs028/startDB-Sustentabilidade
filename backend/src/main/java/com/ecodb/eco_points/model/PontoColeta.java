package com.ecodb.eco_points.model;

import java.util.Set;

import com.ecodb.eco_points.model.enums.CategoriaMaterial;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
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
@Table(name = "pontos_coleta")
public class PontoColeta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String endereco;

    @Column(nullable = false)
    private String horarios;

    @Column(nullable = false)
    private String contato;

    private Double latitude;
    private Double longitude;

    @ManyToOne
    @JoinColumn(name = "dono_id")
    private Usuario dono;

    @ElementCollection(targetClass = CategoriaMaterial.class)
    @CollectionTable(name = "ponto_coleta_categorias", joinColumns = @JoinColumn(name = "ponto_coleta_id"))
    @Column(name = "categoria")
    @Enumerated(EnumType.STRING)
    private Set<CategoriaMaterial> categoriasAceitas;
}
