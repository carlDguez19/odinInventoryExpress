const itemCategory = require("../models/itmQueries.js")

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