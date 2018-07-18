import express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';

const router = express.Router();

const redirectUrl = 'http://localhost:8095/api/callback';

router.get('/status', (req, res) => {
  res.json({ message: 'OK' });
});

router.get('/spotify', (req, res) => {
  const { CLIENT_ID } = process.env;
  const scope = [
    'user-read-private',
    'user-read-email',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming'
  ];
  const baseURL = 'https://accounts.spotify.com/en/authorize';
  const url = `${baseURL}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}`;
  console.log(url);

  res.redirect(`${url}&scope=${scope.join(',')}`);
});

router.get('/callback', async (req, res) => {
  const { code } = req.query;
  const { CLIENT_ID, CLIENT_SECRET } = process.env;
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: redirectUrl
  });

  const { body } = await spotifyApi.authorizationCodeGrant(code)
  res.json(body);
});

export default router;
