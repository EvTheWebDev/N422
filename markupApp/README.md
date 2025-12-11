# Markup: A In-depth Markdown Editor

## Purpose
This app serves to allow devs to learn the ropes of Markdown, quickly preview and edit their file, and export their file for their projects.

## Pain Points
Sometimes I feel like I'm *still* finding out new things about Markdown, and different text styles I can apply in my files. For example, did you know you can <span style="color: red">Use inline styling *IN YOUR FILE?* </span>

Crazy, right? Shouldn't there be a place where you can LEARN some of the basic Markdown syntax in a more familiar format?

## Features
* Bidirectional Sync:
    * Real-time synchronization between a raw Markdown editor and a rich-text preview. Typing in one panel instantly updates the other.
* Rich Text Toolbar: 
    * A formatting toolbar allowing users to apply Bold, Italic, Monospace, Headers (H1-H3), and Lists (Ordered/Unordered) with a single click.
* Multi-File Management:
    * A sidebar "File Explorer" that allows users to create new files, switch between multiple active documents, and import existing files.
* Keyboard Shortcuts:
    * Support for standard shortcuts like Cmd/Ctrl + B (Bold) and Cmd/Ctrl + I (Italic).
* File Persistence & File Management: 
    * Handle multiple files at once, being able to import and export files to and from your PC.

## Design Choices

I chose to incorporate a sleek, minimalist design for my app. The color palette is very streamlined, and everything feels simple. I was hoping to achieve the look of older web programs, but with modern design choices. However, when custom themes are integrated, I want to give users full control over all the elements on the site. This, in turn, will allow *me* to have more complicated styling.

## Starting the Project
1. Clone the Repository & navigate to the markupApp folder
2. Install dependencies with `npm install` (NOTE: Node.js needs to be installed for this project)
3. Start the project with `npm start` or by clicking the `start` script on the package.json file.
4. To build the app for production as a .exe or .dmg (Mac), run `npm run make` or click the `make` script in package.json.
## Tech Stack
* [Electron.js](https://www.electronjs.org/)
* [React.js](https://react.dev/)
* [Draft.js](https://draftjs.org/)
* [Marked.js](https://marked.js.org/)

## What's Next?

Up next, I want to:
*  Add custom styles for users
* Make user accounts
* Add Filesharing
* Add more Markdown features to the preview side of the app.
---------------
# Thanks For Reading!

### -[Ev The Dev](evtheweb.dev)