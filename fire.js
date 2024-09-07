const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

function verifyToken(req, res, next) {
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  console.log('Token recibido:', idToken);

  if (!idToken) {
    return res.status(401).send('No token provided');
  }

  admin.auth().verifyIdToken(idToken)
    .then(decodedToken => {
      req.user = decodedToken;
      console.log('Token verificado con éxito:', decodedToken);
      next();
    })
    .catch(error => {
      console.error('Error verifying token:', error);
      res.status(401).send('Invalid token');
    });
}

module.exports = verifyToken;
