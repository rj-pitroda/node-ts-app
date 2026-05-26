import express from "express";

const app = express();

app.use("/", (req, res) => {
  return res.send("Welcome to Nodejs project");
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
