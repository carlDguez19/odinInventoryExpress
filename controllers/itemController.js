const itemModel = require("../models/itmQueries.js")

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

async function itemList(req, res) {
    const items = await itemModel.listAllItm();
    res.render("itmList", {items});
}

async function itemDetail(req,res) {
    const item_id = req.params.id;
    const itemDet = await itemModel.listItem(item_id);
    res.render("itmDetail", {itemDet});
}

function itemCreateGET(req,res){
    res.render("itemCreateForm", {title: "Create Item"});
}

async function itemCreatePOST(req,res) {
    const newItem = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category_id: req.body.category_id,
    }

    const created = await itemModel.createItm(newItem);
    res.redirect(`/item/${created.id}`);
}

async function itemUpdateGET(req,res) {
    const items = await itemModel.listAllItm()
    res.render("updateItem", {title: "Update Item", items});
}

async function itemUpdatePOST(req,res) {
    const itemId = req.params.id;

    const updatedItem = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category_id: req.body.category_id
    }

    const updated = await itemModel.updateItm(itemId, updatedItem);
    res.redirect(`/item/${updated.id}`);
}

async function itemDeleteGET(req,res) {
        const itemId = req.params.id;
        const itemData = await itemModel.listItem(itemId);
    
        res.render("itemDelete", {itemData});
}

async function itemDeletePOST(req,res) {
    try{
        const itemId = req.params.id;
        await itemModel.deleteItm(itemId);
        res.redirect("/item");
    }catch (err){
        console.error("Delete error: ", err);
        res.status(500).send("Error deleting item");
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