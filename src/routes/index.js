import express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';

const router = express.Router();

const redirectUrl = 'https://vscodefy.netlify.com';

router.get('/status', (req, res) => {
  res.json({ message: 'OK'});
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
  const { CLIENT_ID, CLIENT_SECRET } = process.env;

  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken
  });
  try {
    const { body } = await spotifyApi.refreshAccessToken()
    res.json(body);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

export default router;
