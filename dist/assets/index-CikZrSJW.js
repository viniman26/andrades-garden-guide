(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function o(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=o(s);fetch(s.href,n)}})();const sa=[{id:"mock-monstera",image:"./assets/concept.png",createdAt:new Date().toISOString(),lastWateredAt:new Date(Date.now()-3*864e5).toISOString(),notes:"Esta desenvolvendo uma nova folha. Manter em meia-sombra.",gemini:{identificacao_basica:{nome_popular:"Costela-de-Adao",nome_popular_ontario_canada:"Swiss cheese plant",nome_comercial_canada:"Monstera",nome_cientifico:"Monstera deliciosa",genero:"Monstera",familia_botanica:"Araceae",origem_geografica:"Florestas tropicais da America Central",regiao_nativa:"Sul do Mexico ao Panama",tipo_planta:"Aracea tropical de interior",confianca_identificacao:"Alta",observacao_identificacao:"Folhas grandes e recortadas indicam Monstera deliciosa.",ciclo_de_vida:"Perene"},descricao_visual:{sinais_observados:["Folhas grandes","Habito trepador","Folhagem tropical"],motivo_identificacao:"A folha fenestrada e o porte combinam com Costela-de-Adao.",limitacoes_da_foto:"Cultivares jovens podem ter menos recortes nas folhas."},cuidados_e_rotina:{frequencia_rega_verao:"5-7 dias",frequencia_rega_inverno:"10-14 dias",indicador_umidade_solo:"Deixe a camada superior secar",necessidade_luminosidade:"Meia-sombra com luz indireta",tolerancia_temperatura:"18C a 30C",umidade_ar_ideal:"Media/Alta",vaso_e_drenagem:"Vaso com furos e tutor se crescer muito",substrato_recomendado:"Mistura para araceas com casca de pinus, perlita e fibra de coco",cuidados_praticos_ontario:["No inverno, aproxime de uma janela clara sem encostar no vidro frio.","Use umidificador se a casa ficar muito seca com aquecimento.","Regue menos quando os dias estiverem escuros e frios."],erros_comuns:["Excesso de agua","Pouca luz por muitos meses"],toxicidade_pets:!0,toxicidade_criancas:!0},sazonalidade_e_crescimento:{temporada_ativa_season:"Primavera/Verao",velocidade_crescimento:"Medio",porte_maximo_domestico:"1,5m a 2,5m",epoca_floracao:"Rara em interiores",necessidade_poda:"Baixa"},diagnostico_e_saude:{status_saude_atual:"Saudavel",sinais_positivos:["Folhagem firme","Cor verde uniforme"],sinais_alerta:["Manchas amarelas","Pontas marrons"],principais_pragas_ameaca:["Cochonilhas","Acaros"],sinais_excesso_agua:"Folhas amareladas e solo encharcado",sinais_falta_agua:"Folhas caidas e bordas secas",sinais_falta_luz:"Crescimento esticado e folhas pequenas",proxima_acao_recomendada:"Manter luz indireta forte e checar substrato antes de regar."},suplementos_e_manutencao:{tipo_solo_substrato_ideal:"Substrato aerado com fibra de coco, perlita e casca de pinus",frequencia_adubacao:"Mensal na primavera e verao",tipo_adubo_recomendado:"NPK equilibrado ou organico para folhagens",onde_comprar_suplementos:["substrato para araceas","adubo para folhagens"],ph_solo_ideal:"5.5 a 7.0",necessidade_drenagem:"Alta"},propagacao_e_extras:{metodo_propagacao:"Estaca de caule com no",nivel_dificuldade_cultivo:"Facil",instrucoes_execucao_passo_a_passo:"Corte abaixo de um no saudavel, coloque em agua limpa ou substrato umido e mantenha em local iluminado sem sol direto ate enraizar.",curiosidades:["E uma das plantas tropicais mais vendidas em garden centers canadenses."],nota_para_pets_e_criancas:"Toxica se ingerida por pets e criancas."}}},{id:"mock-sansevieria",image:"./assets/wallpaper.png",createdAt:new Date().toISOString(),lastWateredAt:new Date(Date.now()-9*864e5).toISOString(),notes:"Boa para ambientes internos e rotinas de pouca manutencao.",gemini:{identificacao_basica:{nome_popular:"Espada-de-Sao-Jorge",nome_popular_ontario_canada:"Snake plant",nome_comercial_canada:"Snake plant",nome_cientifico:"Dracaena trifasciata",genero:"Dracaena",familia_botanica:"Asparagaceae",origem_geografica:"Africa Ocidental",regiao_nativa:"Africa Ocidental tropical",tipo_planta:"Folhagem suculenta de interior",confianca_identificacao:"Alta",observacao_identificacao:"Folhas verticais rigidas indicam Dracaena trifasciata.",ciclo_de_vida:"Perene"},descricao_visual:{sinais_observados:["Folhas verticais","Textura rigida","Porte em roseta"],motivo_identificacao:"O formato de espada e padrao de crescimento combinam com Snake plant.",limitacoes_da_foto:"Algumas variedades tem bordas e padroes diferentes."},cuidados_e_rotina:{frequencia_rega_verao:"10-15 dias",frequencia_rega_inverno:"20-30 dias",indicador_umidade_solo:"Deixe secar completamente",necessidade_luminosidade:"Luz indireta a sol fraco",tolerancia_temperatura:"15C a 32C",umidade_ar_ideal:"Baixa/Media",vaso_e_drenagem:"Vaso com furos e substrato que seque rapido",substrato_recomendado:"Substrato para cactos ou suculentas com perlita",cuidados_praticos_ontario:["No inverno, regue muito pouco porque a planta entra em ritmo lento.","Tolera casas secas e aquecidas melhor que plantas tropicais.","Evite deixar perto de porta com corrente fria."],erros_comuns:["Regar em excesso","Usar vaso sem drenagem"],toxicidade_pets:!0,toxicidade_criancas:!0},sazonalidade_e_crescimento:{temporada_ativa_season:"Ano todo",velocidade_crescimento:"Lento",porte_maximo_domestico:"60cm a 1,2m",epoca_floracao:"Incomum",necessidade_poda:"Baixa"},diagnostico_e_saude:{status_saude_atual:"Saudavel",sinais_positivos:["Folhas firmes","Base seca e estavel"],sinais_alerta:["Base mole","Folhas amarelas"],principais_pragas_ameaca:["Cochonilhas"],sinais_excesso_agua:"Base mole e folhas amarelas",sinais_falta_agua:"Folhas enrugadas",sinais_falta_luz:"Crescimento parado",proxima_acao_recomendada:"Aguardar o substrato secar completamente antes de regar."},suplementos_e_manutencao:{tipo_solo_substrato_ideal:"Substrato para cactos com excelente drenagem",frequencia_adubacao:"A cada 60 dias na fase ativa",tipo_adubo_recomendado:"Adubo leve para suculentas",onde_comprar_suplementos:["substrato para cactos","perlita"],ph_solo_ideal:"6.0 a 7.5",necessidade_drenagem:"Critica"},propagacao_e_extras:{metodo_propagacao:"Divisao de touceira",nivel_dificuldade_cultivo:"Facil",instrucoes_execucao_passo_a_passo:"Retire a planta do vaso, separe brotos com raizes proprias e replante em substrato seco. Aguarde alguns dias antes da primeira rega.",curiosidades:["E vendida no Canada como planta tolerante a pouca luz."],nota_para_pets_e_criancas:"Toxica se ingerida por pets e criancas."}}}],_a="andrades-garden-guide",ga=1,k="plants",T="settings";let F;function fa(){return F||(F=new Promise((a,e)=>{const o=indexedDB.open(_a,ga);o.onupgradeneeded=()=>{const i=o.result;i.objectStoreNames.contains(k)||i.createObjectStore(k,{keyPath:"id"}),i.objectStoreNames.contains(T)||i.createObjectStore(T,{keyPath:"key"})},o.onsuccess=()=>a(o.result),o.onerror=()=>e(o.error)}),F)}function C(a,e,o){return fa().then(i=>new Promise((s,n)=>{const r=i.transaction(a,e),l=r.objectStore(a),u=o(l);u.onsuccess=()=>s(u.result),u.onerror=()=>n(u.error),r.onerror=()=>n(r.error)}))}async function x(){return C(k,"readonly",a=>a.getAll())}async function W(a){const e={...a,updatedAt:new Date().toISOString()};return await C(k,"readwrite",o=>o.put(e)),e}async function ha(a){return C(k,"readwrite",e=>e.delete(a))}async function U(a){const e=await C(T,"readonly",o=>o.get(a));return(e==null?void 0:e.value)??""}async function D(a,e){return C(T,"readwrite",o=>o.put({key:a,value:e,updatedAt:new Date().toISOString()}))}async function va(a){return C(T,"readwrite",e=>e.delete(a))}const B="gemini-2.5-flash",ca=[{id:"gemini-2.5-flash",label:"Gemini 2.5 Flash (Rapido / Recomendado)"},{id:"gemini-2.5-pro",label:"Gemini 2.5 Pro (Raciocinio Avancado)"},{id:"gemini-2.0-flash",label:"Gemini 2.0 Flash (Compativel)"}],ya=`
Identifique a planta da imagem para uma pessoa que mora em Ontario, Canada.
Responda exclusivamente com JSON valido, sem markdown, comentarios ou texto fora do JSON.
Use portugues do Brasil para explicacoes, mas inclua nomes comuns usados em Ontario/Canada em ingles.
Priorize utilidade para cultivo domestico em Ontario: inverno seco, baixa luz no inverno, casas aquecidas e plantas em vaso.
Se a especie exata nao puder ser determinada, identifique com seguranca no nivel de genero/grupo e explique a limitacao.
Para Phalaenopsis, use a grafia correta "Phalaenopsis"; nome popular em portugues "Orquidea borboleta"; nome em Ontario/Canada "Moth orchid"; explique que "spp." indica grupo/genero sem cultivar exata.
Evite "nao informado" quando houver uma resposta segura no nivel de genero, familia ou grupo.
Use strings em portugues do Brasil, arrays de strings e booleans reais para toxicidade.
`,ba={type:"object",properties:{identificacao_basica:{type:"object",properties:{nome_popular:{type:"string"},nome_popular_ontario_canada:{type:"string"},nome_comercial_canada:{type:"string"},nome_cientifico:{type:"string"},genero:{type:"string"},familia_botanica:{type:"string"},origem_geografica:{type:"string"},regiao_nativa:{type:"string"},tipo_planta:{type:"string"},ciclo_de_vida:{type:"string"},confianca_identificacao:{type:"string"},observacao_identificacao:{type:"string"}},required:["nome_popular","nome_popular_ontario_canada","nome_comercial_canada","nome_cientifico","genero","familia_botanica","origem_geografica","regiao_nativa","tipo_planta","ciclo_de_vida","confianca_identificacao","observacao_identificacao"]},descricao_visual:{type:"object",properties:{sinais_observados:{type:"array",items:{type:"string"}},motivo_identificacao:{type:"string"},limitacoes_da_foto:{type:"string"}},required:["sinais_observados","motivo_identificacao","limitacoes_da_foto"]},cuidados_e_rotina:{type:"object",properties:{frequencia_rega_verao:{type:"string"},frequencia_rega_inverno:{type:"string"},indicador_umidade_solo:{type:"string"},necessidade_luminosidade:{type:"string"},tolerancia_temperatura:{type:"string"},umidade_ar_ideal:{type:"string"},vaso_e_drenagem:{type:"string"},substrato_recomendado:{type:"string"},cuidados_praticos_ontario:{type:"array",items:{type:"string"}},erros_comuns:{type:"array",items:{type:"string"}},toxicidade_pets:{type:"boolean"},toxicidade_criancas:{type:"boolean"}},required:["frequencia_rega_verao","frequencia_rega_inverno","indicador_umidade_solo","necessidade_luminosidade","tolerancia_temperatura","umidade_ar_ideal","vaso_e_drenagem","substrato_recomendado","cuidados_praticos_ontario","erros_comuns","toxicidade_pets","toxicidade_criancas"]},sazonalidade_e_crescimento:{type:"object",properties:{temporada_ativa_season:{type:"string"},velocidade_crescimento:{type:"string"},porte_maximo_domestico:{type:"string"},epoca_floracao:{type:"string"},necessidade_poda:{type:"string"}},required:["temporada_ativa_season","velocidade_crescimento","porte_maximo_domestico","epoca_floracao","necessidade_poda"]},diagnostico_e_saude:{type:"object",properties:{status_saude_atual:{type:"string"},sinais_positivos:{type:"array",items:{type:"string"}},sinais_alerta:{type:"array",items:{type:"string"}},principais_pragas_ameaca:{type:"array",items:{type:"string"}},sinais_excesso_agua:{type:"string"},sinais_falta_agua:{type:"string"},sinais_falta_luz:{type:"string"},proxima_acao_recomendada:{type:"string"}},required:["status_saude_atual","sinais_positivos","sinais_alerta","principais_pragas_ameaca","sinais_excesso_agua","sinais_falta_agua","sinais_falta_luz","proxima_acao_recomendada"]},suplementos_e_manutencao:{type:"object",properties:{tipo_solo_substrato_ideal:{type:"string"},frequencia_adubacao:{type:"string"},tipo_adubo_recomendado:{type:"string"},onde_comprar_suplementos:{type:"array",items:{type:"string"}},ph_solo_ideal:{type:"string"},necessidade_drenagem:{type:"string"}},required:["tipo_solo_substrato_ideal","frequencia_adubacao","tipo_adubo_recomendado","onde_comprar_suplementos","ph_solo_ideal","necessidade_drenagem"]},propagacao_e_extras:{type:"object",properties:{metodo_propagacao:{type:"string"},nivel_dificuldade_cultivo:{type:"string"},instrucoes_execucao_passo_a_passo:{type:"string"},curiosidades:{type:"array",items:{type:"string"}},nota_para_pets_e_criancas:{type:"string"}},required:["metodo_propagacao","nivel_dificuldade_cultivo","instrucoes_execucao_passo_a_passo","curiosidades","nota_para_pets_e_criancas"]}},required:["identificacao_basica","descricao_visual","cuidados_e_rotina","sazonalidade_e_crescimento","diagnostico_e_saude","suplementos_e_manutencao","propagacao_e_extras"]};async function wa({apiKey:a,imageBase64:e,mimeType:o,model:i=B}){var u,_,p,g,f;if(!a)throw new Error("Adicione sua API key do Gemini nas configuracoes para usar a IA.");const s=e.split(",").pop(),n=await fetch(da(a,i),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:ya},{inline_data:{mime_type:o,data:s}}]}],generationConfig:{response_mime_type:"application/json",response_schema:ba,temperature:.2}})});if(!n.ok)throw new Error("Nao foi possivel consultar o Gemini.");const r=await n.json(),l=(f=(g=(p=(_=(u=r==null?void 0:r.candidates)==null?void 0:u[0])==null?void 0:_.content)==null?void 0:p.parts)==null?void 0:g[0])==null?void 0:f.text;if(!l)throw new Error("O Gemini nao retornou um JSON valido.");return $a(JSON.parse(l))}async function Aa({apiKey:a,model:e=B}){if(!a)throw new Error("Cole uma API key antes de testar.");if(!(await fetch(da(a,e),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:"Responda apenas: ok"}]}],generationConfig:{temperature:0,maxOutputTokens:8}})})).ok)throw new Error("A chave nao respondeu. Verifique a API key e o modelo escolhido.");return!0}function da(a,e){return`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(e)}:generateContent?key=${encodeURIComponent(a)}`}function $a(a){const e=["identificacao_basica","descricao_visual","cuidados_e_rotina","sazonalidade_e_crescimento","diagnostico_e_saude","suplementos_e_manutencao","propagacao_e_extras"];for(const o of e)if(!a||typeof a!="object"||!a[o])throw new Error(`Resposta incompleta do Gemini: ${o}`);return a}const Sa="https://api.open-meteo.com/v1/forecast",Pa="https://geocoding-api.open-meteo.com/v1/search",P={name:"Toronto, Ontario",latitude:43.6532,longitude:-79.3832,source:"default"};async function Ma(a){const e=String(a||"").trim();if(!e)throw new Error("Digite uma cidade ou regiao em Ontario.");const o=new URL(Pa);o.searchParams.set("name",e),o.searchParams.set("count","5"),o.searchParams.set("language","en"),o.searchParams.set("format","json");const i=await fetch(o);if(!i.ok)throw new Error("Nao foi possivel buscar essa localizacao.");const s=await i.json(),n=Array.isArray(s.results)?s.results:[],r=n.find(l=>l.admin1==="Ontario")||n[0];if(!r)throw new Error("Localizacao nao encontrada. Tente cidade, Ontario.");return{name:[r.name,r.admin1,r.country_code].filter(Boolean).join(", "),latitude:r.latitude,longitude:r.longitude,source:"manual"}}async function qa(a){if(!(a!=null&&a.latitude)||!(a!=null&&a.longitude))throw new Error("Localizacao meteorologica invalida.");const e=new URL(Sa);e.searchParams.set("latitude",a.latitude),e.searchParams.set("longitude",a.longitude),e.searchParams.set("current","temperature_2m,relative_humidity_2m,precipitation,cloud_cover"),e.searchParams.set("daily","temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,sunshine_duration"),e.searchParams.set("forecast_days","7"),e.searchParams.set("timezone","auto");const o=await fetch(e);if(!o.ok)throw new Error("Nao foi possivel carregar a previsao do tempo.");const i=await o.json();return xa(i,a)}function xa(a,e){const o=a.current||{},i=a.daily||{};return{location:e,fetchedAt:new Date().toISOString(),current:{temperature:o.temperature_2m,humidity:o.relative_humidity_2m,precipitation:o.precipitation,cloudCover:o.cloud_cover},daily:(i.time||[]).map((s,n)=>{var r,l,u,_,p;return{date:s,tempMax:(r=i.temperature_2m_max)==null?void 0:r[n],tempMin:(l=i.temperature_2m_min)==null?void 0:l[n],precipitationProbability:(u=i.precipitation_probability_max)==null?void 0:u[n],precipitationSum:(_=i.precipitation_sum)==null?void 0:_[n],sunshineHours:(p=i.sunshine_duration)!=null&&p[n]?Math.round(i.sunshine_duration[n]/3600*10)/10:null}})}}const Ca=document.querySelector("#app"),V=document.querySelector("#splash"),Ia=2e3,t={tab:"home",plants:[],selectedPlantId:"",apiKey:"",geminiModel:B,settingsDraftApiKey:null,settingsDraftModel:null,uploadPreview:"",uploadMime:"",isAnalyzing:!1,isTestingApi:!1,apiTestMessage:"",toast:"",searchQuery:"",selectedCareDayOffset:0,weather:{location:P,forecast:null,status:"idle",message:"",draftLocation:""}},La=[{id:"home",label:"Inicio",icon:se},{id:"collection",label:"Colecao",icon:ua},{id:"identify",label:"IA",icon:X},{id:"care",label:"Cuidados",icon:j},{id:"settings",label:"Ajustes",icon:Y}];Ea();async function Ea(){const a=performance.now();try{const o=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1";"serviceWorker"in navigator&&!o&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/service-worker.js").catch(()=>{})}),t.apiKey=await U("geminiApiKey"),t.geminiModel=await U("geminiModel")||B,t.weather.location=await U("weatherLocation")||P,t.weather.draftLocation=t.weather.location.name||P.name;const i=await x();i.length?t.plants=i:(await Promise.all(sa.map(s=>W(s))),t.plants=await x())}catch(o){console.error("Erro ao carregar IndexedDB, usando dados em memoria:",o),t.plants=[...sa]}m(),H({silent:!0});const e=performance.now()-a;await te(Math.max(0,Ia-e)),ie()}function m(){const a=t.plants.find(e=>e.id===t.selectedPlantId);Ca.innerHTML=`
    <main class="phone-frame">
      <section class="screen">
        ${Oa()}
        <div class="content-scroll">
          ${ka()}
        </div>
        ${Ra()}
        ${t.toast?`<div class="toast">${t.toast}</div>`:""}
      </section>
    </main>
    ${a?Fa(a):""}
  `,Ga()}function Oa(){return`
    <header class="topbar">
      <button class="brand-button" data-tab="home" aria-label="Ir para inicio">
        <img src="./assets/logo.png" alt="Andrade's Garden Guide" class="brand-logo" />
      </button>
      <button class="icon-button" data-tab="settings" aria-label="Abrir configuracoes">${Y()}</button>
    </header>
  `}function ka(){return t.tab==="collection"?Da():t.tab==="identify"?ja():t.tab==="care"?za():t.tab==="settings"?Na():Ta()}function Ta(){const a=t.plants.filter(e=>q(e.lastWateredAt)>=Z(e)).length;return`
    <section class="hero-panel">
      <p class="hello">Bom dia, Vinia</p>
      <h1>Seu jardim esta florescendo hoje</h1>
      <p class="muted">Guarde suas plantas, identifique novas folhas e acompanhe cuidados no seu iPhone.</p>
      <div class="stats-grid">
        <article><strong>${t.plants.length}</strong><span>plantas</span></article>
        <article><strong>${a}</strong><span>regar hoje</span></article>
        <article><strong>82%</strong><span>umidade media</span></article>
      </div>
    </section>

    <section class="quick-actions">
      ${G("collection",ua(),"Minhas Plantas","Veja sua colecao local")}
      ${G("care",j(),"Regar Hoje","Atualize cuidados")}
      ${G("identify",X(),"Identificar com IA","Use foto ou galeria")}
      ${G("settings",Y(),"Gemini API Key",t.apiKey?"Chave salva localmente":"Cole sua chave aqui")}
    </section>

    <section class="section-title">
      <h2>Destaques</h2>
      <button data-tab="collection">Ver todas</button>
    </section>
    <div class="plant-strip">
      ${t.plants.slice(0,3).map(Q).join("")}
    </div>
  `}function Da(){const a=(t.searchQuery||"").toLowerCase().trim(),e=t.plants.filter(o=>{var r,l,u,_,p,g;if(!a)return!0;const i=(((l=(r=o.gemini)==null?void 0:r.identificacao_basica)==null?void 0:l.nome_popular)||"").toLowerCase(),s=(((_=(u=o.gemini)==null?void 0:u.identificacao_basica)==null?void 0:_.nome_popular_ontario_canada)||"").toLowerCase(),n=(((g=(p=o.gemini)==null?void 0:p.identificacao_basica)==null?void 0:g.nome_cientifico)||"").toLowerCase();return i.includes(a)||s.includes(a)||n.includes(a)});return`
    <section class="section-title">
      <div>
        <h1>Minha Colecao</h1>
        <p>${t.plants.length} plantas salvas no navegador</p>
      </div>
      <button class="primary-small" data-tab="identify">Nova</button>
    </section>
    <div class="search-box">
      ${ne()}
      <input type="text" id="searchPlants" placeholder="Buscar planta..." value="${c(t.searchQuery||"")}" />
    </div>
    <div class="plant-grid">
      ${e.map(Q).join("")}
    </div>
  `}function ja(){return`
    <section class="identify-panel">
      <h1>Identificar com IA</h1>
      <p>A foto fica salva localmente. Com API key configurada, o Gemini analisa a imagem e salva a planta na sua colecao.</p>

      ${t.apiKey?"":`<article class="friendly-card">
              <strong>Configure a chave para usar a IA</strong>
              <span>Adicione sua API key do Gemini em Ajustes para analisar fotos de plantas.</span>
              <button class="secondary-button" data-tab="settings">Adicionar chave</button>
            </article>`}

      <label class="upload-box">
        <input type="file" accept="image/*" capture="environment" id="plantUpload" />
        ${t.uploadPreview?`<img src="${t.uploadPreview}" alt="Preview da planta" />`:`<span>${X()}</span><strong>Tire uma foto ou escolha da galeria</strong>`}
      </label>

      ${t.uploadPreview&&!t.isAnalyzing?`
        <button class="ghost-button danger" id="clearUploadButton" type="button" style="margin-bottom: 14px;">Remover foto</button>
      `:""}

      <button class="primary-button" id="analyzeButton" ${t.apiKey&&t.uploadPreview&&!t.isAnalyzing?"":"disabled"}>
        ${t.isAnalyzing?"Analisando folhas...":"Analisar e salvar planta"}
      </button>
      ${t.isAnalyzing?'<div class="skeleton-card"></div>':""}
    </section>
  `}function za(){const e=oe().map(i=>{const s=ra(t.plants,i.offset);return{...i,hasTasks:s.length>0,taskCount:s.length}}),o=ra(t.plants,t.selectedCareDayOffset);return`
    <section class="section-title">
      <div>
        <h1>Cuidados</h1>
        <p>Projete a rega das suas plantas para os proximos 14 dias.</p>
      </div>
    </section>

    ${Ka()}

    <div class="calendar-week">
      ${e.map(i=>`
        <button class="calendar-day-card ${t.selectedCareDayOffset===i.offset?"active":""}" data-day-offset="${i.offset}">
          <span class="day-name">${i.name}</span>
          <strong class="day-num">${i.dayNum}</strong>
          ${i.hasTasks?'<span class="calendar-dot"></span>':""}
        </button>
      `).join("")}
    </div>

    <div class="care-list">
      ${o.length>0?o.map(i=>{const s=Z(i),n=q(i.lastWateredAt);let r="",l=n===0;return l?r="Regada hoje":t.selectedCareDayOffset===0?r=n>=s?"Regar hoje (Atrasado)":`Proxima rega em ${s-n} dias`:r=`Programada para este dia (Ciclo: ${s}d)`,`
          <article class="care-row">
            <div class="care-icon ${l?"":"due"}">${j()}</div>
            <div>
              <strong>${J(i)}</strong>
              <span>${r}</span>
            </div>
            ${l?'<button class="secondary-button" disabled>Regada</button>':`<button class="secondary-button" data-water="${i.id}">Regar</button>`}
          </article>
        `}).join(""):`
        <div class="empty-care-card">
          <span>🌸</span>
          <strong>Dia livre!</strong>
          <small style="margin-top: 4px; color: var(--muted);">Nenhum cuidado pendente. Seu jardim esta tranquilo!</small>
        </div>
      `}
    </div>
  `}function Na(){const a=t.settingsDraftApiKey??t.apiKey,e=t.settingsDraftModel??t.geminiModel;return`
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
            value="${c(a)}"
          />
          <button type="button" class="icon-button" id="toggleKey" aria-label="Mostrar ou esconder chave">${ce()}</button>
        </div>
        <label for="geminiModel">Modelo Gemini</label>
        <select id="geminiModel" name="geminiModel">
          ${ca.map(o=>`<option value="${o.id}" ${e===o.id?"selected":""}>${o.label}</option>`).join("")}
        </select>
        <button class="primary-button" type="submit">Salvar chave</button>
        <button class="secondary-button" type="button" id="testApiKey" ${t.isTestingApi?"disabled":""}>
          ${t.isTestingApi?"Testando...":"Testar API"}
        </button>
        <button class="ghost-button" type="button" id="removeKey">Remover chave</button>
      </form>

      ${t.apiTestMessage?`<article class="status-card ${t.apiTestMessage.includes("funcionando")?"success":"warning"}"><span>${t.apiTestMessage}</span></article>`:""}

      <article class="status-card">
        <strong>Status do Gemini</strong>
        <span>${t.apiKey?`API key salva localmente. A proxima identificacao usara ${Ya(t.geminiModel)}.`:"Sem chave salva. A IA vai pedir para adicionar a chave antes de analisar."}</span>
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
            value="${c(t.weather.draftLocation||t.weather.location.name||P.name)}"
          />
          <button class="secondary-button" type="button" id="saveWeatherLocation">Salvar</button>
        </div>
        <button class="ghost-button" type="button" id="useCurrentLocation">Usar local atual</button>
      </article>
    </section>
  `}function Ka(){var r,l;const a=t.weather,e=a.forecast,o=e==null?void 0:e.current,i=(r=e==null?void 0:e.daily)==null?void 0:r[0],s=ae(e),n=a.status==="loading"?"Atualizando previsao...":a.message||"Previsao local para planejar rega, umidade e luz.";return`
    <article class="weather-card">
      <div class="weather-card__header">
        <div>
          <span class="weather-kicker">Ontario weather</span>
          <h2>Clima hoje para suas plantas</h2>
          <p>${c(((l=a.location)==null?void 0:l.name)||P.name)}</p>
        </div>
        <button class="icon-button" id="refreshWeather" aria-label="Atualizar clima">${ma()}</button>
      </div>
      ${e?`
            <div class="weather-now">
              <strong>${S(o==null?void 0:o.temperature)}C</strong>
              <span>${S(o==null?void 0:o.humidity)}% umidade</span>
            </div>
            <div class="weather-grid">
              <article><span>Max/Min</span><strong>${S(i==null?void 0:i.tempMax)}C / ${S(i==null?void 0:i.tempMin)}C</strong></article>
              <article><span>Chuva</span><strong>${S(i==null?void 0:i.precipitationProbability)}%</strong></article>
              <article><span>Sol</span><strong>${S(i==null?void 0:i.sunshineHours)}h</strong></article>
              <article><span>Nuvens</span><strong>${S(o==null?void 0:o.cloudCover)}%</strong></article>
            </div>
            <ul class="weather-advice">
              ${s.map(u=>`<li>${c(u)}</li>`).join("")}
            </ul>
          `:`<p class="muted">${c(n)}</p>`}
      <div class="weather-actions">
        <button class="secondary-button" id="useCurrentLocationCare" type="button">Usar local atual</button>
        <button class="ghost-button" data-tab="settings" type="button">Trocar cidade</button>
      </div>
    </article>
  `}function Ra(){return`
    <nav class="bottom-nav" aria-label="Navegacao principal">
      ${La.map(a=>`
          <button class="${t.tab===a.id?"active":""}" data-tab="${a.id}" aria-label="${a.label}">
            ${a.icon()}
            <span>${a.label}</span>
          </button>
        `).join("")}
    </nav>
  `}function Q(a){var u,_,p,g,f,A;const e=((u=a.gemini)==null?void 0:u.identificacao_basica)||{},o=((_=a.gemini)==null?void 0:_.cuidados_e_rotina)||{},i=((g=(p=a.gemini)==null?void 0:p.sazonalidade_e_crescimento)==null?void 0:g.temporada_ativa_season)||"Interior",s=o.necessidade_luminosidade||"Luz indireta",n=((A=(f=a.gemini)==null?void 0:f.diagnostico_e_saude)==null?void 0:A.status_saude_atual)||"Saudavel",r=o.toxicidade_pets||o.toxicidade_criancas||!1,l=J(a);return`
    <article class="plant-card" data-open="${a.id}">
      <img src="${a.image}" alt="${c(l)}" />
      <span class="season">${c(i)}</span>
      <h3>${c(l)}</h3>
      <p>${c(e.nome_cientifico||"Identificacao incompleta")}</p>
      <div class="card-badges">
        <span class="badge-health ${n.toLowerCase().includes("saud")?"healthy":"warning"}">${c(n)}</span>
        ${r?'<span class="badge-alert">⚠️ Toxica</span>':'<span class="badge-alert friendly">🐾 Seguro</span>'}
      </div>
      <div class="card-meta">
        <span>${j()} ${c(o.frequencia_rega_verao||"Rega moderada")}</span>
        <span>${pa()} ${c(s.split(" ").slice(0,2).join(" "))}</span>
      </div>
    </article>
  `}function Fa(a){var h,b,z,w,N,K,R;const e=((h=a.gemini)==null?void 0:h.identificacao_basica)||{},o=((b=a.gemini)==null?void 0:b.descricao_visual)||{},i=((z=a.gemini)==null?void 0:z.cuidados_e_rotina)||{},s=((w=a.gemini)==null?void 0:w.sazonalidade_e_crescimento)||{},n=((N=a.gemini)==null?void 0:N.diagnostico_e_saude)||{},r=((K=a.gemini)==null?void 0:K.suplementos_e_manutencao)||{},l=((R=a.gemini)==null?void 0:R.propagacao_e_extras)||{},u=Array.isArray(n.principais_pragas_ameaca)?n.principais_pragas_ameaca:[],_=J(a),p=la(a),g=e.nome_popular_ontario_canada||e.nome_comercial_canada||(p?"Moth orchid":""),f=e.nome_comercial_canada&&e.nome_comercial_canada!==g?e.nome_comercial_canada:"",A=Array.isArray(o.sinais_observados)?o.sinais_observados:[],I=Array.isArray(i.cuidados_praticos_ontario)?i.cuidados_praticos_ontario:[],L=Array.isArray(i.erros_comuns)?i.erros_comuns:[],E=Array.isArray(n.sinais_positivos)?n.sinais_positivos:[],O=Array.isArray(n.sinais_alerta)?n.sinais_alerta:[],d=Array.isArray(l.curiosidades)?l.curiosidades:[];return`
    <aside class="modal-backdrop">
      <section class="plant-modal">
        <div class="modal-image">
          <img src="${a.image}" alt="${c(_)}" />
          <button class="icon-button close-modal" aria-label="Fechar">${de()}</button>
        </div>
        <div class="modal-body">
          <div class="plant-title-block">
            <span class="detail-kicker">${c(e.tipo_planta||(p?"Orquidea epifita de interior":"Planta de interior"))}</span>
            <h1>${c(_)}</h1>
            <p><em>${c(e.nome_cientifico||"Identificacao incompleta")}</em></p>
          </div>
          <div class="badge-row">
            ${g?`<span>Ontario/Canada: ${c(g)}</span>`:""}
            ${f?`<span>Garden center: ${c(f)}</span>`:""}
            <span>${c(e.confianca_identificacao||"Confianca pendente")}</span>
            <span>${c(n.status_saude_atual||"Acompanhamento pendente")}</span>
            ${i.toxicidade_pets?"<span>Toxica para pets</span>":"<span>Pet friendly</span>"}
            <span>Ultima rega: ${q(a.lastWateredAt)===0?"Hoje":q(a.lastWateredAt)===1?"Ontem":`ha ${q(a.lastWateredAt)} dias`}</span>
          </div>
          <div class="detail-metrics detail-metrics--rich">
            <article>${j()}<strong>${c(i.frequencia_rega_verao||"Rega moderada")}</strong><span>Rega verao</span></article>
            <article>${pa()}<strong>${c(i.necessidade_luminosidade||"Luz indireta")}</strong><span>Luz</span></article>
            <article>${re()}<strong>${c(i.tolerancia_temperatura||"Ambiente interno")}</strong><span>Temperatura</span></article>
            <article>${ma()}<strong>${c(i.umidade_ar_ideal||"Umidade media")}</strong><span>Umidade</span></article>
          </div>
          <div class="detail-section detail-highlight">
            <h2>O que a IA viu</h2>
            <p>${c(o.motivo_identificacao||e.observacao_identificacao||"Identificacao feita pela imagem enviada.")}</p>
            ${A.length?`<ul>${A.map($=>`<li>${c($)}</li>`).join("")}</ul>`:""}
            ${o.limitacoes_da_foto?`<small>${c(o.limitacoes_da_foto)}</small>`:""}
          </div>
          <div class="plant-fact-grid">
            ${M("Regiao nativa",e.regiao_nativa||e.origem_geografica||(p?"Asia tropical e norte da Australia":"Origem botanica nao confirmada"))}
            ${M("Familia",e.familia_botanica||(p?"Orchidaceae":"Familia nao confirmada"))}
            ${M("Genero",e.genero||(p?"Phalaenopsis":"Genero nao confirmado"))}
            ${M("Substrato",i.substrato_recomendado||r.tipo_solo_substrato_ideal||(p?"Casca de pinus para orquideas":"Substrato bem drenado"))}
            ${M("Vaso",i.vaso_e_drenagem||r.necessidade_drenagem||(p?"Vaso ventilado com furos":"Vaso com furos"))}
            ${M("Floracao",s.epoca_floracao||"Floracao varia por cultivo")}
          </div>
          <div class="detail-section">
            <h2>Cuidados praticos em Ontario</h2>
            ${I.length?`<ul>${I.map($=>`<li>${c($)}</li>`).join("")}</ul>`:`<p>${c(i.indicador_umidade_solo||"Cheque o substrato antes de regar, especialmente no inverno.")}</p>`}
            ${L.length?`<p><strong>Evite:</strong> ${c(L.join("; "))}.</p>`:""}
          </div>
          <div class="detail-section">
            <h2>Saude da planta</h2>
            <p>${c(n.proxima_acao_recomendada||"Observe folhas, raizes e umidade do substrato antes do proximo cuidado.")}</p>
            ${E.length?`<p><strong>Sinais bons:</strong> ${c(E.join(", "))}.</p>`:""}
            ${O.length?`<p><strong>Alertas:</strong> ${c(O.join(", "))}.</p>`:""}
            <p><strong>Pragas comuns:</strong> ${c(u.length?u.join(", "):"cochonilhas, acaros ou fungos conforme a especie")}.</p>
          </div>
          <div class="detail-section">
            <h2>Origem, manutencao e extras</h2>
            <p>${c(e.observacao_identificacao||`Origem: ${e.origem_geografica||"grupo botanico nao confirmado"}. Ciclo: ${e.ciclo_de_vida||"perene em cultivo domestico"}.`)}</p>
            <p><strong>Adubacao:</strong> ${c(r.frequencia_adubacao||"leve durante a fase ativa")} com ${c(r.tipo_adubo_recomendado||"adubo equilibrado diluido")}.</p>
            <p><strong>Propagacao:</strong> ${c(l.metodo_propagacao||"metodo varia por especie")}. ${c(l.instrucoes_execucao_passo_a_passo||"")}</p>
            ${d.length?`<ul>${d.map($=>`<li>${c($)}</li>`).join("")}</ul>`:""}
            ${l.nota_para_pets_e_criancas?`<small>${c(l.nota_para_pets_e_criancas)}</small>`:""}
          </div>
          <label class="notes-label" for="plantNotes">Notas</label>
          <textarea id="plantNotes" data-notes="${a.id}">${c(a.notes||"")}</textarea>
          <div class="modal-actions">
            <button class="primary-button" data-water="${a.id}">Regar agora</button>
            <button class="ghost-button danger" data-delete="${a.id}">Excluir</button>
          </div>
        </div>
      </section>
    </aside>
  `}function Ga(){var e,o,i,s,n,r,l,u,_,p,g,f,A,I,L,E,O;document.querySelectorAll("[data-tab]").forEach(d=>{d.addEventListener("click",()=>{t.tab=d.dataset.tab,t.selectedPlantId="",m()})}),document.querySelectorAll("[data-open]").forEach(d=>{d.addEventListener("click",()=>{t.selectedPlantId=d.dataset.open,m()})}),(e=document.querySelector(".close-modal"))==null||e.addEventListener("click",()=>{t.selectedPlantId="",m()}),(o=document.querySelector("#plantUpload"))==null||o.addEventListener("change",Ua),(i=document.querySelector("#analyzeButton"))==null||i.addEventListener("click",Wa),(s=document.querySelector("#settingsForm"))==null||s.addEventListener("submit",Ba),(n=document.querySelector("#removeKey"))==null||n.addEventListener("click",Ha),(r=document.querySelector("#toggleKey"))==null||r.addEventListener("click",Ja),(l=document.querySelector("#testApiKey"))==null||l.addEventListener("click",Va),(u=document.querySelector("#refreshWeather"))==null||u.addEventListener("click",()=>H()),(_=document.querySelector("#saveWeatherLocation"))==null||_.addEventListener("click",Qa),(p=document.querySelector("#useCurrentLocation"))==null||p.addEventListener("click",na),(g=document.querySelector("#useCurrentLocationCare"))==null||g.addEventListener("click",na),(f=document.querySelector("#weatherLocation"))==null||f.addEventListener("input",d=>{t.weather.draftLocation=d.target.value}),document.querySelectorAll("[data-water]").forEach(d=>{d.addEventListener("click",async h=>{h.stopPropagation(),await Za(d.dataset.water)})}),document.querySelectorAll("[data-delete]").forEach(d=>{d.addEventListener("click",async()=>{await ha(d.dataset.delete),t.plants=await x(),t.selectedPlantId="",y("Planta excluida.")})}),(A=document.querySelector("[data-notes]"))==null||A.addEventListener("change",async d=>{const h=t.plants.find(b=>b.id===d.target.dataset.notes);h&&(await W({...h,notes:d.target.value}),t.plants=await x(),y("Notas salvas."))});const a=document.querySelector("#searchPlants");a&&a.addEventListener("input",d=>{t.searchQuery=d.target.value;const h=document.querySelector(".plant-grid");if(h){const b=t.searchQuery.toLowerCase().trim(),z=t.plants.filter(w=>{var $,aa,ea,ta,oa,ia;if(!b)return!0;const N=(((aa=($=w.gemini)==null?void 0:$.identificacao_basica)==null?void 0:aa.nome_popular)||"").toLowerCase(),K=(((ta=(ea=w.gemini)==null?void 0:ea.identificacao_basica)==null?void 0:ta.nome_popular_ontario_canada)||"").toLowerCase(),R=(((ia=(oa=w.gemini)==null?void 0:oa.identificacao_basica)==null?void 0:ia.nome_cientifico)||"").toLowerCase();return N.includes(b)||K.includes(b)||R.includes(b)});h.innerHTML=z.map(Q).join(""),h.querySelectorAll("[data-open]").forEach(w=>{w.addEventListener("click",()=>{t.selectedPlantId=w.dataset.open,m()})})}}),(I=document.querySelector(".modal-backdrop"))==null||I.addEventListener("click",d=>{d.target===d.currentTarget&&(t.selectedPlantId="",m())}),(L=document.querySelector("#clearUploadButton"))==null||L.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),t.uploadPreview="",t.uploadMime="",m()}),(E=document.querySelector("#geminiApiKey"))==null||E.addEventListener("input",d=>{t.settingsDraftApiKey=d.target.value}),(O=document.querySelector("#geminiModel"))==null||O.addEventListener("change",d=>{t.settingsDraftModel=d.target.value}),document.querySelectorAll("[data-day-offset]").forEach(d=>{d.addEventListener("click",()=>{t.selectedCareDayOffset=parseInt(d.dataset.dayOffset,10),m()})})}async function Ua(a){var o;const e=(o=a.target.files)==null?void 0:o[0];e&&(t.uploadMime=e.type||"image/jpeg",t.uploadPreview=await Xa(e),m())}async function Wa(){if(t.uploadPreview){if(!t.apiKey){t.tab="settings",y("Adicione sua API key do Gemini para usar a IA.");return}t.isAnalyzing=!0,m();try{const a=await wa({apiKey:t.apiKey,imageBase64:t.uploadPreview,mimeType:t.uploadMime,model:t.geminiModel}),e=await W({id:crypto.randomUUID(),image:t.uploadPreview,gemini:a,notes:"",createdAt:new Date().toISOString(),lastWateredAt:new Date().toISOString()});t.plants=await x(),t.uploadPreview="",t.uploadMime="",t.tab="collection",t.selectedPlantId=e.id,y("Planta identificada e salva.")}catch(a){console.error(a),y(a.message||"Nao foi possivel analisar. Verifique a API key.")}finally{t.isAnalyzing=!1,m()}}}async function Ba(a){a.preventDefault();const e=document.querySelector("#geminiApiKey"),o=document.querySelector("#geminiModel");t.apiKey=e.value.trim(),t.geminiModel=o.value,await D("geminiApiKey",t.apiKey),await D("geminiModel",t.geminiModel),t.settingsDraftApiKey=null,t.settingsDraftModel=null,t.apiTestMessage="",y("API key do Gemini salva localmente.")}async function Ha(){t.apiKey="",t.settingsDraftApiKey=null,t.settingsDraftModel=null,t.apiTestMessage="",await va("geminiApiKey"),y("API key removida.")}async function Va(){const a=document.querySelector("#geminiApiKey"),e=document.querySelector("#geminiModel"),o=a.value.trim(),i=e.value;t.settingsDraftApiKey=o,t.settingsDraftModel=i,t.isTestingApi=!0,t.apiTestMessage="",m();try{await Aa({apiKey:o,model:i}),t.apiTestMessage="API funcionando. Salve a chave para usar a IA."}catch(s){console.error(s),t.apiTestMessage=s.message||"Nao foi possivel testar a API key."}finally{t.isTestingApi=!1,m()}}async function Qa(){t.weather.status="loading",t.weather.message="Buscando cidade...",m();try{const a=await Ma(t.weather.draftLocation||P.name);t.weather.location=a,t.weather.draftLocation=a.name,await D("weatherLocation",a),await H(),y(`Clima configurado para ${a.name}.`)}catch(a){t.weather.status="error",t.weather.message=a.message||"Nao foi possivel salvar essa localizacao.",m()}}async function na(){if(!navigator.geolocation){t.weather.status="error",t.weather.message="Geolocalizacao nao esta disponivel neste navegador.",m();return}t.weather.status="loading",t.weather.message="Pedindo permissao de localizacao...",m(),navigator.geolocation.getCurrentPosition(async a=>{const e={name:"Local atual em Ontario",latitude:a.coords.latitude,longitude:a.coords.longitude,source:"geolocation"};t.weather.location=e,t.weather.draftLocation=e.name,await D("weatherLocation",e),await H(),y("Clima atualizado pelo local atual.")},a=>{t.weather.status="error",t.weather.message="Permissao negada. Voce pode salvar uma cidade em Ajustes.",m()},{enableHighAccuracy:!1,timeout:1e4,maximumAge:18e5})}async function H({silent:a=!1}={}){a||(t.weather.status="loading",t.weather.message="Atualizando previsao...",m());try{const e=await qa(t.weather.location||P);t.weather.forecast=e,t.weather.status="ready",t.weather.message=`Atualizado ${ee(e.fetchedAt)}.`,await D("weatherForecast",e)}catch(e){const o=await U("weatherForecast");o?(t.weather.forecast=o,t.weather.status="cached",t.weather.message="Sem conexao. Mostrando ultimo clima salvo."):(t.weather.status="error",t.weather.message=e.message||"Clima indisponivel agora.")}finally{m()}}function Ja(){const a=document.querySelector("#geminiApiKey");a.type=a.type==="password"?"text":"password"}async function Za(a){const e=t.plants.find(o=>o.id===a);e&&(await W({...e,lastWateredAt:new Date().toISOString()}),t.plants=await x(),y("Rega registrada."))}function G(a,e,o,i){return`
    <button class="quick-card" data-tab="${a}">
      <span>${e}</span>
      <strong>${o}</strong>
      <small>${i}</small>
    </button>
  `}function M(a,e){return`
    <article>
      <span>${c(a)}</span>
      <strong>${c(e)}</strong>
    </article>
  `}function Xa(a){return new Promise((e,o)=>{const i=new FileReader;i.onload=()=>e(i.result),i.onerror=()=>o(i.error),i.readAsDataURL(a)})}function J(a){var o;const e=((o=a.gemini)==null?void 0:o.identificacao_basica)||{};return(!e.nome_popular||e.nome_popular==="Planta salva")&&la(a)?"Orquidea borboleta":e.nome_popular||e.nome_popular_ontario_canada||e.nome_comercial_canada||"Planta salva"}function la(a){var i;const e=((i=a==null?void 0:a.gemini)==null?void 0:i.identificacao_basica)||{},o=[e.nome_cientifico,e.nome_popular,e.nome_popular_ontario_canada,e.nome_comercial_canada,e.genero].join(" ").toLowerCase();return o.includes("phalaenopsis")||o.includes("phallaenopsis")}function Ya(a){var e;return((e=ca.find(o=>o.id===a))==null?void 0:e.label)||a}function ae(a){var s;if(!a)return["Configure o clima para receber dicas de rega."];const e=a.current||{},o=((s=a.daily)==null?void 0:s[0])||{},i=[];return e.humidity!==void 0&&e.humidity<35&&i.push("Ar seco: orquideas e tropicais podem precisar de bandeja de umidade ou borrifacao ao redor."),o.precipitationProbability!==void 0&&o.precipitationProbability>=60&&i.push("Dia umido/chuvoso: confira o substrato antes de regar e evite excesso de agua."),e.temperature!==void 0&&e.temperature<10&&i.push("Frio em Ontario: mantenha vasos longe de janelas frias e reduza rega."),e.temperature!==void 0&&e.temperature>=26&&i.push("Calor: plantas em vaso podem secar mais rapido; cheque o substrato com o dedo."),o.sunshineHours!==void 0&&o.sunshineHours!==null&&o.sunshineHours<3&&i.push("Poucas horas de sol: aproxime plantas de luz indireta brilhante, sem encostar no vidro frio."),i.length||i.push("Clima equilibrado: mantenha a rotina e regue apenas se o substrato pedir."),i.slice(0,3)}function S(a){return a==null||Number.isNaN(Number(a))?"--":Math.round(Number(a))}function ee(a){return a?new Intl.DateTimeFormat("pt-BR",{hour:"2-digit",minute:"2-digit"}).format(new Date(a)):"agora"}function y(a){t.toast=a,m(),window.setTimeout(()=>{t.toast="",m()},2200)}function te(a){return new Promise(e=>window.setTimeout(e,a))}function q(a){return Math.max(0,Math.floor((Date.now()-new Date(a).getTime())/864e5))}function Z(a){var s;const i=((((s=a.gemini)==null?void 0:s.cuidados_e_rotina)||{}).frequencia_rega_verao||"").match(/(\d+)/);return i?parseInt(i[1],10):7}function oe(){const a=["Dom","Seg","Ter","Qua","Qui","Sex","Sab"],e=[],o=new Date;for(let i=0;i<14;i++){const s=new Date(o.getTime()+i*24*60*60*1e3),n=s.getDate();let r=a[s.getDay()];i===0?r="Hoje":i===1&&(r="Amanha"),e.push({offset:i,name:r,dayNum:n,dateString:s.toDateString()})}return e}function ra(a,e){return a.filter(o=>{const i=Z(o),s=q(o.lastWateredAt);if(s>=i)return e===0?!0:e%i===0;const n=i-s;return n===e?!0:n<e?(e-n)%i===0:!1})}function ie(){V&&(V.classList.add("splash-screen--hidden"),window.setTimeout(()=>V.remove(),620))}function c(a){return String(a).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function v(a){return`<svg viewBox="0 0 24 24" aria-hidden="true">${a}</svg>`}function se(){return v('<path d="M5 21c8-1 14-7 14-18C9 4 4 10 5 21Z"/><path d="M5 21c3-5 7-9 12-13"/>')}function ua(){return v('<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>')}function X(){return v('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="4"/>')}function j(){return v('<path d="M12 3s6 7 6 12a6 6 0 0 1-12 0c0-5 6-12 6-12Z"/>')}function Y(){return v('<path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="m4 12 2-1 .6-1.5L5.8 7.4l1.6-1.6 2.1.8L11 6l1-2h2l1 2 1.5.6 2.1-.8 1.6 1.6-.8 2.1L20 11l2 1v2l-2 1-.6 1.5.8 2.1-1.6 1.6-2.1-.8L15 20l-1 2h-2l-1-2-1.5-.6-2.1.8-1.6-1.6.8-2.1L6 15l-2-1Z"/>')}function ne(){return v('<circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/>')}function pa(){return v('<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/>')}function re(){return v('<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z"/>')}function ma(){return v('<path d="M17.5 19H8a5 5 0 1 1 1.1-9.9 6 6 0 0 1 11.6 2.2A4 4 0 0 1 17.5 19Z"/>')}function ce(){return v('<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>')}function de(){return v('<path d="M6 6l12 12M18 6 6 18"/>')}
