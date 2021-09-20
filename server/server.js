const mongoose = require('mongoose');
const app = require('./app');

//DB config
const db = require('./config/keys').mongoURI;
//Connection to MongoDB
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('Database server Connected'))
  .catch((error) => console.log(error.message));

//Configuration of server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on PORT http://localhost:${PORT}`);
});
