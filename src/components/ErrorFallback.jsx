export default function ErrorFallback({ message, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Ohh no!:</p>
      <pre>{message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
