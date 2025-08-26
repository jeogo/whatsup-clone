'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ChatSidebar from '@/components/ChatSidebar';
import ChatWindow from '@/components/ChatWindow';
import { contacts } from '@/data/mockData';
import styles from './page.module.css';

export default function ChatPage() {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize with first contact on desktop, empty on mobile
  useEffect(() => {
    if (!isMobile && !selectedContactId && contacts.length > 0) {
      setSelectedContactId(contacts[0]?.id || null);
    }
  }, [isMobile, selectedContactId]);

  // Handle URL parameters for session validation
  useEffect(() => {
    const session = searchParams.get('session');
    const auth = searchParams.get('auth');
    
    if (session && auth === 'verified') {
      // Validate session token
      const storedSession = typeof window !== 'undefined' ? sessionStorage.getItem('whatsapp_session') : null;
      
      if (storedSession === session) {
        console.log('Valid session authenticated:', session);
        // Mark as authenticated
        sessionStorage.setItem('whatsapp_authenticated', 'true');
      } else {
        console.log('Invalid session, redirecting to QR page');
        // Invalid session, redirect to QR page
        router.push('/');
        return;
      }
    } else if (!session || auth !== 'verified') {
      // No valid session, check if previously authenticated
      const isAuthenticated = typeof window !== 'undefined' ? sessionStorage.getItem('whatsapp_authenticated') : null;
      
      if (!isAuthenticated) {
        console.log('No authentication, redirecting to QR page');
        router.push('/');
        return;
      }
    }
  }, [searchParams, router]);

  const handleContactSelect = useCallback((contactId: string) => {
    setSelectedContactId(contactId);
  }, []);

  const handleBackToSidebar = useCallback(() => {
    setSelectedContactId(null);
  }, []);

  // Show loading state briefly
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        Loading WhatsApp Web...
      </div>
    );
  }

  return (
    <div 
      className={`${styles.chatInterface} ${
        selectedContactId && isMobile ? styles.chatSelected : ''
      }`}
    >
      <div className={styles.sidebarPanel}>
        <ChatSidebar
          selectedContactId={selectedContactId}
          onContactSelect={handleContactSelect}
        />
      </div>
      
      <div className={styles.chatPanel}>
        <ChatWindow
          selectedContactId={selectedContactId}
          onBackClick={isMobile ? handleBackToSidebar : undefined}
        />
      </div>
    </div>
  );
}
