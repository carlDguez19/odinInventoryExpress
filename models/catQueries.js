// DATA ACCESS FOR CATEGORY: Handles all SQL queries related to categories

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

// All queries use RETURNING. This is to confirm CRUD.

const pool = require("./pool")

async function listAllCat(){
    const {rows} = await pool.query("SELECT * FROM category");
    return rows;
}

async function listOneCat(catId){
    const {rows} = await pool.query(`
        SELECT *
        FROM category
        WHERE id = $1`, [catId]);
    
    return rows[0];
}

async function createCat(newCat){
    const {rows} = await pool.query(`INSERT INTO category (name, description) VALUES ($1, $2) RETURNING *`, [newCat.name, newCat.description]);
    return rows[0];
}

async function updateCat(catId, updatedCat){
   const {rows} = await pool.query(`
        UPDATE category
        SET name = $1, description = $2
        WHERE id = $3
        RETURNING *`, [updatedCat.name, updatedCat.description, catId]);
    return rows[0];
}

async function deleteCat(catId) {
    const{rows} = await pool.query(`DELETE FROM category WHERE category.id = $1 RETURNING *`, [catId]);
    return rows[0];
}

module.exports = {
    listAllCat,
    listOneCat,
    createCat,
    updateCat,
    deleteCat
};