require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS item (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10),
    category_id INTEGER REFERENCES category(id)
);

INSERT INTO category (name, description)
VALUES
    ('Electronics', 'Devices, gadgets, and accessories'),
    ('Furniture', 'Home and office furniture'),
    ('Clothing', 'Apparel for men and women');

INSERT INTO item (name, description, price, category_id)
VALUES
    ('Laptop', 'touchscreen, 512gb ssd', 900, 1),
    ('Headphones', 'JBL 500live btnc', 200, 1),
    ('Office Chair', 'lumbar and neck support', 150, 2),
    ('T-shirt', '100% cotton, black', 20, 3);
`;
 
async function main(){
    console.log("Seeding database...");
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try{
        await client.connect();
        await client.query(SQL);
        console.log("Seeding complete.");
    }catch(err){
        console.error("Error during seeding: ", err);
    }finally{
        await client.end();
    }
}

main();