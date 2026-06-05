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
  toast: ""
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

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  }

  state.apiKey = await getSetting("geminiApiKey");
  state.geminiModel = (await getSetting("geminiModel")) || DEFAULT_GEMINI_MODEL;
  const savedPlants = await listPlants();
  if (!savedPlants.length) {
    await Promise.all(mockPlants.map((plant) => savePlant(plant)));
    state.plants = await listPlants();
  } else {
    state.plants = savedPlants;
  }
  render();

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
  const waterToday = state.plants.filter((plant) => daysSince(plant.lastWateredAt) >= 5).length;
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
  return `
    <section class="section-title">
      <div>
        <h1>Minha Colecao</h1>
        <p>${state.plants.length} plantas salvas no navegador</p>
      </div>
      <button class="primary-small" data-tab="identify">Nova</button>
    </section>
    <div class="search-box">${searchIcon()}<span>Buscar planta...</span></div>
    <div class="plant-grid">
      ${state.plants.map(renderPlantCard).join("")}
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

      <button class="primary-button" id="analyzeButton" ${state.apiKey && state.uploadPreview && !state.isAnalyzing ? "" : "disabled"}>
        ${state.isAnalyzing ? "Analisando folhas..." : "Analisar e salvar planta"}
      </button>
      ${state.isAnalyzing ? `<div class="skeleton-card"></div>` : ""}
    </section>
  `;
}

function renderCare() {
  const tasks = state.plants.map((plant) => ({
    plant,
    days: daysSince(plant.lastWateredAt),
    due: daysSince(plant.lastWateredAt) >= 5
  }));

  return `
    <section class="section-title">
      <div>
        <h1>Cuidados</h1>
        <p>Rotina local baseada nas plantas cadastradas.</p>
      </div>
    </section>
    <div class="care-list">
      ${tasks
        .map(
          ({ plant, days, due }) => `
          <article class="care-row">
            <div class="care-icon ${due ? "due" : ""}">${dropIcon()}</div>
            <div>
              <strong>${nameOf(plant)}</strong>
              <span>${due ? "Regar hoje" : `Regada ha ${days} dias`}</span>
            </div>
            <button class="secondary-button" data-water="${plant.id}">Regar</button>
          </article>
        `
        )
        .join("")}
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
    </section>
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

  return `
    <article class="plant-card" data-open="${plant.id}">
      <img src="${plant.image}" alt="${info.nome_popular || "Planta"}" />
      <span class="season">${season}</span>
      <h3>${info.nome_popular || "Planta salva"}</h3>
      <p>${info.nome_cientifico || "Identificacao incompleta"}</p>
      <div class="card-meta">
        <span>${dropIcon()} ${care.frequencia_rega_verao || "Rega moderada"}</span>
        <span>${sunIcon()} ${light.split(" ").slice(0, 2).join(" ")}</span>
      </div>
    </article>
  `;
}

function renderDetailsModal(plant) {
  const info = plant.gemini?.identificacao_basica || {};
  const care = plant.gemini?.cuidados_e_rotina || {};
  const health = plant.gemini?.diagnostico_e_saude || {};
  const supplements = plant.gemini?.suplementos_e_manutencao || {};
  const extras = plant.gemini?.propagacao_e_extras || {};
  const pests = Array.isArray(health.principais_pragas_ameaca) ? health.principais_pragas_ameaca : [];

  return `
    <aside class="modal-backdrop">
      <section class="plant-modal">
        <div class="modal-image">
          <img src="${plant.image}" alt="${info.nome_popular || "Planta"}" />
          <button class="icon-button close-modal" aria-label="Fechar">${closeIcon()}</button>
        </div>
        <div class="modal-body">
          <h1>${info.nome_popular || "Planta salva"}</h1>
          <p>${info.nome_cientifico || "Identificacao incompleta"}</p>
          <div class="badge-row">
            <span>${health.status_saude_atual || "Acompanhamento pendente"}</span>
            ${care.toxicidade_pets ? "<span>Toxica para pets</span>" : "<span>Pet friendly</span>"}
          </div>
          <div class="detail-metrics">
            <article>${dropIcon()}<strong>${care.frequencia_rega_verao || "Rega moderada"}</strong><span>Rega</span></article>
            <article>${sunIcon()}<strong>${care.necessidade_luminosidade || "Luz indireta"}</strong><span>Luz</span></article>
            <article>${thermoIcon()}<strong>${care.tolerancia_temperatura || "Ambiente interno"}</strong><span>Temperatura</span></article>
          </div>
          <div class="detail-section">
            <h2>Identificacao</h2>
            <p>Familia ${info.familia_botanica || "nao informada"}. Origem: ${info.origem_geografica || "nao informada"}. Ciclo: ${info.ciclo_de_vida || "nao informado"}.</p>
          </div>
          <div class="detail-section">
            <h2>Saude</h2>
            <p>Pragas: ${pests.length ? pests.join(", ") : "nao informadas"}. Excesso de agua: ${health.sinais_excesso_agua || "sem sinais registrados"}.</p>
          </div>
          <div class="detail-section">
            <h2>Suplementos</h2>
            <p>${supplements.tipo_solo_substrato_ideal || "Substrato nao informado"}. Adubacao: ${supplements.frequencia_adubacao || "nao informada"}.</p>
          </div>
          <div class="detail-section">
            <h2>Propagacao</h2>
            <p>${extras.metodo_propagacao || "Metodo nao informado"}. ${extras.instrucoes_execucao_passo_a_passo || ""}</p>
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
    showToast("Nao foi possivel analisar. Verifique a API key.");
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

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function nameOf(plant) {
  return plant.gemini?.identificacao_basica?.nome_popular || "Planta salva";
}

function labelForModel(modelId) {
  return GEMINI_MODELS.find((model) => model.id === modelId)?.label || modelId;
}

function daysSince(date) {
  return Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 86400000));
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

function eyeIcon() {
  return icon('<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>');
}

function closeIcon() {
  return icon('<path d="M6 6l12 12M18 6 6 18"/>');
}
