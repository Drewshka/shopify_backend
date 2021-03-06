const InventoryItem = require("../models/inventoryModel");

exports.listInventoryItems = (req, res) => {
  res.json(InventoryItem.getAll());
};

exports.addInventoryItem = (req, res, next) => {
  if (!req.body.itemName || !req.body.category || !req.body.warehouseID) {
    const err = new Error(
      "POST request requires item name, warehouse ID and category attributes."
    );
    err.status = 400;
    next(err);
  } else {
    let updatedInventoryItems = InventoryItem.add(req.body);
    res.json(updatedInventoryItems);
  }
};

exports.listOneInventoryItem = (req, res, next) => {
  const inventoryItem = InventoryItem.getOneById(req.params.id);
  if (!inventoryItem) {
    const err = new Error("Please provide a valid ID.");
    err.status = 400;
    next(err);
  } else {
    res.json(inventoryItem);
  }
};

//*New
exports.getItemsByWarehouse = (req, res, next) => {
  const warehouseID = req.params.id;
  let filteredItem = InventoryItem.getItemsByWarehouse(warehouseID);
  if (filteredItem === [] || filteredItem === undefined) {
    const err = new Error("That warehouse doesn't exist");
    err.status = 404;
    next(err);
  } else {
    res.json(filteredItem);
  }
};

exports.deleteInventoryItem = (req, res, next) => {
  const updatedArray = InventoryItem.remove(req.params.id);
  if (!updatedArray) {
    const err = new Error("Please provide a valid ID.");
    err.status = 400;
    next(err);
  } else {
    res.json(updatedArray);
  }
};

exports.updateInventoryItem = (req, res, next) => {
  console.log("req.body", req.body);
  if (!req.body.itemName && !req.body.category && !req.body.warehouseID) {
    const err = new Error(
      "PUT request requires item name and/or category and/or warehouse ID attributes"
    );
    err.status = 400;
    next(err);
  } else {
    const updatedArray = InventoryItem.update(req.params.id, req.body);
    if (!updatedArray) {
      const err = new Error("Please provide a valid id.");
      err.status = 400;
      next(err);
    } else {
      res.json(InventoryItem.update(req.params.id, req.body));
    }
  }
};
