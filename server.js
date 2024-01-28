const express = require("express");
const dotenv = require("dotenv");
const app = express();
require("./db/conn");
const router = require("./routes/router");

app.use(express.json());
app.use(router);

dotenv.config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
