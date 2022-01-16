const express = require("express");
const router = express.Router();
const {
  getAllWarehouses,
  getSingleWarehouse,
  editWarehouseDetails,
  postSingleWarehouse,
  deleteWarehouseAndInventory,
} = require("../controllers/warehousesControllers");

router.get("/", getAllWarehouses);
router.get("/:id", getSingleWarehouse);
router.post("/", postSingleWarehouse);
router.put("/:id", editWarehouseDetails);
router.delete("/:id", deleteWarehouseAndInventory);

module.exports = router;
