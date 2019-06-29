require("dotenv").config();
const app = require("./server/serveur");
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Serveur is listening on port ${PORT}`);
});
