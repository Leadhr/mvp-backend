require("dotenv").config();

const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const mongoose = require("mongoose");

const passport = require("./passport/setup");
const auth = require("./routes/auth");

const app = express();
const PORT = 3001;

app.use(cors());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.on("open", () => console.log("Connected to Database"));

// Bodyparser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(
  session({
    secret: "very secret this is",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes

app.use("/api/auth", auth);

const questionsRouter = require("./routes/questions");
app.use("/questions", questionsRouter);

const answersRouter = require("./routes/answers");
app.use("/answers", answersRouter);

app.listen(PORT, () => console.log("Server Started"));
