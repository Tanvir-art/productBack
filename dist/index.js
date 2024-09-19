"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongodb_1 = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
const uri = "mongodb+srv://sportsProject:Cs1MHvncJ3tparsy@cluster0.crzw9rp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
// Cs1MHvncJ3tparsy    sportsProject
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            // await client.connect();
            // create a porduct collection
            const product = client.db("sportsProject").collection("product");
            const cart = client.db("sportsProject").collection("cart");
            //insert a product
            app.post("/product", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const result = yield product.insertOne(req.body);
                if (result.acknowledged) {
                    res.send(result);
                }
            }));
            // get all product
            app.get("/product", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const { category, price, brand } = req.query;
                const query = {};
                if (category)
                    query.category = category;
                if (price)
                    query.price = { $lte: parseInt(price) };
                if (brand)
                    query.brand = brand;
                const result = yield product.find(query).toArray();
                res.send(result);
            }));
            // // update the product
            // app.put("/product/:id", async (req: Request, res: Response) => {
            //   const id = req.params.id;
            //   const filter = { _id: id };
            //   const updatedDoc = {
            //     $set: req.body,
            //   };
            //   const result = await product.updateOne(filter, updatedDoc);
            //   res.send(result);
            // });
            app.put("/product/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                const filter = { _id: new mongodb_1.ObjectId(id) };
                const options = { upsert: true };
                const updatedDoc = {
                    $set: {
                        name: req.body.name,
                        price: req.body.price,
                        category: req.body.category,
                        brand: req.body.brand,
                        quantity: req.body.quantity,
                        url: req.body.url,
                        description: req.body.description,
                    },
                };
                const result = yield product.updateOne(filter, updatedDoc, options);
                res.send(result);
            }));
            //delete the product
            app.delete("/product/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                const filter = { _id: new mongodb_1.ObjectId(id) };
                const result = yield product.deleteOne(filter);
                res.send(result);
            }));
            // product filter with rating
            app.get("/product/:rating", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const rating = parseInt(req.params.rating);
                const query = { rating: { $gte: rating } };
                const result = yield product.find(query).toArray();
                res.send(result);
            }));
            //create cart prouduct
            app.post("/cart", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const result = yield cart.insertOne(req.body);
                if (result.acknowledged) {
                    res.send(result);
                }
            }));
            // get all cart
            app.get("/cart", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const result = yield cart.find({}).toArray();
                res.send(result);
            }));
            // update the cart
            app.put("/cart/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                const filter = { _id: new mongodb_1.ObjectId(id) };
                const options = { upsert: true };
                const updatedDoc = {
                    $set: {
                        name: req.body.name,
                        price: req.body.price,
                        category: req.body.category,
                        brand: req.body.brand,
                        quantity: req.body.quantity,
                        url: req.body.url,
                        description: req.body.description,
                    },
                };
                const result = yield cart.updateOne(filter, updatedDoc, options);
                res.send(result);
            }));
            // delete the cart
            app.delete("/cart/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                const filter = { _id: new mongodb_1.ObjectId(id) };
                const result = yield cart.deleteOne(filter);
                res.send(result);
            }));
            // Send a ping to confirm a successful connection
            // await client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }
        finally {
            // Ensures that the client will close when you finish/error
            // await client.close();
        }
    });
}
run().catch(console.dir);
app.get("/", (req, res) => {
    res.send("sporting store management running");
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
