import type { GeneratorType } from "~/entities/generator/model/types";
import type { GeneratorHistoryEntry } from "~/pages/generator/model/types";

type GeneratorStoredState = {
  type: GeneratorType;
  history: GeneratorHistoryEntry[];
};

const databaseName = "seqgen";
const storeName = "generator-state";

function requestToPromise<T>(request: IDBRequest<T>) {
  return new Promise<T>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function transactionToPromise(transaction: IDBTransaction) {
  return new Promise<void>((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(databaseName, 1);

    request.onupgradeneeded = () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(storeName)) {
        database.createObjectStore(storeName, { keyPath: "type" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function emptyState(type: GeneratorType): GeneratorStoredState {
  return { type, history: [] };
}

export async function getGeneratorStoredState(type: GeneratorType) {
  const database = await openDatabase();

  try {
    const transaction = database.transaction(storeName, "readonly");
    const stored = await requestToPromise(
      transaction.objectStore(storeName).get(type),
    );

    const state = stored as GeneratorStoredState | undefined;
    return state
      ? { type, history: state.history ?? [] }
      : emptyState(type);
  } finally {
    database.close();
  }
}

export async function addGeneratorHistoryEntry(
  type: GeneratorType,
  entry: GeneratorHistoryEntry,
) {
  const database = await openDatabase();

  try {
    const transaction = database.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const stored =
      ((await requestToPromise(
        store.get(type),
      )) as GeneratorStoredState | undefined) ?? emptyState(type);
    const history = [entry, ...stored.history].slice(0, 20);
    store.put({ type, history });
    await transactionToPromise(transaction);
    return history;
  } finally {
    database.close();
  }
}

export async function deleteGeneratorHistoryEntry(
  type: GeneratorType,
  id: string,
) {
  const database = await openDatabase();

  try {
    const transaction = database.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const stored =
      ((await requestToPromise(
        store.get(type),
      )) as GeneratorStoredState | undefined) ?? emptyState(type);
    const history = stored.history.filter((entry) => entry.id !== id);
    store.put({ type, history });
    await transactionToPromise(transaction);
    return history;
  } finally {
    database.close();
  }
}

export async function clearGeneratorHistory(type: GeneratorType) {
  const database = await openDatabase();

  try {
    const transaction = database.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const stored =
      ((await requestToPromise(
        store.get(type),
      )) as GeneratorStoredState | undefined) ?? emptyState(type);
    store.put({ type: stored.type, history: [] });
    await transactionToPromise(transaction);
  } finally {
    database.close();
  }
}
