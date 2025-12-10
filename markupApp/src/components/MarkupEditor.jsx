import React, { useState, useEffect, useRef } from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw, RichUtils } from 'draft-js';
import { markdownToDraft, draftToMarkdown } from 'markdown-draft-js';
import './MarkupEditor.css';

export function MarkupEditor({ markdownSource, fileName, onBack, onContentChange }) {
  const [markdown, setMarkdown] = useState(markdownSource || '');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const isTypingRef = useRef(false);
  const textareaRef = useRef(null); 
  const cursorRef = useRef(null);

  // --- SAVE FUNCTION ---
  const handleSave = async () => {
    if (window.electronAPI) {
      const result = await window.electronAPI.saveFile({ 
        content: markdown, 
        defaultName: fileName 
      });
      if (result.success) alert(`Saved to: ${result.path}`);
    } else {
      alert('Save requires Electron.');
    }
  };

  // --- SYNC LOGIC (Keep exactly as before) ---
  useEffect(() => {
    if (isTypingRef.current) return;
    const timer = setTimeout(() => {
      const rawData = markdownToDraft(markdown);
      const contentState = convertFromRaw(rawData);
      setEditorState(EditorState.createWithContent(contentState));
    }, 200);
    return () => clearTimeout(timer);
  }, [markdown]);

  useEffect(() => {
    if (onContentChange) onContentChange(markdown);
  }, [markdown, onContentChange]);

  const handleDraftChange = (newEditorState) => {
    isTypingRef.current = true;
    setEditorState(newEditorState);
    const newMarkdown = draftToMarkdown(convertToRaw(newEditorState.getCurrentContent()));
    setMarkdown(newMarkdown);
    setTimeout(() => { isTypingRef.current = false; }, 500);
  };

  const toggleBlockType = (e, blockType) => {
    e.preventDefault();
    isTypingRef.current = true;

    const newState = RichUtils.toggleBlockType(editorState, blockType);
    handleDraftChange(newState);

    setTimeout(() => { isTypingRef.current = false; }, 500);
  };

  const toggleInlineStyle = (e, style) => {
    e.preventDefault();
    isTypingRef.current = true;
    const newState = RichUtils.toggleInlineStyle(editorState, style);
    handleDraftChange(newState);
    setTimeout(() => { isTypingRef.current = false; }, 500);
  };

  const StyleButton = ({ label, style }) => {
    const currentStyle = editorState.getCurrentInlineStyle();
    const isActive = currentStyle.has(style);
    return (
      <button
        className={`style-button ${isActive ? 'active' : ''}`}
        onMouseDown={(e) => toggleInlineStyle(e, style)}
      >
        {label}
      </button>
    );
  };

  const BlockButton = ({ label, blockType, className }) => {
    const selection = editorState.getSelection();
    const blockTypeCurrent = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
      
    const isActive = blockTypeCurrent === blockType;

    return (
      <button
        className={`style-button ${className || ''} ${isActive ? 'active' : ''}`}
        onMouseDown={(e) => toggleBlockType(e, blockType)}
      >
        {label}
      </button>
    );
  };

  const handleTextareaChange = (e) => {
    cursorRef.current = e.target.selectionStart;
    setMarkdown(e.target.value);
  };

  useEffect(() => {
    if (textareaRef.current && cursorRef.current !== null) {
      if (document.activeElement === textareaRef.current) {
        textareaRef.current.setSelectionRange(cursorRef.current, cursorRef.current);
      }
    }
  }, [markdown]);

  return (
    <div className="app-container">
      <div className="toolbar">
        <button onClick={onBack} className="back-button">⬅ Home</button>
        <h1>{fileName || 'Markup Editor'}</h1>
        <button onClick={handleSave} className="save-button">💾 Save</button>
      </div>

      <div className="split-screen-container">
        <textarea
          ref={textareaRef}
          className="raw-editor panel"
          value={markdown}
          onChange={handleTextareaChange}
        />

        <div className="preview-panel panel">
          <div className="editor-controls">
            <StyleButton label="B" style="BOLD" />
            <StyleButton label="I" style="ITALIC" />
            <StyleButton label="Code" style="CODE" />
            
            <div className="divider"></div>

            <BlockButton label="H1" blockType="header-one" className="header-btn" />
            <BlockButton label="H2" blockType="header-two" className="header-btn" />
            <BlockButton label="H3" blockType="header-three" className="header-btn" />
            
            <BlockButton label="P" blockType="unstyled" />
            
            <div className="divider"></div>
            
            <BlockButton label="UL" blockType="unordered-list-item" />
            <BlockButton label="OL" blockType="ordered-list-item" />
          </div>

          <Editor
            editorState={editorState}
            onChange={handleDraftChange}
            placeholder="Start writing..."
          />
        </div>
      </div>
    </div>
  );
}