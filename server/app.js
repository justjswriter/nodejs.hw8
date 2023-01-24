const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const fs = require("fs")
const cors = require("cors");

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: "false" }));

app.get("/categories", (req, res) =>{
    res.send(fs.readFileSync("./category.json", {encoding: "utf-8"}));
});

app.post("/categories", (req, res) =>{
    const categoryArray = JSON.parse(fs.readFileSync("./category.json", {encoding: "utf-8"}))
    fs.writeFileSync("./category.json", JSON.stringify([...categoryArray, {id: categoryArray.at(-1)?.id + 1 || 1, name: req.body.name}]));
    res.send("category added");
});

app.get("/products", (req, res) =>{
    res.send(fs.readFileSync("./product.json", {encoding: "utf-8"}));
});

app.get("/products/:categoryId", (req, res) =>{
    const categoryId = +req.params.categoryId
    const productsArray = JSON.parse(fs.readFileSync("./product.json", {encoding: "utf-8"}))
    const newArrray = productsArray.filter(item => item.categoryId === +categoryId)
    res.send(newArrray);
});

app.post("/products", (req, res) =>{
    const productsArray = JSON.parse(fs.readFileSync("./product.json", {encoding: "utf-8"}))
    fs.writeFileSync("./product.json", JSON.stringify([...productsArray, {id: productsArray.at(-1)?.id + 1 || 1, name: req.body.name,price: +req.body.price, categoryId: +req.body.categoryId}]));
    res.send("product added");
});





app.listen(8080);
