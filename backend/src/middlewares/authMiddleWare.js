import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
   
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({ error: 'Authorization token is missing or invalid.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; 
    next();
  } catch (e) {
    res.status(401).send({ error: 'Invalid or expired token. Please authenticate again.' });
  }
};



export default authMiddleware;
