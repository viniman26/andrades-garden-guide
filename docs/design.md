# Andrade's Garden Guide - Design

## Direcao Visual

PWA mobile-first para iPhone com estetica botanica premium: madeira, folhas tropicais, flores, verde profundo, off-white quente, dourado suave e azul agua. A tela principal usa o wallpaper tropical como fundo com overlay sutil para legibilidade. A logo oficial aparece no topo da Home e no splash visual.

## Stack

- HTML, CSS e JavaScript modular sem dependencias externas.
- IndexedDB para plantas, fotos e configuracoes.
- Service Worker para cache offline.
- Manifest PWA com orientacao portrait e display standalone.

## Navegacao

Bottom navigation fixa com cinco abas:

- Inicio
- Colecao
- IA
- Cuidados
- Configuracoes

## Layout iPhone

- O layout segue o padrao validado no Andrade Family Quest: pagina rolavel normal, `bottom-nav` fixo e padding inferior reservado no conteudo.
- Nao usar `viewport-fit=cover`; no iOS Safari ele criou uma faixa inferior extra e comportamento instavel com a barra do navegador.
- O `body` pode rolar verticalmente; evitar `overflow: hidden` global para telas com conteudo longo.
- O menu inferior fica `position: fixed`, centralizado na largura do app e com `padding-bottom: max(10px, env(safe-area-inset-bottom))`.
- Inputs com 16px para evitar zoom automatico no iOS.
- Botao principal grande e facil de tocar.
- Cartoes translucidos com blur leve e raio consistente.

## Telas

### Home

Logo oficial, saudacao, status do jardim, resumo rapido e atalhos para os fluxos principais.

### Colecao

Grid de cards com foto, nome popular, nome cientifico, temporada, frequencia de rega, saude e alertas.

### Identificacao com IA

Upload/camera, preview, estado de analise, chamada Gemini quando a API key existir e mensagem amigavel pedindo a chave quando nao existir.

### Detalhes da Planta

Modal com foto, nome popular principal, nome cientifico, nome popular usado em Ontario/Canada, confianca da IA, resumo visual do que foi identificado, origem/regiao nativa, familia, genero, substrato, vaso, floracao, cuidados praticos em Ontario, saude, manutencao, curiosidades, notas, regar e excluir.

### Cuidados

Lista de tarefas locais baseada nas plantas cadastradas, acao rapida de regar e card "Clima hoje para suas plantas" com dados Open-Meteo para orientar rega, umidade e luz.

### Configuracoes

Campo para colar e salvar a API key do Gemini localmente no navegador. A chave nao e enviada a nenhum servidor proprio; ela e usada apenas no navegador para chamadas diretas ao Gemini.

Configuracao de clima local com cidade/regiao de Ontario ou geolocalizacao do navegador. O app usa Open-Meteo sem API key e salva a ultima localizacao/previsao localmente.

## IA Botanica

A resposta do Gemini deve priorizar utilidade para moradores de Ontario, Canada. Cada identificacao deve incluir nome cientifico correto, nome popular em portugues, nome popular usado em Ontario/Canada em ingles, nome comercial de garden center, origem/regiao nativa, confianca da identificacao, sinais vistos na foto e cuidados praticos para ambiente interno em Ontario.

Para orquideas Phalaenopsis, usar "Orquidea borboleta" em portugues, "Moth orchid" em Ontario/Canada e explicar quando `Phalaenopsis spp.` significa genero/grupo identificado sem especie ou cultivar exata.

## PWA

O app inclui manifest, service worker, icone baseado na logo e cache offline dos assets principais. A experiencia foi pensada para ser instalada na tela inicial do iPhone.
