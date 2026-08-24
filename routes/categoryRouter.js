const { Router } = require("express");
const categoryController = require("../controllers/categoryController.js");
const categoryRouter = Router();

//all routes here
//list all categories
categoryRouter.get("/", categoryController.catList);

//list one category in detail
categoryRouter.get("/:id", categoryController.oneCatList);

//create category
categoryRouter.get("/create", categoryController.categoryCreateGET);
categoryRouter.post("/create", categoryController.categoryCreatePOST);

//update category
categoryRouter.get("/:id/update", categoryController.categoryUpdateGET);
categoryRouter.post("/:id/update", categoryController.categoryUpdatePOST);

//delete category
categoryRouter.get("/:id/delete", categoryController.categoryDeleteGET);
categoryRouter.post("/:id/delete", categoryController.categoryDeletePOST);

module.exports = categoryRouter;