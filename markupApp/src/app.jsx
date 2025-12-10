import React, { useState, useCallback } from 'react';
import { MarkupEditor } from './components/MarkupEditor';
import { StartScreen } from './StartScreen'; 
import './app.css';

function App() {
  // Start with no active files, show start screen
  const [files, setFiles] = useState([]);
  const [activeFileId, setActiveFileId] = useState(null);

  const activeFile = files.find(f => f.id === activeFileId);

// New File
  const handleCreateNew = () => {
    const newFile = {
      id: Date.now(),
      name: `Untitled-${files.length + 1}.md`,
      content: '# New Document\n\nStart typing...'
    };
    setFiles([...files, newFile]);
    setActiveFileId(newFile.id); 
  };

  // Import File
  const handleImport = async () => {
    if (window.electronAPI) {
      const result = await window.electronAPI.openFile();
      if (result.success) {
        const existing = files.find(f => f.path === result.filePath);
        if (existing) {
          setActiveFileId(existing.id);
          return;
        }

        const newFile = {
          id: Date.now(),
          name: result.filePath.split(/[/\\]/).pop(), 
          content: result.content,
          path: result.filePath
        };
        setFiles([...files, newFile]);
        setActiveFileId(newFile.id);
      }
    } else {
      alert('Import requires the Electron desktop app.');
    }
  };

  const updateActiveFileContent = useCallback((newContent) => {
    setFiles(prevFiles => prevFiles.map(f => 
      f.id === activeFileId ? { ...f, content: newContent } : f
    ));
  }, [activeFileId]);

  // Go Home
  const handleBackToHome = () => {
    setActiveFileId(null);
  };

  // If no file, go to Start Screen
  if (!activeFileId) {
    return (
      <StartScreen 
        onCreateNew={handleCreateNew} 
        onImport={handleImport} 
      />
    );
  }

  return (
    <div className="App main-layout">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>MY FILES</h2>
        </div>
        
        <div className="file-list">
          {files.map(file => (
            <div 
              key={file.id}
              className={`file-item ${file.id === activeFileId ? 'active' : ''}`}
              onClick={() => setActiveFileId(file.id)}
            >
              📄 {file.name}
            </div>
          ))}
        </div>

        <div className="sidebar-actions">
          <button onClick={handleCreateNew}>+ New File</button>
          <button onClick={handleImport}>📂 Import</button>
        </div>
      </div>

      <div className="workspace">
        <MarkupEditor 
          key={activeFileId} 
          markdownSource={activeFile ? activeFile.content : ''}
          onBack={handleBackToHome}
          onContentChange={updateActiveFileContent}
        />
      </div>
    </div>
  ); 
}

export default App;