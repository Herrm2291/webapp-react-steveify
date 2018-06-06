const clientID = process.env.REACT_APP_CLIENTID; /* clientID provided by the Spotify dashboard and stored in the .env file */
const redirectURI = 'http://localhost:3000/'; /* Redirect URI added to the Spotify application settings */
let accessToken; /* Empty variable to hold the user's access token */

/* Object used to send a request to Spotify for info and in return receive some JSON data */
const Spotify = {
	/* Check if the user's access token is already set and if it is, return the value saved to accessToken */
	getAccessToken() {
		if (accessToken) {
			return accessToken;
		}

		/* Variable used to store the access token using a regular expression that matches any text in the URL after 'access_token=' but before the first & sign */
		const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
		/* Variable used to store the token expiration time using a regular expression that matches any text in the URL after 'expires_in=' but before the first & sign */
		const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

		if (accessTokenMatch && expiresInMatch) {
			/* Setting accessToken equal to the access_token in the URL string */
			accessToken = accessTokenMatch[1];
			/* Setting expiresIn equal to the expires_in in the URL string, converted from a string to a number */
			const expiresIn = Number(expiresInMatch[1]);
			/* Adding a timeout to the page that will clear accessToken when the page expires */
			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			/* Clears the browsers authorization header */
			window.history.pushState('Access Token', null, '/');
			return accessToken;
		} else {
			/* Variable created to store the interpolated URL containing the clientID and redirectURI */
			const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
			/* Setting the current window URL to the interpolated accessURL */
			window.location = accessUrl;
		}
	},

	/* search returns a promise that will eventually resovle to the list of tracks from the search */
	search(term) {
		const accessToken = Spotify.getAccessToken();
    /* GET request to the following interpolated Spotify endpoint with the value saved to the search term argument
    The headers argument includes the Authorization property with the users access token  */
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
			/* The returned fetch response is being converted to JSON and if that JSON doesn't have a key "tracks" then it returns an empty array */
		}).then(response => {
			return response.json();
		}).then(jsonResponse => {
			if (!jsonResponse.tracks) {
				return [];
			}
			/* If there is a key "tracks" the map function will iterate through its array and assign the key/value pairs below */
			return jsonResponse.tracks.items.map(track => ({
				id: track.id,
				name: track.name,
				artist: track.artists[0].name,
				album: track.album.name,
				uri: track.uri
			}));
		});
	},

	getUserId(headers) {

		let userID;

		/* GET request that aquires the users id */

		return fetch('https://api.spotify.com/v1/me', {

			headers

		}).then(response => {

			return response.json();

		}).then(jsonResponse => {

			userID = jsonResponse.id;

			return userID;

		})

	},

	getPlaylistId(userID, headers, playlistName) {

		let playlistID;

		/* POST that adds a new playlist with the input name to the current users Spotify account and receives the playlist id back from the request */

		return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {

			headers: headers,

			method: 'POST',

			body: JSON.stringify({ name: playlistName })

		}).then(response => {

			return response.json();

		}).then(jsonResponse => {

			/* POST that adds the track URIs to the newly-created playlist, referencing the current user's account id and the new playlist id */

			playlistID = jsonResponse.id;

			return playlistID;

		})
	},

	/* savePlaylist checks to see if there are values saved to the playlistName and trackURIs arguments */

	async savePlaylist(playlistName, trackURIs) {

		let accessToken = Spotify.getAccessToken();

		const headers = { Authorization: `Bearer ${accessToken}` };

		if (!playlistName && !trackURIs.length) {

			return;

		}

		let userID = await Spotify.getUserId(headers);

		let playlistID = await Spotify.getPlaylistId(userID, headers, playlistName);

		return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {

			headers: headers,

			method: 'POST',

			body: JSON.stringify({ uris: trackURIs })

		})
	}
}

export default Spotify;

