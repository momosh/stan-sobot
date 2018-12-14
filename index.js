const express = require("express");
const proxy = require("express-http-proxy");
const app = express();
const port = 5000;

app.use("/proxy", proxy("http://sobot.software"));

app.listen(port, () => console.log(`Proxy server listening on port ${port}!`));
