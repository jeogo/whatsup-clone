'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Contact, Message, messages, getCurrentTime, generateMessageId, getContactById } from '@/data/mockData';
import MessageBubble from '@/components/MessageBubble';
import styles from './ChatWindow.module.css';

interface ChatWindowProps {
  selectedContactId: string | null;
  onBackClick?: (() => void) | undefined;
}

export default function ChatWindow({ selectedContactId, onBackClick }: ChatWindowProps) {
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [contact, setContact] = useState<Contact | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Load messages for selected contact
  useEffect(() => {
    if (selectedContactId) {
      const selectedContact = getContactById(selectedContactId);
      setContact(selectedContact || null);
      setCurrentMessages(messages[selectedContactId] || []);
    } else {
      setContact(null);
      setCurrentMessages([]);
    }
  }, [selectedContactId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [currentMessages, scrollToBottom]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newMessage]);

  // Simulate typing indicator
  useEffect(() => {
    let typingTimer: NodeJS.Timeout;
    
    if (selectedContactId && currentMessages.length > 0) {
      // Randomly show typing indicator
      const showTyping = Math.random() > 0.7;
      if (showTyping) {
        setIsTyping(true);
        typingTimer = setTimeout(() => {
          setIsTyping(false);
        }, 2000 + Math.random() * 3000);
      }
    }

    return () => {
      if (typingTimer) {
        clearTimeout(typingTimer);
      }
    };
  }, [selectedContactId, currentMessages.length]);

  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim() || !selectedContactId) return;

    const message: Message = {
      id: generateMessageId(),
      contactId: selectedContactId,
      text: newMessage.trim(),
      timestamp: getCurrentTime(),
      isFromMe: true,
      status: 'sent',
    };

    setCurrentMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate message status updates
    setTimeout(() => {
      setCurrentMessages(prev => 
        prev.map(msg => 
          msg.id === message.id 
            ? { ...msg, status: 'delivered' as const }
            : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setCurrentMessages(prev => 
        prev.map(msg => 
          msg.id === message.id 
            ? { ...msg, status: 'read' as const }
            : msg
        )
      );
    }, 2000);

    // Simulate response from contact (sometimes)
    if (Math.random() > 0.6) {
      const responses = [
        'Thanks for your message! 😊',
        'Got it, will check it out',
        'Sure, sounds good!',
        'Let me get back to you on this',
        'Perfect timing!',
        'Absolutely! 👍',
        'I\'ll take care of it',
      ];
      
      setTimeout(() => {
        const responseMessage: Message = {
          id: generateMessageId(),
          contactId: selectedContactId,
          text: responses[Math.floor(Math.random() * responses.length)] ?? 'Thanks!',
          timestamp: getCurrentTime(),
          isFromMe: false,
          status: 'read',
        };
        
        setCurrentMessages(prev => [...prev, responseMessage]);
      }, 3000 + Math.random() * 2000);
    }
  }, [newMessage, selectedContactId]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // Empty state when no contact is selected
  if (!selectedContactId || !contact) {
    return (
      <div className={styles.chatWindow}>
        <div className={styles.emptyState}>
          <svg className={styles.emptyStateIcon} width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.53 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
          </svg>
          <div className={styles.emptyStateTitle}>WhatsApp Web</div>
          <div className={styles.emptyStateSubtitle}>
            Send and receive messages without keeping your phone online.<br />
            Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.chatWindow}>
      <header className={styles.chatHeader}>
        {onBackClick && (
          <button 
            className={styles.backButton}
            onClick={onBackClick}
            title="Back"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
        )}
        
        <div className={styles.contactInfo}>
          <Image
            src={contact.avatar}
            alt={contact.name}
            width={40}
            height={40}
            className={styles.contactAvatar}
            unoptimized
          />
          <div className={styles.contactDetails}>
            <div className={styles.contactName}>{contact.name}</div>
            <div className={`${styles.contactStatus} ${contact.isOnline ? styles.onlineStatus : ''}`}>
              {contact.isOnline ? 'online' : 'last seen recently'}
            </div>
          </div>
        </div>

        <div className={styles.headerActions}>
          <button className={styles.iconButton} title="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
          <button className={styles.iconButton} title="More">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"/>
            </svg>
          </button>
        </div>
      </header>

      <div className={styles.messagesContainer}>
        {currentMessages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className={styles.typingIndicator}>
            <div className={styles.typingDots}>
              <div className={styles.typingDot}></div>
              <div className={styles.typingDot}></div>
              <div className={styles.typingDot}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.messageInput}>
        <div className={styles.inputContainer}>
          <button className={styles.emojiButton} title="Emoji">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12M15.5,8A1.5,1.5 0 0,0 14,9.5A1.5,1.5 0 0,0 15.5,11A1.5,1.5 0 0,0 17,9.5A1.5,1.5 0 0,0 15.5,8M8.5,8A1.5,1.5 0 0,0 7,9.5A1.5,1.5 0 0,0 8.5,11A1.5,1.5 0 0,0 10,9.5A1.5,1.5 0 0,0 8.5,8M12,13.5A2.5,2.5 0 0,0 9.5,16H14.5A2.5,2.5 0 0,0 12,13.5Z"/>
            </svg>
          </button>
          <textarea
            ref={textareaRef}
            className={styles.textInput}
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            rows={1}
          />
          <button className={styles.attachButton} title="Attach file">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z"/>
            </svg>
          </button>
        </div>
        
        <button 
          className={styles.sendButton}
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          title="Send"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
