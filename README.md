## Clone

```sh
Clone this repo to your local machine using git@github.com:Drewshka/shopify_backend.git
```

## Installation

```sh
cd shopify-backend-challenge && npm i
```

## Run Server

```sh
nodemon server.js
```

## Test Endpoints using Postman

test full CRUD functionality using Postman

## Key Points

- Separation of concerns:
  - Routes are declared in `routes/inventoryRoutes.js` and `routes/warehousesRoutes.js`.
  - Rather than invoking an anonymous function within the route declaration, controller functions which are defined in `controllers/inventoryControllers.js` and `controllers/warehousesControllers.js` are invoked.
  - Controller functions contain error handling logic. If an error condition is met, a new `Error` object is created, its message is descriptive of the error, a status code is set, and the error is passed to `next()`
  - When `next()` is invoked, the error handling middleware that is activated is defined in `server.js`.
  - Controller functions invoke functions from the `inventory` and `warehouses` models (`models/inventoryModel.js`) (`models/warehousesModel.js`). This mimics a lightweight ORM.
  - Users have ability to create warehouses/locations and assign inventory to specific locations by defining warehouseID, which should match the id of the warehouse.
  - Users can get a list of all items assigned to a specific warehouse
