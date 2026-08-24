const {Router} = require("express");
const itemController = require("../controllers/itemController");
const itemRouter = Router();

//all routes here
// list all items
itemRouter.get("/", itemController.itemList);

// list one
itemRouter.get("/:id", itemController.itemDetail);

//create item
itemRouter.get("/create", itemController.itemCreateGET);
itemRouter.post("/create", itemController.itemCreatePOST);

//update item
itemRouter.get("/:id/update", itemController.itemUpdateGET);
itemRouter.post("/:id/update", itemController.itemUpdatePOST);

//delete item
itemRouter.get("/:id/delete", itemController.itemDeleteGET);
itemRouter.post("/:id/delete", itemController.itemDeletePOST);

module.exports = itemRouter;