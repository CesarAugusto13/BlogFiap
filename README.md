# Tech Challenge - Fase 02: API para Plataforma de Blog

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4-47A248?style=for-the-badge&logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-20.x-2496ED?style=for-the-badge&logo=docker)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI-2088FF?style=for-the-badge&logo=github-actions)

Projeto desenvolvido como parte do Tech Challenge da Pós-Graduação em Full Stack Development da FIAP. O objetivo é criar uma API RESTful robusta e escalável para uma plataforma de blogging, permitindo que professores compartilhem conteúdo de forma centralizada e tecnológica.

---

## 📚 Sumário

- [1. O Problema](#1-o-problema)
- [2. Arquitetura do Sistema](#2-arquitetura-do-sistema)
  - [2.1. Tecnologias Utilizadas](#21-tecnologias-utilizadas)
  - [2.2. Estrutura do Projeto](#22-estrutura-do-projeto)
- [3. Como Executar a Aplicação](#3-como-executar-a-aplicação)
- [4. Documentação da API](#4-documentação-da-api)
- [5. Testes e CI/CD](#5-testes-e-cicd)
- [6. Experiências e Desafios](#6-experiências-e-desafios)
- [7. Autor](#7-autor)

---

## 1. O Problema

Atualmente, muitos professores da rede pública de educação não possuem uma plataforma unificada para postar suas aulas e transmitir conhecimento aos alunos de forma prática e centralizada. Este projeto visa solucionar essa carência, refatorando o back-end de uma aplicação de blogging para uma arquitetura moderna e escalável com Node.js, MongoDB e Docker.

---

## 2. Arquitetura do Sistema

A solução foi desenvolvida como uma API RESTful containerizada, seguindo as melhores práticas de organização de código para garantir manutenibilidade e escalabilidade.

### 2.1. Tecnologias Utilizadas

| Tecnologia | Finalidade |
| :--- | :--- |
| **Node.js** | Ambiente de execução para o código JavaScript no servidor. |
| **Express.js** | Framework para construção do servidor e gerenciamento de rotas. |
| **MongoDB** | Banco de dados NoSQL para persistência dos dados dos posts. |
| **Mongoose** | ODM (Object Data Modeling) para facilitar a interação com o MongoDB. |
| **Docker & Docker Compose**| Ferramentas para containerizar e orquestrar a aplicação e o banco de dados. |
| **Jest & Supertest** | Frameworks para a escrita de testes unitários e de integração da API. |
| **GitHub Actions** | Ferramenta de CI/CD para automação dos testes a cada alteração no código. |

### 2.2. Estrutura do Projeto

A estrutura de pastas foi pensada para separar as responsabilidades, seguindo o padrão MVC (Model-View-Controller) adaptado para APIs:

├── .github/workflows/ # Automação de CI/CD
├── tests/ # Suíte de testes
├── src/
│ ├── controllers/ # Lógica de negócio
│ ├── models/ # Definição dos schemas do banco
│ ├── routes/ # Definição dos endpoints
│ ├── app.js # Configurações do Express
│ └── server.js # Ponto de entrada do servidor
├── .gitignore
├── docker-compose.yml # Orquestração dos serviços
├── Dockerfile # Imagem Docker da aplicação
└── package.json

## 3. Como Executar a Aplicação

Para rodar este projeto, você precisará ter **Docker** e **Docker Compose** instalados em sua máquina.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/CesarAugusto13/BlogFiap.git
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd BlogFiap
    ```

3.  **Execute o Docker Compose:**
    O comando abaixo irá construir a imagem da aplicação e iniciar os contêineres do Node.js e do MongoDB.
    ```bash
    docker-compose up --build
    ```

A API estará disponível para acesso em `http://localhost:3000`.

---

## 4. Documentação da API

**URL Base:** `http://localhost:3000/api`

| Funcionalidade | Método | Endpoint | Corpo da Requisição | Resposta de Sucesso |
| :--- | :--- | :--- | :--- | :--- |
| **Criar Post** | `POST` | `/posts` | `{ "titulo": "string", "conteudo": "string", "autor": "string" }` | `201 Created` - Objeto do post criado |
| **Listar Posts** | `GET` | `/posts` | N/A | `200 OK` - Array de posts |
| **Ler Post** | `GET` | `/posts/:id` | N/A | `200 OK` - Objeto do post |
| **Atualizar Post** | `PUT` | `/posts/:id` | `{ "titulo": "string", "conteudo": "string", ... }` | `200 OK` - Objeto do post atualizado |
| **Excluir Post** | `DELETE`| `/posts/:id` | N/A | `200 OK` - Mensagem de sucesso |
| **Buscar Posts** | `GET` | `/posts/search?q={termo}` | N/A | `200 OK` - Array de posts encontrados |

---

## 5. Testes e CI/CD

O projeto conta com uma suíte de testes unitários e de integração para garantir a qualidade e o funcionamento esperado dos endpoints.

- **Para rodar os testes localmente:**
  ```bash
  npm test

Integração Contínua (CI):
Um workflow do GitHub Actions foi configurado para executar os testes automaticamente a cada push ou pull request, garantindo que o código na branch principal esteja sempre estável e funcional.

## 6. Experiências e Desafios
Durante o desenvolvimento, enfrentei alguns desafios que foram cruciais para o aprendizado:

Conectividade entre Contêineres Docker: O principal desafio inicial foi entender como a aplicação Node.js, rodando em um contêiner, se conectaria ao banco de dados em outro contêiner. A solução foi utilizar o nome do serviço (mongo) definido no docker-compose.yml na string de conexão, em vez de localhost. Isso solidificou meu entendimento sobre redes Docker.

Implementação do Pipeline de CI/CD: Um dos desafios mais significativos foi a configuração da Integração Contínua com GitHub Actions. Entender a sintaxe dos arquivos YAML, a sequência de `steps` (checkout, setup do Node, instalação de dependências, execução dos testes) e como o ambiente virtual do GitHub Actions funciona exigiu pesquisa e algumas tentativas. Superar essa barreira foi extremamente gratificante, pois me permitiu automatizar um processo essencial para a garantia de qualidade do software, vendo o pipeline rodar com sucesso após cada `push`.

Configuração do Ambiente Git: No início do projeto, houve uma pequena confusão entre as branches main e master. O processo de fazer o merge, definir main como a branch padrão e limpar a branch antiga foi um excelente exercício prático de gerenciamento de repositórios com Git, reforçando a importância de manter um histórico limpo e organizado.


César Augusto de Oliveira Santos - [LinkedIn](https://www.linkedin.com/in/c%C3%A9sar-augusto-de-oliveira-santos/)