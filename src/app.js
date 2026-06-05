import { mockPlants } from "./data/mockPlants.js";
import {
  deletePlant,
  deleteSetting,
  getSetting,
  listPlants,
  savePlant,
  setSetting
} from "./services/db.js";
import { DEFAULT_GEMINI_MODEL, GEMINI_MODELS, identifyPlantWithGemini, testGeminiApiKey } from "./services/gemini.js";
import { DEFAULT_WEATHER_LOCATION, fetchWeatherForecast, geocodeWeatherLocation } from "./services/weather.js";

const app = document.querySelector("#app");
const splash = document.querySelector("#splash");
const SPLASH_DURATION_MS = 2000;

const state = {
  tab: "home",
  plants: [],
  selectedPlantId: "",
  apiKey: "",
  geminiModel: DEFAULT_GEMINI_MODEL,
  settingsDraftApiKey: null,
  settingsDraftModel: null,
  uploadPreview: "",
  uploadMime: "",
  isAnalyzing: false,
  isTestingApi: false,
  apiTestMessage: "",
  toast: "",
  searchQuery: "",
  selectedCareDayOffset: 0,
  weather: {
    location: DEFAULT_WEATHER_LOCATION,
    forecast: null,
    status: "idle",
    message: "",
    draftLocation: ""
  }
};

const tabs = [
  { id: "home", label: "Inicio", icon: leafIcon },
  { id: "collection", label: "Colecao", icon: gridIcon },
  { id: "identify", label: "IA", icon: cameraIcon },
  { id: "care", label: "Cuidados", icon: dropIcon },
  { id: "settings", label: "Ajustes", icon: gearIcon }
];

init();

async function init() {
  const splashStartedAt = performance.now();

  try {
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if ("serviceWorker" in navigator && !isLocalhost) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js").catch(() => {});
      });
    }

    state.apiKey = await getSetting("geminiApiKey");
    state.geminiModel = (await getSetting("geminiModel")) || DEFAULT_GEMINI_MODEL;
    state.weather.location = (await getSetting("weatherLocation")) || DEFAULT_WEATHER_LOCATION;
    state.weather.draftLocation = state.weather.location.name || DEFAULT_WEATHER_LOCATION.name;
    const savedPlants = await listPlants();
    if (!savedPlants.length) {
      await Promise.all(mockPlants.map((plant) => savePlant(plant)));
      state.plants = await listPlants();
    } else {
      state.plants = savedPlants;
    }
  } catch (error) {
    console.error("Erro ao carregar IndexedDB, usando dados em memoria:", error);
    state.plants = [...mockPlants];
  }

  render();
  refreshWeather({ silent: true });

  const elapsed = performance.now() - splashStartedAt;
  await wait(Math.max(0, SPLASH_DURATION_MS - elapsed));
  hideSplash();
}

function render() {
  const selectedPlant = state.plants.find((plant) => plant.id === state.selectedPlantId);

  app.innerHTML = `
    <main class="phone-frame">
      <section class="screen">
        ${renderHeader()}
        <div class="content-scroll">
          ${renderActiveTab()}
        </div>
        ${renderNav()}
        ${state.toast ? `<div class="toast">${state.toast}</div>` : ""}
      </section>
    </main>
    ${selectedPlant ? renderDetailsModal(selectedPlant) : ""}
  `;

  bindEvents();
}

function renderHeader() {
  return `
    <header class="topbar">
      <button class="brand-button" data-tab="home" aria-label="Ir para inicio">
        <img src="./assets/logo.png" alt="Andrade's Garden Guide" class="brand-logo" />
      </button>
      <button class="icon-button" data-tab="settings" aria-label="Abrir configuracoes">${gearIcon()}</button>
    </header>
  `;
}

function renderActiveTab() {
  if (state.tab === "collection") return renderCollection();
  if (state.tab === "identify") return renderIdentify();
  if (state.tab === "care") return renderCare();
  if (state.tab === "settings") return renderSettings();
  return renderHome();
}

function renderHome() {
  const waterToday = state.plants.filter((plant) => daysSince(plant.lastWateredAt) >= getWateringInterval(plant)).length;
  return `
    <section class="hero-panel">
      <p class="hello">Bom dia, Vinia</p>
      <h1>Seu jardim esta florescendo hoje</h1>
      <p class="muted">Guarde suas plantas, identifique novas folhas e acompanhe cuidados no seu iPhone.</p>
      <div class="stats-grid">
        <article><strong>${state.plants.length}</strong><span>plantas</span></article>
        <article><strong>${waterToday}</strong><span>regar hoje</span></article>
        <article><strong>82%</strong><span>umidade media</span></article>
      </div>
    </section>

    <section class="quick-actions">
      ${quickAction("collection", gridIcon(), "Minhas Plantas", "Veja sua colecao local")}
      ${quickAction("care", dropIcon(), "Regar Hoje", "Atualize cuidados")}
      ${quickAction("identify", cameraIcon(), "Identificar com IA", "Use foto ou galeria")}
      ${quickAction("settings", gearIcon(), "Gemini API Key", state.apiKey ? "Chave salva localmente" : "Cole sua chave aqui")}
    </section>

    <section class="section-title">
      <h2>Destaques</h2>
      <button data-tab="collection">Ver todas</button>
    </section>
    <div class="plant-strip">
      ${state.plants.slice(0, 3).map(renderPlantCard).join("")}
    </div>
  `;
}

function renderCollection() {
  const query = (state.searchQuery || "").toLowerCase().trim();
  const filteredPlants = state.plants.filter((plant) => {
    if (!query) return true;
    const popular = (plant.gemini?.identificacao_basica?.nome_popular || "").toLowerCase();
    const ontario = (plant.gemini?.identificacao_basica?.nome_popular_ontario_canada || "").toLowerCase();
    const scientific = (plant.gemini?.identificacao_basica?.nome_cientifico || "").toLowerCase();
    return popular.includes(query) || ontario.includes(query) || scientific.includes(query);
  });

  return `
    <section class="section-title">
      <div>
        <h1>Minha Colecao</h1>
        <p>${state.plants.length} plantas salvas no navegador</p>
      </div>
      <button class="primary-small" data-tab="identify">Nova</button>
    </section>
    <div class="search-box">
      ${searchIcon()}
      <input type="text" id="searchPlants" placeholder="Buscar planta..." value="${escapeHtml(state.searchQuery || '')}" />
    </div>
    <div class="plant-grid">
      ${filteredPlants.map(renderPlantCard).join("")}
    </div>
  `;
}

function renderIdentify() {
  return `
    <section class="identify-panel">
      <h1>Identificar com IA</h1>
      <p>A foto fica salva localmente. Com API key configurada, o Gemini analisa a imagem e salva a planta na sua colecao.</p>

      ${
        state.apiKey
          ? ""
          : `<article class="friendly-card">
              <strong>Configure a chave para usar a IA</strong>
              <span>Adicione sua API key do Gemini em Ajustes para analisar fotos de plantas.</span>
              <button class="secondary-button" data-tab="settings">Adicionar chave</button>
            </article>`
      }

      <label class="upload-box">
        <input type="file" accept="image/*" capture="environment" id="plantUpload" />
        ${
          state.uploadPreview
            ? `<img src="${state.uploadPreview}" alt="Preview da planta" />`
            : `<span>${cameraIcon()}</span><strong>Tire uma foto ou escolha da galeria</strong>`
        }
      </label>

      ${state.uploadPreview && !state.isAnalyzing ? `
        <button class="ghost-button danger" id="clearUploadButton" type="button" style="margin-bottom: 14px;">Remover foto</button>
      ` : ""}

      <button class="primary-button" id="analyzeButton" ${state.apiKey && state.uploadPreview && !state.isAnalyzing ? "" : "disabled"}>
        ${state.isAnalyzing ? "Analisando folhas..." : "Analisar e salvar planta"}
      </button>
      ${state.isAnalyzing ? `<div class="skeleton-card"></div>` : ""}
    </section>
  `;
}

function renderCare() {
  const days = getWeeklyDays();
  
  const daysWithTasks = days.map(day => {
    const scheduled = getPlantsScheduledForOffset(state.plants, day.offset);
    return {
      ...day,
      hasTasks: scheduled.length > 0,
      taskCount: scheduled.length
    };
  });

  const activeDayTasks = getPlantsScheduledForOffset(state.plants, state.selectedCareDayOffset);

  return `
    <section class="section-title">
      <div>
        <h1>Cuidados</h1>
        <p>Projete a rega das suas plantas para os proximos 14 dias.</p>
      </div>
    </section>

    ${renderWeatherCard()}

    <div class="calendar-week">
      ${daysWithTasks.map(day => `
        <button class="calendar-day-card ${state.selectedCareDayOffset === day.offset ? 'active' : ''}" data-day-offset="${day.offset}">
          <span class="day-name">${day.name}</span>
          <strong class="day-num">${day.dayNum}</strong>
          ${day.hasTasks ? `<span class="calendar-dot"></span>` : ''}
        </button>
      `).join('')}
    </div>

    <div class="care-list">
      ${activeDayTasks.length > 0 ? activeDayTasks.map(plant => {
        const interval = getWateringInterval(plant);
        const days = daysSince(plant.lastWateredAt);
        let statusString = "";
        let isWateredToday = (days === 0);

        if (isWateredToday) {
          statusString = "Regada hoje";
        } else if (state.selectedCareDayOffset === 0) {
          statusString = days >= interval ? "Regar hoje (Atrasado)" : `Proxima rega em ${interval - days} dias`;
        } else {
          statusString = `Programada para este dia (Ciclo: ${interval}d)`;
        }

        return `
          <article class="care-row">
            <div class="care-icon ${isWateredToday ? "" : "due"}">${dropIcon()}</div>
            <div>
              <strong>${nameOf(plant)}</strong>
              <span>${statusString}</span>
            </div>
            ${isWateredToday
              ? `<button class="secondary-button" disabled>Regada</button>`
              : `<button class="secondary-button" data-water="${plant.id}">Regar</button>`
            }
          </article>
        `;
      }).join('') : `
        <div class="empty-care-card">
          <span>🌸</span>
          <strong>Dia livre!</strong>
          <small style="margin-top: 4px; color: var(--muted);">Nenhum cuidado pendente. Seu jardim esta tranquilo!</small>
        </div>
      `}
    </div>
  `;
}

function renderSettings() {
  const displayedApiKey = state.settingsDraftApiKey ?? state.apiKey;
  const displayedModel = state.settingsDraftModel ?? state.geminiModel;

  return `
    <section class="settings-panel">
      <h1>Configuracoes</h1>
      <p class="muted">Cole aqui sua API key do Gemini para ativar a identificacao real por visao computacional.</p>

      <form id="settingsForm" class="settings-form">
        <label for="geminiApiKey">Gemini API key</label>
        <div class="key-row">
          <input
            id="geminiApiKey"
            name="geminiApiKey"
            type="password"
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
            placeholder="Cole sua chave aqui"
            value="${escapeHtml(displayedApiKey)}"
          />
          <button type="button" class="icon-button" id="toggleKey" aria-label="Mostrar ou esconder chave">${eyeIcon()}</button>
        </div>
        <label for="geminiModel">Modelo Gemini</label>
        <select id="geminiModel" name="geminiModel">
          ${GEMINI_MODELS.map(
            (model) => `<option value="${model.id}" ${displayedModel === model.id ? "selected" : ""}>${model.label}</option>`
          ).join("")}
        </select>
        <button class="primary-button" type="submit">Salvar chave</button>
        <button class="secondary-button" type="button" id="testApiKey" ${state.isTestingApi ? "disabled" : ""}>
          ${state.isTestingApi ? "Testando..." : "Testar API"}
        </button>
        <button class="ghost-button" type="button" id="removeKey">Remover chave</button>
      </form>

      ${state.apiTestMessage ? `<article class="status-card ${state.apiTestMessage.includes("funcionando") ? "success" : "warning"}"><span>${state.apiTestMessage}</span></article>` : ""}

      <article class="status-card">
        <strong>Status do Gemini</strong>
        <span>${state.apiKey ? `API key salva localmente. A proxima identificacao usara ${labelForModel(state.geminiModel)}.` : "Sem chave salva. A IA vai pedir para adicionar a chave antes de analisar."}</span>
      </article>

      <article class="status-card weather-settings-card">
        <strong>Clima local para cuidados</strong>
        <span>Usamos Open-Meteo sem API key. Padrao: Toronto, Ontario.</span>
        <div class="weather-location-row">
          <input
            id="weatherLocation"
            type="text"
            autocomplete="address-level2"
            placeholder="Cidade, Ontario"
            value="${escapeHtml(state.weather.draftLocation || state.weather.location.name || DEFAULT_WEATHER_LOCATION.name)}"
          />
          <button class="secondary-button" type="button" id="saveWeatherLocation">Salvar</button>
        </div>
        <button class="ghost-button" type="button" id="useCurrentLocation">Usar local atual</button>
      </article>
    </section>
  `;
}

function renderWeatherCard() {
  const weather = state.weather;
  const forecast = weather.forecast;
  const current = forecast?.current;
  const today = forecast?.daily?.[0];
  const advice = buildWeatherAdvice(forecast);
  const statusText = weather.status === "loading"
    ? "Atualizando previsao..."
    : weather.message || "Previsao local para planejar rega, umidade e luz.";

  return `
    <article class="weather-card">
      <div class="weather-card__header">
        <div>
          <span class="weather-kicker">Ontario weather</span>
          <h2>Clima hoje para suas plantas</h2>
          <p>${escapeHtml(weather.location?.name || DEFAULT_WEATHER_LOCATION.name)}</p>
        </div>
        <button class="icon-button" id="refreshWeather" aria-label="Atualizar clima">${cloudIcon()}</button>
      </div>
      ${
        forecast
          ? `
            <div class="weather-now">
              <strong>${formatNumber(current?.temperature)}C</strong>
              <span>${formatNumber(current?.humidity)}% umidade</span>
            </div>
            <div class="weather-grid">
              <article><span>Max/Min</span><strong>${formatNumber(today?.tempMax)}C / ${formatNumber(today?.tempMin)}C</strong></article>
              <article><span>Chuva</span><strong>${formatNumber(today?.precipitationProbability)}%</strong></article>
              <article><span>Sol</span><strong>${formatNumber(today?.sunshineHours)}h</strong></article>
              <article><span>Nuvens</span><strong>${formatNumber(current?.cloudCover)}%</strong></article>
            </div>
            <ul class="weather-advice">
              ${advice.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          `
          : `<p class="muted">${escapeHtml(statusText)}</p>`
      }
      <div class="weather-actions">
        <button class="secondary-button" id="useCurrentLocationCare" type="button">Usar local atual</button>
        <button class="ghost-button" data-tab="settings" type="button">Trocar cidade</button>
      </div>
    </article>
  `;
}

function renderNav() {
  return `
    <nav class="bottom-nav" aria-label="Navegacao principal">
      ${tabs
        .map(
          (tab) => `
          <button class="${state.tab === tab.id ? "active" : ""}" data-tab="${tab.id}" aria-label="${tab.label}">
            ${tab.icon()}
            <span>${tab.label}</span>
          </button>
        `
        )
        .join("")}
    </nav>
  `;
}

function renderPlantCard(plant) {
  const info = plant.gemini?.identificacao_basica || {};
  const care = plant.gemini?.cuidados_e_rotina || {};
  const season = plant.gemini?.sazonalidade_e_crescimento?.temporada_ativa_season || "Interior";
  const light = care.necessidade_luminosidade || "Luz indireta";
  const health = plant.gemini?.diagnostico_e_saude?.status_saude_atual || "Saudavel";
  const isToxic = care.toxicidade_pets || care.toxicidade_criancas || false;
  const displayName = nameOf(plant);

  return `
    <article class="plant-card" data-open="${plant.id}">
      <img src="${plant.image}" alt="${escapeHtml(displayName)}" />
      <span class="season">${escapeHtml(season)}</span>
      <h3>${escapeHtml(displayName)}</h3>
      <p>${escapeHtml(info.nome_cientifico || "Identificacao incompleta")}</p>
      <div class="card-badges">
        <span class="badge-health ${health.toLowerCase().includes('saud') ? 'healthy' : 'warning'}">${escapeHtml(health)}</span>
        ${isToxic ? '<span class="badge-alert">⚠️ Toxica</span>' : '<span class="badge-alert friendly">🐾 Seguro</span>'}
      </div>
      <div class="card-meta">
        <span>${dropIcon()} ${escapeHtml(care.frequencia_rega_verao || "Rega moderada")}</span>
        <span>${sunIcon()} ${escapeHtml(light.split(" ").slice(0, 2).join(" "))}</span>
      </div>
    </article>
  `;
}

function renderDetailsModal(plant) {
  const info = plant.gemini?.identificacao_basica || {};
  const visual = plant.gemini?.descricao_visual || {};
  const care = plant.gemini?.cuidados_e_rotina || {};
  const season = plant.gemini?.sazonalidade_e_crescimento || {};
  const health = plant.gemini?.diagnostico_e_saude || {};
  const supplements = plant.gemini?.suplementos_e_manutencao || {};
  const extras = plant.gemini?.propagacao_e_extras || {};
  const pests = Array.isArray(health.principais_pragas_ameaca) ? health.principais_pragas_ameaca : [];
  const displayName = nameOf(plant);
  const isPhalaenopsis = isPhalaenopsisPlant(plant);
  const ontarioName = info.nome_popular_ontario_canada || info.nome_comercial_canada || (isPhalaenopsis ? "Moth orchid" : "");
  const commercialName = info.nome_comercial_canada && info.nome_comercial_canada !== ontarioName ? info.nome_comercial_canada : "";
  const visualItems = Array.isArray(visual.sinais_observados) ? visual.sinais_observados : [];
  const practicalCare = Array.isArray(care.cuidados_praticos_ontario) ? care.cuidados_praticos_ontario : [];
  const commonMistakes = Array.isArray(care.erros_comuns) ? care.erros_comuns : [];
  const positiveSigns = Array.isArray(health.sinais_positivos) ? health.sinais_positivos : [];
  const alertSigns = Array.isArray(health.sinais_alerta) ? health.sinais_alerta : [];
  const curiosities = Array.isArray(extras.curiosidades) ? extras.curiosidades : [];

  return `
    <aside class="modal-backdrop">
      <section class="plant-modal">
        <div class="modal-image">
          <img src="${plant.image}" alt="${escapeHtml(displayName)}" />
          <button class="icon-button close-modal" aria-label="Fechar">${closeIcon()}</button>
        </div>
        <div class="modal-body">
          <div class="plant-title-block">
            <span class="detail-kicker">${escapeHtml(info.tipo_planta || (isPhalaenopsis ? "Orquidea epifita de interior" : "Planta de interior"))}</span>
            <h1>${escapeHtml(displayName)}</h1>
            <p><em>${escapeHtml(info.nome_cientifico || "Identificacao incompleta")}</em></p>
          </div>
          <div class="badge-row">
            ${ontarioName ? `<span>Ontario/Canada: ${escapeHtml(ontarioName)}</span>` : ""}
            ${commercialName ? `<span>Garden center: ${escapeHtml(commercialName)}</span>` : ""}
            <span>${escapeHtml(info.confianca_identificacao || "Confianca pendente")}</span>
            <span>${escapeHtml(health.status_saude_atual || "Acompanhamento pendente")}</span>
            ${care.toxicidade_pets ? "<span>Toxica para pets</span>" : "<span>Pet friendly</span>"}
            <span>Ultima rega: ${daysSince(plant.lastWateredAt) === 0 ? "Hoje" : daysSince(plant.lastWateredAt) === 1 ? "Ontem" : `ha ${daysSince(plant.lastWateredAt)} dias`}</span>
          </div>
          <div class="detail-metrics detail-metrics--rich">
            <article>${dropIcon()}<strong>${escapeHtml(care.frequencia_rega_verao || "Rega moderada")}</strong><span>Rega verao</span></article>
            <article>${sunIcon()}<strong>${escapeHtml(care.necessidade_luminosidade || "Luz indireta")}</strong><span>Luz</span></article>
            <article>${thermoIcon()}<strong>${escapeHtml(care.tolerancia_temperatura || "Ambiente interno")}</strong><span>Temperatura</span></article>
            <article>${cloudIcon()}<strong>${escapeHtml(care.umidade_ar_ideal || "Umidade media")}</strong><span>Umidade</span></article>
          </div>
          <div class="detail-section detail-highlight">
            <h2>O que a IA viu</h2>
            <p>${escapeHtml(visual.motivo_identificacao || info.observacao_identificacao || "Identificacao feita pela imagem enviada.")}</p>
            ${visualItems.length ? `<ul>${visualItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
            ${visual.limitacoes_da_foto ? `<small>${escapeHtml(visual.limitacoes_da_foto)}</small>` : ""}
          </div>
          <div class="plant-fact-grid">
            ${factCard("Regiao nativa", info.regiao_nativa || info.origem_geografica || (isPhalaenopsis ? "Asia tropical e norte da Australia" : "Origem botanica nao confirmada"))}
            ${factCard("Familia", info.familia_botanica || (isPhalaenopsis ? "Orchidaceae" : "Familia nao confirmada"))}
            ${factCard("Genero", info.genero || (isPhalaenopsis ? "Phalaenopsis" : "Genero nao confirmado"))}
            ${factCard("Substrato", care.substrato_recomendado || supplements.tipo_solo_substrato_ideal || (isPhalaenopsis ? "Casca de pinus para orquideas" : "Substrato bem drenado"))}
            ${factCard("Vaso", care.vaso_e_drenagem || supplements.necessidade_drenagem || (isPhalaenopsis ? "Vaso ventilado com furos" : "Vaso com furos"))}
            ${factCard("Floracao", season.epoca_floracao || "Floracao varia por cultivo")}
          </div>
          <div class="detail-section">
            <h2>Cuidados praticos em Ontario</h2>
            ${practicalCare.length ? `<ul>${practicalCare.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : `<p>${escapeHtml(care.indicador_umidade_solo || "Cheque o substrato antes de regar, especialmente no inverno.")}</p>`}
            ${commonMistakes.length ? `<p><strong>Evite:</strong> ${escapeHtml(commonMistakes.join("; "))}.</p>` : ""}
          </div>
          <div class="detail-section">
            <h2>Saude da planta</h2>
            <p>${escapeHtml(health.proxima_acao_recomendada || "Observe folhas, raizes e umidade do substrato antes do proximo cuidado.")}</p>
            ${positiveSigns.length ? `<p><strong>Sinais bons:</strong> ${escapeHtml(positiveSigns.join(", "))}.</p>` : ""}
            ${alertSigns.length ? `<p><strong>Alertas:</strong> ${escapeHtml(alertSigns.join(", "))}.</p>` : ""}
            <p><strong>Pragas comuns:</strong> ${escapeHtml(pests.length ? pests.join(", ") : "cochonilhas, acaros ou fungos conforme a especie")}.</p>
          </div>
          <div class="detail-section">
            <h2>Origem, manutencao e extras</h2>
            <p>${escapeHtml(info.observacao_identificacao || `Origem: ${info.origem_geografica || "grupo botanico nao confirmado"}. Ciclo: ${info.ciclo_de_vida || "perene em cultivo domestico"}.`)}</p>
            <p><strong>Adubacao:</strong> ${escapeHtml(supplements.frequencia_adubacao || "leve durante a fase ativa")} com ${escapeHtml(supplements.tipo_adubo_recomendado || "adubo equilibrado diluido")}.</p>
            <p><strong>Propagacao:</strong> ${escapeHtml(extras.metodo_propagacao || "metodo varia por especie")}. ${escapeHtml(extras.instrucoes_execucao_passo_a_passo || "")}</p>
            ${curiosities.length ? `<ul>${curiosities.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
            ${extras.nota_para_pets_e_criancas ? `<small>${escapeHtml(extras.nota_para_pets_e_criancas)}</small>` : ""}
          </div>
          <label class="notes-label" for="plantNotes">Notas</label>
          <textarea id="plantNotes" data-notes="${plant.id}">${escapeHtml(plant.notes || "")}</textarea>
          <div class="modal-actions">
            <button class="primary-button" data-water="${plant.id}">Regar agora</button>
            <button class="ghost-button danger" data-delete="${plant.id}">Excluir</button>
          </div>
        </div>
      </section>
    </aside>
  `;
}

function bindEvents() {
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.tab = button.dataset.tab;
      state.selectedPlantId = "";
      render();
    });
  });

  document.querySelectorAll("[data-open]").forEach((card) => {
    card.addEventListener("click", () => {
      state.selectedPlantId = card.dataset.open;
      render();
    });
  });

  document.querySelector(".close-modal")?.addEventListener("click", () => {
    state.selectedPlantId = "";
    render();
  });

  document.querySelector("#plantUpload")?.addEventListener("change", handleUpload);
  document.querySelector("#analyzeButton")?.addEventListener("click", analyzeUpload);
  document.querySelector("#settingsForm")?.addEventListener("submit", saveSettings);
  document.querySelector("#removeKey")?.addEventListener("click", removeApiKey);
  document.querySelector("#toggleKey")?.addEventListener("click", toggleKeyVisibility);
  document.querySelector("#testApiKey")?.addEventListener("click", testApiKey);
  document.querySelector("#refreshWeather")?.addEventListener("click", () => refreshWeather());
  document.querySelector("#saveWeatherLocation")?.addEventListener("click", saveWeatherLocation);
  document.querySelector("#useCurrentLocation")?.addEventListener("click", useCurrentWeatherLocation);
  document.querySelector("#useCurrentLocationCare")?.addEventListener("click", useCurrentWeatherLocation);
  document.querySelector("#weatherLocation")?.addEventListener("input", (event) => {
    state.weather.draftLocation = event.target.value;
  });

  document.querySelectorAll("[data-water]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      await waterPlant(button.dataset.water);
    });
  });

  document.querySelectorAll("[data-delete]").forEach((button) => {
    button.addEventListener("click", async () => {
      await deletePlant(button.dataset.delete);
      state.plants = await listPlants();
      state.selectedPlantId = "";
      showToast("Planta excluida.");
    });
  });

  document.querySelector("[data-notes]")?.addEventListener("change", async (event) => {
    const plant = state.plants.find((item) => item.id === event.target.dataset.notes);
    if (!plant) return;
    await savePlant({ ...plant, notes: event.target.value });
    state.plants = await listPlants();
    showToast("Notas salvas.");
  });

  // Search logic
  const searchInput = document.querySelector("#searchPlants");
  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      state.searchQuery = event.target.value;
      const grid = document.querySelector(".plant-grid");
      if (grid) {
        const query = state.searchQuery.toLowerCase().trim();
        const filtered = state.plants.filter((plant) => {
          if (!query) return true;
          const popular = (plant.gemini?.identificacao_basica?.nome_popular || "").toLowerCase();
          const ontario = (plant.gemini?.identificacao_basica?.nome_popular_ontario_canada || "").toLowerCase();
          const scientific = (plant.gemini?.identificacao_basica?.nome_cientifico || "").toLowerCase();
          return popular.includes(query) || ontario.includes(query) || scientific.includes(query);
        });
        grid.innerHTML = filtered.map(renderPlantCard).join("");
        // Re-bind open details modal clicks
        grid.querySelectorAll("[data-open]").forEach((card) => {
          card.addEventListener("click", () => {
            state.selectedPlantId = card.dataset.open;
            render();
          });
        });
      }
    });
  }

  // Backdrop click modal close logic
  document.querySelector(".modal-backdrop")?.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      state.selectedPlantId = "";
      render();
    }
  });

  // Clear upload logic
  document.querySelector("#clearUploadButton")?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    state.uploadPreview = "";
    state.uploadMime = "";
    render();
  });

  // Settings drafts and instant sync
  document.querySelector("#geminiApiKey")?.addEventListener("input", (event) => {
    state.settingsDraftApiKey = event.target.value;
  });
  document.querySelector("#geminiModel")?.addEventListener("change", (event) => {
    state.settingsDraftModel = event.target.value;
  });

  // Calendar day clicks
  document.querySelectorAll("[data-day-offset]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedCareDayOffset = parseInt(button.dataset.dayOffset, 10);
      render();
    });
  });
}

async function handleUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  state.uploadMime = file.type || "image/jpeg";
  state.uploadPreview = await fileToBase64(file);
  render();
}

async function analyzeUpload() {
  if (!state.uploadPreview) return;
  if (!state.apiKey) {
    state.tab = "settings";
    showToast("Adicione sua API key do Gemini para usar a IA.");
    return;
  }

  state.isAnalyzing = true;
  render();

  try {
    const gemini = await identifyPlantWithGemini({
      apiKey: state.apiKey,
      imageBase64: state.uploadPreview,
      mimeType: state.uploadMime,
      model: state.geminiModel
    });

    const plant = await savePlant({
      id: crypto.randomUUID(),
      image: state.uploadPreview,
      gemini,
      notes: "",
      createdAt: new Date().toISOString(),
      lastWateredAt: new Date().toISOString()
    });

    state.plants = await listPlants();
    state.uploadPreview = "";
    state.uploadMime = "";
    state.tab = "collection";
    state.selectedPlantId = plant.id;
    showToast("Planta identificada e salva.");
  } catch (error) {
    console.error(error);
    showToast(error.message || "Nao foi possivel analisar. Verifique a API key.");
  } finally {
    state.isAnalyzing = false;
    render();
  }
}

async function saveSettings(event) {
  event.preventDefault();
  const input = document.querySelector("#geminiApiKey");
  const model = document.querySelector("#geminiModel");
  state.apiKey = input.value.trim();
  state.geminiModel = model.value;
  await setSetting("geminiApiKey", state.apiKey);
  await setSetting("geminiModel", state.geminiModel);
  state.settingsDraftApiKey = null;
  state.settingsDraftModel = null;
  state.apiTestMessage = "";
  showToast("API key do Gemini salva localmente.");
}

async function removeApiKey() {
  state.apiKey = "";
  state.settingsDraftApiKey = null;
  state.settingsDraftModel = null;
  state.apiTestMessage = "";
  await deleteSetting("geminiApiKey");
  showToast("API key removida.");
}

async function testApiKey() {
  const input = document.querySelector("#geminiApiKey");
  const model = document.querySelector("#geminiModel");
  const apiKey = input.value.trim();
  const modelId = model.value;

  state.settingsDraftApiKey = apiKey;
  state.settingsDraftModel = modelId;
  state.isTestingApi = true;
  state.apiTestMessage = "";
  render();

  try {
    await testGeminiApiKey({ apiKey, model: modelId });
    state.apiTestMessage = "API funcionando. Salve a chave para usar a IA.";
  } catch (error) {
    console.error(error);
    state.apiTestMessage = error.message || "Nao foi possivel testar a API key.";
  } finally {
    state.isTestingApi = false;
    render();
  }
}

async function saveWeatherLocation() {
  state.weather.status = "loading";
  state.weather.message = "Buscando cidade...";
  render();

  try {
    const location = await geocodeWeatherLocation(state.weather.draftLocation || DEFAULT_WEATHER_LOCATION.name);
    state.weather.location = location;
    state.weather.draftLocation = location.name;
    await setSetting("weatherLocation", location);
    await refreshWeather();
    showToast(`Clima configurado para ${location.name}.`);
  } catch (error) {
    state.weather.status = "error";
    state.weather.message = error.message || "Nao foi possivel salvar essa localizacao.";
    render();
  }
}

async function useCurrentWeatherLocation() {
  if (!navigator.geolocation) {
    state.weather.status = "error";
    state.weather.message = "Geolocalizacao nao esta disponivel neste navegador.";
    render();
    return;
  }

  state.weather.status = "loading";
  state.weather.message = "Pedindo permissao de localizacao...";
  render();

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const location = {
        name: "Local atual em Ontario",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        source: "geolocation"
      };
      state.weather.location = location;
      state.weather.draftLocation = location.name;
      await setSetting("weatherLocation", location);
      await refreshWeather();
      showToast("Clima atualizado pelo local atual.");
    },
    (error) => {
      state.weather.status = "error";
      state.weather.message = "Permissao negada. Voce pode salvar uma cidade em Ajustes.";
      render();
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 1800000 }
  );
}

async function refreshWeather({ silent = false } = {}) {
  if (!silent) {
    state.weather.status = "loading";
    state.weather.message = "Atualizando previsao...";
    render();
  }

  try {
    const forecast = await fetchWeatherForecast(state.weather.location || DEFAULT_WEATHER_LOCATION);
    state.weather.forecast = forecast;
    state.weather.status = "ready";
    state.weather.message = `Atualizado ${formatUpdatedAt(forecast.fetchedAt)}.`;
    await setSetting("weatherForecast", forecast);
  } catch (error) {
    const cached = await getSetting("weatherForecast");
    if (cached) {
      state.weather.forecast = cached;
      state.weather.status = "cached";
      state.weather.message = "Sem conexao. Mostrando ultimo clima salvo.";
    } else {
      state.weather.status = "error";
      state.weather.message = error.message || "Clima indisponivel agora.";
    }
  } finally {
    render();
  }
}

function toggleKeyVisibility() {
  const input = document.querySelector("#geminiApiKey");
  input.type = input.type === "password" ? "text" : "password";
}

async function waterPlant(id) {
  const plant = state.plants.find((item) => item.id === id);
  if (!plant) return;
  await savePlant({ ...plant, lastWateredAt: new Date().toISOString() });
  state.plants = await listPlants();
  showToast("Rega registrada.");
}

function quickAction(tab, icon, title, text) {
  return `
    <button class="quick-card" data-tab="${tab}">
      <span>${icon}</span>
      <strong>${title}</strong>
      <small>${text}</small>
    </button>
  `;
}

function factCard(label, value) {
  return `
    <article>
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </article>
  `;
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function nameOf(plant) {
  const info = plant.gemini?.identificacao_basica || {};
  if ((!info.nome_popular || info.nome_popular === "Planta salva") && isPhalaenopsisPlant(plant)) {
    return "Orquidea borboleta";
  }
  return info.nome_popular || info.nome_popular_ontario_canada || info.nome_comercial_canada || "Planta salva";
}

function isPhalaenopsisPlant(plant) {
  const info = plant?.gemini?.identificacao_basica || {};
  const haystack = [
    info.nome_cientifico,
    info.nome_popular,
    info.nome_popular_ontario_canada,
    info.nome_comercial_canada,
    info.genero
  ].join(" ").toLowerCase();
  return haystack.includes("phalaenopsis") || haystack.includes("phallaenopsis");
}

function labelForModel(modelId) {
  return GEMINI_MODELS.find((model) => model.id === modelId)?.label || modelId;
}

function buildWeatherAdvice(forecast) {
  if (!forecast) return ["Configure o clima para receber dicas de rega."];
  const current = forecast.current || {};
  const today = forecast.daily?.[0] || {};
  const advice = [];

  if (current.humidity !== undefined && current.humidity < 35) {
    advice.push("Ar seco: orquideas e tropicais podem precisar de bandeja de umidade ou borrifacao ao redor.");
  }
  if (today.precipitationProbability !== undefined && today.precipitationProbability >= 60) {
    advice.push("Dia umido/chuvoso: confira o substrato antes de regar e evite excesso de agua.");
  }
  if (current.temperature !== undefined && current.temperature < 10) {
    advice.push("Frio em Ontario: mantenha vasos longe de janelas frias e reduza rega.");
  }
  if (current.temperature !== undefined && current.temperature >= 26) {
    advice.push("Calor: plantas em vaso podem secar mais rapido; cheque o substrato com o dedo.");
  }
  if (today.sunshineHours !== undefined && today.sunshineHours !== null && today.sunshineHours < 3) {
    advice.push("Poucas horas de sol: aproxime plantas de luz indireta brilhante, sem encostar no vidro frio.");
  }

  if (!advice.length) {
    advice.push("Clima equilibrado: mantenha a rotina e regue apenas se o substrato pedir.");
  }

  return advice.slice(0, 3);
}

function formatNumber(value) {
  if (value === undefined || value === null || Number.isNaN(Number(value))) return "--";
  return Math.round(Number(value));
}

function formatUpdatedAt(value) {
  if (!value) return "agora";
  return new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function showToast(message) {
  state.toast = message;
  render();
  window.setTimeout(() => {
    state.toast = "";
    render();
  }, 2200);
}

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function daysSince(date) {
  return Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 86400000));
}

function getWateringInterval(plant) {
  const care = plant.gemini?.cuidados_e_rotina || {};
  const freq = care.frequencia_rega_verao || "";
  const match = freq.match(/(\d+)/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return 7; // default to 7 days
}

function getWeeklyDays() {
  const weekdayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
  const days = [];
  const now = new Date();

  for (let d = 0; d < 14; d++) {
    const targetDate = new Date(now.getTime() + d * 24 * 60 * 60 * 1000);
    const dayNum = targetDate.getDate();
    let name = weekdayNames[targetDate.getDay()];
    if (d === 0) name = "Hoje";
    else if (d === 1) name = "Amanha";

    days.push({
      offset: d,
      name,
      dayNum,
      dateString: targetDate.toDateString()
    });
  }
  return days;
}

function getPlantsScheduledForOffset(plants, offset) {
  return plants.filter((plant) => {
    const interval = getWateringInterval(plant);
    const days = daysSince(plant.lastWateredAt);

    if (days >= interval) {
      if (offset === 0) return true;
      return offset % interval === 0;
    }

    const daysUntilNext = interval - days;
    if (daysUntilNext === offset) return true;
    if (daysUntilNext < offset) {
      return (offset - daysUntilNext) % interval === 0;
    }
    return false;
  });
}
function hideSplash() {
  if (!splash) return;
  splash.classList.add("splash-screen--hidden");
  window.setTimeout(() => splash.remove(), 620);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function icon(path) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`;
}

function leafIcon() {
  return icon('<path d="M5 21c8-1 14-7 14-18C9 4 4 10 5 21Z"/><path d="M5 21c3-5 7-9 12-13"/>');
}

function gridIcon() {
  return icon('<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>');
}

function cameraIcon() {
  return icon('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="4"/>');
}

function dropIcon() {
  return icon('<path d="M12 3s6 7 6 12a6 6 0 0 1-12 0c0-5 6-12 6-12Z"/>');
}

function gearIcon() {
  return icon('<path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="m4 12 2-1 .6-1.5L5.8 7.4l1.6-1.6 2.1.8L11 6l1-2h2l1 2 1.5.6 2.1-.8 1.6 1.6-.8 2.1L20 11l2 1v2l-2 1-.6 1.5.8 2.1-1.6 1.6-2.1-.8L15 20l-1 2h-2l-1-2-1.5-.6-2.1.8-1.6-1.6.8-2.1L6 15l-2-1Z"/>');
}

function searchIcon() {
  return icon('<circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/>');
}

function sunIcon() {
  return icon('<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/>');
}

function thermoIcon() {
  return icon('<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z"/>');
}

function cloudIcon() {
  return icon('<path d="M17.5 19H8a5 5 0 1 1 1.1-9.9 6 6 0 0 1 11.6 2.2A4 4 0 0 1 17.5 19Z"/>');
}

function eyeIcon() {
  return icon('<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>');
}

function closeIcon() {
  return icon('<path d="M6 6l12 12M18 6 6 18"/>');
}
