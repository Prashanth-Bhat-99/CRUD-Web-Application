const fs = require('fs');

module.exports = {
    addPlayerPage: (req, res) => {
        res.render('add-player.ejs', {
            title: "Online Inventory | Add Instruments"
            ,message: ''
        });
    },
    addPlayer: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let username = req.body.username;
        let position = req.body.position;
        let number = req.body.number;
        let itype = req.body.itype;
        let price = req.body.price;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = username + '.' + fileExtension;

        let usernameQuery = "SELECT * FROM `players` WHERE user_name = '" + username + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Instrument already exists';
                res.render('add-player.ejs', {
                    message,
                    title: "Online Inventory | Add Instruments"
                });
            } else {
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif' || uploadedFile.mimetype === 'image/jpg') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // send the Instruments details to the database
                        let query = "INSERT INTO `players` (user_name, position, number, image, price, itype) VALUES ('" +
                            username + "','" + position + "', '" + number + "', '" + image_name + "', '" + price + "','" + itype + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/home');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' ,'png' and 'jpg' images are allowed.";
                    res.render('add-player.ejs', {
                        message,
                        title: "Online Inventory | Add Instrument"
                    });
                }
            }
        });
    },
    editPlayerPage: (req, res) => {
        let playerId = req.params.id;
        let query = "SELECT * FROM `players` WHERE id = '" + playerId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-player.ejs', {
                title: "Edit  Instrument"
                ,player: result[0]
                ,message: ''
            });
        });
    },
    editPlayer: (req, res) => {
        let playerId = req.params.id;
        let username = req.body.username;
        let price = req.body.price;
        let position = req.body.position;
        let itype = req.body.itype;
        let number = req.body.number;
        

        let query = "UPDATE `players` SET `user_name` = '" + username + "', `position` = '" + position + "', `number` = '" + number + "', `price` = '" + price + "' , `itype` = '" + itype + "'WHERE `players`.`id` = '" + playerId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/home');
        });
    },
    deletePlayer: (req, res) => {
        let playerId = req.params.id;
        let getImageQuery = 'SELECT image from `players` WHERE id = "' + playerId + '"';
        let deleteUserQuery = 'DELETE FROM players WHERE id = "' + playerId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/home');
                });
            });
        });
    }
};


























