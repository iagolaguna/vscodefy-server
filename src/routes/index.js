import express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';

const router = express.Router();

const redirectUrl = 'https://vscodefy.netlify.app';

router.get('/status', (req, res) => {
  res.json({ message: 'OK' });
});

router.get('/authorize', async (req, res, next) => {
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

    next(err)
  }
});

router.get('/refreshToken', async (req, res, next) => {
  const { refreshToken } = req.query;
  if (!refreshToken) {
    return next({ httpErrorCode: 400, message: 'invalid refreshToken' })
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
    next(err)
  }
})

export default router;
