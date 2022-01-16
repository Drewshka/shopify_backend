const fs = require("fs"),
  path = require("path"),
  warehousesFile = path.join(__dirname, "../data/warehouses.json"),
  inventoryItemsFile = path.join(__dirname, "../data/inventoryItems.json"),
  uniqid = require("uniqid");

class Warehouse {
  constructor(name, address, city, country) {
    this.id = uniqid();
    this.name = name;
    this.address = address;
    this.city = city;
    this.country = country;
  }
}

let warehousesData = [];
let inventoryItemsData = [];

//*Warehouses/users
const getAllWarehouses = () => {
  const data = fs.readFileSync(warehousesFile);
  warehousesData = JSON.parse(data);
  return warehousesData;
};

//*Inventory Items/gigs
const getAllItems = () => {
  const data = fs.readFileSync(inventoryItemsFile);
  inventoryItemsData = JSON.parse(data);
  return inventoryItemsData;
};

const add = (obj) => {
  const warehousesArray = getAllWarehouses();
  const warehouse = new Warehouse(obj.name, obj.address, obj.city, obj.country);
  warehousesArray.push(warehouse);
  fs.writeFileSync(warehousesFile, JSON.stringify(warehousesArray));
  return warehousesArray;
};

const getOneById = (id) => {
  const warehousesArray = getAllWarehouses();
  const warehouse = warehousesArray.find((warehouse) => warehouse.id === id);
  return warehouse;
};

const remove = (warehouseID) => {
  getAllItems();
  let newInventoryItemsData = inventoryItemsData.filter(
    (item) => item.warehouseID !== warehouseID
  );
  fs.writeFile(
    inventoryItemsFile,
    JSON.stringify(newInventoryItemsData),
    (err) => {
      if (err) {
        console.log(err);
        return;
      }
    }
  );
  return newInventoryItemsData;
};

const removeWarehouseWithItems = (warehouseID) => {
  getAllWarehouses();
  let newWarehousesData = warehousesData.filter(
    (warehouse) => warehouse.id !== warehouseID
  );

  fs.writeFile(warehousesFile, JSON.stringify(newWarehousesData), (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
  let newItemsData = remove(warehouseID);
  let returnArray = [newWarehousesData, newItemsData];
  returnArray = JSON.stringify(returnArray);

  return returnArray;
};

const update = (id, data) => {
  console.log("data parameter", data);
  const warehousesArray = getAllWarehouses();
  const warehousesIndex = warehousesArray.findIndex((user) => user.id === id);

  if (warehousesIndex !== -1) {
    warehousesArray.splice(warehousesIndex, 1, {
      id: id,
      ...data,
    });
    fs.writeFileSync(warehousesFile, JSON.stringify(warehousesArray));
    return warehousesArray;
  }
};

module.exports = {
  getAllWarehouses,
  getAllItems,
  add,
  getOneById,
  remove,
  removeWarehouseWithItems,
  update,
};
