\*\*E-Commerce Website - NEXTjs TypeScript Project
This project is an e-commerce website built with Next-js. It aims to provide a robust platform for online shopping experiences, featuring a catalog of products, a cart system, user authentication, and more.

\*\*Deployment
Deployed at - https://ecommerce-next-lake.vercel.app/

\*\*Features
A fully responsive design that adapts to various screen sizes for the best shopping experience
Fetches product data from MongoDB Cloud database
Displays all available products
Filter Product based on price and name
Add product to cart.
Local Storage as well as mongo db cloud both is used to save cart data parallaly
Sign up for an account and log in to manage orders and personal information.
Order Operation (CRUD) in mongo db cloud.
Payment Operation using Stipe and store everything in mongo db cloud.

\*\*Technologies Used
Nextjs: The React Framework for to create full stack web app.
TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
Redux Toolkit: State management library for React.
Async Thunk: For Backend API calling.
Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.
MongoDB cloud: Backend-as-a-Service (Baas) for database.

Getting Started
Clone this repository.
cd/ecommercenext.
Install dependencies using npm install.
Create .env file and add env variables
MONGO_URI:---your mongo uri---
JWT_SECRET: ---Any Secret key---
NEXT_PUBLIC_STRIPE_PUBLISH_KEY: ---Your Stripe public key---
STRIPE_KEY: ---Your Stripe secure key---

Run the project locally with npm run dev.
