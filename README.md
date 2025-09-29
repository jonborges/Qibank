# QiBank - Seu Banco Digital Fictício 🏦

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

Bem-vindo ao QiBank! Um projeto de aplicação bancária full-stack desenvolvido como parte de um portfólio, demonstrando habilidades em desenvolvimento frontend com React e backend com Java (Spring Boot).

---

### ✨ [Acesse a demonstração ao vivo](https://qibank.vercel.app/) ✨
*(Nota: O backend pode levar cerca de 30 segundos para "acordar" no primeiro acesso devido ao plano gratuito da hospedagem.)*

---






## 🚀 Funcionalidades

O QiBank simula as operações básicas de um banco digital, com foco na segurança e na experiência do usuário.

*   **👤 Gestão de Usuários:**
    *   Criação de conta com validação de dados (CPF, e-mail único).
    *   Autenticação segura de usuários.
    *   Persistência de login (o usuário continua logado após atualizar a página).
*   **💳 Operações de Conta:**
    *   Visualização de saldo com função de ocultar/mostrar.
    *   Realização de depósitos.
    *   Realização de saques com validação de saldo.
*   **⚙️ Gerenciamento de Perfil:**
    *   Alteração de e-mail.
    *   Alteração de senha.
    *   Exclusão de conta.
*   **🔒 Segurança:**
    *   **Backend:** Senhas armazenadas com hash (BCrypt) e CPF criptografado (AES) no banco de dados.
    *   **Frontend:** Comunicação segura com a API.
*   **📚 Conteúdo Educacional:**
    *   Página informativa sobre tipos de investimentos.

## 🛠️ Tecnologias Utilizadas

Este projeto é um **monorepo** contendo duas aplicações principais: `frontend` e `backend`.

### Frontend

*   **Framework:** React com Vite
*   **Linguagem:** TypeScript
*   **Estilização:** CSS Modules
*   **Roteamento:** React Router
*   **Gerenciamento de Estado:** React Context API

### Backend

*   **Framework:** Spring Boot
*   **Linguagem:** Java 17
*   **Segurança:** Spring Security (para autenticação e hashing de senhas)
*   **Banco de Dados:** Spring Data MongoDB
*   **Build:** Maven

### Banco de Dados

*   MongoDB Atlas (versão em nuvem do MongoDB)

### Hospedagem

*   **Frontend:** Vercel
*   **Backend:** Render

## 📂 Estrutura do Projeto

```
QiBank/
├── backend/      # Aplicação Java/Spring Boot
│   ├── pom.xml
│   └── src/
├── frontend/     # Aplicação React/Vite
│   ├── package.json
│   └── src/
└── README.md     # Você está aqui!
```

## ⚙️ Como Executar Localmente

Siga os passos abaixo para configurar e rodar o projeto na sua máquina.

### Pré-requisitos

*   Node.js (versão 18 ou superior)
*   JDK 17 ou superior
*   Maven
*   Git
*   Uma conta no MongoDB Atlas e uma connection string.

### 1. Clone o Repositório

```bash
git clone https://github.com/jonborges/Qibank.git
cd qibank
```

### 2. Configure o Backend

1.  Navegue até a pasta `backend/demo/src/main/resources/`.
2.  Renomeie (ou crie) o arquivo `application.properties` e adicione as seguintes variáveis, substituindo pelos seus próprios valores:

    ```properties
    # MongoDB Connection
    spring.data.mongodb.uri=sua_connection_string_do_mongodb_atlas

    # Encryption Keys (use strings seguras e aleatórias de 16, 24 ou 32 bytes)
    encryption.key=sua_chave_secreta_aqui
    encryption.hmac.key=sua_outra_chave_secreta
    ```

3.  Abra um terminal na pasta `backend/` e execute o comando para instalar as dependências e iniciar a aplicação:

    ```bash
    ./mvnw spring-boot:run
    ```

    O backend estará rodando em `http://localhost:8080`.

### 3. Configure o Frontend

1.  Navegue até a pasta `frontend/`.
2.  Crie um arquivo chamado `.env` na raiz da pasta `frontend/` e adicione a seguinte linha:

    ```
    VITE_API_URL=http://localhost:8080
    ```

3.  Abra um novo terminal na pasta `frontend/` e instale as dependências:

    ```bash
    npm install
    ```

4.  Inicie o servidor de desenvolvimento:

    ```bash
    npm run dev
    ```

    A aplicação frontend estará acessível em `http://localhost:5173`.

## ✒️ Autor

Projeto desenvolvido por **Jonathan Borges**.

*   **GitHub:** @jonborges
*   **LinkedIn:** [Seu LinkedIn](https://www.linkedin.com/in/jonathan-borges-andrade/)

---

*Este projeto foi criado para fins educacionais e de portfólio.*