import type { ReactNode } from 'react';
import styles from './StatusMessage.module.css';

type StatusMessageProps = {
  type: 'error';
  icon: ReactNode;
  onRetry: () => void;
};

const StatusMessage = ({ type, icon, onRetry }: StatusMessageProps) => {
  return (
    <div className={styles.statusMessageContainer}>
      <div className={styles.icon} role="img" aria-label={type}>
        {icon}
      </div>

      {type === 'error' && (
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>Ошибка</h3>
        </div>
      )}

      <p className={styles.statusText}>
        Проблемы с соединением. Проверьте подключение к интернету.
      </p>

      <button className={styles.retryBtn} onClick={onRetry}>
        Повторить
      </button>
    </div>
  );
};

export default StatusMessage;
