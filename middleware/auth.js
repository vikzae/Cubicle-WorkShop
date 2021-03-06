const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.cookies.user;
    if(token) {
        jwt.verify(token, 'muchSecret',(err,user) => {
            if (err) {
                res.clearCookie('user')
            };

            req.user = user;
            next();
        });
    } else {
        res.redirect('/auth/register');
    };

}
module.exports = authenticate;
