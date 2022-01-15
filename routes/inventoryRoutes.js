const express = require("express");
const router = express.Router();
const {
  listInventoryItems,
  listOneInventoryItem,
  getItemsByWarehouse,
  addInventoryItem,
  deleteInventoryItem,
  updateInventoryItem,
} = require("../controllers/inventoryControllers");

router.get("/", listInventoryItems);
router.get("/:id", listOneInventoryItem);
router.get("/warehouses/:id", getItemsByWarehouse);
router.post("/", addInventoryItem);
router.delete("/:id", deleteInventoryItem);
router.put("/:id", updateInventoryItem);

module.exports = router;
