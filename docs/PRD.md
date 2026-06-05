# Andrade's Garden Guide - PRD

## Visao Geral

Andrade's Garden Guide e uma PWA local para catalogar plantas domesticas, registrar cuidados e identificar plantas por imagem com Gemini.

## Objetivo

Criar um guia pessoal de plantas com experiencia premium no iPhone, sem backend obrigatorio e com dados salvos localmente.

## Publico-Alvo

Pessoas que cultivam plantas em casa e querem uma rotina visual, simples e confiavel de cuidados.

## Escopo MVP

- Galeria local de plantas.
- Detalhes completos por planta.
- Upload/camera para identificacao com IA.
- Persistencia via IndexedDB.
- Configuracao local da API key do Gemini.
- Funcionamento offline para dados ja salvos.
- PWA instalavel.

## Requisitos Funcionais

- Listar plantas.
- Salvar plantas com imagem Base64 e JSON completo.
- Identificar planta por imagem via Gemini quando a chave existir.
- Mostrar mensagem amigavel pedindo a API key quando a chave nao estiver configurada.
- Regar planta e atualizar a ultima rega.
- Editar notas locais.
- Excluir planta.
- Salvar, carregar e remover API key do Gemini na tela de Configuracoes.

## Requisitos Nao Funcionais

- Mobile-first para iPhone.
- Sem banco externo.
- Sem autenticacao.
- Interface responsiva para telas iPhone.
- Cache offline de assets estaticos.
- Codigo simples e modular.

## Fluxo Principal

1. Usuario abre o app.
2. Visualiza resumo do jardim e colecao.
3. Adiciona uma planta por foto.
4. Recebe identificacao estruturada.
5. Salva a planta localmente.
6. Consulta detalhes e rotina de cuidados offline.

## Fluxo de API Key

1. Usuario abre Configuracoes.
2. Cola a API key do Gemini.
3. Salva a chave no IndexedDB local.
4. O app passa a usar a chave nas identificacoes por IA.

## Criterios de Aceite

- App abre localmente sem erros.
- Dados mocados aparecem na colecao.
- Usuario consegue salvar a API key do Gemini em Configuracoes.
- Identificacao sem chave orienta o usuario a configurar a API key.
- Plantas sao persistidas no IndexedDB.
- Service worker registra sem quebrar a interface.
