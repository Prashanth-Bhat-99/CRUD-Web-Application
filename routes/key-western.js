module.exports = {
    getKey_WesternPage: (req, res) => {
        let query = "SELECT * FROM `players` where position = 'Key Instrument' and itype = 'Western Instrument' "; // query database to get instruments

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('key-western.ejs', {
                title: "Key Western | Instrumental Inventory",
                players: result
            });
        });
    },
};
