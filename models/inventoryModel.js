const fs = require("fs"),
  path = require("path"),
  inventoryItemsFile = path.join(__dirname, "../data/inventoryItems.json"),
  uniqid = require("uniqid");

class InventoryItem {
  constructor(itemName, category, warehouseID) {
    this.itemName = itemName;
    this.warehouseID = warehouseID;
    this.category = category;
    this.id = uniqid();
  }
}

const getAll = () => {
  const data = fs.readFileSync(inventoryItemsFile);
  return JSON.parse(data);
};

const add = (obj) => {
  const inventoryItemsArray = getAll();
  const inventoryItem = new InventoryItem(
    obj.itemName,
    obj.category,
    obj.warehouseID
  );
  inventoryItemsArray.push(inventoryItem);
  fs.writeFileSync(inventoryItemsFile, JSON.stringify(inventoryItemsArray));
  return inventoryItemsArray;
};

const getOneById = (id) => {
  const inventoryItemsArray = getAll();
  const inventoryItem = inventoryItemsArray.find(
    (inventoryItem) => inventoryItem.id === id
  );
  return inventoryItem;
};

//*new
const getItemsByWarehouse = (warehouseID) => {
  const itemsArray = getAll();
  let filteredItem = itemsArray.filter(
    (item) => item.warehouseID === warehouseID
  );
  return filteredItem;
};

const remove = (id) => {
  const inventoryItemsArray = getAll();
  const inventoryItemIndex = inventoryItemsArray.findIndex(
    (inventoryItem) => inventoryItem.id === id
  );
  if (inventoryItemIndex !== -1) {
    inventoryItemsArray.splice(inventoryItemIndex, 1);
    fs.writeFileSync(inventoryItemsFile, JSON.stringify(inventoryItemsArray));
    return inventoryItemsArray;
  }
};

const update = (id, data) => {
  console.log("data parameter", data);
  const inventoryItemsArray = getAll();
  const inventoryItemIndex = inventoryItemsArray.findIndex(
    (inventoryItem) => inventoryItem.id === id
  );

  if (inventoryItemIndex !== -1) {
    inventoryItemsArray.splice(inventoryItemIndex, 1, {
      id: id,
      ...data,
    });
    fs.writeFileSync(inventoryItemsFile, JSON.stringify(inventoryItemsArray));
    return inventoryItemsArray;
  }
};

module.exports = {
  getAll,
  add,
  getOneById,
  getItemsByWarehouse,
  remove,
  update,
};
