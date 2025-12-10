import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { markdownToDraft, draftToMarkdown } from 'markdown-draft-js';
import './MarkupEditor.css'; // Assuming you have a CSS file for styling

export function MarkupEditor({ markdownSource }) {
  // 1. STATE MANAGEMENT
  const [markdown, setMarkdown] = useState(markdownSource || '');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // --- REFS ---
  // We use a ref to track if the update is coming from the Textarea or Draft.js
  const isTypingRef = useRef(false);

  // --- HANDLE SAVE ---
  const handleSave = async () => {
    if (window.electronAPI) {
      const result = await window.electronAPI.saveFile(markdown);
      if (result.success) {
        alert(`File saved successfully to: ${result.path}`);
      } else if (!result.cancelled) {
        alert(`Error saving file: ${result.error}`);
      }
    } else {
      alert('Save feature requires the Electron desktop app.');
    }
  };

  // --- CONVERSION LOGIC ---

  // 2. MARKDOWN -> DRAFT.JS (With DEBOUNCE)
  // This logic now waits for you to stop typing for 200ms before running
  useEffect(() => {
    // If we are currently typing in the Draft.js side, don't overwrite it
    if (isTypingRef.current) return;

    const timer = setTimeout(() => {
      const rawData = markdownToDraft(markdown);
      const contentState = convertFromRaw(rawData);
      // Only update if content is actually different to prevent loops
      setEditorState(EditorState.createWithContent(contentState));
    }, 200); // <--- 200ms Delay

    return () => clearTimeout(timer); // Cleanup timer on every keystroke
  }, [markdown]);

  // 3. DRAFT.JS -> MARKDOWN
  const handleDraftChange = (newEditorState) => {
    // Set flag so the useEffect above knows NOT to re-sync while we are editing this side
    isTypingRef.current = true;
    
    setEditorState(newEditorState);
    const contentState = newEditorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const newMarkdown = draftToMarkdown(rawContentState);
    
    setMarkdown(newMarkdown);

    // Reset the flag after a short delay so 2-way sync resumes
    setTimeout(() => {
      isTypingRef.current = false;
    }, 500);
  };

  // 4. TEXTAREA HANDLER
  const handleTextareaChange = (e) => {
    // Just update the state. No heavy logic here.
    setMarkdown(e.target.value);
  };

  return (
    <div className="app-container">
      <div className="toolbar">
        <h1>Markup</h1>
        <button onClick={handleSave} className="save-button">
          💾 Save Document
        </button>
      </div>

      <div className="split-screen-container">
        {/* LEFT PANEL: RAW MARKDOWN EDITOR */}
        <textarea
          className="raw-editor"
          value={markdown}
          onChange={handleTextareaChange}
        />

        {/* RIGHT PANEL: DRAFT.JS PREVIEW (WYSIWYG) */}
        <div className="preview-panel">
          <Editor
            editorState={editorState}
            onChange={handleDraftChange}
            placeholder="Start writing or editing here..."
          />
        </div>
      </div>
    </div>
  );
}