# TechLabs - API Contract Specification (v2.4)

Este documento define o contrato que o Backend deve implementar para servir o Frontend.

## 1. Global Standards
- **Base URL:** Definida via `VITE_API_URL`
- **Auth:** `Authorization: Bearer <JWT>`
- **Errors:**
  - `401`: Token expirado/inválido (Front redireciona para login)
  - `403`: Role insuficiente
  - `400`: Erro de validação (Response: `{ "message": "string", "code": "string" }`)
  - `408`: Timeout (SLA do Front: 30s)

## 2. Endpoints por Módulo

### Módulo: Dashboard
- `GET /dashboard/client-overview` -> Métricas agregadas do cliente logado.
- `GET /dashboard/admin-overview` -> Métricas globais de sistema para administradores.

### Módulo: Auditoria API
- `POST /audit/analyze` -> Inicia pipeline de análise IA (GCP/Gemini Integration).
- `GET /audit/reports` -> Lista diagnósticos.
- `GET /audit/reports/:id` -> Detalhes do diagnóstico.
- `POST /audit/reports/:id/unlock` -> Libera acesso ao relatório completo após "pagamento".

### Módulo: Projetos
- `GET /projects` -> Lista projetos do usuário.
- `POST /projects` -> Cria novo projeto.
- `PATCH /projects/:id` -> Atualiza status/progresso.
- `POST /projects/:id/pay` -> Marca faturamento como concluído.

### Módulo: Clientes (Admin Only)
- `GET /clients` -> Lista todas as empresas.
- `POST /clients` -> Provisiona nova empresa e admin inicial.

### Módulo: Tickets
- `GET /tickets` -> Lista ocorrências.
- `POST /tickets` -> Abre novo chamado técnico.

### Módulo: Chat
- `GET /chat/sessions` -> Lista conversas ativas.
- `POST /chat/sessions/:id/messages` -> Envia mensagem em tempo real.
- `POST /chat/sessions/:id/read` -> Zera o `unreadCount`.

### Módulo: Repositório & Aprovações
- `GET /repository/files` -> Lista documentos técnicos/contratos.
- `POST /repository/upload` -> Multipart upload de binários.
- `GET /approvals/pending` -> Documentos aguardando revisão de Tech Lead ou Legal.

### Módulo: Infraestrutura
- `GET /system/health` -> Status dos nós de processamento.
- `GET /infrastructure/metrics` -> Dados de latência e consumo para o mapa global.

## 3. Data Shapes Principais

### Project
```json
{
  "id": "uuid",
  "title": "string",
  "status": "Planejamento|Em Progresso|Concluído|Pausado|Aguardando Pagamento",
  "progress": 0-100,
  "client": "string",
  "aiAnalysis": {
    "technicalReport": "string (Markdown)",
    "executiveSummary": "string",
    "maturityLevel": "string"
  }
}
```

### TechnicalReport
```json
{
  "id": "uuid",
  "projectName": "string",
  "healthScore": 0-100,
  "severity": "Low|Medium|High|Critical",
  "isUnlocked": boolean,
  "fullReport": {
     "system": { "os": "string", "uptime": "string" },
     "security": ["string"],
     "recommendation": "string"
  }
}
```