// Initialize Express
const express = require('express')
const { Server } = require('ws')
const app = express()

// Setup the HTTP Server
const port = 3000
const http = app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
})

// Upgrade the HTTP connection to Websockets and set CORS
const io = require('socket.io')(http, {
    cors: { origin: "*" }
})

// Creates a namespace for our chat app.
// The namespace allows us to keep all websocket traffic limited to this
//  specific route versus taking the root namespace, aka '/'.
const chat = io.of('/chat')

// Listening for the Chat to connect with a user
chat.on('connection', (socket) => {
    // Code goes here
})
