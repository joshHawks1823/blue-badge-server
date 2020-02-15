var router = require("express").Router();
var sequelize = require("../db");
var User = sequelize.import("../model/user");
var Inventory = sequelize.import("../model/inventory");

//GET ALL
router.get("/getall", function(req, res) {
  var userid = req.user.id;
  Inventory.findAll({
    where: { owner: userid }
  }).then(
    function findAllSuccess(data) {
      res.json(data);
    },
    function findAllError(err) {
      res.send(500, err.message);
    }
  );
});

//CREATE
router.post("/create", function(req, res) {
  var owner = req.user.id;
  var inventoryData = req.body.inventory.inventoryData;
  var inventoryCount = req.body.inventory.inventoryCount;
  Inventory.create({
    inventoryData: inventoryData,
    inventoryCount: inventoryCount,
    owner: owner
  }).then(
    function createSuccess(inventory) {
      res.json({
        inventory: inventory
      });
    },
    function createError(err) {
      res.send(500, err.message);
    }
  );
});

//GET SINGLE ITEM FOR INDIVIDUAL USER
router.get("/:id", function(req, res) {
  var data = req.params.id;
  var userid = req.user.id;

  Inventory.findOne({
    where: { id: data, owner: userid }
  }).then(
    function findOneSuccess(data) {
      res.json(data);
    },
    function findOneError(err) {
      res.send(500, err.message);
    }
  );
});

//DELETE
router.delete("/delete/:id", function(req, res) {
  var data = req.params.id;
  var userid = req.user.id;

  Inventory.destroy({
    where: { id: data, owner: userid }
  }).then(
    function deleteLogSuccess(data) {
      res.send("you removed a log");
    },
    function deleteLogError(err) {
      res.send(500, err.message);
    }
  );
});

//UPDATE
router.put("/update/:id", function(req, res) {
  var data = req.params.id;
  var owner = req.user.id;
  var inventoryData = req.body.inventory.inventoryData;
  var inventoryCount = req.body.inventory.inventoryCount;

  Inventory.update(
    {
      inventoryData: inventoryData,
      inventoryCount: inventoryCount,
      owner: owner
    },
    { where: { id: data } }
  ).then(
    function updateSuccess(updateInventory) {
      res.json({
        inventory: updateInventory
      });
    },
    function updateError(err) {
      res.send(500, err.message);
    }
  );
});

module.exports = router;
