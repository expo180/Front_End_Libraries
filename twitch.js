const streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function createStreamerCard(name, status, game) {
  const streamerDiv = document.createElement('div');
  streamerDiv.className = 'streamer';
  
  const logoImg = document.createElement('img');
  logoImg.className = 'logo';
  logoImg.src = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${name.toLowerCase()}-50x50.jpg`;
  
  const statusLink = document.createElement('a');
  statusLink.href = `https://www.twitch.tv/${name}`;
  statusLink.target = '_blank';
  statusLink.rel = 'noopener noreferrer';
  statusLink.textContent = status;
  statusLink.className = 'status';
  
  const gameText = document.createElement('div');
  gameText.className = 'game';
  gameText.textContent = game;
  
  streamerDiv.appendChild(logoImg);
  streamerDiv.appendChild(statusLink);
  streamerDiv.appendChild(gameText);
  
  return streamerDiv;
}

function fetchStreamerData() {
  const proxyUrl = 'https://twitch-proxy.freecodecamp.rocks/helix/';
  
  streamers.forEach(streamer => {
    fetch(`${proxyUrl}streams?user_login=${streamer}`)
      .then(response => response.json())
      .then(data => {
        const { data: stream } = data;
        const streamerCard = createStreamerCard(streamer, '', '');
        
        if (stream.length > 0) {
          streamerCard.querySelector('.status').textContent = 'Streaming: ' + stream[0].title;
          streamerCard.querySelector('.game').textContent = 'Playing: ' + stream[0].game_name;
        } else {
          streamerCard.querySelector('.status').textContent = 'Offline';
        }
        
        document.getElementById('streamers').appendChild(streamerCard);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
}

fetchStreamerData();

