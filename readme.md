> [!IMPORTANT]
> Projeto finalizado.


[![CI - Build & Test](https://github.com/guigs028/startDB-Sustentabilidade/actions/workflows/maven.yml/badge.svg)](https://github.com/guigs028/startDB-Sustentabilidade/actions)
![Java](https://img.shields.io/badge/Java-17-ED8B00?style=flat&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.4-6DB33F?style=flat&logo=spring&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=flat&logo=springsecurity&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=swagger&logoColor=black)


# EcoPoints — Sistema de Gestão de Resíduos
**Descarte Consciente, Impacto Real.**


> Plataforma colaborativa que conecta **geradores de resíduos** a **coletores certificados**, facilitando reciclagem, doação, compostagem e descarte responsável.

## Sobre o Projeto

Todos os dias, famílias e pequenas empresas geram toneladas de resíduos, mas a reciclagem esbarra na falta de informação e na logística difícil.

Enquanto soluções tradicionais focam na burocracia empresarial e gestão de documentos, o **EcoPoints foca no Cidadão e na Mudança de Hábito**. Nossa plataforma atua como uma ponte simples e colaborativa entre **Geradores** e **Coletores**, resolvendo o problema através de três pilares:

1.  **Educação Ativa (Busca Inteligente):** O usuário não precisa saber de tudo. Ao buscar, ele aprende o destino correto e encontra o ponto.
2.  **Visibilidade para o Coletor:** Centralizamos ONGs e cooperativas que não têm site próprio, colocando-as no mapa de todos os usuários da região.
3.  **Transparência e Feedback:** Diferente do descarte comum, aqui o Gerador é notificado quando seu resíduo é "Aceito", fechando o ciclo da reciclagem com impacto mensurável.

> **Nota de Escopo:** O EcoPoints não realiza a logística de transporte (coleta física). O sistema viabiliza o modelo de **Entrega Voluntária**, fornecendo a inteligência e a localização necessárias para que o gerador leve o resíduo ao destino correto.

## Demonstração do Sistema
![Demonstração do Sistema](.github/assets/demo.gif)



## Funcionalidades principais do sistema
#### Gerador 
- Busca por material 
- Visualização de pontos de coleta baseados no material ou local
- Registro e histórico de descartes com status

#### Coletor
- Cadastro ilimitado de pontos de coleta
- Seleção precisa dos materiais aceitos de acordo com o ponto de coleta
- Dashboard com todos os pontos
- Lista de descartes pendentes → Aprovar ou Negar


## Tecnologias
| Categoria | Stack Tecnológico |
|:--- |:--- |
| **Backend** | Java 17, Spring Boot 3.4, Spring Security (JWT), Lombok, Data JPA |
| **Frontend** | React 19 (Javascript), Vite, Tailwind CSS, Flowbite, Axios |
| **Banco de Dados** | PostgreSQL 15, H2 Database (Testes) |
| **Tools** | Docker, Maven, Swagger, GitHub Actions |

## Rode o Projeto Localmente
### Pré-requisitos
- Java 17
- Node.js 18+
- PostgreSQL 15
- Maven

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/guigs028/startDB-Sustentabilidade.git
cd startDB-Sustentabilidade

# 2. Configuração de Ambiente (Backend)
# Cria o arquivo de configuração baseado no exemplo
cp backend/src/main/resources/application-example.properties backend/src/main/resources/application.properties
# Abra o arquivo 'backend/src/main/resources/application.properties' 
# e edite a linha 'spring.datasource.password' com a sua senha do PostgreSQL.

# 3 Backend (Spring Boot)
cd backend
./mvnw spring-boot:run

# 4. Frontend (React)
cd ../frontend
npm install
npm run dev
```
Após isso a aplicação estará rodando em: http://localhost:5173/

#### Documentação do projeto
- Swagger - http://localhost:8080/swagger-ui/index.html  (necessario estar com o projeto rodando)
- Wiki - https://github.com/guigs028/startDB-Sustentabilidade/wiki

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request e aguarde


## 👥 Contribuidores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/guigs028">
        <img src="https://avatars.githubusercontent.com/u/163305640?v=4" width="100px;" alt="Guilherme Dentzien"/><br />
        <sub><b>Guilherme Dentzien</b></sub>
      </a><br />
      <sub>Desenvolvedor </sub>
    </td>
    <td align="center">
      <a href="https://github.com/LeonardoEnnes">
        <img src="https://github.com/LeonardoEnnes.png" width="100px;" alt="Leonardo Ennes"/><br />
        <sub><b>Leonardo Ennes</b></sub>
      </a><br />
      <sub>Desenvolvedor </sub>
    </td>
    <td align="center">
      <a href="https://github.com/AugustoRD">
        <img src="https://avatars.githubusercontent.com/u/204248724?v=4" width="100px;" alt="Augusto Rodrigues de Rodrigue"/><br />
        <sub><b>Augusto Rodrigues</b></sub>
      </a><br />
      <sub>Desenvolvedor </sub>
    </td>
  </tr>
</table>
