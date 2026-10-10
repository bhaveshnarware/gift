import React from 'react';
import { Settings } from 'lucide-react';

export default function ProgressBar({ currentPage, totalPages = 8, onSelectPage, onOpenSettings }) {
  const pageTitles = [
    "Introduction",
    "Birthday Reveal",
    "Birthday Cake",
    "Pop the Balloons",
    "Memory Lane",
    "Personal Letter",
    "Celebration",
    "Surprise Gift"
  ];

  return (
    <>
      <nav className="nav-indicators" aria-label="Surprise story navigation">
        {Array.from({ length: totalPages }).map((_, idx) => {
          const pageNum = idx + 1;
          const isActive = currentPage === pageNum;
          return (
            <button
              key={pageNum}
              onClick={() => onSelectPage(pageNum)}
              className={`nav-dot ${isActive ? 'active' : ''}`}
              title={`Page ${pageNum}: ${pageTitles[idx]}`}
              aria-label={`Go to ${pageTitles[idx]}`}
              aria-current={isActive ? 'page' : undefined}
              style={{
                border: 'none',
                outline: 'none',
                padding: 0,
                cursor: 'pointer'
              }}
            />
          );
        })}
      </nav>

      {/* Floating Personalize / Settings icon at top left */}
      <button
        onClick={onOpenSettings}
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 1100,
          background: 'rgba(35, 12, 45, 0.65)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(16px)',
          color: '#ffd166',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
        }}
        aria-label="Personalize names and details"
        title="Personalize details (Name, Age, etc.)"
      >
        <Settings size={18} />
      </button>
    </>
  );
}
