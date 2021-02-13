const jwt = require("jsonwebtoken");
const cookieName = "USER_SESSION";
const secret = "navcho";

module.exports = function () {
  return (req, res, next) => {
    let token = req.cookies[cookieName];
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          res.clearCookie(cookieName);
        } else {
          req.user = decoded;
          res.locals.user = decoded;
          res.locals.isAuthenticated = true;
        }
      });
    }

    next();
  };
};
