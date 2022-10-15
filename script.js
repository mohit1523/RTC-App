const socket = io('http://localhost:3000');

const msgContainer = document.getElementById("message-container");
const inputMsg = document.getElementById("input-message");
const sendBtn = document.getElementById("send-button");
const msgForm = document.querySelector("form");

const userName = prompt("Enter Your Name " , `Person${Math.floor(Math.random() * 1000)}`).toUpperCase();

socket.emit('user-connected' , userName);

socket.on('new-user' , (Name) => {
    apppendMessage(`<div class="userCon">${Name} Connected</div>`, 'center')
})

msgForm.addEventListener('submit' , (e) => {
    e.preventDefault();
    let msg = inputMsg.value;
    apppendMessage(`<span class="title">You : </span><span class="mes">${msg}</span>` , 'right');
    socket.emit('new-message' , {name : userName , message : msg});
    inputMsg.value = '';
    //Code for emoji opacity after send button click
    emojiDiv.style.opacity = 0;
    emojiDiv.style.pointerEvents = "none";
})

socket.on('new-msg' , (obJ) => {
    apppendMessage(`<span class="title">${obJ.name} : </span> <span class="mes">${obJ.message}</span>` , 'left')
})

socket.on('user-disconnected' , (userN) => {
    apppendMessage(`<div class="userCon">${userN} Disconnected</div>` , 'center');
})


const apppendMessage = (message , pos) => {
    let msgElement = document.createElement("div");
    msgElement.classList.add(pos);
    msgElement.innerHTML = message;
    msgContainer.append(msgElement);
}

//Code for Emoji Section

const emojiBut = document.querySelector('.emoji');
const emojiDiv = document.getElementById('emoji-section');

emojiBut.addEventListener('click' , () => {
    let opacityEmoji = window.getComputedStyle(emojiDiv).getPropertyValue('opacity');
    if(opacityEmoji === '0'){
        emojiDiv.style.opacity = 1;
        emojiDiv.style.pointerEvents = "all";
    }
    else{
        emojiDiv.style.opacity = 0;
        emojiDiv.style.pointerEvents = "none";
    }
})

for (let i = 129296; i < 129386; i++) {
    let emo = document.createElement('div');
    let temp = `&#${i};`;
    emo.classList.add('emoS');
    emo.innerHTML = temp;
    emo.addEventListener('click' , () => {
        inputMsg.value += temp + " "; 
    })
    emojiDiv.append(emo);
}

