package com.ecodb.eco_points.repository.spec;

import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Join; 

import com.ecodb.eco_points.model.Descarte;
import com.ecodb.eco_points.model.PontoColeta;
import com.ecodb.eco_points.model.Usuario;
import com.ecodb.eco_points.model.enums.StatusDescarte;

public class DescarteSpecs {
    public static Specification<Descarte> encontraPendentePorDono (String emailDono) {
        return (root, query, builder) -> {
            query.distinct(true);

            Join<Descarte, PontoColeta> pontoJoin = root.join("pontoColeta");
            
            Join<PontoColeta, Usuario> donoJoin = pontoJoin.join("dono");

            return builder.and(
                builder.equal(donoJoin.get("email"), emailDono),
                builder.equal(root.get("status"), StatusDescarte.PENDENTE)
            );
        };
    }
}
