// Step 1: Import the WebSocket library
// 'require' is a Node.js function to include other libraries or modules in your code
// 'ws' is a library that lets us create WebSocket servers and clients
// WebSocket is a protocol for real-time communication between a client (browser) and a server
const WebSocket = require('ws')

// Step 2: Create a WebSocket server
// 'new WebSocket.Server({ port: 8080 })' creates a server that listens on port 8080
// A port is like a door through which data enters and leaves the computer
// So, port 8080 is the "door" for our chat messages to come in and go out
const wss = new WebSocket.Server({ port: 8080 })

// Step 3: Inform us that the server is running
// 'console.log' prints messages to the terminal
// This is useful so we know that our server has started successfully
console.log('WebSocket server running on ws://localhost:8080')

// Step 4: Handle new client connections
// 'wss.on("connection", callback)' waits for a new client to connect
// Every time a new client (a browser tab or another user) connects, this callback runs
// 'ws' represents that specific client connection
wss.on('connection', (ws) => {
  // Let’s print that a client has connected
  console.log('Client connected')

  // Step 5: Listen for messages from this client
  // 'ws.on("message", callback)' is triggered whenever this client sends a message
  // 'message' is the data that the client sent
  ws.on('message', (message) => {
    // Print the received message to the terminal for monitoring
    console.log(`Received: ${message}`)

    // Step 6: Send this message to all other connected clients
    // 'wss.clients' is a list of all connected clients
    wss.clients.forEach((client) => {
      // Only send the message if the client connection is still open
      // 'WebSocket.OPEN' is a constant that means the client is ready to receive messages
      if (client.readyState === WebSocket.OPEN) {
        // Send the message to the client
        // 'message.toString()' ensures that the message is sent as a readable string
        client.send(message.toString())
      }
    })
  })

  // Step 7: Handle client disconnection
  // 'ws.on("close", callback)' is triggered when this client disconnects (closes the browser or loses connection)
  ws.on('close', () => console.log('Client disconnected'))
})
