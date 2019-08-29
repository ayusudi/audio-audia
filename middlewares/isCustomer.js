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

// s%3AgPq61gwXFIb_ahJ2QNcdArXbfvNvjvVw.gmdpAcUc9keuAaWJPIoFCuuHmYCxkUpsL5nBkvVC4WY
// s%3AIvI-yzDVnHMbPaFG-AC0lF8KZb2s0ZuY.frR%2Fai70sWjcZ2NlptX0ybQ2hBs5eLsBVt%2FmnM1p1SY