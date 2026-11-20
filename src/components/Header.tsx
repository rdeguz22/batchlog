import { useFocusHeading } from '../hooks/useFocusHeading';

export function Header({ title }: { title: string }) {
  const ref = useFocusHeading<HTMLHeadingElement>();
  return (
    <h1 ref={ref} tabIndex={-1}>
      {title}
    </h1>
  );
}
