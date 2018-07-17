import express from 'express';
// import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';
const router = express.Router();

router.get('/status', (req, res) => {
  res.json({ message: 'OK' });
});

router.get('/callback', async (req, res) => {
  const { code } = req.query;
  const { CLIENT_ID, CLIENT_SECRET } = process.env;
  const redirectUrl = 'http://localhost:8095/api/callback';
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: redirectUrl
  });
  const user = await spotifyApi.authorizationCodeGrant(code)
  console.log(user);
  // const body = {
  //   grant_type: 'authorization_code',
  //   code,
  //   redirect_uri: redirectUrl,
  //   client_id: CLIENT_ID,
  //   client_secret: CLIENT_SECRET
  // };
  // console.log(body);
  // try {
  //   const response = await axios.post('https://accounts.spotify.com/api/token',
  //     body,
  //     {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       }
  //     });
  //   console.log(response);
  // } catch (err) {
  //   // console.log(err);
  // }
});

export default router;
// http%3A%2F%2Flocalhost%3A8095%2Fapi%2Fcallback
// https://accounts.spotify.com/en/authorize?client_id=afdf5f70fca34efcae1f224b68728aa2&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8095%2Fapi%2Fcallback&scope=user-read-private%20user-read-email
