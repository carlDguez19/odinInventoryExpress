# Inventory Management App
A full‑stack Node.js + Express + MVC application for managing categories and items.

## Overview
This project is a complete inventory management system built using Node.js, Express, MVC architecture, and EJS for server‑side rendering. It allows users to:

Create, read, update, and delete categories

Create, read, update, and delete items

View items belonging to a category

Navigate clean, structured routes

Interact with a fully functional PostgreSQL database

The project demonstrates real‑world full‑stack development patterns including routing, controllers, models, SQL queries, form handling, validation, and error management.

---

## Tech Stack

Node.js

Express.js

EJS

PostgreSQL

MVC architecture

CSS (modular stylesheets)

---

## Architecture
This project follows a clean Model–View–Controller (MVC) structure:

Models → SQL queries + database logic (itemModel.js, categoryModel.js)

Controllers → request handling + business logic (itemController.js, categoryController.js)

Views → EJS templates for rendering pages

Routes → URL endpoints mapped to controllers

Public → CSS stylesheets for layout, buttons, lists, and global styling

This separation keeps the codebase organized, scalable, and easy to maintain.

---

## Routes Table

### Categories
Method	Route	Description
GET	/category	List all categories
GET	/category/:id	Category detail
GET	/category/create	Create form
POST /category/create	Create category
GET	/category/:id/update	Update form
POST /category/:id/update	Update category
GET	/category/:id/delete	Delete confirmation
POST /category/:id/delete	Delete category


### Items
Method	Route	Description
GET	/item	List all items
GET	/item/:id	Item detail
GET	/item/create	Create form
POST /item/create	Create item
GET	/item/:id/update	Update form
POST /item/:id/update	Update item
GET	/item/:id/delete	Delete confirmation
POST /item/:id/delete	Delete item

---

## Database Schema
### category

id (SERIAL PRIMARY KEY)
name
description

### item

id (SERIAL PRIMARY KEY)
name
description
price
category_id (INTEGER → references category.id)

---

## Database Seeding
The project includes a seed.js script that:

Creates the category and item tables

Inserts sample categories

Inserts sample items

Ensures the database is ready for development

### Run the seed script:

```bash
node seed.js
```

### Then start the app:

```bash
node app.js
```

---

## Installation & Setup
Clone the repo

```bash
git clone <your-repo-url>
cd odinInventoryExpress
```

Install dependencies

```bash
npm install
```

Configure environment variables
Create a .env file:

```Code
DATABASE_URL=postgres://your_user:your_password@localhost:5432/your_db_name
```
Seed the database

```bash
node seed.js
```

Start the server

```bash
node app.js
```

---

## Features
Full CRUD for categories

Full CRUD for items

Clean URL structure

Error handling

Modular CSS

Responsive layout (optional media queries)

MVC architecture

PostgreSQL-backed data persistence

---

## Future Improvements
Add user authentication

Add item images

Add search functionality

Add pagination

Add sorting/filtering

Add REST API endpoints

---

## Developer Notes
This project was built as part of my full‑stack development journey. It reflects real‑world patterns like MVC, SQL modeling, routing, and structured controllers. Every feature was built end‑to‑end — from database queries to UI rendering — to simulate professional development workflows.
