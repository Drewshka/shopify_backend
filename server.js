const express = require("express"),
  app = express(),
  PORT = 8080,
  cors = require("cors"),
  inventoryRoutes = require("./routes/inventoryRoutes"),
  warehousesRoutes = require("./routes/warehousesRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/inventory", inventoryRoutes);
app.use("/api/warehouses", warehousesRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ Error: err.message });
});

app.listen(PORT, () => {
  console.log(`Express server listening at http://localhost:${PORT}`);
});
