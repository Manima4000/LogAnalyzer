# 🛡️ Blue Team API

API desenvolvida com foco em segurança da informação, simulando operações de um SOC (Security Operations Center). Permite autenticação de usuários, ingestão de logs, geração automática de alertas e controle de acesso por papel.

---

## 📚 Visão Geral

Este projeto backend oferece:

- Autenticação segura com JWT
- Registro de usuários com criptografia de senha
- Ingestão de logs com origem, severidade e timestamp
- Geração automática de alertas com base em regras
- Proteção de rotas com middleware de autenticação
- Documentação interativa via Swagger

---

## 🚀 Funcionalidades

### 🔐 Autenticação

- POST /api/auth/register → Registro de usuário
- POST /api/auth/login → Login e geração de token JWT

### 📥 Ingestão de Logs

- POST /api/logs → Registra logs com origem, mensagem, severidade e timestamp

### 🚨 Geração de Alertas

- Alertas são criados automaticamente com base em regras definidas no motor de alertas
- Exemplo: logs com severidade "critical" e mensagem contendo "acesso não autorizado" geram alertas de intrusão

### 📋 Listagem de Alertas

- GET /api/alerts/list → Lista todos os alertas com filtros opcionais:
  - status (open/resolved)
  - severity (low/medium/high)
  - type (ex: Intrusão, Port Scan)

---

## ⚙️ Como usar

### 1. Instale as dependências

npm install

### 2. Configure o arquivo .env

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

DB_NAME=nome_do_banco  
DB_USER=usuario  
DB_PASS=senha  
DB_HOST=localhost  
PORT=4000  
JWT_SECRET=sua_chave_secreta_segura

Dica: gere uma chave segura com `openssl rand -hex 32`

### 3. Inicie o servidor

npm run dev

O servidor estará disponível em:

http://localhost:4000

---

## 📚 Documentação Swagger

Acesse a interface interativa da API:

http://localhost:4000/api-docs

---

## 🔐 Segurança implementada

- Criptografia de senhas com bcrypt
- Autenticação via JWT
- Middleware de proteção de rotas
- Motor de regras para alertas
- Tipagem forte com TypeScript

---

## 📌 Próximos passos (em desenvolvimento)

- Módulo de incidentes
- Sistema de auditoria
- Métricas e dashboards
- Controle de acesso por papel (RBAC)
- Testes automatizados com Jest
- Dockerização para deploy seguro

---

## 🤝 Contribuição

Sinta-se à vontade para abrir issues, sugerir melhorias ou enviar pull requests. Segurança é uma jornada colaborativa!

---

## 📄 Licença

Este projeto está sob a licença MIT.