module.exports = {
    getPercussion_WesternPage: (req, res) => {
        let query = "SELECT * FROM `players` where position = 'Percussion Instrument' and itype = 'Western Instrument' "; // query database to get instruments

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('percussion-western.ejs', {
                title: "Percussion Western | Instrumental Inventory",
                players: result
            });
        });
    },
};
