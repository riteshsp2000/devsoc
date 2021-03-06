const btnPick = document.querySelector('.btn-pick-float')
btnPick.addEventListener('click',check)

// Duplicate tab solution
let clear = false
let loadCount = sessionStorage.getItem('load')
if (loadCount === null) loadCount = 0
else loadCount++
sessionStorage.setItem('load',loadCount)
let unloadCount = sessionStorage.getItem('unload')
if (unloadCount === null) unloadCount = 0
else unloadCount = parseInt(unloadCount)

window.addEventListener('beforeunload',() => {
  if (clear) {
    sessionStorage.removeItem('load')
    sessionStorage.removeItem('unload')
    return
  }
  sessionStorage.setItem('unload',unloadCount + 1)
})

let flagPick = false
if (loadCount === unloadCount) verifyPage()

function check() {
  const btnPick = document.querySelector('.btn-pick-float')

  if (window.location.href.includes('soundcloud.com')) {
    if (!document.querySelectorAll('.m-visible')[0]) {
      btnPick.disabled = true
      return void soundcloudInfo(btnPick)
    }
    window.pageSelected({ brand: 'soundcloud' })
    sessionStorage.setItem('lmptm','soundcloud')
    soundcloud(btnPick)
    clear = true

  } else if (window.location.href.includes('open.spotify.com')) {
    if (!document.querySelectorAll('.now-playing .cover-art-image')[0]) {
      btnPick.disabled = true
      return void spotifyInfo(btnPick)
    }
    window.pageSelected({ brand: 'spotify' })
    sessionStorage.setItem('lmptm','spotify')
    spotify(btnPick)
    clear = true

  } else if (window.location.href.includes('www.youtube.com')) {
    if (!window.location.href.includes('/watch')) {
      btnPick.disabled = true
      return void youtubeInfo(btnPick)
    }
    window.pageSelected({ brand: 'youtube' })
    sessionStorage.setItem('lmptm','youtube')
    youtube(btnPick)
    clear = true

  } else if (window.location.href.includes('music.youtube.com')) {
    const e = 'ytmusic-app-layout[player-visible_] > [slot=player-bar]'
    if (!document.querySelectorAll(e)[0]) {
      btnPick.disabled = true
      return void ytmusicInfo(btnPick)
    }
    window.pageSelected({ brand: 'ytmusic' })
    sessionStorage.setItem('lmptm','ytmusic')
    youtube(btnPick)
    clear = true

  } else {
    btnPick.className = 'btn-pick-float error'
    btnPick.innerHTML = '<i class="fas fa-times-circle"></i> Nevermind! ????'
    btnPick.disabled = true
    btnTimeoutReset(btnPick)
  }
}

function verifyPage() {
  const data = sessionStorage.getItem('lmptm')
  if (!data) return
  if (data === 'spotify' && window.location.href.includes('open.spotify.com')) spotify(btnPick)
  else if (data === 'soundcloud' && window.location.href.includes('soundcloud.com')) soundcloud(btnPick)
  else if (data === 'youtube' && window.location.href.includes('www.youtube.com/watch')) youtube(btnPick)
  else if (data === 'ytmusic' && window.location.href.includes('music.youtube.com/watch')) ytmusic(btnPick)
  else reset()
}

function soundcloud(btnPick) {
  btnPick.className = 'btn-pick-float soundcloud'
  btnPick.innerHTML = '<span class="souncloud"></span>'
}

function spotify(btnPick) {
  btnPick.className = 'btn-pick-float spotify'
  btnPick.innerHTML = '<span class="spotify"></span>'
}

function youtube(btnPick) {
  btnPick.className = 'btn-pick-float youtube'
  btnPick.innerHTML = '<span class="youtube"></span>'
}

function soundcloudInfo(btnPick) {
  btnPick.className = 'btn-pick-float soundcloud-info'
  btnPick.innerHTML = 'Please pick a song ????'
  btnTimeoutReset(btnPick)
}

function spotifyInfo(btnPick) {
  btnPick.className = 'btn-pick-float spotify-info'
  btnPick.innerHTML = 'Please log in and make sure the playing queue is not empty! ????'
  btnTimeoutReset(btnPick)
}

function youtubeInfo(btnPick) {
  btnPick.className = 'btn-pick-float youtube-info'
  btnPick.innerHTML = 'Please pick a video! ????'
  btnTimeoutReset(btnPick)
}

function ytmusicInfo(btnPick) {
  btnPick.className = 'btn-pick-float ytmusic-info'
  btnPick.innerHTML = 'Please make sure the playing queue is not empty! ????'
  btnTimeoutReset(btnPick)
}

function spotifyAction(action) {
  switch (action) {
    case 'play':
    case 'pause':
      (document.querySelector(".spoticon-play-16") || document.querySelector(".spoticon-pause-16")).click()
      break
    case 'skip':
      document.querySelector('.spoticon-skip-forward-16').click()
      break
    case 'back':
      document.querySelector('.spoticon-skip-back-16').click()
      break
  }
}

function btnTimeoutReset(btnPick) {
  setTimeout(() => {
    btnPick.innerHTML = '?????? Pick?'
    btnPick.className = 'btn-pick-float'
    btnPick.disabled = false
  },3000)
}

function reset() {
  const btnPick = document.querySelector('.btn-pick-float')
  btnPick.innerHTML = '?????? Pick?'
  btnPick.className = 'btn-pick-float'
  sessionStorage.removeItem('lmptm')
}