const isGuest = (req, res, next) => {  
    if(req.cookies.user) {
        return res.redirect('/products');
    }
    
    next();
}

module.exports = isGuest;