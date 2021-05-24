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
    //User is able to join room

    socket.join('room')

     //Server is able to pick up message through sendMessage channel on the Client side
    socket.on('sendMessage', (text)=>{
        console.log(`Incoming text '${text}'.`)


        //Server side is able to send message back to Client through message channel
        let messageObj = {
            from: '',
            text: ''
        }

    chat.in('room').emit('message', messageObj)
    })

    }) 


    // socket.emit('message', ({from, text}))
    //that a user has entered a room through console.log <-Issues with username and room name

    // chat.adapter.on('join-room', (room, username)=>{
    //     console.log(`${username} has joined ${room}`)
    // })



    // Code goes here

