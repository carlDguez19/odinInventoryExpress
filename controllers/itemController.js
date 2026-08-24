const itemCategory = require("../models/itmQueries.js")

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
    const items = itemCategory.listAllItm();
    res.render("itmList", {items});
}

async function itemDetail(req,res) {
    const item_id = req.param.id;
    const itemDet = itemCategory.listItem(item_id);
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

    const created = itemCategory.createItm(newItem);
    res.redirect(`/item/${created.id}`);
}

async function itemUpdateGET(req,res) {
    const items = itemCategory.listAllItm()
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

    const updated = await itemCategory.updateItm(itemId, updatedItem);
    res.redirect(`/item/${updated.id}`);
}

async function itemDeleteGET(req,res) {
        const itemId = req.params.id;
        const itemData = await itemCategory.listItem(itemId);
    
        res.render("itemDelete", {itemData});
}

async function itemDeletePOST(req,res) {
    const itemId = req.params.id;
    await itemCategory.deleteItm(itemId);
    res.redirect("/item");
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