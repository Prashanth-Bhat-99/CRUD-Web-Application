module.exports = {
    getAboutPage: (req, res) => {
        let query = "SELECT * FROM `players` ORDER BY id ASC";
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('about.ejs', {
                title: "About us | Instrumental Inventory",
                players: result
            });
        });
    },
};

