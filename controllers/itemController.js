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

async function itemList(req,res,next) {
    try{
        const items = await itemModel.listAllItm();
        res.render("itemViews/itmHome", {items});
    }catch(err){
        next(err);
    }
}

async function itemDetail(req,res,next) {
    try{
        const item_id = req.params.id;
        const item = await itemModel.listItem(item_id);
        if(!item){
            const error = new Error("Item not found");
            error.status = 404;
            throw error;
        }

        res.render("itemViews/itmDetail", {item});
    }catch(err){
        next(err);
    }
}

async function itemCreateGET(req,res,next){
    try{
        const categories = await categoryModel.listAllCat();
        if(!categories || categories.length === 0){
            const error = new Error("No category to store item. Create a category first");
            error.status = 400;
            throw error;
        }
        res.render("itemViews/createItem", {title: "Create Item", categories});
    }catch(err){
        next(err);
    }

}

async function itemCreatePOST(req,res,next) {
    try{
        const newItem = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category_id: req.body.category_id,
        }

        const created = await itemModel.createItm(newItem);
        if(!created){
            const error = new Error("Item was not created")
            error.status = 400;
            throw error;
        }
        res.redirect(`/item/${created.id}`);
    }catch(err){
        next(err);
    }
}

async function itemUpdateGET(req,res,next) {
    try{
        const item_id = req.params.id;
        const item = await itemModel.listItem(item_id);
        if(!item){
            const error = new Error("Item not found");
            error.status = 404;
            throw error;
        }
        const categories = await categoryModel.listAllCat();
        if(!categories || categories.length === 0){
            const error = new Error("No category to store item. Create a category first");
            error.status = 400;
            throw error;
        }
        res.render("itemViews/updateItem", {title: "Update Item", item, categories});
    }catch(err){
        next(err);
    }
}

async function itemUpdatePOST(req,res,next) {
    try{
        const itemId = req.params.id;

        const updatedItem = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category_id: req.body.category_id
        }

        const updated = await itemModel.updateItm(itemId, updatedItem);
        if(!updated){
            const error = new Error("Item failed to update");
            error.status = 400;
            throw error;
        }
        res.redirect(`/item/${updated.id}`);
    }catch(err){
        next(err);
    }
}

async function itemDeleteGET(req,res,next) {
    try{
        const itemId = req.params.id;
        const item = await itemModel.listItem(itemId);
        if(!item){
            const error = new Error("Item not found");
            error.status = 404;
            throw error;
        }
    
        res.render("itemViews/deleteItem", {item});
    }catch(err){
        next(err);
    }
}

async function itemDeletePOST(req,res,next) {
    try{
        const itemId = req.params.id;
        const deleted = await itemModel.deleteItm(itemId);
        if(!deleted){
            const error = new Error("Item deletion failed");
            error.status = 400;
            throw error;
        }
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