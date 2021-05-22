// Creates a connection to the Websocket server
const socket = io('ws://localhost:3000/chat', { autoConnect: false })
const submitMessage = document.getElementById('submit-message')
let username

// Listens for for username
document.getElementById('submit-username').onclick = (event) => {
    // Stores the input value in text variable.
    username = document.getElementById('username').value
    const room = document.getElementById('room').value

    // Creates username on the websocket auth
    // socket.auth = { username } // uncomment if you want to try this option.

    // Connects to the websocket server
    socket.connect()

    // Joins the room specified
    socket.emit('join', room)

    event.currentTarget.parentElement.classList.add('hidden')
    submitMessage.parentElement.classList.remove('hidden')
}

// Sends messages
submitMessage.onclick = () => {
    // Stores the input value in text variable.
    const text = document.getElementById('message').value

    // Pushes the text to the websocket connection on the channel 'sendMessage'
    socket.emit('sendMessage', text)
}

// Listens for incoming events on the 'message' channel.
socket.on('message', ({ from, text }) => {
    // Pushes the received message to the DOM.
    const el = document.createElement('li')
    el.innerHTML = from + ': ' + text
    document.getElementById('messages').appendChild(el)
})

// This is optional
// Updates the ui with the roster of users in the room.
socket.on('roster', (roster) => {
    const participants = document.getElementById('participants')
    participants.innerHTML = ''

    console.log(roster)

    // Pushes the received message to the DOM.
    roster.sort().forEach(user => {
        const el = document.createElement('li')
        el.innerHTML = user
        document.getElementById('participants').appendChild(el)
    })
})
