const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages');
const socket = io();
socket.on('message',(message)=>{
 console.log(message);
 outputMessage(message);

 
});

chatForm.addEventListener('submit',e=>{
    e.preventDefault();
    // get message text
    const msg = e.target.elements.msg.value;
   socket.emit('chatMessage',msg);

   //scrol Down
 chatMessage.scrollTop=chatMessage.scrollHeight;
 // clear input
 e.target.elements.msg.value='';
 e.target.elements.msg.focus();
}); 

// output message dom

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML =`<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
    ${message}</p>
    `;
    document.querySelector('.chat-messages').appendChild(div);
}