export const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";

export const GEMINI_MODELS = [
  { id: "gemini-2.5-flash", label: "Gemini 2.5 Flash (Rapido / Recomendado)" },
  { id: "gemini-2.5-pro", label: "Gemini 2.5 Pro (Raciocinio Avancado)" },
  { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash (Compativel)" }
];

export const GEMINI_SCHEMA_PROMPT = `
Identifique a planta da imagem e responda exclusivamente com JSON valido.
Nao use markdown, comentarios ou texto fora do JSON.
O JSON deve seguir exatamente as chaves:
identificacao_basica, cuidados_e_rotina, sazonalidade_e_crescimento,
diagnostico_e_saude, suplementos_e_manutencao, propagacao_e_extras.
Use strings em portugues do Brasil e booleans reais para toxicidade.
`;

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
      nome_cientifico: "Zamioculcas zamiifolia",
      familia_botanica: "Araceae",
      origem_geografica: "Africa Oriental",
      ciclo_de_vida: "Perene"
    },
    cuidados_e_rotina: {
      frequencia_rega_verao: "10-15 dias",
      frequencia_rega_inverno: "20-30 dias",
      indicador_umidade_solo: "Deixe secar completamente",
      necessidade_luminosidade: "Luz indireta ou sombra clara",
      tolerancia_temperatura: "18C a 30C",
      umidade_ar_ideal: "Media",
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
      principais_pragas_ameaca: ["Cochonilhas", "Acaros"],
      sinais_excesso_agua: "Hastes moles e amareladas",
      sinais_falta_agua: "Folhas opacas e enrugadas",
      sinais_falta_luz: "Crescimento muito lento"
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
        "Remova a planta do vaso, separe uma divisao com rizoma e raizes saudaveis, replante em substrato seco e aguarde alguns dias antes de regar."
    }
  };
}
