const DB_NAME = "andrades-garden-guide";
const DB_VERSION = 1;
const PLANTS_STORE = "plants";
const SETTINGS_STORE = "settings";

let dbPromise;

function openDb() {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(PLANTS_STORE)) {
        db.createObjectStore(PLANTS_STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(SETTINGS_STORE)) {
        db.createObjectStore(SETTINGS_STORE, { keyPath: "key" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  return dbPromise;
}

function storeRequest(storeName, mode, callback) {
  return openDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, mode);
        const store = transaction.objectStore(storeName);
        const request = callback(store);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
        transaction.onerror = () => reject(transaction.error);
      })
  );
}

export async function listPlants() {
  return storeRequest(PLANTS_STORE, "readonly", (store) => store.getAll());
}

export async function getPlant(id) {
  return storeRequest(PLANTS_STORE, "readonly", (store) => store.get(id));
}

export async function savePlant(plant) {
  const saved = {
    ...plant,
    updatedAt: new Date().toISOString()
  };
  await storeRequest(PLANTS_STORE, "readwrite", (store) => store.put(saved));
  return saved;
}

export async function deletePlant(id) {
  return storeRequest(PLANTS_STORE, "readwrite", (store) => store.delete(id));
}

export async function clearPlants() {
  return storeRequest(PLANTS_STORE, "readwrite", (store) => store.clear());
}

export async function getSetting(key) {
  const item = await storeRequest(SETTINGS_STORE, "readonly", (store) => store.get(key));
  return item?.value ?? "";
}

export async function setSetting(key, value) {
  return storeRequest(SETTINGS_STORE, "readwrite", (store) =>
    store.put({ key, value, updatedAt: new Date().toISOString() })
  );
}

export async function deleteSetting(key) {
  return storeRequest(SETTINGS_STORE, "readwrite", (store) => store.delete(key));
}
