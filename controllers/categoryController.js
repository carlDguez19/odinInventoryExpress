const categoryModel = require("../models/catQueries.js");

async function catList(req,res){
    const items = await categoryModel.listAllCat();
    res.render("catList", {items});
}

async function oneCatList(req,res) {
    const categoryId = req.param.id;
    const categoryData = await categoryModel.listOneCat(categoryId);

    if(categoryData.length === 0){
        return res.render("categoryDetail", {category: null, items: []});
    }

    const category = {
        name: categoryData[0].cat_name,
        description: categoryData[0].cat_desc,
    };

    const items = categoryData.map(row => ({
        id: row.item_id,
        name: row.item_name,
        description: row.item_desc,
        price: row.item_price,
    }));

    res.render("categoryDetail", {category, items});
}

//GET - show create form
function categoryCreateGET(req,res){
    res.render("categoryForm", {title: "Create Category"});
}

//POST - handle create form
async function categoryCreatePOST(req,res) {
    const newCat = {
        name: req.body.name,
        description: req.body.description,
    };

    const created = await categoryModel.createCat(newCat);
    res.redirect(`/category/${created.id}`);
}

//GET - show update form
async function categoryUpdateGET(req,res) {
    const category = await categoryModel.listAllCat();

    res.render("updateForm", {title: "Update Category", category});
}

//POST - handle update form
async function categoryUpdatePOST(req,res) {
    const categoryId = req.params.id;

    const updatedCat = {
        name: req.body.name,
        description: req.body.description,
    }

    const updated = await categoryModel.updateCat(categoryId, updatedCat);
    res.redirect(`/category/${updated.id}`);
}

//GET - show delete confirmation
async function categoryDeleteGET(req,res) {
    const categoryId = req.params.id;
    const categoryData = await categoryModel.listOneCat(categoryId);

    res.render("categoryDelete", {categoryData});
}

//POST - handle delete
async function categoryDeletePOST(params) {
    const categoryId = req.params.id;
    await categoryModel.deleteCat(categoryId);
    res.redirect("/category");
}

module.exports = {
    catList,
    oneCatList,
    categoryCreateGET,
    categoryCreatePOST,
    categoryUpdateGET,
    categoryUpdatePOST,
    categoryDeleteGET,
    categoryDeletePOST,
};