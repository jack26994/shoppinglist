var express = require('express');
var router = express.Router();

const item = require('../model/shoppingItem');

// Retrieving data from DB
router.get('/items', (req, res, next) => {
    item.find((err, items) => {
        if (err){
            res.json(err);
            return;
        }

        res.json(items);
    });
});

// Inserting new data
router.post('/item', (req, res, next) => {
    let newShoppingItem = new item({
        itemName: req.body.itemName,
        itemQuantity: req.body.itemQuantity,
        itemBought: req.body.itemBought
    });

    newShoppingItem.save((err, item) => {
      if (err) {
        res.json(err);
        return;
      }

      res.json({msg: 'Item has been added successfully'});
    });
});

// Updating the data
router.put('/item/:id', (req, res, next) => {
    item.findOneAndUpdate({_id: req.params.id}, {
        $set: {
            itemName: req.body.itemName,
            itemQuantity: req.body.itemQuantity,
            itemBought: req.body.itemBought
        }
    }, (err, result) => {
        if (err){
            res.json(err);
            return;
        }

        res.json(result);
    });
});

// Deleting the data
router.delete('/item/:id', (req, res, next) => {
    item.remove({_id: req.params.id}, (err, result) => {
      if (err) {
        res.json(err);
        return;
      }

      res.json(result);
    });
});

module.exports = router;
