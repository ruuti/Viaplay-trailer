import "dotenv/config";
import express from "express";
import routes from "routes";
import helmet from "helmet";
import cors from "cors";

const app = express();

// Enable CORS for all domains
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Enable Helmet
app.use(helmet());

// Add /trailer endpoints
app.use('/trailer', routes.trailer);

export default app;
