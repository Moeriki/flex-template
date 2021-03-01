import React, { ReactNode } from 'react';

import './page-layout.css';

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <React.StrictMode>
      <ViteAntiFlicker>
        <div className="app-layout">
          <div className="app-sidebar">
            <div className="app-logo">
              <a href="/">
                <img src="/assets/logo.svg" height={30} />
              </a>
            </div>
            <a className="app-link" href="/">
              Home
            </a>
            <a className="app-link" href="/about">
              About
            </a>
          </div>
          <div
            style={{
              color: 'white',
              padding: 20,
              paddingBottom: 50,
              borderLeft: '2px solid #eee',
              minHeight: '100vh',
            }}
          >
            {children}
          </div>
        </div>
      </ViteAntiFlicker>
    </React.StrictMode>
  );
}

// In development Vite loads the CSS dynamically leading to a flickering effect.
// The <ViteAntiFlicker> component removes the flickering.
function ViteAntiFlicker({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'none' }} className="vite-anti-flicker">
      {children}
    </div>
  );
}
