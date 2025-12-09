> [!IMPORTANT]
> Projeto ainda em desenvolvimento.


[![CI - Build & Test](https://github.com/guigs028/startDB-Sustentabilidade/actions/workflows/maven.yml/badge.svg)](https://github.com/guigs028/startDB-Sustentabilidade/actions)
![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.4-green)
![React](https://img.shields.io/badge/React-18-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)


Links (remover dps)

http://localhost:8080/api/status

http://localhost:8080/swagger-ui/index.html


# EcoPoints — Sistema de Gestão de Resíduos
**Descarte Consciente, Impacto Real.**


> Plataforma colaborativa que conecta **geradores de resíduos** a **coletores certificados**, facilitando reciclagem, doação, compostagem e descarte responsável.

## O Problema que Resolvemos

Todos os dias famílias e pequenas empresas geram toneladas de resíduos que poderiam ser reciclados ou reaproveitados, mas acabam no lixo comum por dois motivos principais:

1. **Falta de informação** – “A caixa de pizza é reciclável?”  
2. **Dificuldade logística** – “Onde descarto óleo de cozinha / eletrônicos / pilhas perto de mim?”

## Solução
Uma plataforma simples e colaborativa onde:

- **Geradores** encontram rapidamente o ponto de coleta mais próximo para cada tipo de material  
- **Coletores** (ONGs, cooperativas, empresas) divulgam seus pontos e especificam exatamente o que aceitam  
- Todo descarte é registrado e acompanhado, gerando impacto mensurável


## Telas da Aplicação (futuro)
Video / Imagem da aplicação rodando aqui
<!---
| Área do Gerador (Busca) | Dashboard do Coletor |
|:---:|:---:|
| ![Busca](link_da_imagem_busca.png) | ![Dashboard](link_da_imagem_dashboard.png) |


-->


## Funcionalidades principais
### Gerador
- Busca por material (“Onde descarto pilhas?”)
- Visualização em mapa ou lista
- Guia de preparação do resíduo
- Registro e histórico de descartes com status

### Coletor
- Cadastro ilimitado de pontos de coleta
- Seleção precisa dos materiais aceitos
- Dashboard com todos os pontos
- Lista de descartes pendentes → Concluir ou Negar


## 🛠 Tecnologias

| Camada         | Tecnologia                     |
|----------------|--------------------------------|
| Backend        | Java 17 + Spring Boot 3.4      |
| Frontend       | React 18 + Vite + Javascripy   |
| Banco de dados | PostgreSQL 15                  |
| API Docs       | SpringDoc OpenAPI (Swagger)    |
| CI/CD          | GitHub Actions                 |

## Como Rodar o Projeto Localmente
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

# 2. Backend (Spring Boot)
cd backend
./mvnw spring-boot:run

# 3. Frontend (React)
cd ../frontend
npm install
npm run dev
```
#### Documentação na WIKI - https://github.com/guigs028/startDB-Sustentabilidade/wiki

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
        <sub><b>Augusto Rodrigues de Rodrigues</b></sub>
      </a><br />
      <sub>Desenvolvedor </sub>
    </td>
  </tr>
</table>
