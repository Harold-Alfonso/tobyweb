const socket = io('/')
const peer = new Peer({
  config: {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302' // STUN server
      },
    ]
  }
});
let myVideoStream
let myId
const videoGrid = document.getElementById('videoDiv')
const myVideo = document.createElement('video')
myVideo.muted = true
const peerConnections = {}


console.log('Room ID from script:', roomID);

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream
    addVideo(myVideo, stream)
    
    peer.on('call', (call) => {
      call.answer(stream)
      const vid = document.createElement('video')
      call.on('stream', (userStream) => {
        addVideo(vid, userStream)
      })
      call.on('close', () => {
        vid.remove()
      })
      peerConnections[call.peer] = call
    })
  })
  .catch((err) => {
    alert(err.message)
  })

peer.on('open', (id) => {
  myId = id
  console.log('My ID:', myId); 
  socket.emit('newUser', id, roomID) 
})

peer.on('error', (err) => {
  alert(err.type)
})

socket.on('userJoined', (id) => {
  if (id !== myId) { 
    const call = peer.call(id, myVideoStream)
    const vid = document.createElement('video')
    call.on('stream', (userStream) => {
      addVideo(vid, userStream)
    })
    call.on('close', () => {
      vid.remove()
    })
    peerConnections[id] = call
  }
})

socket.on('userDisconnect', (id) => {
  if (peerConnections[id]) {
    peerConnections[id].close()
    delete peerConnections[id]
  }
})

function addVideo(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}
