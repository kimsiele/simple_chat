var chatForm = document.getElementById('chat_form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const btn_leave = document.getElementById('btn_leave');

btn_leave.addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave this chat room?');
    if (leaveRoom) {
        window.location = '../index.html';
    } else {
        window.location.href;
    }
});


// getting username and room using qs library
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
var socket = io();

// joining the room
socket.emit("joiningRoom", { username, room });

// getting users and their rooms
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});


socket.on('message', message => {
    console.log(message);
    outputMessage(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;

});

// submiting the message
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // getting the message from message input field
    const msg = e.target.elements.msg.value;
    // Sending the message to  the server
    socket.emit("chatMessage", msg);

    // clearing the input after sending the message
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

});
const outputMessage = (message) => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta"><b>${message.username}</b> <span>${message.time}</span> </p>
    <p class="text-message">
        ${message.text_message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

function outputRoomName(room) {
    roomName.innerText = room;
}

function outputUsers(users) {
    userList.innerHTML = `
    ${users.map(user=>`<li>${user.username}</li>`).join('')}`;
}