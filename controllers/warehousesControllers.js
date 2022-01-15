const Warehouse = require("../models/warehousesModel");
const InventoryItem = require("../models/inventoryModel");

exports.getAllWarehouses = (req, res) => {
  res.json(Warehouse.getAllWarehouses());
};

exports.listInventoryItems = (req, res) => {
  res.json(InventoryItem.getAll());
};

exports.postSingleWarehouse = (req, res, next) => {
  if (
    !req.body.name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country
  ) {
    const err = new Error(
      "POST request requires name, address, city and country attributes."
    );
    err.status = 400;
    next(err);
  } else {
    let updatedWarehouses = Warehouse.add(req.body);
    res.json(updatedWarehouses);
  }
};

exports.getSingleWarehouse = (req, res, next) => {
  const warehouse = Warehouse.getOneById(req.params.id);
  if (!warehouse) {
    const err = new Error("Please provide a valid ID.");
    err.status = 400;
    next(err);
  } else {
    res.json(warehouse);
  }
};

exports.deleteWarehouseAndInventory = (req, res, next) => {
  if (req.params.id === undefined || !req.params.id) {
    const err = new Error("DELETE requires valid warehouse ID.");
    err.status = 400;
    next(err);
  } else {
    let response = Warehouse.removeWarehouseWithItems(req.params.id);
    res.json(response);
  }
};

exports.editWarehouseDetails = (req, res, next) => {
  console.log("req.body", req.body);
  if (
    !req.body.name &&
    !req.body.address &&
    !req.body.city &&
    !req.body.country
  ) {
    const err = new Error(
      "PUT request requires name, address, city and country attributes"
    );
    err.status = 400;
    next(err);
  } else {
    const updatedArray = Warehouse.update(req.params.id, req.body);
    if (!updatedArray) {
      const err = new Error("Please provide a valid id.");
      err.status = 400;
      next(err);
    } else {
      res.json(Warehouse.update(req.params.id, req.body));
    }
  }
};
