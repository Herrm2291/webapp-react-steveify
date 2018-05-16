const clientID = '7d94a5e1cace40a68652e53a5f195f6f';
const redirectURI = 'http://localhost:3000/';
let userAccessToken = '';
let urlAccessToken = '/access_token=([^&]*)/';
let urlExpiresIn = '/expires_in=([^&]*)/';

const Spotify = {
  getAccessToken() {
    if (userAccessToken) {
      return userAccessToken;
    };

    const currentURL = window.location.href;
    let urlAccessTokenMatch = currentURL.match(urlAccessToken);
    let urlExpiresInMatch = currentURL.match(urlExpiresIn);

    if (userAccessToken && urlExpiresIn) {
      userAccessToken = urlAccessTokenMatch[1];
      const expiresIn = urlExpiresInMatch[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return userAccessToken;
    } else {
      window.location.replace(`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`)
    };
  }
};

export default Spotify;

