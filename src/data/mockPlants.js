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
        nome_popular_ontario_canada: "Swiss cheese plant",
        nome_comercial_canada: "Monstera",
        nome_cientifico: "Monstera deliciosa",
        genero: "Monstera",
        familia_botanica: "Araceae",
        origem_geografica: "Florestas tropicais da America Central",
        regiao_nativa: "Sul do Mexico ao Panama",
        tipo_planta: "Aracea tropical de interior",
        confianca_identificacao: "Alta",
        observacao_identificacao: "Folhas grandes e recortadas indicam Monstera deliciosa.",
        ciclo_de_vida: "Perene"
      },
      descricao_visual: {
        sinais_observados: ["Folhas grandes", "Habito trepador", "Folhagem tropical"],
        motivo_identificacao: "A folha fenestrada e o porte combinam com Costela-de-Adao.",
        limitacoes_da_foto: "Cultivares jovens podem ter menos recortes nas folhas."
      },
      cuidados_e_rotina: {
        frequencia_rega_verao: "5-7 dias",
        frequencia_rega_inverno: "10-14 dias",
        indicador_umidade_solo: "Deixe a camada superior secar",
        necessidade_luminosidade: "Meia-sombra com luz indireta",
        tolerancia_temperatura: "18C a 30C",
        umidade_ar_ideal: "Media/Alta",
        vaso_e_drenagem: "Vaso com furos e tutor se crescer muito",
        substrato_recomendado: "Mistura para araceas com casca de pinus, perlita e fibra de coco",
        cuidados_praticos_ontario: [
          "No inverno, aproxime de uma janela clara sem encostar no vidro frio.",
          "Use umidificador se a casa ficar muito seca com aquecimento.",
          "Regue menos quando os dias estiverem escuros e frios."
        ],
        erros_comuns: ["Excesso de agua", "Pouca luz por muitos meses"],
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
        sinais_positivos: ["Folhagem firme", "Cor verde uniforme"],
        sinais_alerta: ["Manchas amarelas", "Pontas marrons"],
        principais_pragas_ameaca: ["Cochonilhas", "Acaros"],
        sinais_excesso_agua: "Folhas amareladas e solo encharcado",
        sinais_falta_agua: "Folhas caidas e bordas secas",
        sinais_falta_luz: "Crescimento esticado e folhas pequenas",
        proxima_acao_recomendada: "Manter luz indireta forte e checar substrato antes de regar."
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
          "Corte abaixo de um no saudavel, coloque em agua limpa ou substrato umido e mantenha em local iluminado sem sol direto ate enraizar.",
        curiosidades: ["E uma das plantas tropicais mais vendidas em garden centers canadenses."],
        nota_para_pets_e_criancas: "Toxica se ingerida por pets e criancas."
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
        nome_popular_ontario_canada: "Snake plant",
        nome_comercial_canada: "Snake plant",
        nome_cientifico: "Dracaena trifasciata",
        genero: "Dracaena",
        familia_botanica: "Asparagaceae",
        origem_geografica: "Africa Ocidental",
        regiao_nativa: "Africa Ocidental tropical",
        tipo_planta: "Folhagem suculenta de interior",
        confianca_identificacao: "Alta",
        observacao_identificacao: "Folhas verticais rigidas indicam Dracaena trifasciata.",
        ciclo_de_vida: "Perene"
      },
      descricao_visual: {
        sinais_observados: ["Folhas verticais", "Textura rigida", "Porte em roseta"],
        motivo_identificacao: "O formato de espada e padrao de crescimento combinam com Snake plant.",
        limitacoes_da_foto: "Algumas variedades tem bordas e padroes diferentes."
      },
      cuidados_e_rotina: {
        frequencia_rega_verao: "10-15 dias",
        frequencia_rega_inverno: "20-30 dias",
        indicador_umidade_solo: "Deixe secar completamente",
        necessidade_luminosidade: "Luz indireta a sol fraco",
        tolerancia_temperatura: "15C a 32C",
        umidade_ar_ideal: "Baixa/Media",
        vaso_e_drenagem: "Vaso com furos e substrato que seque rapido",
        substrato_recomendado: "Substrato para cactos ou suculentas com perlita",
        cuidados_praticos_ontario: [
          "No inverno, regue muito pouco porque a planta entra em ritmo lento.",
          "Tolera casas secas e aquecidas melhor que plantas tropicais.",
          "Evite deixar perto de porta com corrente fria."
        ],
        erros_comuns: ["Regar em excesso", "Usar vaso sem drenagem"],
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
        sinais_positivos: ["Folhas firmes", "Base seca e estavel"],
        sinais_alerta: ["Base mole", "Folhas amarelas"],
        principais_pragas_ameaca: ["Cochonilhas"],
        sinais_excesso_agua: "Base mole e folhas amarelas",
        sinais_falta_agua: "Folhas enrugadas",
        sinais_falta_luz: "Crescimento parado",
        proxima_acao_recomendada: "Aguardar o substrato secar completamente antes de regar."
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
          "Retire a planta do vaso, separe brotos com raizes proprias e replante em substrato seco. Aguarde alguns dias antes da primeira rega.",
        curiosidades: ["E vendida no Canada como planta tolerante a pouca luz."],
        nota_para_pets_e_criancas: "Toxica se ingerida por pets e criancas."
      }
    }
  }
];
