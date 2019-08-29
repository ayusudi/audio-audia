module.exports = (req, res, next) => {
    if (req.session.currentUser) {
        if (req.session.currentUser.role === "admin") {
            next()
        } else {
            res.redirect(`/users/${req.session.currentUser.id}/dashboard`)
        }
    } else {
        res.redirect('/login')
    }
}