import type { ReactNode } from 'react';
import styles from './StatusMessage.module.css';

type StatusMessageProps =
  | {
      type: 'error';
      icon: ReactNode;
      title: string;
      message: string;
      onRetry: () => void;
    }
  | {
      type: 'info';
      icon: ReactNode;
      title: string;
      message: string;
      onRetry?: never;
    };

const StatusMessage = ({
  type,
  icon,
  title,
  message,
  onRetry,
}: StatusMessageProps) => {
  return (
    <div className={styles.statusMessageContainer}>
      <div className={styles.icon} role="img" aria-label={type}>
        {icon}
      </div>

      <div className={styles.titleWrapper}>
        <h3 className={styles.title}>{title}</h3>
      </div>

      <p className={styles.statusText}>{message}</p>

      {onRetry && (
        <button type="button" className={styles.retryBtn} onClick={onRetry}>
          Повторить
        </button>
      )}
    </div>
  );
};

export default StatusMessage;
