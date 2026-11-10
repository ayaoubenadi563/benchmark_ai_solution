import React from 'react';

function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Confirmer", 
  cancelText = "Annuler",
  type = "danger",
  isLoading = false
}) {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: '⚠️',
          iconBg: 'bg-red-100 dark:bg-red-900',
          iconColor: 'text-red-600 dark:text-red-400',
          confirmBg: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
          border: 'border-red-200 dark:border-red-800'
        };
      case 'warning':
        return {
          icon: '⚠️',
          iconBg: 'bg-yellow-100 dark:bg-yellow-900',
          iconColor: 'text-yellow-600 dark:text-yellow-400',
          confirmBg: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
          border: 'border-yellow-200 dark:border-yellow-800'
        };
      case 'info':
        return {
          icon: 'ℹ️',
          iconBg: 'bg-blue-100 dark:bg-blue-900',
          iconColor: 'text-blue-600 dark:text-blue-400',
          confirmBg: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
          border: 'border-blue-200 dark:border-blue-800'
        };
      default:
        return {
          icon: '❓',
          iconBg: 'bg-gray-100 dark:bg-gray-800',
          iconColor: 'text-gray-600 dark:text-gray-400',
          confirmBg: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
          border: 'border-gray-200 dark:border-gray-700'
        };
    }
  };

  const styles = getTypeStyles();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (!isLoading) {
      onConfirm();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          {/* Header */}
          <div className={`px-6 py-4 border-b ${styles.border}`}>
            <div className="flex items-center space-x-3">
              <div className={`${styles.iconBg} rounded-full p-2`}>
                <span className={`text-xl ${styles.iconColor}`}>
                  {styles.icon}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
              {message}
            </p>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-end space-x-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className={`px-4 py-2 text-sm font-medium text-white ${styles.confirmBg} rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2`}
            >
              {isLoading && (
                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
              <span>{confirmText}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook pour gérer les modales de confirmation
export function useConfirmationModal() {
  const [modal, setModal] = React.useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirmer',
    cancelText: 'Annuler',
    type: 'danger',
    onConfirm: null,
    isLoading: false
  });

  const showConfirmation = (options) => {
    return new Promise((resolve) => {
      setModal({
        isOpen: true,
        title: options.title || 'Confirmation',
        message: options.message || 'Êtes-vous sûr ?',
        confirmText: options.confirmText || 'Confirmer',
        cancelText: options.cancelText || 'Annuler',
        type: options.type || 'danger',
        onConfirm: () => {
          setModal(prev => ({ ...prev, isLoading: true }));
          // Fermer la modale après un court délai pour permettre l'animation de chargement
          setTimeout(() => {
            setModal(prev => ({ ...prev, isOpen: false, isLoading: false }));
            resolve(true);
          }, 500);
        },
        isLoading: false
      });
    });
  };

  const hideConfirmation = () => {
    setModal(prev => ({ ...prev, isOpen: false, isLoading: false }));
  };

  const ConfirmationModalComponent = () => (
    <ConfirmationModal
      isOpen={modal.isOpen}
      onClose={hideConfirmation}
      onConfirm={modal.onConfirm}
      title={modal.title}
      message={modal.message}
      confirmText={modal.confirmText}
      cancelText={modal.cancelText}
      type={modal.type}
      isLoading={modal.isLoading}
    />
  );

  return {
    showConfirmation,
    hideConfirmation,
    ConfirmationModalComponent
  };
}

export default ConfirmationModal;
