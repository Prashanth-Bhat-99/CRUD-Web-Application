module.exports = {
    getString_IndianPage: (req, res) => {
        let query = "SELECT * FROM `players` where position = 'String Instrument' and itype = 'Indian Instrument' "; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('string-indian.ejs', {
                title: "String Indian | Instrumental Inventory",
                players: result
            });
        });
    },
};
