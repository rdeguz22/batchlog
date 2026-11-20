// I6: errors sit next to their field, in red, with role="alert", and say how to fix it.
export function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="error" role="alert">
      {message}
    </p>
  );
}
