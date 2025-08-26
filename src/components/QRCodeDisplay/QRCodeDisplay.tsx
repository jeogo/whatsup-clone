'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import QRCode from 'qrcode';
import styles from './QRCodeDisplay.module.css';

interface QRCodeDisplayProps {
  showSkipButton?: boolean;
}

export default function QRCodeDisplay({ showSkipButton = true }: QRCodeDisplayProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Only run on client side
    setIsLoaded(true);
    
    const generateQRCode = async () => {
      try {
        // Generate a more realistic session token
        const sessionToken = `wa-web-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
        const url = `${window.location.origin}/chat?session=${sessionToken}&auth=verified`;
        const qrCodeString = await QRCode.toDataURL(url, {
          width: 256,
          margin: 2,
          color: {
            dark: '#111b21',
            light: '#ffffff',
          },
          errorCorrectionLevel: 'H', // Higher error correction for better scanning
        });
        setQrCodeDataUrl(qrCodeString);
        
        // Store session for validation
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('whatsapp_session', sessionToken);
        }
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, []);

  useEffect(() => {
    // Add a loading delay to make it feel more authentic
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleSkipToChat = () => {
    // Create a demo session for skip users
    const demoSession = `demo-${Date.now()}`;
    sessionStorage.setItem('whatsapp_session', demoSession);
    sessionStorage.setItem('whatsapp_authenticated', 'true');
    router.push('/chat?session=' + demoSession + '&auth=verified');
  };

  // Show loading state during SSR
  if (!isLoaded) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.logo}>W</div>
          <h1 className={styles.title}>WhatsApp Web</h1>
          <p className={styles.subtitle}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zM12.04 20.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.8-1.31-1.23-2.82-1.23-4.36 0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c-.02 4.54-3.72 8.23-8.25 8.23z"/>
            <path d="M17.25 14.25c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.37 1 2.54.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.29z"/>
          </svg>
        </div>
        <h1 className={styles.title}>WhatsApp Web</h1>
        <p className={styles.subtitle}>Send and receive messages without keeping your phone online.</p>
      </header>

      <div className={styles.qrSection}>
        {!isLoaded ? (
          <div className={styles.loadingQR}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>Generating QR Code...</p>
          </div>
        ) : qrCodeDataUrl ? (
          <Image
            src={qrCodeDataUrl}
            alt="WhatsApp Web QR Code"
            className={styles.qrCode}
            width={256}
            height={256}
            unoptimized
          />
        ) : (
          <div className={styles.loadingQR}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>Loading...</p>
          </div>
        )}

        <div className={styles.instructions}>
          <h2 className={styles.instructionTitle}>To use WhatsApp on your computer:</h2>
          <ol className={styles.steps}>
            <li className={styles.step}>Open WhatsApp on your phone</li>
            <li className={styles.step}>Tap Menu or Settings and select Linked Devices</li>
            <li className={styles.step}>Point your phone to this screen to capture the code</li>
          </ol>
        </div>

        {showSkipButton && isLoaded && (
          <div className={styles.skipSection}>
            <p className={styles.skipText}>
              Don&apos;t have WhatsApp on your phone? Try our demo version.
            </p>
            <button 
              onClick={handleSkipToChat}
              className={styles.skipButton}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2M20,16H5.17L4,17.17V4H20V16Z"/>
              </svg>
              Try Demo Chat
            </button>
          </div>
        )}
      </div>

      <footer className={styles.footer}>
        <p>
          Need help getting started?{' '}
          <a 
            href="https://faq.whatsapp.com/web" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        </p>
      </footer>
    </div>
  );
}
