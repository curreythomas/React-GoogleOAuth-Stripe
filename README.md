# Express Server App w/ Google OAuth

### Usage: An easy to use server with google auth, ready to be wired up to any development app.

<img src="https://github.com/curreythomas/ExpressServer-Google-OAuth/blob/master/assets/nodejs-520.jpg?raw=true" width="350" height="250"><img src="https://github.com/curreythomas/ExpressServer-Google-OAuth/blob/master/assets/passportJS.png?raw=true" width="200" height="200"><img src="https://github.com/curreythomas/ExpressServer-Google-OAuth/blob/master/assets/mongoose.png?raw=true" width="300" height="250">

#### How to get setup:

1.  npm install
2.  create a folder -> config
3.  in the config folder create a file and name it keys.js
4.  in keys.js add this code

    > `module.exports = { googleClientID: '', googleClientSecret: '', mongoURI: '', cookieKey: 'WHATEVER_YOU_WANT_YOUR_COOKIE_TO_BE', };`

5.  create a [google cloud project](https://console.cloud.google.com) and give it a name.

    - in the menu go to APIs & Services -> OAuth Consent Screen; select external
    - give it an application name and save
    - on the left go to credentials; click create credentials at the top; select OAuth option
    - this is a web app so select web app
    - authorized javascript origins : http://localhost:5000
    - authorized redirect: http://localhost:5000/auth/google/callback
    - press create and then copy your clientID and clientSecret into the keys.js file

6.  create your [mongoDB](https://www.mongodb.com/cloud/atlas)

    - set up a cluster
    - name your cluster and create
    - after a minute your cluster will be up and you will click connect in the sandbox
    - click Add your current IP address
    - in the next section fill in a username and password (copy your password into keys.js) and click create mongoDB user button
    - then click choose a connection method and select connect your application
    - copy the connection string into keys.js and paste it into the mongoURI

7.  You're all set! Save your keys.js file. In your terminal run `npm run dev` and go to `http://localhost:5000/auth/google` to start the authentication flow. If you get "Cannot GET auth/google/callback" then it worked! check by going to `/api/current_user`
