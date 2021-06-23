module.exports = {
    getShowPage: (req, res) => {
        let query = "SELECT * FROM `players` ORDER BY id ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('show.ejs', {
                title: "Online Instrumental Inventory",
                players: result
            });
        });
    },
};
