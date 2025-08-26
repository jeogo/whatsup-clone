'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { contacts } from '@/data/mockData';
import styles from './ChatSidebar.module.css';

interface ChatSidebarProps {
  selectedContactId: string | null;
  onContactSelect: (contactId: string) => void;
}

export default function ChatSidebar({ selectedContactId, onContactSelect }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = useMemo(() => {
    if (!searchQuery) return contacts;
    
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className={styles.sidebar}>
      <header className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            You
          </div>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.iconButton} title="Status">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6Z"/>
            </svg>
          </button>
          <button className={styles.iconButton} title="New chat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2M20,16H5.17L4,17.17V4H20V16M17,11H13V15H11V11H7V9H11V5H13V9H17V11Z"/>
            </svg>
          </button>
          <button className={styles.iconButton} title="Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"/>
            </svg>
          </button>
        </div>
      </header>

      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.contactsList}>
        {filteredContacts.length === 0 ? (
          <div className={styles.noResults}>
            <svg className={styles.noResultsIcon} width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <div className={styles.noResultsText}>No chats found</div>
            <div className={styles.noResultsSubtext}>
              Try searching for a different contact
            </div>
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`${styles.contactItem} ${
                selectedContactId === contact.id ? styles.active : ''
              }`}
              onClick={() => onContactSelect(contact.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onContactSelect(contact.id);
                }
              }}
            >
              <Image
                src={contact.avatar}
                alt={contact.name}
                width={48}
                height={48}
                className={styles.contactAvatar}
                unoptimized
              />
              <div className={styles.contactInfo}>
                <div className={styles.contactName}>{contact.name}</div>
                <div className={styles.lastMessage}>{contact.lastMessage}</div>
              </div>
              <div className={styles.contactMeta}>
                <div className={styles.timestamp}>{contact.timestamp}</div>
                {contact.unreadCount > 0 && (
                  <div className={styles.unreadBadge}>
                    {contact.unreadCount > 99 ? '99+' : contact.unreadCount}
                  </div>
                )}
              </div>
              {contact.isOnline && <div className={styles.onlineIndicator} />}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
