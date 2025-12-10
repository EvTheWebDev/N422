// src/App.js

import React from 'react';
import { MarkupEditor } from './components/MarkupEditor'; // Adjust path if needed

function App() {
  const initialMarkdown = `## Welcome to Markup

Start typing in the box on the left, or edit the text on the right!

* This is a list item
* **Two-way** editing is enabled via Draft.js and markdown-draft-js.`;

  return (
    <div className="App">
      {/* RENDER THE CORE EDITOR COMPONENT */}
      <MarkupEditor markdownSource={initialMarkdown} />
      
      {/* You'll also need a src/index.js file to mount the <App /> component */}
    </div>
  );
}

export default App;