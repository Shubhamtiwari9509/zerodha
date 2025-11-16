function  isAuthenticated(req,res,next){
 if (req.isAuthenticated()) {
    return next(); // user is logged in, continue
  }
  res.status(401).json({ error: 'Unauthorized. Please login first.' });
}

module.exports = isAuthenticated;
