package com.ecodb.eco_points.config;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.context.annotation.Profile;
import org.springframework.boot.CommandLineRunner;

import com.ecodb.eco_points.model.Descarte;
import com.ecodb.eco_points.model.Material;
import com.ecodb.eco_points.model.PontoColeta;
import com.ecodb.eco_points.model.Usuario;
import com.ecodb.eco_points.model.enums.CategoriaMaterial;
import com.ecodb.eco_points.model.enums.DestinoMaterial;
import com.ecodb.eco_points.model.enums.StatusDescarte;
import com.ecodb.eco_points.model.enums.TipoUsuario;
import com.ecodb.eco_points.repository.DescarteRepository;
import com.ecodb.eco_points.repository.MaterialRepository;
import com.ecodb.eco_points.repository.PontoColetaRepository;
import com.ecodb.eco_points.repository.UsuarioRepository;


@Configuration
// @Profile("!test") 
public class DatabaseSeeder implements CommandLineRunner {
    private final UsuarioRepository usuarioRepository;
    private final MaterialRepository materialRepository;
    private final PontoColetaRepository pontoColetaRepository;
    private final DescarteRepository descarteRepository;

    private final PasswordEncoder passwordEncoder;
    
    public DatabaseSeeder(UsuarioRepository usuarioRepository, MaterialRepository materialRepository,
            PontoColetaRepository pontoColetaRepository, DescarteRepository descarteRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.materialRepository = materialRepository;
        this.pontoColetaRepository = pontoColetaRepository;
        this.descarteRepository = descarteRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (materialRepository.count() > 0) {
            System.out.println("Banco de dados populado. Pulando Seeder.");
            return;
        }

        System.out.println("Iniciando o seeder");

        List<Material> materiais = Arrays.asList(
            criarMaterial("Garrafa PET", CategoriaMaterial.PLASTICO, DestinoMaterial.RECICLAGEM),
            criarMaterial("Caixa de Papelao", CategoriaMaterial.PAPEL, DestinoMaterial.RECICLAGEM),
            criarMaterial("Lata de refrigerante", CategoriaMaterial.METAL, DestinoMaterial.RECICLAGEM),
            criarMaterial("Garrafa de Vidro", CategoriaMaterial.VIDRO, DestinoMaterial.RECICLAGEM),
            criarMaterial("Casca de Fruta/Legume", CategoriaMaterial.ORGANICO, DestinoMaterial.COMPOSTAGEM),
            criarMaterial("resto de Comida", CategoriaMaterial.ORGANICO, DestinoMaterial.COMPOSTAGEM),
            criarMaterial("oleo de Cozinha Usado", CategoriaMaterial.OLEO, DestinoMaterial.DESCARTE_ESPECIAL),
            criarMaterial("Pilhas e Baterias", CategoriaMaterial.ELETRONICO, DestinoMaterial.DESCARTE_ESPECIAL),
            criarMaterial("Celular Quebrado", CategoriaMaterial.ELETRONICO, DestinoMaterial.REUSO),
            criarMaterial("pote de Vidro (Conserva)", CategoriaMaterial.VIDRO, DestinoMaterial.REUSO)
        );
        materialRepository.saveAll(materiais);
        System.out.println("Materiais criados.");
        
        // CRIAR USUÁRIOS 
        String senhaHasheada = passwordEncoder.encode("$senhaqualquer");

        Usuario joao = new Usuario();
        joao.setNome("Joao Gerador");
        joao.setEmail("gerador@teste.com");
        joao.setSenha(senhaHasheada);
        joao.setTelefone("11987654321");
        joao.setEndereco("Rua das Flores, 123 - São Paulo");
        joao.setRole(TipoUsuario.GERADOR);
        
        Usuario maria = new Usuario();
        maria.setNome("Maria Coletora");
        maria.setEmail("coletor@teste.com");
        maria.setSenha(senhaHasheada);
        maria.setTelefone("11976543210");
        maria.setEndereco("Av. Paulista, 500 - São Paulo");
        maria.setRole(TipoUsuario.COLETOR);

        usuarioRepository.saveAll(Arrays.asList(joao, maria));
        System.out.println("Usuarios criados.");

        // CRIAR PONTO DE COLETA 
        PontoColeta ecoponto = new PontoColeta();
        ecoponto.setNome("Ecoponto Centro");
        ecoponto.setEndereco("Av. Paulista, 1000");
        ecoponto.setHorarios("Seg-Sex 08h-18h");
        ecoponto.setContato("(11) 99999-9999");
        ecoponto.setLatitude(-23.56168);
        ecoponto.setLongitude(-46.65598);
        ecoponto.setDono(maria);

        Set<Material> materiaisAceitos = new HashSet<>();
        materiaisAceitos.add(encontrarMaterial(materiais, "Garrafa PET"));
        materiaisAceitos.add(encontrarMaterial(materiais, "Lata de refrigerante"));
        materiaisAceitos.add(encontrarMaterial(materiais, "Pilhas e Baterias"));
        
        ecoponto.setMateriais(materiaisAceitos);
        
        pontoColetaRepository.save(ecoponto);
        System.out.println("Ponto de Coleta criado.");

        // CRIAR DESCARTES
        Descarte descarte1 = new Descarte();
        descarte1.setDescricaoEspecifica("3 sacolas de garrafas");
        descarte1.setQuantidade(2.5);
        descarte1.setUnidadeMedida("KG");
        descarte1.setStatus(StatusDescarte.PENDENTE);
        descarte1.setUsuario(joao);
        descarte1.setPontoColeta(ecoponto);
        descarte1.setMaterial(encontrarMaterial(materiais, "Garrafa PET"));
        descarte1.setDataCriacao(LocalDateTime.now().minusDays(1));

        Descarte descarte2 = new Descarte();
        descarte2.setDescricaoEspecifica("Pilha velha de controle");
        descarte2.setQuantidade(4.0);
        descarte2.setUnidadeMedida("UNIDADE");
        descarte2.setStatus(StatusDescarte.CONCLUIDO);
        descarte2.setUsuario(joao);
        descarte2.setPontoColeta(ecoponto);
        descarte2.setMaterial(encontrarMaterial(materiais, "Pilhas e Baterias"));
        descarte2.setDataCriacao(LocalDateTime.now().minusDays(5));

        descarteRepository.saveAll(Arrays.asList(descarte1, descarte2));
        System.out.println("Descartes criados.");
    }
    
    private Material criarMaterial(String nome, CategoriaMaterial categoriaMaterial, DestinoMaterial destinoMaterial) {
        Material material = new Material();
        material.setNome(nome);
        material.setCategoria(categoriaMaterial);
        material.setDestino(destinoMaterial);
        return material;
    }

    private Material encontrarMaterial(List<Material> lista, String nome) {
        return lista.stream()
                .filter(m -> m.getNome().equals(nome))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Material nao encontrado: " + nome));
    }
}
