// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());

// let user = {
//   name: "Vislavath Pavani",
//   email: "pavani.vislavath@example.com",
//   interests: "devops",
//   image:
//     "https://media.licdn.com/dms/image/v2/D5603AQHRwgH-wOGhrw/profile-displayphoto-scale_400_400/B56Ztw9LcxGsAk-/0/1767126647489?e=2147483647&v=beta&t=h77i5crR_pdV9f76rtTEqxb1JhywFiwUzcupCiDMNk8"
// };

// app.get("/profile", (req, res) => {
//   setTimeout(() => {
//     res.json(user);
//   }, 1000);
// });

// app.put("/profile", (req, res) => {
//   res.json({
//     message: "Profile Updated",
//     user: req.body
//   });
// });

// app.listen(8000, () => {
//   console.log("Server running on port 8000");
// });

/** ---------------------------------------------------- */

/**  Connect Node Server with
MongoDB container */

/** ---------------------------------------------------- */

const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri =
  "mongodb://admin:password@localhost:27017/?authSource=admin";

const client = new MongoClient(uri);

let usersCollection;

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();

    const db = client.db("user-account");
    usersCollection = db.collection("users");

    app.listen(8000, () => {
      console.log("Server running on port 8000");
    });
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
  }
}

connectDB();

// GET Profile --------------------- Error 1
// app.get("/profile", async (req, res) => {
//   try {
//     const user = await usersCollection.findOne({});

//     res.json(user);
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       message: "Failed to fetch profile"
//     });
//   }
// });


// GET Profile
app.get("/profile", async (req, res) => {
  try {
    let user = await usersCollection.findOne({});

    if (!user) {
      user = {
        name: "Vislavath Pavani",
        email: "pavani.vislavath@example.com",
        interests: "devops",
        image:
          "https://media.licdn.com/dms/image/v2/D5603AQHRwgH-wOGhrw/profile-displayphoto-scale_400_400/B56Ztw9LcxGsAk-/0/1767126647489?e=2147483647&v=beta&t=h77i5crR_pdV9f76rtTEqxb1JhywFiwUzcupCiDMNk8"
      };

      await usersCollection.insertOne(user);
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

// UPDATE Profile --------------------- Error 2
// app.put("/profile", async (req, res) => {
//   try {
//     await usersCollection.updateOne(
//       {},
//       {
//         $set: req.body
//       },
//       {
//         upsert: true
//       }
//     );

//     const updatedUser = await usersCollection.findOne({});

//     res.json({
//       message: "Profile Updated",
//       user: updatedUser
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       message: "Failed to update profile"
//     });
//   }
// });


// UPDATE Profile
app.put("/profile", async (req, res) => {
  try {
    const { _id, ...userData } = req.body;

    // console.log(req.body);
    await usersCollection.updateOne(
      {},
      {
        $set: userData
      },
      {
        upsert: true
      }
    );

    const updatedUser = await usersCollection.findOne({});

    res.json({
      message: "Profile Updated",
      user: updatedUser
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update profile"
    });
  }
});