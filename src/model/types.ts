// The shape of the saved app data (D1–D4). Everything here is plain data.

export type FoodState = 'raw' | 'cooked' | 'dry';

export interface Per100g {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Food {
  name: string;
  states: Partial<Record<FoodState, Per100g>>;
}

export interface Ingredient {
  food: string;
  state: FoodState;
  grams: number;
}

export interface Goal {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// D2
export interface Batch {
  id: string;
  name: string;
  ingredients: Ingredient[];
  days: number;
  mealsPerDay: number;
  potWeight: number;
  cookedWeight: number;
  totals: Per100g; // whole-batch totals, computed when the batch is saved
  startDate: string; // local date key, YYYY-MM-DD
  mealDays: number[]; // 0 = Sunday ... 6 = Saturday
  createdDate: string;
  closed: boolean;
  closedDate: string | null;
}

export type LogMethodId = 'weight' | 'container' | 'weighRest' | 'other';

// D3
export interface LogEntry {
  id: string;
  batchId: string | null;
  foodName: string | null;
  grams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  method: LogMethodId;
  timestamp: string;
}

// D4
export interface Container {
  name: string;
  emptyWeight: number;
  fullWeight: number;
}

export interface Account {
  name: string;
  email: string;
  passwordHash: string; // D8: never the plain password
}

export interface AppData {
  schemaVersion: number;
  accounts: Account[];
  currentUser: string | null;
  profile: { height?: number; weight?: number; age?: number; sex?: string };
  goal: Goal | null;
  batches: Batch[];
  log: LogEntry[];
  containers: Container[];
  customFoods: Food[];
}
