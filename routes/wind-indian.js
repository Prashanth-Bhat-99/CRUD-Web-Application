module.exports = {
    getWind_IndianPage: (req, res) => {
        let query = "SELECT * FROM `players` where position = 'Wind Instrument' and itype = 'Indian Instrument' "; // query database to get instruments
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('wind-indian.ejs', {
                title: "Wind Indian |Instrumental Inventory",
                players: result
            });
        });
    },
};
