'use client';

import React from 'react';

const CHAT_URL = 'https://vm.providesupport.com/0hfjufu6eccq70z7w7kmktp1rf';

export default function FloatingChatButton() {
  const openChat = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const w = 550;
    const h = 680;
    const left = typeof window !== 'undefined' ? Math.max(0, (window.screen.width - w) / 2) : 100;
    const top = typeof window !== 'undefined' ? Math.max(0, (window.screen.height - h) / 2) : 100;
    window.open(
      CHAT_URL,
      'ProvideSupportLiveChat',
      `width=${w},height=${h},left=${left},top=${top},resizable=yes,scrollbars=yes,location=no,status=no`
    );
  };

  return (
    <a
      href={CHAT_URL}
      onClick={openChat}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-live-chat-btn"
      aria-label="Live Chat with Cathy"
      title="Live Chat - You can talk to Cathy"
    >
      <span className="live-chat-pulse-dot" aria-hidden="true" />
      <svg
        className="live-chat-icon"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="20"
        height="20"
        aria-hidden="true"
      >
        <path d="M12 2C6.477 2 2 6.03 2 11c0 2.87 1.5 5.43 3.85 7.03-.18 1.48-.82 3.01-1.85 4.12 1.95.12 3.9-.45 5.25-1.57.9.27 1.83.42 2.75.42 5.523 0 10-4.03 10-9s-4.477-9-10-9zm-3 8a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm3 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm3 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" />
      </svg>
      <span className="live-chat-label">Live Chat</span>
    </a>
  );
}
