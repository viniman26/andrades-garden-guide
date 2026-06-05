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

- `100dvh`, safe-area para notch e barra inferior.
- Body sem rolagem global; rolagem apenas no painel interno.
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

Modal com foto, badges, resumo de cuidados, secoes de identificacao, saude, suplementos, propagacao, notas, regar e excluir.

### Cuidados

Lista de tarefas locais baseada nas plantas cadastradas e acao rapida de regar.

### Configuracoes

Campo para colar e salvar a API key do Gemini localmente no navegador. A chave nao e enviada a nenhum servidor proprio; ela e usada apenas no navegador para chamadas diretas ao Gemini.

## PWA

O app inclui manifest, service worker, icone baseado na logo e cache offline dos assets principais. A experiencia foi pensada para ser instalada na tela inicial do iPhone.
