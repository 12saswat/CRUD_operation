const express = require("express");
const app = express();
const userModel = require("./models/user");
const methodOverride = require("method-override");

const port = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(methodOverride("_method")); // Allow using _method in forms

//To show the form
app.get("/", async (req, res) => {
  const allUsers = await userModel.find();
  res.render("index", { allUsers });
});

//To create the Users
app.post("/create", async (req, res) => {
  const { name, age, mobileNumber, gender } = req.body;
  if (!name || !age || !mobileNumber || !gender) {
    res.send("eneter all the data");
  }
  //   return res.send(`
  //     <html>
  //       <body>
  //         <script>
  //           alert('All fields are required! Please fill out the missing fields.');
  //           window.history.back(); // Stay on the same page and let the user correct the form
  //         </script>
  //       </body>
  //     </html>
  //   `);
  // }

  await userModel.create({
    name,
    age,
    mobileNumber,
    gender,
  });

  const allUsers = await userModel.find();
  res.render("users", { allUsers });
});

app.get("/users", async (req, res) => {
  const allUsers = await userModel.find();
  res.render("users", { allUsers });
});

//To Show the all Users
app.get("/create", async (req, res) => {
  const allUsers = await userModel.find();
  res.status(200).render("index", { allUsers });
});

//To delete a specific user
app.post("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await userModel.findByIdAndDelete(id);
    const allUsers = await userModel.find();
    res.render("users", { allUsers }); // Redirect back to the home page after deletion
  } catch (err) {
    res.send("User not deleted");
  }
});

app.get("/edit/:id", async (req, res) => {
  const user = await userModel.findOne({ _id: req.params.id });
  res.render("edit", { user });
});

//To Edit specific user
app.post("/update/:id", async (req, res) => {
  const { name, age, mobileNumber, gender } = req.body;
  try {
    const user = await userModel.findOneAndUpdate(
      { _id: req.params.id },
      { name, age, mobileNumber, gender },
      { new: true }
    );
    return res.status(200).redirect("/users");
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
