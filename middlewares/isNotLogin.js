module.exports = (req, res, next) => {
    if (req.session.currentUser) {
        if (req.session.currentUser.role === 'admin') {
            res.redirect('/users/admin/edit-customer')
        }
        else if (req.session.currentUser.role === 'customer') {
            console.log('>>>', req.session);
            res.redirect(`/users/${req.session.currentUser.customerId}/dashboard`)
        }
    } else if (!req.session.currentUser) {
        next()
    }
}