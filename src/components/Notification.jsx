import React, { useState, useEffect } from 'react';

const Notification = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Auto-hide the notification after 5 seconds
    const timeout = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000);

    // Clear the timeout when the component is unmounted or closed
    return () => clearTimeout(timeout);
  }, [onClose]);

  const handleNotificationClose = () => {
    setVisible(false);
    onClose();
  };

  return (
    <div className={`notification ${type} ${visible ? 'visible' : 'hidden'}`}>
      <p>{message}</p>
      <button onClick={handleNotificationClose}>Close</button>
    </div>
  );
};

export default Notification;
