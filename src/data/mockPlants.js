export const mockPlants = [
  {
    id: "mock-monstera",
    image: "./assets/concept.png",
    createdAt: new Date().toISOString(),
    lastWateredAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    notes: "Esta desenvolvendo uma nova folha. Manter em meia-sombra.",
    gemini: {
      identificacao_basica: {
        nome_popular: "Costela-de-Adao",
        nome_cientifico: "Monstera deliciosa",
        familia_botanica: "Araceae",
        origem_geografica: "Florestas tropicais da America Central",
        ciclo_de_vida: "Perene"
      },
      cuidados_e_rotina: {
        frequencia_rega_verao: "5-7 dias",
        frequencia_rega_inverno: "10-14 dias",
        indicador_umidade_solo: "Deixe a camada superior secar",
        necessidade_luminosidade: "Meia-sombra com luz indireta",
        tolerancia_temperatura: "18C a 30C",
        umidade_ar_ideal: "Media/Alta",
        toxicidade_pets: true,
        toxicidade_criancas: true
      },
      sazonalidade_e_crescimento: {
        temporada_ativa_season: "Primavera/Verao",
        velocidade_crescimento: "Medio",
        porte_maximo_domestico: "1,5m a 2,5m",
        epoca_floracao: "Rara em interiores",
        necessidade_poda: "Baixa"
      },
      diagnostico_e_saude: {
        status_saude_atual: "Saudavel",
        principais_pragas_ameaca: ["Cochonilhas", "Acaros"],
        sinais_excesso_agua: "Folhas amareladas e solo encharcado",
        sinais_falta_agua: "Folhas caidas e bordas secas",
        sinais_falta_luz: "Crescimento esticado e folhas pequenas"
      },
      suplementos_e_manutencao: {
        tipo_solo_substrato_ideal: "Substrato aerado com fibra de coco, perlita e casca de pinus",
        frequencia_adubacao: "Mensal na primavera e verao",
        tipo_adubo_recomendado: "NPK equilibrado ou organico para folhagens",
        onde_comprar_suplementos: ["substrato para araceas", "adubo para folhagens"],
        ph_solo_ideal: "5.5 a 7.0",
        necessidade_drenagem: "Alta"
      },
      propagacao_e_extras: {
        metodo_propagacao: "Estaca de caule com no",
        nivel_dificuldade_cultivo: "Facil",
        instrucoes_execucao_passo_a_passo:
          "Corte abaixo de um no saudavel, coloque em agua limpa ou substrato umido e mantenha em local iluminado sem sol direto ate enraizar."
      }
    }
  },
  {
    id: "mock-sansevieria",
    image: "./assets/wallpaper.png",
    createdAt: new Date().toISOString(),
    lastWateredAt: new Date(Date.now() - 9 * 86400000).toISOString(),
    notes: "Boa para ambientes internos e rotinas de pouca manutencao.",
    gemini: {
      identificacao_basica: {
        nome_popular: "Espada-de-Sao-Jorge",
        nome_cientifico: "Dracaena trifasciata",
        familia_botanica: "Asparagaceae",
        origem_geografica: "Africa Ocidental",
        ciclo_de_vida: "Perene"
      },
      cuidados_e_rotina: {
        frequencia_rega_verao: "10-15 dias",
        frequencia_rega_inverno: "20-30 dias",
        indicador_umidade_solo: "Deixe secar completamente",
        necessidade_luminosidade: "Luz indireta a sol fraco",
        tolerancia_temperatura: "15C a 32C",
        umidade_ar_ideal: "Baixa/Media",
        toxicidade_pets: true,
        toxicidade_criancas: true
      },
      sazonalidade_e_crescimento: {
        temporada_ativa_season: "Ano todo",
        velocidade_crescimento: "Lento",
        porte_maximo_domestico: "60cm a 1,2m",
        epoca_floracao: "Incomum",
        necessidade_poda: "Baixa"
      },
      diagnostico_e_saude: {
        status_saude_atual: "Saudavel",
        principais_pragas_ameaca: ["Cochonilhas"],
        sinais_excesso_agua: "Base mole e folhas amarelas",
        sinais_falta_agua: "Folhas enrugadas",
        sinais_falta_luz: "Crescimento parado"
      },
      suplementos_e_manutencao: {
        tipo_solo_substrato_ideal: "Substrato para cactos com excelente drenagem",
        frequencia_adubacao: "A cada 60 dias na fase ativa",
        tipo_adubo_recomendado: "Adubo leve para suculentas",
        onde_comprar_suplementos: ["substrato para cactos", "perlita"],
        ph_solo_ideal: "6.0 a 7.5",
        necessidade_drenagem: "Critica"
      },
      propagacao_e_extras: {
        metodo_propagacao: "Divisao de touceira",
        nivel_dificuldade_cultivo: "Facil",
        instrucoes_execucao_passo_a_passo:
          "Retire a planta do vaso, separe brotos com raizes proprias e replante em substrato seco. Aguarde alguns dias antes da primeira rega."
      }
    }
  }
];
