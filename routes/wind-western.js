module.exports = {
    getWind_WesternPage: (req, res) => {
        let query = "SELECT * FROM `players` where position = 'Wind Instrument' and itype = 'Western Instrument' "; // query database to get instruments

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('wind-western.ejs', {
                title: "Wind Western | Instrumental Inventory",
                players: result
            });
        });
    },
};
