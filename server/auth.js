const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user");
const socketManager = require("./server-socket");

// create a new OAuth client used to verify google sign-in
//    TODO: replace with your own CLIENT_ID
const CLIENT_ID = "372400085928-8o463krp4me6mghktgvdn782gneprseo.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

// accepts a login token from the frontend, and verifies that it's legit
function verify(token) {
  return client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    .then((ticket) => ticket.getPayload());
}

const profilePics = [
  '/images/pfp/bee_family.svg',
  '/images/pfp/bee_food.svg',
  '/images/pfp/bee_games.svg',
  '/images/pfp/bee_random.svg',
  '/images/pfp/bee_title.svg',
  '/images/pfp/bee_trav.svg',
  '/images/pfp/defaultpfp.svg',
  '/images/pfp/pfp2.svg',
  '/images/pfp/pfp3.svg',
  '/images/pfp/pfp4.svg',
  '/images/pfp/pfp5.svg',
  '/images/pfp/pfp6.svg'
];

const cute_colors = [
  "#877BB9",
  "#BD81B7",
  "#EA91BD",
  "#F69C9B",
  "#F9B48A",
  // "#FECD7E",
  // "#FFED81",
  "#B6D884",
  "#82CCB5",
  "#6AC8E3",
  "#71ABDD"
]

// gets user from DB, or makes a new account if it doesn't exist yet
function getOrCreateUser(user) {
  // the "sub" field means "subject", which is a unique identifier for each user
  return User.findOne({ googleID: user.sub }).then((existingUser) => {
    //console.log(profilePics)
    if (existingUser) return existingUser;

    const newUser = new User({
      displayName: user.name,
      googleID: user.sub,
      userTag: '@' + user.given_name,
      email: user.email,
      myPolls: [],
      sharedPolls: [],
      picture_link: profilePics[Math.floor(Math.random() * profilePics.length)],
      border_color: cute_colors[Math.floor(Math.random() * cute_colors.length)],
      friends: []
    });

    return newUser.save();
  });
}

function login(req, res) {
  //console.log("LOGIN")
  verify(req.body.token)
    .then((user) => getOrCreateUser(user))
    .then((user) => {
      // persist user in the session
      req.session.user = user;
      res.send(user);
    })
    .catch((err) => {
      //console.log(`Failed to log in: ${err}`);
      res.status(401).send({ err });
    });
}

function logout(req, res) {
  req.session.user = null;
  res.send({});
}

function populateCurrentUser(req, res, next) {
  // simply populate "req.user" for convenience
  req.user = req.session.user;
  next();
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return res.status(401).send({ err: "not logged in" });
  }

  next();
}

module.exports = {
  login,
  logout,
  populateCurrentUser,
  ensureLoggedIn,
};
