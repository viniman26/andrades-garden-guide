export const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";

export const GEMINI_MODELS = [
  { id: "gemini-2.5-flash", label: "Gemini 2.5 Flash (Rapido / Recomendado)" },
  { id: "gemini-2.5-pro", label: "Gemini 2.5 Pro (Raciocinio Avancado)" },
  { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash (Compativel)" }
];

export const GEMINI_SCHEMA_PROMPT = `
Identifique a planta da imagem para uma pessoa que mora em Ontario, Canada.
Responda exclusivamente com JSON valido, sem markdown, comentarios ou texto fora do JSON.
Use portugues do Brasil para explicacoes, mas inclua nomes comuns usados em Ontario/Canada em ingles.
Priorize utilidade para cultivo domestico em Ontario: inverno seco, baixa luz no inverno, casas aquecidas e plantas em vaso.
Se a especie exata nao puder ser determinada, identifique com seguranca no nivel de genero/grupo e explique a limitacao.
Para Phalaenopsis, use a grafia correta "Phalaenopsis"; nome popular em portugues "Orquidea borboleta"; nome em Ontario/Canada "Moth orchid"; explique que "spp." indica grupo/genero sem cultivar exata.
Evite "nao informado" quando houver uma resposta segura no nivel de genero, familia ou grupo.
Use strings em portugues do Brasil, arrays de strings e booleans reais para toxicidade.
`;

const GEMINI_RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    identificacao_basica: {
      type: "object",
      properties: {
        nome_popular: { type: "string" },
        nome_popular_ontario_canada: { type: "string" },
        nome_comercial_canada: { type: "string" },
        nome_cientifico: { type: "string" },
        genero: { type: "string" },
        familia_botanica: { type: "string" },
        origem_geografica: { type: "string" },
        regiao_nativa: { type: "string" },
        tipo_planta: { type: "string" },
        ciclo_de_vida: { type: "string" },
        confianca_identificacao: { type: "string" },
        observacao_identificacao: { type: "string" }
      },
      required: [
        "nome_popular",
        "nome_popular_ontario_canada",
        "nome_comercial_canada",
        "nome_cientifico",
        "genero",
        "familia_botanica",
        "origem_geografica",
        "regiao_nativa",
        "tipo_planta",
        "ciclo_de_vida",
        "confianca_identificacao",
        "observacao_identificacao"
      ]
    },
    descricao_visual: {
      type: "object",
      properties: {
        sinais_observados: { type: "array", items: { type: "string" } },
        motivo_identificacao: { type: "string" },
        limitacoes_da_foto: { type: "string" }
      },
      required: ["sinais_observados", "motivo_identificacao", "limitacoes_da_foto"]
    },
    cuidados_e_rotina: {
      type: "object",
      properties: {
        frequencia_rega_verao: { type: "string" },
        frequencia_rega_inverno: { type: "string" },
        indicador_umidade_solo: { type: "string" },
        necessidade_luminosidade: { type: "string" },
        tolerancia_temperatura: { type: "string" },
        umidade_ar_ideal: { type: "string" },
        vaso_e_drenagem: { type: "string" },
        substrato_recomendado: { type: "string" },
        cuidados_praticos_ontario: { type: "array", items: { type: "string" } },
        erros_comuns: { type: "array", items: { type: "string" } },
        toxicidade_pets: { type: "boolean" },
        toxicidade_criancas: { type: "boolean" }
      },
      required: [
        "frequencia_rega_verao",
        "frequencia_rega_inverno",
        "indicador_umidade_solo",
        "necessidade_luminosidade",
        "tolerancia_temperatura",
        "umidade_ar_ideal",
        "vaso_e_drenagem",
        "substrato_recomendado",
        "cuidados_praticos_ontario",
        "erros_comuns",
        "toxicidade_pets",
        "toxicidade_criancas"
      ]
    },
    sazonalidade_e_crescimento: {
      type: "object",
      properties: {
        temporada_ativa_season: { type: "string" },
        velocidade_crescimento: { type: "string" },
        porte_maximo_domestico: { type: "string" },
        epoca_floracao: { type: "string" },
        necessidade_poda: { type: "string" }
      },
      required: ["temporada_ativa_season", "velocidade_crescimento", "porte_maximo_domestico", "epoca_floracao", "necessidade_poda"]
    },
    diagnostico_e_saude: {
      type: "object",
      properties: {
        status_saude_atual: { type: "string" },
        sinais_positivos: { type: "array", items: { type: "string" } },
        sinais_alerta: { type: "array", items: { type: "string" } },
        principais_pragas_ameaca: { type: "array", items: { type: "string" } },
        sinais_excesso_agua: { type: "string" },
        sinais_falta_agua: { type: "string" },
        sinais_falta_luz: { type: "string" },
        proxima_acao_recomendada: { type: "string" }
      },
      required: [
        "status_saude_atual",
        "sinais_positivos",
        "sinais_alerta",
        "principais_pragas_ameaca",
        "sinais_excesso_agua",
        "sinais_falta_agua",
        "sinais_falta_luz",
        "proxima_acao_recomendada"
      ]
    },
    suplementos_e_manutencao: {
      type: "object",
      properties: {
        tipo_solo_substrato_ideal: { type: "string" },
        frequencia_adubacao: { type: "string" },
        tipo_adubo_recomendado: { type: "string" },
        onde_comprar_suplementos: { type: "array", items: { type: "string" } },
        ph_solo_ideal: { type: "string" },
        necessidade_drenagem: { type: "string" }
      },
      required: [
        "tipo_solo_substrato_ideal",
        "frequencia_adubacao",
        "tipo_adubo_recomendado",
        "onde_comprar_suplementos",
        "ph_solo_ideal",
        "necessidade_drenagem"
      ]
    },
    propagacao_e_extras: {
      type: "object",
      properties: {
        metodo_propagacao: { type: "string" },
        nivel_dificuldade_cultivo: { type: "string" },
        instrucoes_execucao_passo_a_passo: { type: "string" },
        curiosidades: { type: "array", items: { type: "string" } },
        nota_para_pets_e_criancas: { type: "string" }
      },
      required: [
        "metodo_propagacao",
        "nivel_dificuldade_cultivo",
        "instrucoes_execucao_passo_a_passo",
        "curiosidades",
        "nota_para_pets_e_criancas"
      ]
    }
  },
  required: [
    "identificacao_basica",
    "descricao_visual",
    "cuidados_e_rotina",
    "sazonalidade_e_crescimento",
    "diagnostico_e_saude",
    "suplementos_e_manutencao",
    "propagacao_e_extras"
  ]
};

export async function identifyPlantWithGemini({ apiKey, imageBase64, mimeType, model = DEFAULT_GEMINI_MODEL }) {
  if (!apiKey) {
    throw new Error("Adicione sua API key do Gemini nas configuracoes para usar a IA.");
  }

  const cleanBase64 = imageBase64.split(",").pop();
  const response = await fetch(
    geminiGenerateUrl(apiKey, model),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: GEMINI_SCHEMA_PROMPT },
              {
                inline_data: {
                  mime_type: mimeType,
                  data: cleanBase64
                }
              }
            ]
          }
        ],
        generationConfig: {
          response_mime_type: "application/json",
          response_schema: GEMINI_RESPONSE_SCHEMA,
          temperature: 0.2
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error("Nao foi possivel consultar o Gemini.");
  }

  const payload = await response.json();
  const rawText = payload?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error("O Gemini nao retornou um JSON valido.");

  return validateGeminiResult(JSON.parse(rawText));
}

export async function testGeminiApiKey({ apiKey, model = DEFAULT_GEMINI_MODEL }) {
  if (!apiKey) {
    throw new Error("Cole uma API key antes de testar.");
  }

  const response = await fetch(geminiGenerateUrl(apiKey, model), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: "Responda apenas: ok" }]
        }
      ],
      generationConfig: {
        temperature: 0,
        maxOutputTokens: 8
      }
    })
  });

  if (!response.ok) {
    throw new Error("A chave nao respondeu. Verifique a API key e o modelo escolhido.");
  }

  return true;
}

function geminiGenerateUrl(apiKey, model) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
}

export function validateGeminiResult(result) {
  const required = [
    "identificacao_basica",
    "descricao_visual",
    "cuidados_e_rotina",
    "sazonalidade_e_crescimento",
    "diagnostico_e_saude",
    "suplementos_e_manutencao",
    "propagacao_e_extras"
  ];

  for (const key of required) {
    if (!result || typeof result !== "object" || !result[key]) {
      throw new Error(`Resposta incompleta do Gemini: ${key}`);
    }
  }

  return result;
}

export function mockGeminiResult() {
  return {
    identificacao_basica: {
      nome_popular: "Zamioculca",
      nome_popular_ontario_canada: "ZZ plant",
      nome_comercial_canada: "ZZ plant",
      nome_cientifico: "Zamioculcas zamiifolia",
      genero: "Zamioculcas",
      familia_botanica: "Araceae",
      origem_geografica: "Africa Oriental",
      regiao_nativa: "Africa Oriental, especialmente Tanzania e Zanzibar",
      tipo_planta: "Folhagem tropical de interior",
      ciclo_de_vida: "Perene",
      confianca_identificacao: "Alta",
      observacao_identificacao: "Identificada pelas folhas brilhantes em pares e hastes arqueadas."
    },
    descricao_visual: {
      sinais_observados: ["Folhas verdes brilhantes", "Hastes grossas", "Crescimento compacto em vaso"],
      motivo_identificacao: "O conjunto de folhas cerosas e hastes verticais combina com Zamioculcas zamiifolia.",
      limitacoes_da_foto: "A foto nao mostra raizes ou rizomas, entao a confirmacao e visual."
    },
    cuidados_e_rotina: {
      frequencia_rega_verao: "10-15 dias",
      frequencia_rega_inverno: "20-30 dias",
      indicador_umidade_solo: "Deixe secar completamente",
      necessidade_luminosidade: "Luz indireta ou sombra clara",
      tolerancia_temperatura: "18C a 30C",
      umidade_ar_ideal: "Media",
      vaso_e_drenagem: "Vaso com furos e camada de drenagem livre",
      substrato_recomendado: "Mistura leve para folhagens com perlita ou casca fina",
      cuidados_praticos_ontario: [
        "No inverno de Ontario, reduza bem a rega porque a luz e menor.",
        "Mantenha longe de correntes frias e janelas geladas.",
        "Limpe as folhas para aproveitar melhor a luz indireta."
      ],
      erros_comuns: ["Regar antes do substrato secar", "Deixar agua acumulada no cachepo"],
      toxicidade_pets: true,
      toxicidade_criancas: true
    },
    sazonalidade_e_crescimento: {
      temporada_ativa_season: "Primavera/Verao",
      velocidade_crescimento: "Lento",
      porte_maximo_domestico: "40cm a 90cm",
      epoca_floracao: "Rara em ambiente interno",
      necessidade_poda: "Baixa"
    },
    diagnostico_e_saude: {
      status_saude_atual: "Saudavel",
      sinais_positivos: ["Folhas firmes", "Coloracao uniforme"],
      sinais_alerta: ["Folhas amarelando", "Hastes moles"],
      principais_pragas_ameaca: ["Cochonilhas", "Acaros"],
      sinais_excesso_agua: "Hastes moles e amareladas",
      sinais_falta_agua: "Folhas opacas e enrugadas",
      sinais_falta_luz: "Crescimento muito lento",
      proxima_acao_recomendada: "Verifique se o substrato esta seco antes da proxima rega."
    },
    suplementos_e_manutencao: {
      tipo_solo_substrato_ideal: "Substrato leve, aerado e com drenagem alta",
      frequencia_adubacao: "A cada 45 dias na primavera e verao",
      tipo_adubo_recomendado: "Adubo equilibrado diluido",
      onde_comprar_suplementos: ["substrato para folhagens", "adubo NPK equilibrado"],
      ph_solo_ideal: "6.0 a 7.0",
      necessidade_drenagem: "Alta"
    },
    propagacao_e_extras: {
      metodo_propagacao: "Divisao de rizomas",
      nivel_dificuldade_cultivo: "Facil",
      instrucoes_execucao_passo_a_passo:
        "Remova a planta do vaso, separe uma divisao com rizoma e raizes saudaveis, replante em substrato seco e aguarde alguns dias antes de regar.",
      curiosidades: ["E vendida no Canada como uma das plantas de interior mais tolerantes a pouca luz."],
      nota_para_pets_e_criancas: "Mantenha fora do alcance; pode causar irritacao se ingerida."
    }
  };
}
