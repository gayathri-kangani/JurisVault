const express = require("express");
const Collection = require("./mongoose"); // Correct import
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json("Welcome to the API");
});

app.post("/auth", async (req, res) => {
  const total = Object.keys(req.body).length;
  if (total == 3) {
    //================= Login ==========================
    const { username, metamaskId, password } = req.body;
      try {
        const checkMetamaskId = await Collection.findOne({ metamaskId });
        const checkUsername = await Collection.findOne({ username });

        if (checkMetamaskId && checkUsername) {
          const passwordMatch = await bcrypt.compare(password, checkMetamaskId.password);
          if (passwordMatch) {
            res.json("exists");
          } else {
            res.json("Wrong Password");
          }
        } else if (!checkMetamaskId && !checkUsername) {
          res.json("not exists");
        } else if (!checkUsername) {
          res.json("Username not exists");
        } else {
          res.json("MetamaskId not exists");
        }
      } catch (error) {
        res.json("not exists");
      }

  } else {
    //========================= Register ===========================
    const { username, email, role, metamaskId, password, confirmPassword } = req.body;

    // Check if any required fields are empty
    if (!username || !email || !role || !metamaskId || !password || !confirmPassword) {
      res.json("Please fill in all required fields");
      return; // Exit the function early if any field is empty
    }

    // Check if email is in correct format
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(email)) {
      res.json("Please enter a valid email address");
      return; // Exit the function early if email format is incorrect
    }

    //console.log('data recieved:', username, email, role, metamaskId, password, confirmPassword);
    const hashedPassword = await bcrypt.hash(password, 10);
    if (password === confirmPassword) {
      console.log("pwd==conpwd");
      const data = {
        username: username,
        email: email,
        role: role,
        metamaskId: metamaskId,
        password: hashedPassword,
      };
      try {
        const check = await Collection.findOne({ metamaskId: metamaskId });
        console.log(check);
        if (check) {
          console.log("exists");
          res.json("exists");
        } else {
          res.json("not exists");
          console.log("data inserted");
          await Collection.insertMany([data]);
        }
      } catch (error) {
        res.json("not exists");
      }
    } else {
      res.json("passwords do not match");
    }

  }
});

app.get('/profile/:metaMaskId', async (req, res) => {
  try {
    const user = await Collection.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $strcasecmp: ["$metamaskId", req.params.metaMaskId] }, 0] }
        }
      }
    ]);

    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user[0]); // Assuming you expect only one user to match
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/header/:metaMaskId', async (req, res) => {
  try {
    const user = await Collection.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $strcasecmp: ["$metamaskId", req.params.metaMaskId] }, 0] }
        }
      }
    ]);

    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ username: user[0].username }); // Assuming you expect only one user to match
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(5000, () => {
  console.log("Server Started");
});
