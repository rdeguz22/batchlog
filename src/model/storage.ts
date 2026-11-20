// D1: the only file that touches localStorage. Every read and write is wrapped in try/catch,
// because saved JSON can be corrupt, storage can be full, or the user can turn it off.
import type { AppData } from './types';

const KEY = 'batchlog';
export const SCHEMA_VERSION = 1;

export function emptyData(): AppData {
  return {
    schemaVersion: SCHEMA_VERSION,
    accounts: [],
    currentUser: null,
    profile: {},
    goal: null,
    batches: [],
    log: [],
    containers: [],
    customFoods: [],
  };
}

export function load(store: Storage | undefined = globalThis.localStorage): AppData {
  try {
    const raw = store?.getItem(KEY);
    if (!raw) return emptyData();
    const parsed = JSON.parse(raw) as Partial<AppData>;
    // TODO: migrate older schema versions here.
    return { ...emptyData(), ...parsed, schemaVersion: SCHEMA_VERSION };
  } catch {
    return emptyData();
  }
}

// Returns false when saving failed, so the app can warn that changes won't be kept.
export function save(data: AppData, store: Storage | undefined = globalThis.localStorage): boolean {
  try {
    store?.setItem(KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}
