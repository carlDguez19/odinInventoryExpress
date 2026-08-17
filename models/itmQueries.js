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

const pool = require("./pool");

async function listAllItm(){
    const {rows} = await pool.query("SELECT * FROM item");
    return rows;
}

async function listItem(itemId) {
    const {rows} = await pool.query(`SELECT * FROM item
        WHERE item.id = $1`, [itemId]);
    return rows[0];
}

async function createItm(newItm){
    const {rows} = await pool.query(`INSERT INTO item (name, description, price, category_id) VALUES ($1, $2, $3, $4) RETURNING *`, [newItm.name, newItm.description, newItm.price, newItm.category_id]);
    return rows[0];
}

async function updateItm(itmId, updatedItm){
   const {rows} = await pool.query(`
        UPDATE item
        SET name = $1, description = $2,
        price = $3, category_id = $4
        WHERE id = $5
        RETURNING *`, [updatedItm.name, updatedItm.description, updatedItm.price, updatedItm.category_id, itmId]);
    return rows[0];
}

async function deleteItm(itmId) {
    const{rows} = await pool.query(`DELETE FROM item WHERE item.id = $1 RETURNING *`, [itmId]);
    return rows[0];
}