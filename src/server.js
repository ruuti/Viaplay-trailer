import "dotenv/config";
import express from "express";
import routes from "routes";

const app = express();

// Add /trailer endpoints
app.use('/trailer', routes.trailer);

export default app;
