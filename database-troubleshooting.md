# Script para testar conectividade do banco PostgreSQL

## Verificações necessárias:

### 1. Acessibilidade pública do servidor
- O servidor 89.117.25.79:9433 precisa estar acessível publicamente
- Verificar firewall/iptables para permitir conexões externas na porta 9433
- Verificar se o PostgreSQL está configurado para aceitar conexões externas

### 2. Configuração do PostgreSQL
- Arquivo postgresql.conf: listen_addresses = '*' ou IP específico
- Arquivo pg_hba.conf: permitir conexões do tipo host para o usuário postgres

### 3. Whitelist de IPs da Vercel
- A Vercel usa vários IPs para suas funções serverless
- Considere usar um serviço de banco de dados em nuvem (Supabase, Railway, etc.)

### 4. SSL/TLS
- Se o banco exigir SSL, ajuste a string de conexão:
  postgresql://postgres:senha@89.117.25.79:9433/typebot?sslmode=require

### 5. Connection Pooling
- Para produção, considere usar PgBouncer ou connection pooling da Vercel

## Comando para testar localmente:
# psql "postgresql://postgres:4E0TU8FgT7x2zzo676AE8LEfbd3v8vQ4D7TW9wnksf9Dfd8SpX@89.117.25.79:9433/typebot?sslmode=disable"
