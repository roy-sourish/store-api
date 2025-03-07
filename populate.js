require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");
const jsonProducts = require("./products.json");

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(jsonProducts);
    console.log("Data imported...");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async() =>{
  try {
    await Product.deleteMany();
    console.log("Data destroyed...");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

if(process.argv[2] == '-d'){
  destroyData();
}
else{
  importData();
}
