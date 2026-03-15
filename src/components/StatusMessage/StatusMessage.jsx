import styles from './StatusMessage.module.css';

const StatusMessage = ({ type, icon, onRetry }) => {
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
