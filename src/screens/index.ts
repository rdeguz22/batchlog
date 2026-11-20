import type { ComponentType } from 'react';
import type { ScreenId } from '../state/transitions';
import { AboutYouScreen } from './AboutYouScreen';
import { AddIngredientsScreen } from './AddIngredientsScreen';
import { BatchScreen } from './BatchScreen';
import { ClosedBatchScreen } from './ClosedBatchScreen';
import { DailyGoalScreen } from './DailyGoalScreen';
import { HomeScreen } from './HomeScreen';
import { LoginScreen } from './LoginScreen';
import { LogOtherScreen } from './LogOtherScreen';
import { MacrosScreen } from './MacrosScreen';
import { NewBatchScreen } from './NewBatchScreen';
import { SummaryScreen } from './SummaryScreen';
import type { ScreenProps } from './types';
import { WeighScheduleScreen } from './WeighScheduleScreen';

// Registry: one component per state in Figure 1. A new screen is one new entry here.
export const SCREEN_COMPONENTS: Record<ScreenId, ComponentType<ScreenProps>> = {
  S1: LoginScreen,
  S2: AboutYouScreen,
  S3: DailyGoalScreen,
  S4: HomeScreen,
  S5: NewBatchScreen,
  S6: AddIngredientsScreen,
  S7: WeighScheduleScreen,
  S8: BatchScreen,
  S9: ClosedBatchScreen,
  S10: SummaryScreen,
  S11: LogOtherScreen,
  S12: MacrosScreen,
};
