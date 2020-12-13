const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.port || 3000;


const { auth } = require('express-openid-connect');
app.use(
    auth({
        authRequired: false,
        auth0Logout: true,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        secret: process.env.SECRET,
    })
);

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', (req, res) => {
    const name = req.oidc.user.name;
    const email = req.oidc.user.email;
    let accessToken = req.oidc.id_Token;
    console.log(accessToken);
    // const name = req.oidc.user.name;
    // const name = req.oidc.user.name;

    res.json(req.oidc.user);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});