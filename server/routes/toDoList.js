var router = require('express').Router();
var pool = require('../modules/pool');

router.get('/', function (req, res) {
    pool.connect(function (connectionError, client, done) {
        if (connectionError) {
            console.log(connectionError);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM to_do_list', function (queryError, resultObj) {
                done();
                if (queryError) {
                    console.log(connectionError);
                    res.sendStatus(500);
                } else {
                    // console.log('logging resultObj.rows inside toDoList GET function -> ', resultObj.rows);
                    res.send(resultObj.rows);
                }
            });
        }
    });
});

router.post('/', function (req, res) {
    var itemID = req.body.item;
    var itemPriority = req.body.priority;
    console.log('logging itemID ->', itemID);

    var status = false; // sets complete status to false as default
    // console.log('in post inventory route!');
    pool.connect(function (connectionError, client, done) {
        if (connectionError) {
            // console.log(connectionError, 'logging connection1');
            res.sendStatus(500);
        } else {
            var queryString = 'INSERT INTO to_do_list(item, priority) VALUES($1, $2)';
            var values = [itemID, itemPriority];
            client.query(queryString, values, function (queryError, resultObj) {
                done();
                if (queryError) {
                    res.sendStatus(500);
                    console.log('Query Error inside toDoList.js POST function');
                } else {
                    console.log('logging resultObj from toDoList.js POST function -> ', resultObj.rows);
                    res.send(resultObj.rows);
                }
            });
        }
    });
});

router.delete('/:id', function (req, res) {
    var itemToDelete = req.params.id;
    // console.log('inside delete /:id of /toDoList -> ', itemToDelete);
    pool.connect(function (connectionError, client, done) {
        // console.log('inside /:id delete of /toDoList - calling query');
        var queryString = 'DELETE FROM to_do_list WHERE id=($1);';
        var values = [itemToDelete];
        client.query(queryString, values, function (err, result) {
            done();
            if (err) {
                // console.log('logging error inside delete /:id client.query -> ', connectionError);
                res.sendStatus(500);
            } else {
                // console.log('logging result from delete /:id -> ', result.rows);
                res.sendStatus(202);
            }
        });
    });
});

router.put('/:id', function (req, res) {
    var itemToToggleComplete = req.params.id;
    var status = req.body.status;
    var newStatus = 'false';
    console.log('logging itemToToggleComplete in toDoList.js PUT -> ', itemToToggleComplete);
    console.log('logging status in toDoList.js PUT -> ', status);
    
    if (status == 'false') {
        newStatus = 'TRUE';

    } else if (status == 'true') {
        newStatus = 'FALSE';

    } else {
        console.log('Error in determing complete/incomplete for item. Toggling to incomplete by default. Status: ', status);
        newStatus = 'true';
    }

    // start
    pool.connect(function (connectionError, client, done) {
        var queryString = 'UPDATE to_do_list SET status=($1) WHERE id=($2);';
        var values = [newStatus, itemToToggleComplete];
        client.query(queryString, values, function (err, result) {
            done();
            if (err) {
                // console.log('logging error inside delete /:id client.query -> ', connectionError);
                res.sendStatus(500);
            } else {
                // console.log('logging result from delete /:id -> ', result.rows);
                res.sendStatus(202);
            }
        });
    });
    // end

});


/*
router.delete('/:id', function(req, res) {
    var koalaToDelete = req.params.id;
    console.log('inside delete /:id of /koalas -> ', koalaToDelete);
    // pool.connect(function (connectionError, client, done) {
    if (koalaToDelete == undefined) {
        console.log('inside /:id delete of /koalas hitting KoalaToDelete is undefined');
        res.sendStatus(500);
    } else {
        pool.connect(function (connectionError, client, done) {
        console.log('inside /:id delete of /koalas hitting KoalaToDelete  - calling query');
        var queryString = 'DELETE FROM koalas_inventory WHERE id=($1);';
        var values = [koalaToDelete];
        client.query(queryString, values, function(err, result){
            done();
            if (err) {
                console.log('logging error inside delete /:id client.query -> ', connectionError);
                res.sendStatus(500);
            } else {
                console.log('logging result from delete /:id -> ', result.rows);
                res.sendStatus(200);
            }
        });
    // });
    });
}});
*/

module.exports = router;