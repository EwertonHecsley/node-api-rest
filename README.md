# API Rest com TypeScript

Bem-vindo ao projeto, API Rest com Typescript! Este é um sistema robusto, oferecendo recursos essenciais e funcionalidades avançadas.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- PostgreSQL
- JWT (JSON Web Tokens)
- Bcrypt

## Introdução

O Minha API foi desenvolvido para fornecer uma solução escalável e segura, seguindo as melhores práticas de desenvolvimento de APIs REST. Este README fornecerá insights sobre a estrutura do projeto, suas funcionalidades principais e como você pode começar a usá-la.

## Estrutura do Projeto

O projeto segue o padrão MSC (Modelo, Serviço, Controlador) para uma organização eficiente e fácil manutenção.

### Model

Os modelos de dados utilizados na aplicação,tratam exclusivamentes para comunicação com o banco de dados.

### Service

Os serviços encapsulam a lógica de negócios, incluindo a recuperação de senha por e-mail e operações sensíveis.

### Controller

Os controladores gerenciam as requisições e respostas da API, garantindo uma interação suave entre o cliente e o servidor.

## Recuperação de Senha por E-mail

A funcionalidade de recuperação de senha por e-mail permite que os usuários redefinam suas senhas de maneira segura, recebendo uma senha temporária, para após esta logado com segurança, seja permitida a nova redefinição.

## Controle de Acesso

Camadas de controle de acesso garantem que apenas usuários autenticados possam realizar operações sensíveis, mantendo a segurança e a integridade dos dados.

## Como Iniciar o Projeto

Siga as instruções abaixo para iniciar o projeto localmente:

```bash
# Instalar dependências
npm install

# Configurar banco de dados
# usar o .env.example como modelo

# Iniciar o servidor
npm start
