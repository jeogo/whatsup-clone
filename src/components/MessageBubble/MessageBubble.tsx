import { memo } from 'react';
import { Message } from '@/data/mockData';
import styles from './MessageBubble.module.css';

interface MessageBubbleProps {
  message: Message;
}

const StatusIcon = ({ status }: { status: Message['status'] }) => {
  switch (status) {
    case 'sent':
      return (
        <span className={`${styles.statusIcon} ${styles.statusSent}`} title="Sent">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
          </svg>
        </span>
      );
    case 'delivered':
      return (
        <span className={`${styles.statusIcon} ${styles.statusDelivered}`} title="Delivered">
          <svg width="16" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18,7L16.59,5.59L10.25,11.93L11.66,13.34L18,7M22.24,5.59L11.66,16.17L7.48,12L6.07,13.41L11.66,19L23.66,7L22.24,5.59M.41,13.41L6,19L7.41,17.59L1.83,12L.41,13.41Z"/>
          </svg>
        </span>
      );
    case 'read':
      return (
        <span className={`${styles.statusIcon} ${styles.statusRead}`} title="Read">
          <svg width="16" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18,7L16.59,5.59L10.25,11.93L11.66,13.34L18,7M22.24,5.59L11.66,16.17L7.48,12L6.07,13.41L11.66,19L23.66,7L22.24,5.59M.41,13.41L6,19L7.41,17.59L1.83,12L.41,13.41Z"/>
          </svg>
        </span>
      );
    default:
      return null;
  }
};

function MessageBubble({ message }: MessageBubbleProps) {
  const isFromMe = message.isFromMe;

  return (
    <div 
      className={`${styles.messageBubble} ${
        isFromMe ? styles.messageFromMe : styles.messageFromOther
      }`}
    >
      <div 
        className={`${styles.bubbleContent} ${
          isFromMe ? styles.bubbleFromMe : styles.bubbleFromOther
        }`}
      >
        <div className={styles.messageText}>
          {message.text}
        </div>
        <div className={styles.messageFooter}>
          <span className={styles.timestamp}>
            {message.timestamp}
          </span>
          {isFromMe && <StatusIcon status={message.status} />}
        </div>
      </div>
    </div>
  );
}

export default memo(MessageBubble);
