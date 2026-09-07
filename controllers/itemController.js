const itemModel = require("../models/itmQueries.js")
const categoryModel = require("../models/catQueries.js")

// Table: category
// +--------+---------+--------------+
// | id(pk) | name    | description  |
// +--------+---------+--------------+
// | 1      | potions | loremIpsum...|
// | ...                             |

// Table: item
// +--------+---------+--------------+-------+-------------+
// | id(pk) | name    | description  | price | category_id |
// +--------+---------+--------------+-------+-------------+
// | 1      | healing | loremIpsum...| 20g   | 1           |
// | ...                                                   |

// GET - list all items
async function itemList(req,res,next) {
    try{
        // get items from database
        const items = await itemModel.listAllItm();
        
        // render item home page
        res.render("itemViews/itmHome", {items});
    }catch(err){
        next(err);
    }
}

// GET - list item in detail
async function itemDetail(req,res,next) {
    try{
        const item_id = req.params.id;

        // get item based on id
        const itemDet = await itemModel.listItem(item_id);
        
        // if item doesnt exist throw 404
        if(!itemDet){
            const error = new Error("Item not found");
            error.status = 404;
            throw error;
        }

        // render item detail page
        res.render(`itemViews/itmDetail`, {itemDet});
    }catch(err){
        next(err);
    }
}

// GET - show item create form
async function itemCreateGET(req,res,next){
    try{
        // get all categories from database
        const categories = await categoryModel.listAllCat();

        // if no categories exist then ask user to create one first
        if(!categories || categories.length === 0){
            const error = new Error("No category to store item. Create a category first");
            error.status = 400;
            throw error;
        }

        // render create item form
        res.render("itemViews/createItem", {title: "Create Item", categories});
    }catch(err){
        next(err);
    }

}


// POST - handle create item input
async function itemCreatePOST(req,res,next) {
    try{
        // create new item object based on input
        const newItem = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category_id: req.body.category_id,
        }

        //insert into database and return newly created item
        const created = await itemModel.createItm(newItem);

        //if item fails to be created throw 400
        if(!created){
            const error = new Error("Item was not created")
            error.status = 400;
            throw error;
        }

        //redirect to item detail page
        res.redirect(`/item/${created.id}`);
    }catch(err){
        next(err);
    }
}

// GET - item update form
async function itemUpdateGET(req,res,next) {
    try{
        const item_id = req.params.id;

        // get item by item id
        const item = await itemModel.listItem(item_id);

        // if item does not exist throw 404
        if(!item){
            const error = new Error("Item not found");
            error.status = 404;
            throw error;
        }

        // get categories from database
        const categories = await categoryModel.listAllCat();
        
        // if there are no categories throw 400
        if(!categories || categories.length === 0){
            const error = new Error("No category to store item. Create a category first");
            error.status = 400;
            throw error;
        }

        // render item update form
        res.render("itemViews/updateItem", {title: "Update Item", item, categories});
    }catch(err){
        next(err);
    }
}

// POST - handle update input
async function itemUpdatePOST(req,res,next) {
    try{
        const itemId = req.params.id;

        // create updateItem object
        const updatedItem = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category_id: req.body.category_id
        }

        // insert updated item into database and return it
        const updated = await itemModel.updateItm(itemId, updatedItem);
        
        // if failed to update throw 400
        if(!updated){
            const error = new Error("Item failed to update");
            error.status = 400;
            throw error;
        }

        // render updated item detail page
        res.redirect(`/item/${updated.id}`);
    }catch(err){
        next(err);
    }
}

// GET - delete confirmation page
async function itemDeleteGET(req,res,next) {
    try{
        const itemId = req.params.id;

        // get item detail from database
        const item = await itemModel.listItem(itemId);

        // if item does not exist throw 404
        if(!item){
            const error = new Error("Item not found");
            error.status = 404;
            throw error;
        }
    
        // render delete confirmation
        res.render("itemViews/deleteItem", {item});
    }catch(err){
        next(err);
    }
}

// POST - handle delete confirmation
async function itemDeletePOST(req,res,next) {
    try{
        const itemId = req.params.id;
        
        // delete item and return it
        const deleted = await itemModel.deleteItm(itemId);

        // if item was not deleted throw 400
        if(!deleted){
            const error = new Error("Item deletion failed");
            error.status = 400;
            throw error;
        }

        // go to item
        res.redirect("/item");
    }catch (err){
        next(err);
    }
}

module.exports = {
    itemList,
    itemDetail,
    itemCreateGET,
    itemCreatePOST,
    itemUpdateGET,
    itemUpdatePOST,
    itemDeleteGET,
    itemDeletePOST,
}