const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/clients", require("./routes/clientRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
// app.use('/api/send', require('./routes/mailRoutes'));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
