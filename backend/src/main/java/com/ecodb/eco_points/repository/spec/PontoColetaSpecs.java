package com.ecodb.eco_points.repository.spec;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;
import jakarta.persistence.criteria.Join;

import com.ecodb.eco_points.model.Material;
import com.ecodb.eco_points.model.PontoColeta;

public class PontoColetaSpecs {
    public static Specification<PontoColeta> pontosColetaFiltro (String nome, Long materialId) {
        return (root, query, builder ) -> {
            query.distinct(true);

            var predicate = builder.conjunction();

            // regra da filtragem do nome (usando o Like)
            if (StringUtils.hasText(nome)) {
                predicate = builder.and(predicate,
                    builder.like(
                        builder.lower(root.get("nome")),
                        "%" + nome.toLowerCase() + "%"
                    )
                );
            }

            // regra do material id (se o id existe ele faz o join e filtra)
            if (materialId != null) {
                Join<PontoColeta, Material> materiaisJoin = root.join("materiais");
                predicate = builder.and(predicate,
                    builder.equal(materiaisJoin.get("id"), materialId)
                );
            }

            query.orderBy(builder.asc(root.get("nome")));

            return predicate;
        };
    }
}
