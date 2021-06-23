module.exports = {
    getString_WesternPage: (req, res) => {
        let query = "SELECT * FROM `players` where position = 'String Instrument' and itype = 'Western Instrument' "; // query database to get instruments

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('string-western.ejs', {
                title: "String Western | Instrumental Inventory",
                players: result
            });
        });
    },
};
