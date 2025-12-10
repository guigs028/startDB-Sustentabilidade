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
import com.ecodb.eco_points.model.enums.UnidadeMedida;
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

        // CRIAR USUÁRIOS PRIMEIRO
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

        // CRIAR MATERIAIS (associados ao usuário João)
        List<Material> materiais = Arrays.asList(
            criarMaterial("Garrafa PET", CategoriaMaterial.PLASTICO, DestinoMaterial.RECICLAGEM, UnidadeMedida.UNIDADE, joao),
            criarMaterial("Caixa de Papelao", CategoriaMaterial.PAPEL, DestinoMaterial.RECICLAGEM, UnidadeMedida.KILOGRAMA, joao),
            criarMaterial("Lata de refrigerante", CategoriaMaterial.METAL, DestinoMaterial.RECICLAGEM, UnidadeMedida.UNIDADE, joao),
            criarMaterial("Garrafa de Vidro", CategoriaMaterial.VIDRO, DestinoMaterial.RECICLAGEM, UnidadeMedida.KILOGRAMA, joao),
            criarMaterial("Casca de Fruta/Legume", CategoriaMaterial.ORGANICO, DestinoMaterial.COMPOSTAGEM, UnidadeMedida.KILOGRAMA, joao),
            criarMaterial("resto de Comida", CategoriaMaterial.ORGANICO, DestinoMaterial.COMPOSTAGEM, UnidadeMedida.KILOGRAMA, joao),
            criarMaterial("oleo de Cozinha Usado", CategoriaMaterial.OLEO, DestinoMaterial.DESCARTE_ESPECIAL, UnidadeMedida.LITRO, joao),
            criarMaterial("Pilhas e Baterias", CategoriaMaterial.ELETRONICO, DestinoMaterial.DESCARTE_ESPECIAL, UnidadeMedida.UNIDADE, joao),
            criarMaterial("Celular Quebrado", CategoriaMaterial.ELETRONICO, DestinoMaterial.REUSO, UnidadeMedida.UNIDADE, joao),
            criarMaterial("pote de Vidro (Conserva)", CategoriaMaterial.VIDRO, DestinoMaterial.REUSO, UnidadeMedida.UNIDADE, joao)
        );
        materialRepository.saveAll(materiais);
        System.out.println("Materiais criados.");
        
        // CRIAR PONTO DE COLETA 
        PontoColeta ecoponto = new PontoColeta();
        ecoponto.setNome("Ecoponto Centro");
        ecoponto.setEndereco("Av. Paulista, 1000");
        ecoponto.setHorarios("Seg-Sex 08h-18h");
        ecoponto.setContato("(11) 99999-9999");
        ecoponto.setLatitude(-23.56168);
        ecoponto.setLongitude(-46.65598);
        ecoponto.setDono(maria);

        // Define as CATEGORIAS de materiais aceitas pelo ponto
        Set<CategoriaMaterial> categoriasAceitas = new HashSet<>();
        categoriasAceitas.add(CategoriaMaterial.PLASTICO);
        categoriasAceitas.add(CategoriaMaterial.METAL);
        categoriasAceitas.add(CategoriaMaterial.ELETRONICO);
        
        ecoponto.setCategoriasAceitas(categoriasAceitas);
        
        pontoColetaRepository.save(ecoponto);
        System.out.println("Ponto de Coleta criado.");

        // CRIAR DESCARTES
        Material materialPet = encontrarMaterial(materiais, "Garrafa PET");
        Descarte descarte1 = new Descarte();
        descarte1.setDescricaoEspecifica("3 sacolas de garrafas");
        descarte1.setQuantidade(15.0);
        descarte1.setUnidadeMedida(materialPet.getUnidadePadrao()); // UNIDADE
        descarte1.setStatus(StatusDescarte.PENDENTE);
        descarte1.setUsuario(joao);
        descarte1.setPontoColeta(ecoponto);
        descarte1.setMaterial(materialPet);
        descarte1.setDataCriacao(LocalDateTime.now().minusDays(1));

        Material materialPilhas = encontrarMaterial(materiais, "Pilhas e Baterias");
        Descarte descarte2 = new Descarte();
        descarte2.setDescricaoEspecifica("Pilha velha de controle");
        descarte2.setQuantidade(4.0);
        descarte2.setUnidadeMedida(materialPilhas.getUnidadePadrao()); // UNIDADE
        descarte2.setStatus(StatusDescarte.CONCLUIDO);
        descarte2.setUsuario(joao);
        descarte2.setPontoColeta(ecoponto);
        descarte2.setMaterial(materialPilhas);
        descarte2.setDataCriacao(LocalDateTime.now().minusDays(5));

        descarteRepository.saveAll(Arrays.asList(descarte1, descarte2));
        System.out.println("Descartes criados.");
    }
    
    private Material criarMaterial(String nome, CategoriaMaterial categoriaMaterial, DestinoMaterial destinoMaterial, UnidadeMedida unidadePadrao, Usuario usuario) {
        Material material = new Material();
        material.setNome(nome);
        material.setCategoria(categoriaMaterial);
        material.setDestino(destinoMaterial);
        material.setUnidadePadrao(unidadePadrao);
        material.setUsuario(usuario);
        return material;
    }

    private Material encontrarMaterial(List<Material> lista, String nome) {
        return lista.stream()
                .filter(m -> m.getNome().equals(nome))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Material nao encontrado: " + nome));
    }
}
