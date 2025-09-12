# 🛡️ Blue Team API

API desenvolvida com foco em segurança da informação, simulando operações de um SOC (Security Operations Center). Permite autenticação de usuários, ingestão de logs, geração automática de alertas, controle de honeypots e gerenciamento de acesso por papel.

---

## 📚 Visão Geral

Este projeto backend oferece:

- Autenticação segura com JWT
- Registro de usuários com criptografia de senha
- Ingestão de logs com origem, severidade e timestamp
- Geração automática de alertas com base em regras
- Gerenciamento dinâmico de honeypots TCP
- Proteção de rotas com middleware de autenticação e autorização
- Documentação interativa via Swagger

---

## 🧠 Arquitetura da Aplicação

A aplicação é construída com Node.js + TypeScript e utiliza Sequelize como ORM para PostgreSQL. A estrutura está dividida em módulos:

- `models/`: definição das entidades (User, Log, Alert, HoneypotConfig)
- `controllers/`: lógica de negócio para autenticação, alertas, honeypots etc.
- `services/`: serviços como gerenciamento de honeypots e processamento de logs
- `routes/`: rotas organizadas por domínio
- `scripts/initHoneypots.ts`: inicializa honeypots com base em configurações padrão
- `honeypot.config.ts`: define as portas, banners e estado inicial dos honeypots

---

## 🚀 Funcionalidades

### 🔐 Autenticação

- `POST /api/auth/register` → Registro de usuário
- `POST /api/auth/login` → Login e geração de token JWT

### 📥 Ingestão de Logs

- `POST /api/logs` → Registra logs com origem, mensagem, severidade e timestamp

### 🚨 Geração de Alertas

- Alertas são criados automaticamente com base em regras definidas no motor de alertas
- Exemplo: logs com severidade "critical" e mensagem contendo "acesso não autorizado" geram alertas de intrusão

### 📋 Listagem de Alertas

- `GET /api/alerts/list` → Lista todos os alertas com filtros opcionais:
  - `status` (open/resolved)
  - `severity` (low/medium/high)
  - `type` (ex: Intrusão, Port Scan)

### 🧪 Honeypots TCP

- Honeypots simulam serviços em portas específicas (ex: SSH, FTP, MySQL)
- Cada honeypot pode ser ativado/desativado dinamicamente via API
- Logs são gerados automaticamente ao interagir com uma porta ativa

#### Endpoints administrativos:

- `PATCH /api/honeypot/activate/:port` → Ativa honeypot em uma porta  
- `PATCH /api/honeypot/deactivate/:port` → Desativa honeypot em uma porta  

> ⚠️ Requer autenticação com token JWT e role `admin`

---

## 🔧 Arquivo de Configuração de Honeypots

O arquivo `honeypot.config.ts` define os honeypots padrão:

```ts
export const honeypotDefinitions = [
  { port: 21, banner: 'FTP honeypot ativo', enabled: true },
  { port: 22, banner: 'SSH honeypot ativo', enabled: false },
  { port: 3306, banner: 'MySQL honeypot ativo', enabled: true },
];
```

Na primeira execução, se a tabela `honeypot_configs` estiver vazia, os honeypots definidos no arquivo são criados automaticamente.  
Se a tabela já estiver populada, o script de setup é ignorado para preservar o estado atual dos honeypots.

---

## 🔥 Firewall e Portas

Ao ativar honeypots em portas como `21`, `22` ou `80`, o servidor pode não conseguir escutar devido a bloqueios do firewall ou falta de permissões.

- Em sistemas **Windows**, portas abaixo de `1024` exigem privilégios elevados. É necessário executar o terminal como **administrador**.  
- Caso o firewall esteja bloqueando a porta, é necessário criar uma regra de entrada manualmente:

Passos para liberar uma porta no Firewall do Windows:
1. Abra o **Firewall do Windows Defender com segurança avançada**  
2. Vá em **Regras de Entrada → Nova Regra**  
3. Selecione **Porta**  
4. Escolha **TCP** e digite a porta desejada (ex: `22`)  
5. Marque **Permitir a conexão**  
6. Selecione "Domínio", "Privado" e "Público"  
7. Nomeie a regra (ex: `Liberar porta 22 para honeypot`)  
8. Salve  

---

## ⚙️ Como usar

### Instale as dependências
```bash
npm install
```

### Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DB_NAME=nome_do_banco
DB_USER=usuario
DB_PASS=senha
DB_HOST=localhost
PORT=4000
JWT_SECRET=sua_chave_secreta_segura
ADMIN_ID=1
ADMIN_USERNAME=admin
ADMIN_PASSWORD=adminpassword
ADMIN_ROLE=admin
```

> 💡 Dica: gere uma chave segura com  
> ```bash
> openssl rand -hex 32
> ```

### Inicie o servidor
```bash
npm run dev
```

Servidor disponível em:  
http://localhost:4000

---

## 📚 Documentação Swagger

Acesse a interface interativa da API:  
http://localhost:4000/api-docs

---

## 🔐 Segurança implementada

- Criptografia de senhas com **bcrypt**
- Autenticação via **JWT**
- Middleware de proteção e autorização por papel
- Motor de regras para alertas
- Tipagem forte com **TypeScript**
- Honeypots simulados com **TCP** e logs automáticos

---

## 📌 Próximos passos (em desenvolvimento)

- Módulo de incidentes
- Sistema de auditoria
- Métricas e dashboards
- Testes automatizados com **Jest**
- Dockerização para deploy seguro

---

## 🤝 Contribuição

Sinta-se à vontade para abrir **issues**, sugerir melhorias ou enviar **pull requests**.  
Segurança é uma jornada colaborativa!

---

## 📄 Licença

Este projeto está sob a licença **MIT**.

---


