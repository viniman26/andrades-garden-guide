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
- Identificacao enriquecida com nomes populares de Ontario/Canada.
- Previsao do tempo local para orientar cuidados.
- Persistencia via IndexedDB.
- Configuracao local da API key do Gemini.
- Funcionamento offline para dados ja salvos.
- PWA instalavel.

## Requisitos Funcionais

- Listar plantas.
- Salvar plantas com imagem Base64 e JSON completo.
- Identificar planta por imagem via Gemini quando a chave existir.
- Retornar nome cientifico correto, nome popular em portugues, nome popular usado em Ontario/Canada, nome comercial canadense, origem/regiao nativa, confianca e sinais visuais da foto.
- Para Phalaenopsis, usar "Orquidea borboleta", "Moth orchid" e explicar `spp.` quando a especie/cultivar exata nao for identificada.
- Mostrar mensagem amigavel pedindo a API key quando a chave nao estiver configurada.
- Regar planta e atualizar a ultima rega.
- Editar notas locais.
- Excluir planta.
- Salvar, carregar e remover API key do Gemini na tela de Configuracoes.
- Consultar clima com Open-Meteo usando cidade salva ou geolocalizacao permitida.
- Mostrar temperatura, umidade, chuva, nuvens, horas de sol e previsao de 7 dias.
- Gerar dicas de cuidado baseadas no clima: adiar rega em dias umidos/frios, checar substrato em calor, alertar ar seco no inverno.

## Requisitos Nao Funcionais

- Mobile-first para iPhone.
- Sem banco externo.
- Sem autenticacao.
- Interface responsiva para telas iPhone.
- Layout mobile segue pagina rolavel normal com menu inferior fixo; nao usar `viewport-fit=cover`.
- Cache offline de assets estaticos.
- Clima deve funcionar sem API key e exibir ultimo dado salvo quando offline.
- Codigo simples e modular.

## Fluxo Principal

1. Usuario abre o app.
2. Visualiza resumo do jardim e colecao.
3. Adiciona uma planta por foto.
4. Recebe identificacao estruturada.
5. Ve nome popular local de Ontario/Canada, origem, cuidados e sinais observados.
6. Salva a planta localmente.
7. Consulta detalhes, clima e rotina de cuidados offline quando dados ja existem.

## Fluxo de API Key

1. Usuario abre Configuracoes.
2. Cola a API key do Gemini.
3. Salva a chave no IndexedDB local.
4. O app passa a usar a chave nas identificacoes por IA.

## Fluxo de Clima

1. Usuario abre Cuidados.
2. App usa local salvo, por padrao Toronto, Ontario, e consulta Open-Meteo.
3. Usuario pode salvar outra cidade em Ontario ou permitir geolocalizacao.
4. App exibe clima atual e dicas de cuidado baseadas em temperatura, umidade, chuva e sol.
5. Se estiver offline, app mostra a ultima previsao salva ou um estado indisponivel.

## Criterios de Aceite

- App abre localmente sem erros.
- Dados mocados aparecem na colecao.
- Usuario consegue salvar a API key do Gemini em Configuracoes.
- Identificacao sem chave orienta o usuario a configurar a API key.
- Plantas sao persistidas no IndexedDB.
- Service worker registra sem quebrar a interface.
- Modal de uma Phalaenopsis mostra "Moth orchid" como nome comum de Ontario/Canada.
- Aba Cuidados mostra card de clima sem exigir API key.
- App continua abrindo plantas antigas salvas com schema anterior do Gemini.
