interface StatusMessageProps {
  status: 'initial' | 'loading' | 'success' | 'empty' | 'error';
  message: string;
  onRetry?: () => void;
}

export function StatusMessage({ status, message, onRetry }: StatusMessageProps) {
  const statusClasses = {
    initial: 'status-initial',
    loading: 'status-loading',
    success: 'status-success',
    empty: 'status-empty',
    error: 'status-error',
  };

  return (
    <div id="status-message" aria-live="polite" className={statusClasses[status]}>
      <span>{message}</span>
      {status === 'error' && onRetry && (
        <button onClick={onRetry} className="btn-primary" style={{ marginTop: '0.75rem', display: 'block', marginInline: 'auto', padding: '0.4rem 1rem', fontSize: '0.9rem' }}>
          Volver a intentar
        </button>
      )}
    </div>
  );
}