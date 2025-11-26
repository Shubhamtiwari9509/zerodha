require('dotenv').config();
const express=require("express");
const {holding}=require("./model/holdingsModel");
const {position}=require("./model/positionModel");
const {order}=require("./model/orderModel");
const { default: mongoose } = require('mongoose');
const app=express();
const port=process.env.PORT ||8080;
const url=process.env.MONGO_URL;
const bodyParser=require("body-parser");
const  session = require('express-session');
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./schemas/user");
const cors=require("cors");
const BACKEND_URL=process.env.BACKEND_URL;
const FRONTEND_URL=process.env.FRONTEND_URL;
const DASHBOARD_URL=process.env.DASHBOARD_URL;
app.use(cors({
  origin: [ "http://localhost:3001","http://localhost:3000" ],
  credentials: true
}));


const isAuthenticated = require('./middleware/isAuthenticated');


app.use(bodyParser.json());

 

app.use(session({
  secret:process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'none',
    secure: true,
  }
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

 
app.get("/signup",(req,res)=>{
  console.log("lllssss");
    res.redirect("http://localhost:3000/signup");
})
app.post("/signup", async (req, res,next) => {
  console.log("lllsss2");
  const { email, username, password } = req.body;
  try {
    const newUser = new User({ email, username });
    await User.register(newUser, password);
   req.login(newUser, (err) => {
  if (err) return next(err);
  return res.status(200).json({ message: 'Signup & login successful!', user: newUser });
});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get("/login",(req,res)=>{
  console.log("lll");
    res.redirect("http://localhost:3000/login");
})

app.post('/login', (req, res, next) => {
  console.log("lll22");
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    req.login(user, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res, next);
});

app.get('/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});

app.get("/logout",(req,res)=>{
  req.logOut(()=>{
   req.session.destroy((err)=>{
    if(err){
       return  res.status(500).json({Error:"Logout failed"});
    }
     res.clearCookie('connect.sid');  
      res.json({ message: 'Logged out successfully' });
   });
  });
});

 
app.get("/allholdings",async(req,res)=>{
  console.log("hellllll");
    let holdings= await  holding.find({});
    res.json(holdings);
      
});

app.get("/allpositions",async(req,res)=>{
  console.log("helppppppl");
    let allpositions= await position.find({});
    res.json(allpositions);
     
});

app.post("/newOrder",async(req,res)=>{
    const newOrder= new order({
    name: req.body.name,
    qty:  req.body.qty,
    price:req.body.price,
    mode: req.body.mode,
    });
    await newOrder.save();
    res.send("order save !");
})
app.listen(port,()=>{
    console.log("Server Start");
    mongoose.connect(url);
    console.log("DB connected  !  ",port);
});

 