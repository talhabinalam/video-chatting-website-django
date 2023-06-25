const APP_ID = '27fb65757aa6447caff3db739cf3fd2e'
const CHANNEL = 'main'
const TOKEN = '007eJxTYEhk15JUvxchVBkkWfrnl+JqL+9TeYJirpKrg/L/+YkYLlZgMDJPSzIzNTc1T0w0MzExT05MSzNOSTI3tkxOM05LMUqNkJ+R0hDIyCBsfY+VkQECQXwWhtzEzDwGBgAjlRu8'
let UID;

const client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {
    client.on('user-published', handleUserJoined)


    UID = await client.join(APP_ID, CHANNEL, TOKEN, null)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = `<div class="video-container" id="user-container-${UID}">
                    <div class="username-wrapper"><span class="user-name">My Name:</span></div>
                    <div class="video-player" id="user-${UID}"></div>
                </div>`
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${UID}`)

    await client.publish([localTracks[0], localTracks[1]])
}

let handleUserJoined = async (user, mediaType) => {
    remoteUsers[user.uid] = user
    await client.subscribe(user, mediaType)

    if(mediaType == 'video'){
        let player = document.getElementById(`user-container-${user.uid}`)
    }
}

joinAndDisplayLocalStream()