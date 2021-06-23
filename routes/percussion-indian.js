module.exports = {
    getPercussion_IndianPage: (req, res) => {
        let query = "SELECT * FROM `players` where position = 'Percussion Instrument' and itype = 'Indian Instrument' "; // query database to get instruments

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('percussion-indian.ejs', {
                title: "Percussion Indian | Instrumental Inventory",
                players: result
            });
        });
    },
};
