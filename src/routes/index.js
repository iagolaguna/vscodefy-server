import os from 'os';
import express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';

const router = express.Router();

const redirectUrl = 'https://vscodefy.netlify.com';

router.get('/status', (req, res) => {
  console.log(os.hostname());
  console.log(process.env.host);
  res.json({ message: 'OK', hostname: os.hostname(), host: process.env.host });
});

router.get('/spotify', (req, res) => {
  const { CLIENT_ID } = process.env;
  const scope = [
    'user-modify-playback-state',
    'user-read-playback-state',
    'user-read-private',
    'user-read-email',
    'user-read-currently-playing',
    'streaming'
  ];
  const baseURL = 'https://accounts.spotify.com/en/authorize';
  const url = `${baseURL}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}`;
  console.log(url);

  res.redirect(`${url}&scope=${scope.join(',')}`);
});

router.get('/authorize', async (req, res) => {
  const { code } = req.query;
  const { CLIENT_ID, CLIENT_SECRET } = process.env;
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: redirectUrl
  });
  try {
    const { body } = await spotifyApi.authorizationCodeGrant(code)
    res.json(body);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/refreshToken', async (req, res) => {
  const { refreshToken } = req.query;
  if (!refreshToken) {
    res.status(400).json({ message: 'invalid refreshToken' });
  }
  console.log(refreshToken);
  const { CLIENT_ID, CLIENT_SECRET } = process.env;

  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken
  });
  try {
    const { body } = await spotifyApi.refreshAccessToken()
    console.log(body);
    res.json(body);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})
export default router;
