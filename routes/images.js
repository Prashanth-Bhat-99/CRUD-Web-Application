module.exports = {
    getImagesPage: (req, res) => {
        let query = "SELECT * FROM `players` ORDER BY id ASC";
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('images.ejs', {
                title: "Product Images | Instrumental Inventory",
                players: result
            });
        });
    },
};
