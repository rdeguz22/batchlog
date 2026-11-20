// Remaining-food gauge. I8: orange with an "Almost gone" tag at 10% or less.
export function Gauge({ percentLeft }: { percentLeft: number }) {
  const low = percentLeft <= 10;
  return (
    <div className={low ? 'gauge low' : 'gauge'} aria-label={`${percentLeft}% left`}>
      <div className="gauge-fill" style={{ width: `${percentLeft}%` }} />
      {low && <span className="tag">Almost gone</span>}
    </div>
  );
}
