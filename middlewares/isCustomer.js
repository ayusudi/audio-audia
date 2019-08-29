module.exports = (req, res, next) => {
    console.log(req.session,'<<<<<<');
    console.log(req.params, 'params<<<<<<<');
    if(req.session.currentUser){
        if (req.session.currentUser.role === "customer") {
            if(req.params.idUser == req.session.currentUser.id){
                next()
            }
            else {
                res.redirect(`/users/${req.session.currentUser.id}/dashboard`)
            }
        } else {
            res.redirect('/')
        }
    }
    else {
        res.redirect('/')
    }
}
