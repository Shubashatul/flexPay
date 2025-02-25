import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import UserSignup from "./routes/UserSignup.js";
import UserSignin from "./routes/UserSignin.js";
import UserSearch from "./routes/UserSearch.js";
import authMiddleWare from "./middlewares/authMiddleWare.js";
import UserInfo from "./routes/UserInfo.js";
import CheckUser from "./routes/CheckUser.js";
import TransferMoney from "./routes/TransferMoney.js";
const PORT = process.env.PORT || 3001;





const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user/signup", UserSignup);
app.use("/api/user/signin", UserSignin);
app.use("/api/user/search", authMiddleWare, UserSearch);
app.use("/api/user/getInfo",authMiddleWare,UserInfo);
app.use("/api/user/checkUser", authMiddleWare, CheckUser);
app.use("/api/user/transferMoney",authMiddleWare,TransferMoney);







app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
