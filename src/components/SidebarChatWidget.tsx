'use client';

import React from 'react';

const CHAT_URL = 'https://vm.providesupport.com/0hfjufu6eccq70z7w7kmktp1rf';

export default function SidebarChatWidget() {
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
    <div className="sidebar-chat-widget">
      <div className="sidebar-chat-header">
        <div className="sidebar-chat-avatar-wrapper">
          <div className="sidebar-chat-avatar">
            👩‍💼
          </div>
          <span className="sidebar-chat-online-badge" title="Online now" />
        </div>
        <div className="sidebar-chat-agent-info">
          <span className="sidebar-chat-status-text">Live Support Specialist</span>
          <h3 className="sidebar-chat-title">You can talk to Cathy</h3>
        </div>
      </div>

      <p className="sidebar-chat-desc">
        Need immediate help diagnosing this printer issue? Connect with Cathy for real-time troubleshooting steps.
      </p>

      <a
        href={CHAT_URL}
        onClick={openChat}
        target="_blank"
        rel="noopener noreferrer"
        className="sidebar-live-chat-btn"
        aria-label="Start Live Chat with Cathy"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          width="18"
          height="18"
          aria-hidden="true"
        >
          <path d="M12 2C6.477 2 2 6.03 2 11c0 2.87 1.5 5.43 3.85 7.03-.18 1.48-.82 3.01-1.85 4.12 1.95.12 3.9-.45 5.25-1.57.9.27 1.83.42 2.75.42 5.523 0 10-4.03 10-9s-4.477-9-10-9zm-3 8a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm3 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm3 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" />
        </svg>
        <span>Live Chat</span>
      </a>

      <div className="sidebar-chat-footer">
        <span className="sidebar-chat-pulse-indicator" />
        <span>Average response time: &lt; 1 min</span>
      </div>
    </div>
  );
}
