import authRouter from "./auth.js";
import noteRouter from "./note.js";
import userRouter from "./user.js";
export default function routes(app, express) {
  app.use("/notes", noteRouter(express));
  app.use("/signup", userRouter(express));
  app.use("/signin", authRouter(express));
}
