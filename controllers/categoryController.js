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

async function catList(req,res,next){
    try{
        const categories = await categoryModel.listAllCat();
        res.render("categoryViews/catHome", {categories});
    }catch(err){
        next(err);
    }

}

async function oneCatList(req,res,next) {
    try{
        const categoryId = req.params.id;
        const category = await categoryModel.listOneCat(categoryId);
        if(!category || category.length === 0){
            const error = new Error("Category not found");
            error.status = 404;
            throw error;
        }
        const items = await itemModel.getItemsByCategory(categoryId);

        res.render("categoryViews/catDetail", {category, items});
    }catch(err){
        next(err);
    }

}

//GET - show create form
function categoryCreateGET(req,res,next){
   try{
        res.render("categoryViews/createCategory", {title: "Create Category"});
   }catch(err){
        next(err);
   }
}

//POST - handle create form
async function categoryCreatePOST(req,res,next) {
    try{
        const newCat = {
        name: req.body.name,
        description: req.body.description,
        };

        const created = await categoryModel.createCat(newCat);
        if(!created){
            const error = new Error("Category not created")
            error.status = 404;
            throw error;
        }
        res.redirect(`/category/${created.id}`);
    }catch(err){
        next(err)
    }
}

//GET - show update form
async function categoryUpdateGET(req,res,next) {
    try{
        const categoryId = req.params.id;
        const category = await categoryModel.listOneCat(categoryId);
        if(!category || category.length === 0){
            const error = new Error("Category not found");
            error.status = 404;
            throw error;
        }
        res.render("categoryViews/updateCat", {title: "Update Category", category});
    }catch(err){
        next(err);
    }
}

//POST - handle update form
async function categoryUpdatePOST(req,res,next) {
    try{
        const categoryId = req.params.id;
        const updatedCat = {
            name: req.body.name,
            description: req.body.description,
        }

        const updated = await categoryModel.updateCat(categoryId, updatedCat);
        if(!updated){
            const error = new Error("Category update failed");
            error.status = 400;
            throw error;
        }
        res.redirect(`/category/${updated.id}`);
    }catch(err){
        next(err);
    }
}

//GET - show delete confirmation
async function categoryDeleteGET(req,res,next) {
    try{
        const categoryId = req.params.id;
        const category = await categoryModel.listOneCat(categoryId);
        if(!category || category.length === 0){
            const error = new Error("Category not found");
            error.status = 400;
            throw error;
        }
        const items = await itemModel.getItemsByCategory(categoryId);

        if(items.length > 0){
            const error = new Error("Category contains items. Can not be deleted. Relocate items first");
            error.status = 400;
            throw error;
        }

        res.render("categoryViews/deleteCategory", {category});
    }catch(err){
        next(err);
    }
}

//POST - handle delete
async function categoryDeletePOST(req,res,next) {
    try{    
        const categoryId = req.params.id;
        await categoryModel.deleteCat(categoryId);

        res.redirect("/category");
    }catch(err){
        next(err)
    }
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