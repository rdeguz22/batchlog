import type { Action } from '../state/appReducer';
import type { ScreenId } from '../state/transitions';

// F21: Home, New batch, Summary. I2: every target is at least 44 x 44 px.
// TODO: tabs from screens other than Home and Summary need their own transitions.
export function BottomNav({
  screen,
  dispatch,
}: {
  screen: ScreenId;
  dispatch: (a: Action) => void;
}) {
  const tabs: { label: string; target: ScreenId; action: string }[] = [
    { label: 'Home', target: 'S4', action: 'T55' },
    { label: 'New batch', target: 'S5', action: screen === 'S4' ? 'T18' : 'T56' },
    { label: 'Summary', target: 'S10', action: 'T23' },
  ];
  return (
    <nav className="bottom-nav">
      {tabs.map((t) => (
        <button
          key={t.label}
          type="button"
          data-action={t.action}
          className={screen === t.target ? 'active' : undefined}
          onClick={() => dispatch({ type: t.action })}
        >
          {t.label}
        </button>
      ))}
    </nav>
  );
}
