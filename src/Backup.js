import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Importa useTranslation
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Backup.css';

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  
  return `${day}/${month}/${year} ${time}`;
}

function Backup() {
  const { t } = useTranslation(); // Usa useTranslation para acceder a t
  const [backupList, setBackupList] = useState([
    { id: 1, date: '2024-10-01T14:35:11' },
    { id: 2, date: '2024-09-28T10:15:22' },
    { id: 3, date: '2024-09-20T08:45:33' },
  ]);
  const [lastBackupDate, setLastBackupDate] = useState('2024-10-01T14:35:00');
  const [loading, setLoading] = useState(false);
  const [showAllBackups, setShowAllBackups] = useState(false);

  const handleBackup = () => {
    if (window.confirm(t('backup.confirm_backup'))) { // Traducción
      setLoading(true);
      setTimeout(() => {
        const newBackup = {
          id: backupList.length + 1,
          date: new Date().toISOString(),
        };
        setBackupList([newBackup, ...backupList]);
        setLastBackupDate(newBackup.date);
        setLoading(false);
        alert(t('backup.backup_success')); // Traducción
      }, 2000);
    }
  };

  const handleRestore = (backupId) => {
    if (window.confirm(t('backup.confirm_restore'))) { // Traducción
      setLoading(true);
      setTimeout(() => {
        alert(t('backup.restore_success', { id: backupId })); // Traducción con parámetro
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="backup-view">
      <h2>{t('backup.title')}</h2> {/* Traducción */}
      <p>
        {t('backup.last_backup')}: {lastBackupDate ? formatDate(lastBackupDate) : t('backup.not_available')}
      </p>
      
      <button className="backup-button" onClick={handleBackup} disabled={loading}>
        {loading ? t('backup.backing_up') : t('backup.perform_backup')} {/* Traducción */}
      </button>

      <h3>{t('backup.versions')}</h3> {/* Traducción */}
      <ul>
        <TransitionGroup>
          {backupList.slice(0, showAllBackups ? backupList.length : 3).map((backup) => (
            <CSSTransition key={backup.id} timeout={500} classNames="fade">
              <li className="backup-item">
                <span>{formatDate(backup.date)}</span>
                <button 
                  className="restore-button"
                  onClick={() => handleRestore(backup.id)} 
                  disabled={loading}
                >
                  {loading ? t('backup.restoring') : t('backup.restore')} {/* Traducción */}
                </button>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
      {backupList.length > 3 && (
        <button 
          className="show-more-button" 
          onClick={() => setShowAllBackups(!showAllBackups)}
        >
          {showAllBackups ? t('backup.show_less') : t('backup.show_more')} {/* Traducción */}
        </button>
      )}
    </div>
  );
}

export default Backup;
