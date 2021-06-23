module.exports = {
    getKey_IndianPage: (req, res) => {
        let query = "SELECT * FROM `players` where position = 'Key Instrument' and itype = 'Indian Instrument' "; // query database to get instruments

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('key-indian.ejs', {
                title: "Key Indian | Instrumental Inventory",
                players: result
            });
        });
    },
};
