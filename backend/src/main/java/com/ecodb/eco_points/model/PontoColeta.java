package com.ecodb.eco_points.model;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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

    @ManyToMany
    @JoinTable(
        name = "ponto_coleta_materiais",
        joinColumns = @JoinColumn(name = "ponto_coleta_id"),
        inverseJoinColumns = @JoinColumn(name = "material_id")
    )
    private Set<Material> materiais;
}
