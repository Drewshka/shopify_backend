const express = require("express");
const router = express.Router();
const {
  listInventoryItems,
  addInventoryItem,
  listOneInventoryItem,
  deleteInventoryItem,
  updateInventoryItem,
} = require("../controllers/inventoryControllers");
// } = require("./controllers/inventoryControllers");

router.get("/", listInventoryItems);
router.post("/", addInventoryItem);
router.get("/:id", listOneInventoryItem);
router.delete("/:id", deleteInventoryItem);
router.put("/:id", updateInventoryItem);

module.exports = router;
