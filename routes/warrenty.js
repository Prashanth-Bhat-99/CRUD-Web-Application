module.exports = {
    getWarrentyPage: (req, res) => {
        let query = "SELECT * FROM `players` ORDER BY id ASC";
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('warrenty.ejs', {
                title: "Warranty | Instrumental Inventory",
                players: result
            });
        });
    },
};
