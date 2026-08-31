const {Router} = require("express");
const itemController = require("../controllers/itemController");
const itemRouter = Router();

// list all items
itemRouter.get("/", itemController.itemList);

//create item
itemRouter.get("/create", itemController.itemCreateGET);//GET: show form for item creation
itemRouter.post("/create", itemController.itemCreatePOST);//POST: create the item

// list one item in detail
itemRouter.get("/:id", itemController.itemDetail);

//update item
itemRouter.get("/:id/update", itemController.itemUpdateGET);//GET: show form to update item
itemRouter.post("/:id/update", itemController.itemUpdatePOST);//POST: update the item

//delete item
itemRouter.get("/:id/delete", itemController.itemDeleteGET);//GET: show confirmation prompt
itemRouter.post("/:id/delete", itemController.itemDeletePOST);//POST: delete confirmed item

module.exports = itemRouter;