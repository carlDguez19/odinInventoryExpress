const categoryModel = require("../models/catQueries.js");
const itemModel = require("../models/itmQueries.js");

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

async function catList(req,res){
    const items = await categoryModel.listAllCat();
    res.render("catList", {items});
}

async function oneCatList(req,res) {
    const categoryId = req.params.id;

    const categoryData = await categoryModel.listOneCat(categoryId);
    const items = await itemModel.getItemsByCategory(categoryId);

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
    const categoryId = req.params.id;
    const categoryData = await categoryModel.listOneCat(categoryId);

    res.render("updateCat", {title: "Update Category", category});
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
async function categoryDeletePOST(req,res) {
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