(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const R=[{id:"mock-monstera",image:"./assets/concept.png",createdAt:new Date().toISOString(),lastWateredAt:new Date(Date.now()-3*864e5).toISOString(),notes:"Esta desenvolvendo uma nova folha. Manter em meia-sombra.",gemini:{identificacao_basica:{nome_popular:"Costela-de-Adao",nome_cientifico:"Monstera deliciosa",familia_botanica:"Araceae",origem_geografica:"Florestas tropicais da America Central",ciclo_de_vida:"Perene"},cuidados_e_rotina:{frequencia_rega_verao:"5-7 dias",frequencia_rega_inverno:"10-14 dias",indicador_umidade_solo:"Deixe a camada superior secar",necessidade_luminosidade:"Meia-sombra com luz indireta",tolerancia_temperatura:"18C a 30C",umidade_ar_ideal:"Media/Alta",toxicidade_pets:!0,toxicidade_criancas:!0},sazonalidade_e_crescimento:{temporada_ativa_season:"Primavera/Verao",velocidade_crescimento:"Medio",porte_maximo_domestico:"1,5m a 2,5m",epoca_floracao:"Rara em interiores",necessidade_poda:"Baixa"},diagnostico_e_saude:{status_saude_atual:"Saudavel",principais_pragas_ameaca:["Cochonilhas","Acaros"],sinais_excesso_agua:"Folhas amareladas e solo encharcado",sinais_falta_agua:"Folhas caidas e bordas secas",sinais_falta_luz:"Crescimento esticado e folhas pequenas"},suplementos_e_manutencao:{tipo_solo_substrato_ideal:"Substrato aerado com fibra de coco, perlita e casca de pinus",frequencia_adubacao:"Mensal na primavera e verao",tipo_adubo_recomendado:"NPK equilibrado ou organico para folhagens",onde_comprar_suplementos:["substrato para araceas","adubo para folhagens"],ph_solo_ideal:"5.5 a 7.0",necessidade_drenagem:"Alta"},propagacao_e_extras:{metodo_propagacao:"Estaca de caule com no",nivel_dificuldade_cultivo:"Facil",instrucoes_execucao_passo_a_passo:"Corte abaixo de um no saudavel, coloque em agua limpa ou substrato umido e mantenha em local iluminado sem sol direto ate enraizar."}}},{id:"mock-sansevieria",image:"./assets/wallpaper.png",createdAt:new Date().toISOString(),lastWateredAt:new Date(Date.now()-9*864e5).toISOString(),notes:"Boa para ambientes internos e rotinas de pouca manutencao.",gemini:{identificacao_basica:{nome_popular:"Espada-de-Sao-Jorge",nome_cientifico:"Dracaena trifasciata",familia_botanica:"Asparagaceae",origem_geografica:"Africa Ocidental",ciclo_de_vida:"Perene"},cuidados_e_rotina:{frequencia_rega_verao:"10-15 dias",frequencia_rega_inverno:"20-30 dias",indicador_umidade_solo:"Deixe secar completamente",necessidade_luminosidade:"Luz indireta a sol fraco",tolerancia_temperatura:"15C a 32C",umidade_ar_ideal:"Baixa/Media",toxicidade_pets:!0,toxicidade_criancas:!0},sazonalidade_e_crescimento:{temporada_ativa_season:"Ano todo",velocidade_crescimento:"Lento",porte_maximo_domestico:"60cm a 1,2m",epoca_floracao:"Incomum",necessidade_poda:"Baixa"},diagnostico_e_saude:{status_saude_atual:"Saudavel",principais_pragas_ameaca:["Cochonilhas"],sinais_excesso_agua:"Base mole e folhas amarelas",sinais_falta_agua:"Folhas enrugadas",sinais_falta_luz:"Crescimento parado"},suplementos_e_manutencao:{tipo_solo_substrato_ideal:"Substrato para cactos com excelente drenagem",frequencia_adubacao:"A cada 60 dias na fase ativa",tipo_adubo_recomendado:"Adubo leve para suculentas",onde_comprar_suplementos:["substrato para cactos","perlita"],ph_solo_ideal:"6.0 a 7.5",necessidade_drenagem:"Critica"},propagacao_e_extras:{metodo_propagacao:"Divisao de touceira",nivel_dificuldade_cultivo:"Facil",instrucoes_execucao_passo_a_passo:"Retire a planta do vaso, separe brotos com raizes proprias e replante em substrato seco. Aguarde alguns dias antes da primeira rega."}}}],X="andrades-garden-guide",Y=1,S="plants",P="settings";let I;function ee(){return I||(I=new Promise((e,t)=>{const n=indexedDB.open(X,Y);n.onupgradeneeded=()=>{const i=n.result;i.objectStoreNames.contains(S)||i.createObjectStore(S,{keyPath:"id"}),i.objectStoreNames.contains(P)||i.createObjectStore(P,{keyPath:"key"})},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)}),I)}function A(e,t,n){return ee().then(i=>new Promise((o,s)=>{const r=i.transaction(e,t),d=r.objectStore(e),l=n(d);l.onsuccess=()=>o(l.result),l.onerror=()=>s(l.error),r.onerror=()=>s(r.error)}))}async function b(){return A(S,"readonly",e=>e.getAll())}async function q(e){const t={...e,updatedAt:new Date().toISOString()};return await A(S,"readwrite",n=>n.put(t)),t}async function ae(e){return A(S,"readwrite",t=>t.delete(e))}async function G(e){const t=await A(P,"readonly",n=>n.get(e));return(t==null?void 0:t.value)??""}async function B(e,t){return A(P,"readwrite",n=>n.put({key:e,value:t,updatedAt:new Date().toISOString()}))}async function te(e){return A(P,"readwrite",t=>t.delete(e))}const D="gemini-2.5-flash",F=[{id:"gemini-2.5-flash",label:"Gemini 2.5 Flash (Rapido / Recomendado)"},{id:"gemini-2.5-pro",label:"Gemini 2.5 Pro (Raciocinio Avancado)"},{id:"gemini-2.0-flash",label:"Gemini 2.0 Flash (Compativel)"}],ne=`
Identifique a planta da imagem e responda exclusivamente com JSON valido.
Nao use markdown, comentarios ou texto fora do JSON.
O JSON deve seguir exatamente as chaves:
identificacao_basica, cuidados_e_rotina, sazonalidade_e_crescimento,
diagnostico_e_saude, suplementos_e_manutencao, propagacao_e_extras.
Use strings em portugues do Brasil e booleans reais para toxicidade.
`;async function ie({apiKey:e,imageBase64:t,mimeType:n,model:i=D}){var l,p,m,g,_;if(!e)throw new Error("Adicione sua API key do Gemini nas configuracoes para usar a IA.");const o=t.split(",").pop(),s=await fetch(W(e,i),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:ne},{inline_data:{mime_type:n,data:o}}]}],generationConfig:{response_mime_type:"application/json",temperature:.2}})});if(!s.ok)throw new Error("Nao foi possivel consultar o Gemini.");const r=await s.json(),d=(_=(g=(m=(p=(l=r==null?void 0:r.candidates)==null?void 0:l[0])==null?void 0:p.content)==null?void 0:m.parts)==null?void 0:g[0])==null?void 0:_.text;if(!d)throw new Error("O Gemini nao retornou um JSON valido.");return se(JSON.parse(d))}async function oe({apiKey:e,model:t=D}){if(!e)throw new Error("Cole uma API key antes de testar.");if(!(await fetch(W(e,t),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:"Responda apenas: ok"}]}],generationConfig:{temperature:0,maxOutputTokens:8}})})).ok)throw new Error("A chave nao respondeu. Verifique a API key e o modelo escolhido.");return!0}function W(e,t){return`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e)}`}function se(e){const t=["identificacao_basica","cuidados_e_rotina","sazonalidade_e_crescimento","diagnostico_e_saude","suplementos_e_manutencao","propagacao_e_extras"];for(const n of t)if(!e||typeof e!="object"||!e[n])throw new Error(`Resposta incompleta do Gemini: ${n}`);return e}const re=document.querySelector("#app"),T=document.querySelector("#splash"),ce=2e3,a={tab:"home",plants:[],selectedPlantId:"",apiKey:"",geminiModel:D,settingsDraftApiKey:null,settingsDraftModel:null,uploadPreview:"",uploadMime:"",isAnalyzing:!1,isTestingApi:!1,apiTestMessage:"",toast:"",searchQuery:"",selectedCareDayOffset:0},de=[{id:"home",label:"Inicio",icon:Ee},{id:"collection",label:"Colecao",icon:H},{id:"identify",label:"IA",icon:L},{id:"care",label:"Cuidados",icon:M},{id:"settings",label:"Ajustes",icon:O}];le();async function le(){const e=performance.now();try{"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/service-worker.js").catch(()=>{})}),a.apiKey=await G("geminiApiKey"),a.geminiModel=await G("geminiModel")||D;const n=await b();n.length?a.plants=n:(await Promise.all(R.map(i=>q(i))),a.plants=await b())}catch(n){console.error("Erro ao carregar IndexedDB, usando dados em memoria:",n),a.plants=[...R]}u();const t=performance.now()-e;await Te(Math.max(0,ce-t)),Ce()}function u(){const e=a.plants.find(t=>t.id===a.selectedPlantId);re.innerHTML=`
    <main class="phone-frame">
      <section class="screen">
        ${ue()}
        <div class="content-scroll">
          ${pe()}
        </div>
        ${ye()}
        ${a.toast?`<div class="toast">${a.toast}</div>`:""}
      </section>
    </main>
    ${e?he(e):""}
  `,be()}function ue(){return`
    <header class="topbar">
      <button class="brand-button" data-tab="home" aria-label="Ir para inicio">
        <img src="/assets/logo.png" alt="Andrade's Garden Guide" class="brand-logo" />
      </button>
      <button class="icon-button" data-tab="settings" aria-label="Abrir configuracoes">${O()}</button>
    </header>
  `}function pe(){return a.tab==="collection"?ge():a.tab==="identify"?fe():a.tab==="care"?_e():a.tab==="settings"?ve():me()}function me(){const e=a.plants.filter(t=>h(t.lastWateredAt)>=C(t)).length;return`
    <section class="hero-panel">
      <p class="hello">Bom dia, Vinia</p>
      <h1>Seu jardim esta florescendo hoje</h1>
      <p class="muted">Guarde suas plantas, identifique novas folhas e acompanhe cuidados no seu iPhone.</p>
      <div class="stats-grid">
        <article><strong>${a.plants.length}</strong><span>plantas</span></article>
        <article><strong>${e}</strong><span>regar hoje</span></article>
        <article><strong>82%</strong><span>umidade media</span></article>
      </div>
    </section>

    <section class="quick-actions">
      ${x("collection",H(),"Minhas Plantas","Veja sua colecao local")}
      ${x("care",M(),"Regar Hoje","Atualize cuidados")}
      ${x("identify",L(),"Identificar com IA","Use foto ou galeria")}
      ${x("settings",O(),"Gemini API Key",a.apiKey?"Chave salva localmente":"Cole sua chave aqui")}
    </section>

    <section class="section-title">
      <h2>Destaques</h2>
      <button data-tab="collection">Ver todas</button>
    </section>
    <div class="plant-strip">
      ${a.plants.slice(0,3).map(k).join("")}
    </div>
  `}function ge(){const e=(a.searchQuery||"").toLowerCase().trim(),t=a.plants.filter(n=>{var s,r,d,l;if(!e)return!0;const i=(((r=(s=n.gemini)==null?void 0:s.identificacao_basica)==null?void 0:r.nome_popular)||"").toLowerCase(),o=(((l=(d=n.gemini)==null?void 0:d.identificacao_basica)==null?void 0:l.nome_cientifico)||"").toLowerCase();return i.includes(e)||o.includes(e)});return`
    <section class="section-title">
      <div>
        <h1>Minha Colecao</h1>
        <p>${a.plants.length} plantas salvas no navegador</p>
      </div>
      <button class="primary-small" data-tab="identify">Nova</button>
    </section>
    <div class="search-box">
      ${Le()}
      <input type="text" id="searchPlants" placeholder="Buscar planta..." value="${E(a.searchQuery||"")}" />
    </div>
    <div class="plant-grid">
      ${t.map(k).join("")}
    </div>
  `}function fe(){return`
    <section class="identify-panel">
      <h1>Identificar com IA</h1>
      <p>A foto fica salva localmente. Com API key configurada, o Gemini analisa a imagem e salva a planta na sua colecao.</p>

      ${a.apiKey?"":`<article class="friendly-card">
              <strong>Configure a chave para usar a IA</strong>
              <span>Adicione sua API key do Gemini em Ajustes para analisar fotos de plantas.</span>
              <button class="secondary-button" data-tab="settings">Adicionar chave</button>
            </article>`}

      <label class="upload-box">
        <input type="file" accept="image/*" capture="environment" id="plantUpload" />
        ${a.uploadPreview?`<img src="${a.uploadPreview}" alt="Preview da planta" />`:`<span>${L()}</span><strong>Tire uma foto ou escolha da galeria</strong>`}
      </label>

      ${a.uploadPreview&&!a.isAnalyzing?`
        <button class="ghost-button danger" id="clearUploadButton" type="button" style="margin-bottom: 14px;">Remover foto</button>
      `:""}

      <button class="primary-button" id="analyzeButton" ${a.apiKey&&a.uploadPreview&&!a.isAnalyzing?"":"disabled"}>
        ${a.isAnalyzing?"Analisando folhas...":"Analisar e salvar planta"}
      </button>
      ${a.isAnalyzing?'<div class="skeleton-card"></div>':""}
    </section>
  `}function _e(){const t=ke().map(i=>{const o=U(a.plants,i.offset);return{...i,hasTasks:o.length>0,taskCount:o.length}}),n=U(a.plants,a.selectedCareDayOffset);return`
    <section class="section-title">
      <div>
        <h1>Cuidados</h1>
        <p>Projete a rega das suas plantas para os proximos 7 dias.</p>
      </div>
    </section>

    <div class="calendar-week">
      ${t.map(i=>`
        <button class="calendar-day-card ${a.selectedCareDayOffset===i.offset?"active":""}" data-day-offset="${i.offset}">
          <span class="day-name">${i.name}</span>
          <strong class="day-num">${i.dayNum}</strong>
          ${i.hasTasks?'<span class="calendar-dot"></span>':""}
        </button>
      `).join("")}
    </div>

    <div class="care-list">
      ${n.length>0?n.map(i=>{const o=C(i),s=h(i.lastWateredAt);let r="",d=s===0;return d?r="Regada hoje":a.selectedCareDayOffset===0?r=s>=o?"Regar hoje (Atrasado)":`Proxima rega em ${o-s} dias`:r=`Programada para este dia (Ciclo: ${o}d)`,`
          <article class="care-row">
            <div class="care-icon ${d?"":"due"}">${M()}</div>
            <div>
              <strong>${qe(i)}</strong>
              <span>${r}</span>
            </div>
            ${d?'<button class="secondary-button" disabled>Regada</button>':`<button class="secondary-button" data-water="${i.id}">Regar</button>`}
          </article>
        `}).join(""):`
        <div class="empty-care-card">
          <span>🌸</span>
          <strong>Dia livre!</strong>
          <small style="margin-top: 4px; color: var(--muted);">Nenhum cuidado pendente. Seu jardim esta tranquilo!</small>
        </div>
      `}
    </div>
  `}function ve(){const e=a.settingsDraftApiKey??a.apiKey,t=a.settingsDraftModel??a.geminiModel;return`
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
            value="${E(e)}"
          />
          <button type="button" class="icon-button" id="toggleKey" aria-label="Mostrar ou esconder chave">${Ke()}</button>
        </div>
        <label for="geminiModel">Modelo Gemini</label>
        <select id="geminiModel" name="geminiModel">
          ${F.map(n=>`<option value="${n.id}" ${t===n.id?"selected":""}>${n.label}</option>`).join("")}
        </select>
        <button class="primary-button" type="submit">Salvar chave</button>
        <button class="secondary-button" type="button" id="testApiKey" ${a.isTestingApi?"disabled":""}>
          ${a.isTestingApi?"Testando...":"Testar API"}
        </button>
        <button class="ghost-button" type="button" id="removeKey">Remover chave</button>
      </form>

      ${a.apiTestMessage?`<article class="status-card ${a.apiTestMessage.includes("funcionando")?"success":"warning"}"><span>${a.apiTestMessage}</span></article>`:""}

      <article class="status-card">
        <strong>Status do Gemini</strong>
        <span>${a.apiKey?`API key salva localmente. A proxima identificacao usara ${De(a.geminiModel)}.`:"Sem chave salva. A IA vai pedir para adicionar a chave antes de analisar."}</span>
      </article>
    </section>
  `}function ye(){return`
    <nav class="bottom-nav" aria-label="Navegacao principal">
      ${de.map(e=>`
          <button class="${a.tab===e.id?"active":""}" data-tab="${e.id}" aria-label="${e.label}">
            ${e.icon()}
            <span>${e.label}</span>
          </button>
        `).join("")}
    </nav>
  `}function k(e){var d,l,p,m,g,_;const t=((d=e.gemini)==null?void 0:d.identificacao_basica)||{},n=((l=e.gemini)==null?void 0:l.cuidados_e_rotina)||{},i=((m=(p=e.gemini)==null?void 0:p.sazonalidade_e_crescimento)==null?void 0:m.temporada_ativa_season)||"Interior",o=n.necessidade_luminosidade||"Luz indireta",s=((_=(g=e.gemini)==null?void 0:g.diagnostico_e_saude)==null?void 0:_.status_saude_atual)||"Saudavel",r=n.toxicidade_pets||n.toxicidade_criancas||!1;return`
    <article class="plant-card" data-open="${e.id}">
      <img src="${e.image}" alt="${t.nome_popular||"Planta"}" />
      <span class="season">${i}</span>
      <h3>${t.nome_popular||"Planta salva"}</h3>
      <p>${t.nome_cientifico||"Identificacao incompleta"}</p>
      <div class="card-badges">
        <span class="badge-health ${s.toLowerCase().includes("saud")?"healthy":"warning"}">${s}</span>
        ${r?'<span class="badge-alert">⚠️ Toxica</span>':'<span class="badge-alert friendly">🐾 Seguro</span>'}
      </div>
      <div class="card-meta">
        <span>${M()} ${n.frequencia_rega_verao||"Rega moderada"}</span>
        <span>${V()} ${o.split(" ").slice(0,2).join(" ")}</span>
      </div>
    </article>
  `}function he(e){var d,l,p,m,g;const t=((d=e.gemini)==null?void 0:d.identificacao_basica)||{},n=((l=e.gemini)==null?void 0:l.cuidados_e_rotina)||{},i=((p=e.gemini)==null?void 0:p.diagnostico_e_saude)||{},o=((m=e.gemini)==null?void 0:m.suplementos_e_manutencao)||{},s=((g=e.gemini)==null?void 0:g.propagacao_e_extras)||{},r=Array.isArray(i.principais_pragas_ameaca)?i.principais_pragas_ameaca:[];return`
    <aside class="modal-backdrop">
      <section class="plant-modal">
        <div class="modal-image">
          <img src="${e.image}" alt="${t.nome_popular||"Planta"}" />
          <button class="icon-button close-modal" aria-label="Fechar">${Ne()}</button>
        </div>
        <div class="modal-body">
          <h1>${t.nome_popular||"Planta salva"}</h1>
          <p>${t.nome_cientifico||"Identificacao incompleta"}</p>
          <div class="badge-row">
            <span>${i.status_saude_atual||"Acompanhamento pendente"}</span>
            ${n.toxicidade_pets?"<span>Toxica para pets</span>":"<span>Pet friendly</span>"}
            <span>Ultima rega: ${h(e.lastWateredAt)===0?"Hoje":h(e.lastWateredAt)===1?"Ontem":`ha ${h(e.lastWateredAt)} dias`}</span>
          </div>
          <div class="detail-metrics">
            <article>${M()}<strong>${n.frequencia_rega_verao||"Rega moderada"}</strong><span>Rega</span></article>
            <article>${V()}<strong>${n.necessidade_luminosidade||"Luz indireta"}</strong><span>Luz</span></article>
            <article>${Oe()}<strong>${n.tolerancia_temperatura||"Ambiente interno"}</strong><span>Temperatura</span></article>
          </div>
          <div class="detail-section">
            <h2>Identificacao</h2>
            <p>Familia ${t.familia_botanica||"nao informada"}. Origem: ${t.origem_geografica||"nao informada"}. Ciclo: ${t.ciclo_de_vida||"nao informado"}.</p>
          </div>
          <div class="detail-section">
            <h2>Saude</h2>
            <p>Pragas: ${r.length?r.join(", "):"nao informadas"}. Excesso de agua: ${i.sinais_excesso_agua||"sem sinais registrados"}.</p>
          </div>
          <div class="detail-section">
            <h2>Suplementos</h2>
            <p>${o.tipo_solo_substrato_ideal||"Substrato nao informado"}. Adubacao: ${o.frequencia_adubacao||"nao informada"}.</p>
          </div>
          <div class="detail-section">
            <h2>Propagacao</h2>
            <p>${s.metodo_propagacao||"Metodo nao informado"}. ${s.instrucoes_execucao_passo_a_passo||""}</p>
          </div>
          <label class="notes-label" for="plantNotes">Notas</label>
          <textarea id="plantNotes" data-notes="${e.id}">${E(e.notes||"")}</textarea>
          <div class="modal-actions">
            <button class="primary-button" data-water="${e.id}">Regar agora</button>
            <button class="ghost-button danger" data-delete="${e.id}">Excluir</button>
          </div>
        </div>
      </section>
    </aside>
  `}function be(){var t,n,i,o,s,r,d,l,p,m,g,_;document.querySelectorAll("[data-tab]").forEach(c=>{c.addEventListener("click",()=>{a.tab=c.dataset.tab,a.selectedPlantId="",u()})}),document.querySelectorAll("[data-open]").forEach(c=>{c.addEventListener("click",()=>{a.selectedPlantId=c.dataset.open,u()})}),(t=document.querySelector(".close-modal"))==null||t.addEventListener("click",()=>{a.selectedPlantId="",u()}),(n=document.querySelector("#plantUpload"))==null||n.addEventListener("change",Ae),(i=document.querySelector("#analyzeButton"))==null||i.addEventListener("click",we),(o=document.querySelector("#settingsForm"))==null||o.addEventListener("submit",$e),(s=document.querySelector("#removeKey"))==null||s.addEventListener("click",Se),(r=document.querySelector("#toggleKey"))==null||r.addEventListener("click",Me),(d=document.querySelector("#testApiKey"))==null||d.addEventListener("click",Pe),document.querySelectorAll("[data-water]").forEach(c=>{c.addEventListener("click",async v=>{v.stopPropagation(),await Ie(c.dataset.water)})}),document.querySelectorAll("[data-delete]").forEach(c=>{c.addEventListener("click",async()=>{await ae(c.dataset.delete),a.plants=await b(),a.selectedPlantId="",y("Planta excluida.")})}),(l=document.querySelector("[data-notes]"))==null||l.addEventListener("change",async c=>{const v=a.plants.find(w=>w.id===c.target.dataset.notes);v&&(await q({...v,notes:c.target.value}),a.plants=await b(),y("Notas salvas."))});const e=document.querySelector("#searchPlants");e&&e.addEventListener("input",c=>{a.searchQuery=c.target.value;const v=document.querySelector(".plant-grid");if(v){const w=a.searchQuery.toLowerCase().trim(),J=a.plants.filter($=>{var K,N,j,z;if(!w)return!0;const Q=(((N=(K=$.gemini)==null?void 0:K.identificacao_basica)==null?void 0:N.nome_popular)||"").toLowerCase(),Z=(((z=(j=$.gemini)==null?void 0:j.identificacao_basica)==null?void 0:z.nome_cientifico)||"").toLowerCase();return Q.includes(w)||Z.includes(w)});v.innerHTML=J.map(k).join(""),v.querySelectorAll("[data-open]").forEach($=>{$.addEventListener("click",()=>{a.selectedPlantId=$.dataset.open,u()})})}}),(p=document.querySelector(".modal-backdrop"))==null||p.addEventListener("click",c=>{c.target===c.currentTarget&&(a.selectedPlantId="",u())}),(m=document.querySelector("#clearUploadButton"))==null||m.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),a.uploadPreview="",a.uploadMime="",u()}),(g=document.querySelector("#geminiApiKey"))==null||g.addEventListener("input",c=>{a.settingsDraftApiKey=c.target.value}),(_=document.querySelector("#geminiModel"))==null||_.addEventListener("change",c=>{a.settingsDraftModel=c.target.value}),document.querySelectorAll("[data-day-offset]").forEach(c=>{c.addEventListener("click",()=>{a.selectedCareDayOffset=parseInt(c.dataset.dayOffset,10),u()})})}async function Ae(e){var n;const t=(n=e.target.files)==null?void 0:n[0];t&&(a.uploadMime=t.type||"image/jpeg",a.uploadPreview=await xe(t),u())}async function we(){if(a.uploadPreview){if(!a.apiKey){a.tab="settings",y("Adicione sua API key do Gemini para usar a IA.");return}a.isAnalyzing=!0,u();try{const e=await ie({apiKey:a.apiKey,imageBase64:a.uploadPreview,mimeType:a.uploadMime,model:a.geminiModel}),t=await q({id:crypto.randomUUID(),image:a.uploadPreview,gemini:e,notes:"",createdAt:new Date().toISOString(),lastWateredAt:new Date().toISOString()});a.plants=await b(),a.uploadPreview="",a.uploadMime="",a.tab="collection",a.selectedPlantId=t.id,y("Planta identificada e salva.")}catch(e){console.error(e),y(e.message||"Nao foi possivel analisar. Verifique a API key.")}finally{a.isAnalyzing=!1,u()}}}async function $e(e){e.preventDefault();const t=document.querySelector("#geminiApiKey"),n=document.querySelector("#geminiModel");a.apiKey=t.value.trim(),a.geminiModel=n.value,await B("geminiApiKey",a.apiKey),await B("geminiModel",a.geminiModel),a.settingsDraftApiKey=null,a.settingsDraftModel=null,a.apiTestMessage="",y("API key do Gemini salva localmente.")}async function Se(){a.apiKey="",a.settingsDraftApiKey=null,a.settingsDraftModel=null,a.apiTestMessage="",await te("geminiApiKey"),y("API key removida.")}async function Pe(){const e=document.querySelector("#geminiApiKey"),t=document.querySelector("#geminiModel"),n=e.value.trim(),i=t.value;a.settingsDraftApiKey=n,a.settingsDraftModel=i,a.isTestingApi=!0,a.apiTestMessage="",u();try{await oe({apiKey:n,model:i}),a.apiTestMessage="API funcionando. Salve a chave para usar a IA."}catch(o){console.error(o),a.apiTestMessage=o.message||"Nao foi possivel testar a API key."}finally{a.isTestingApi=!1,u()}}function Me(){const e=document.querySelector("#geminiApiKey");e.type=e.type==="password"?"text":"password"}async function Ie(e){const t=a.plants.find(n=>n.id===e);t&&(await q({...t,lastWateredAt:new Date().toISOString()}),a.plants=await b(),y("Rega registrada."))}function x(e,t,n,i){return`
    <button class="quick-card" data-tab="${e}">
      <span>${t}</span>
      <strong>${n}</strong>
      <small>${i}</small>
    </button>
  `}function xe(e){return new Promise((t,n)=>{const i=new FileReader;i.onload=()=>t(i.result),i.onerror=()=>n(i.error),i.readAsDataURL(e)})}function qe(e){var t,n;return((n=(t=e.gemini)==null?void 0:t.identificacao_basica)==null?void 0:n.nome_popular)||"Planta salva"}function De(e){var t;return((t=F.find(n=>n.id===e))==null?void 0:t.label)||e}function y(e){a.toast=e,u(),window.setTimeout(()=>{a.toast="",u()},2200)}function Te(e){return new Promise(t=>window.setTimeout(t,e))}function h(e){return Math.max(0,Math.floor((Date.now()-new Date(e).getTime())/864e5))}function C(e){var o;const i=((((o=e.gemini)==null?void 0:o.cuidados_e_rotina)||{}).frequencia_rega_verao||"").match(/(\d+)/);return i?parseInt(i[1],10):7}function ke(){const e=["Dom","Seg","Ter","Qua","Qui","Sex","Sab"],t=[],n=new Date;for(let i=0;i<7;i++){const o=new Date(n.getTime()+i*24*60*60*1e3),s=o.getDate();let r=e[o.getDay()];i===0?r="Hoje":i===1&&(r="Amanha"),t.push({offset:i,name:r,dayNum:s,dateString:o.toDateString()})}return t}function U(e,t){return e.filter(n=>{const i=C(n),o=h(n.lastWateredAt);if(o>=i)return t===0?!0:t%i===0;const s=i-o;return s===t?!0:s<t?(t-s)%i===0:!1})}function Ce(){T&&(T.classList.add("splash-screen--hidden"),window.setTimeout(()=>T.remove(),620))}function E(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function f(e){return`<svg viewBox="0 0 24 24" aria-hidden="true">${e}</svg>`}function Ee(){return f('<path d="M5 21c8-1 14-7 14-18C9 4 4 10 5 21Z"/><path d="M5 21c3-5 7-9 12-13"/>')}function H(){return f('<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>')}function L(){return f('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="4"/>')}function M(){return f('<path d="M12 3s6 7 6 12a6 6 0 0 1-12 0c0-5 6-12 6-12Z"/>')}function O(){return f('<path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="m4 12 2-1 .6-1.5L5.8 7.4l1.6-1.6 2.1.8L11 6l1-2h2l1 2 1.5.6 2.1-.8 1.6 1.6-.8 2.1L20 11l2 1v2l-2 1-.6 1.5.8 2.1-1.6 1.6-2.1-.8L15 20l-1 2h-2l-1-2-1.5-.6-2.1.8-1.6-1.6.8-2.1L6 15l-2-1Z"/>')}function Le(){return f('<circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/>')}function V(){return f('<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/>')}function Oe(){return f('<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z"/>')}function Ke(){return f('<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>')}function Ne(){return f('<path d="M6 6l12 12M18 6 6 18"/>')}
