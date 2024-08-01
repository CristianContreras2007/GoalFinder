const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('Authorization header:', authHeader); 
  
    const token = authHeader && authHeader.split(' ')[1];
    console.log('Extracted token:', token); 
  
    if (token == null) {
      return res.status(401).json({ error: 'Token required' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log('Token verification error:', err.message); 
        return res.status(403).json({ error: 'Forbidden' });
      }
  
      req.user = user;
      next();
    });
  };
  
  module.exports = authenticateToken;
  