// Category related request handling.
// Handles DB operations through models
// and renders views.

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

// GET - list all categories
async function catList(req,res,next){
    try{
        // get categories from database
        const categories = await categoryModel.listAllCat();

        // render category home page. Route - "/"
        res.render("categoryViews/catHome", {title: "Category Home", categories});
    }catch(err){
        next(err);
    }

}

// GET - show one category and its items
async function oneCatList(req,res,next) {
    try{
        const categoryId = req.params.id;

        // get category based on id
        const category = await categoryModel.listOneCat(categoryId);
        
        // if category doesnt exist, throw 404
        if(!category || category.length === 0){
            const error = new Error("Category not found");
            error.status = 404;
            throw error;
        }

        // get items that belong to category
        const items = await itemModel.getItemsByCategory(categoryId);

        //render detail page
        res.render("categoryViews/catDetail", {title: "Category Detail", category, items});
    }catch(err){
        next(err);
    }

}

//GET - show create form
function categoryCreateGET(req,res,next){
   try{
        // render empty create form
        res.render("categoryViews/createCategory", {title: "Create Category"});
   }catch(err){
        next(err);
   }
}

//POST - handle create form
async function categoryCreatePOST(req,res,next) {
    try{
        // build new category from input
        const newCat = {
            name: req.body.name,
            description: req.body.description,
        };

        // insert into db
        const created = await categoryModel.createCat(newCat);
        
        //if not created throw 404
        if(!created){
            const error = new Error("Category not created")
            error.status = 404;
            throw error;
        }

        // go back to category detail page
        res.redirect(`/category/${created.id}`);
    }catch(err){
        next(err)
    }
}

//GET - show update form
async function categoryUpdateGET(req,res,next) {
    try{
        const categoryId = req.params.id;

        // get category details to prefill form
        const category = await categoryModel.listOneCat(categoryId);

        // if category doesnt exist throw 404
        if(!category || category.length === 0){
            const error = new Error("Category not found");
            error.status = 404;
            throw error;
        }

        // render prefilled update form
        res.render("categoryViews/updateCat", {title: "Update Category", category});
    }catch(err){
        next(err);
    }
}

//POST - handle update form
async function categoryUpdatePOST(req,res,next) {
    try{
        const categoryId = req.params.id;

        // get updated input for category
        const updatedCat = {
            name: req.body.name,
            description: req.body.description,
        }

        //update db info
        const updated = await categoryModel.updateCat(categoryId, updatedCat);
        
        //if fail to update throw 400
        if(!updated){
            const error = new Error("Category update failed");
            error.status = 400;
            throw error;
        }

        // go back to detail page
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
        
        // if category doesnt exist throw 404
        if(!category || category.length === 0){
            const error = new Error("Category not found");
            error.status = 404;
            throw error;
        }
        const items = await itemModel.getItemsByCategory(categoryId);

        // if category contains items. stop deletion process
        if(items.length > 0){
            const error = new Error("Category contains items. Can not be deleted. Relocate items first");
            error.status = 400;
            throw error;
        }

        // render category deletion confirmation
        res.render("categoryViews/deleteCategory", {title: "Category Delete", category});
    }catch(err){
        next(err);
    }
}

//POST - handle delete
async function categoryDeletePOST(req,res,next) {
    try{    
        const categoryId = req.params.id;

        // delete category
        await categoryModel.deleteCat(categoryId);

        // go back to category home
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