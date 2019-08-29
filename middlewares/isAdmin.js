module.exports = (req, res, next) => {
    if(req.session.currentUser){
        if (req.session.currentUser.role === "admin") {
            next()
        } else {
            res.redirect('/')
        }
    }
    else {
        res.redirect('/')
    }
}