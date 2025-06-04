// The port theat the database will run on
const port = process.env.PORT || 4000;

// Initializing the variables required
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://ancyl:aancyl103@cluster0.qcycg4t.mongodb.net/",
  {
    bufferCommands: false,
  }
);

// React app will connect to port 4000
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect("mongodb+srv://ancyl:aancyl103@cluster0.qcycg4t.mongodb.net/");

// API
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Schema for Creating Product
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  new_price: {
    type: Number,
    required: true,
  },

  old_price: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  avilable: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Creating API for getting all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.send(products);
});

// Createing API for User Schema
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Creating API for NewsLetter Schma
const NewsLetter = mongoose.model("NewsLetter", {
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

// Creating Endpoint to Save new newsletter user
app.post("/newsletter", async (req, res) => {
  try {
    let check = await NewsLetter.findOne({ email: req.body.email });
    if (check) {
      return res
        .status(400)
        .json({ success: false, error: "Email Address Already Registered!" });
    }

    let subscriber = new NewsLetter({
      email: req.body.email,
    });

    await subscriber.save();

    res.status(201).json({
      success: true,
      message: "User registered for newsletter successfully.",
    });
  } catch (error) {
    console.error("Error during News Letter Registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Creating API for Admin Schema
const Admin = mongoose.model("Admin", {
  name: {
    type: String,
  },
  password: {
    type: String,
  },
});

// Creating Endpoint for registering Admin
app.post("/adminsignup", async (req, res) => {
  try {
    let check = await Admin.findOne({ name: req.body.name });
    if (check) {
      return res.status(400).json({
        success: false,
        error: "An admin with the same name already exists",
      });
    }

    let admin = new Admin({
      name: req.body.name,
      password: req.body.password,
    });

    await admin.save();

    const data = {
      admin: {
        id: admin.id,
      },
    };

    const token = jwt.sign(data, "secret_ecom");
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error during admin registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Creating Endpoint for registering User
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      error: "existing user found with the same email address",
    });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

// Creating Endpoint for admin login
app.post("/adminlogin", async (req, res) => {
  try {
    let admin = await Admin.findOne({ name: req.body.name });
    if (admin) {
      const passCompare = req.body.password === admin.password;
      if (passCompare) {
        const data = {
          admin: {
            id: admin.id,
          },
        };

        const token = jwt.sign(data, "secret_ecom");
        res.json({ success: true, token });
      } else {
        res.json({ success: false, errors: "Wrong Password" });
      }
    } else {
      res.json({ success: false, errors: "Admin not found" });
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Creating Endpoint for user login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ sucess: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ sucess: false, erros: "Wrong Email ID" });
  }
});

// Creating API for removal of product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Creating Endpoint for newcollection data
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  // Using this we get the recently added 4 products
  let newcollection = products.slice(1).slice(-4);
  console.log("New Collection Fetched");
  res.send(newcollection);
});

// Creating Endpoint for popular products
app.get("/popular", async (req, res) => {
  let products = await Product.find({ category: "men" });
  let popular_in_men = products.slice(0, 4);
  console.log("Popular in men fetched");
  res.send(popular_in_men);
});

// Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "Use valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ error: "Invalid token" });
    }
  }
};

// Creating Endpoint for adding products to Cart
app.post("/addtocart", fetchUser, async (req, res) => {
  try {
    let userData = await Users.findOne({ _id: req.user.id });
    // Check if the user data and cart data exist
    if (!userData || !userData.cartData) {
      throw new Error("User data or cart data not found");
    }

    // Increment the quantity of the item in the cart
    let itemId = req.body.itemId;
    userData.cartData[itemId] = (userData.cartData[itemId] || 0) + 1;

    // Update the user's cart data
    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );

    // Send JSON response
    res.json({ message: "Added to cart" });
  } catch (error) {
    // Handle errors
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Error adding to cart" });
  }
});

// Creating Endpoint to remove products form cartdata
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("Removing cart item");
  try {
    let userData = await Users.findOne({ _id: req.user.id });
    // Check if the user data and cart data exist
    if (!userData || !userData.cartData) {
      throw new Error("User data or cart data not found");
    }

    // Decrement the quantity of the item in the cart
    let itemId = req.body.itemId;
    if (userData.cartData[itemId] > 0) {
      userData.cartData[itemId]--; // Decrement only if quantity is greater than 0
      if (userData.cartData[itemId] === 0) {
        // If quantity reaches 0, consider removing the item from the cart
        delete userData.cartData[itemId];
      }
    } else {
      throw new Error("Item quantity is already 0");
    }

    // Update the user's cart data
    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );

    // Send JSON response
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    // Handle errors
    console.error("Error removing from cart:", error);
    res.status(500).json({ error: "Error removing from cart" });
  }
});

// Creating endpoint to get cartData
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("Get Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port" + port);
  } else {
    console.log("Error : " + error);
  }
});

// Image Storage
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Upload funtion
const upload = multer({ storage: storage });

// Upload Endpoint for Images
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    // If the image is uploaded it responds with 1
    success: 1,
    image_url: `https://ecospin-ecommerce-backend.onrender.com/images/${req.file.filename}`,
  });
});

const Review = mongoose.model("Review", {
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// API endpoint to add a review
app.post("/addreview", async (req, res) => {
  try {
    const review = new Review({
      productId: req.body.productId,
      username: req.body.username,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    await review.save();
    console.log("Review added:", review);
    res.json({ success: true, review });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ success: false, error: "Error adding review" });
  }
});

app.get("/allreviews", async (req, res) => {
  let reviews = await Review.find({});
  console.log("All Reviews Fetched");
  res.send(reviews);
});

// Creating API for removal of review
app.post("/removereview", async (req, res) => {
  try {
    const reviewId = req.body.reviewId;
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      console.log("Review not found");
      return res
        .status(404)
        .json({ success: false, error: "Review not found" });
    }

    console.log("Review Removed:", deletedReview);
    res.json({ success: true, deletedReview });
  } catch (error) {
    console.error("Error removing review:", error);
    res.status(500).json({ success: false, error: "Error removing review" });
  }
});

// Schema for Order
const Order = mongoose.model("Order", {
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentDetails: {
    cardHolder: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: Number,
      required: true,
    },
    cvv: {
      type: Number,
      required: true,
    },
    expiration: {
      type: Date,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false, // Default value set to false
  },
});

app.post("/placeorder", async (req, res) => {
  try {
    // Extract total amount, payment details, address, and email from request body
    const { totalAmount, paymentDetails, address, email } = req.body;

    // Create a new order instance
    const order = new Order({
      totalAmount,
      paymentDetails: {
        cardHolder: paymentDetails.cardholderName,
        cardNumber: paymentDetails.cardNumber,
        cvv: paymentDetails.cvv,
        expiration: paymentDetails.expiration,
        postalCode: paymentDetails.postalCode,
      },
      address,
      email,
      orderDate: new Date(),
    });

    // Save the order to the database
    await order.save();

    // Return success response
    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, error: "Error placing order" });
  }
});

app.get("/allorders", async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find({});

    // Send the fetched orders in the response
    res.json({ success: true, orders });
  } catch (error) {
    // Handle errors
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, error: "Error fetching orders" });
  }
});

app.put("/markcompleted/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const completed = req.body.completed;

    // Update the completed field of the order
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { completed },
      { new: true }
    );

    if (!updatedOrder) {
      console.log("Order not found");
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    console.log("Order marked as completed:", updatedOrder);
    res.json({ success: true, updatedOrder });
  } catch (error) {
    console.error("Error marking order as completed:", error);
    res
      .status(500)
      .json({ success: false, error: "Error marking order as completed" });
  }
});
