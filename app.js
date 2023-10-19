const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

const registroRoutes = require("./routes/registro");
app.use("/registro", registroRoutes);


app.listen(port, () => {
  console.log(`Servidor en puerto ${port}`);
});
