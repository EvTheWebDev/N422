import React from 'react';
import './StartScreen.css'; 

export function StartScreen({ onCreateNew, onImport }) {
  return (
    <div className="start-screen">
      <div className="card">
        <h1>Welcome to Markup</h1>
        <p className="subtitle">A Markdown Editor For N422's Final Project.</p>
        
        <div className="button-group">
          <button className="btn-primary" onClick={onCreateNew}>
            📝 Create New File
          </button>
          
          <div className="divider">OR</div>
          
          <button className="btn-secondary" onClick={onImport}>
            📂 Import .md File
          </button>
        </div>
      </div>
    </div>
  );
}