import React, { useState, useEffect } from 'react';

function Notification({ type, message, isVisible, onClose, duration = 5000 }) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300); // Wait for animation to complete
  };

  if (!isVisible) return null;

  const getNotificationStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-800',
          text: 'text-green-800 dark:text-green-200',
          icon: '✅',
          iconBg: 'bg-green-100 dark:bg-green-800'
        };
      case 'error':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          text: 'text-red-800 dark:text-red-200',
          icon: '❌',
          iconBg: 'bg-red-100 dark:bg-red-800'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-900/20',
          border: 'border-yellow-200 dark:border-yellow-800',
          text: 'text-yellow-800 dark:text-yellow-200',
          icon: '⚠️',
          iconBg: 'bg-yellow-100 dark:bg-yellow-800'
        };
      case 'info':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-800',
          text: 'text-blue-800 dark:text-blue-200',
          icon: 'ℹ️',
          iconBg: 'bg-blue-100 dark:bg-blue-800'
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-900/20',
          border: 'border-gray-200 dark:border-gray-800',
          text: 'text-gray-800 dark:text-gray-200',
          icon: '📢',
          iconBg: 'bg-gray-100 dark:bg-gray-800'
        };
    }
  };

  const styles = getNotificationStyles();

  return (
    <div className={`fixed top-20 right-4 z-[9999] max-w-sm w-full ${isAnimating ? 'animate-slide-in' : 'animate-slide-out'}`}>
      <div className={`${styles.bg} ${styles.border} border rounded-lg shadow-lg p-4 flex items-start space-x-3`}>
        <div className={`${styles.iconBg} rounded-full p-1 flex-shrink-0`}>
          <span className="text-lg">{styles.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className={`${styles.text} text-sm font-medium`}>
            {message}
          </p>
        </div>
        <button
          onClick={handleClose}
          className={`${styles.text} hover:opacity-70 transition-opacity flex-shrink-0`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Hook pour gérer les notifications
export function useNotification() {
  const [notification, setNotification] = useState({
    isVisible: false,
    type: 'info',
    message: ''
  });

  const showNotification = (type, message, duration) => {
    setNotification({
      isVisible: true,
      type,
      message,
      duration
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({
      ...prev,
      isVisible: false
    }));
  };

  const NotificationComponent = () => (
    <Notification
      type={notification.type}
      message={notification.message}
      isVisible={notification.isVisible}
      onClose={hideNotification}
      duration={notification.duration}
    />
  );

  return {
    showNotification,
    hideNotification,
    NotificationComponent
  };
}

export default Notification;
