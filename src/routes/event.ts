import { Router } from "express";
import { createEvent, getEvents } from "../controllers/eventController";
// import { authenticate } from "../middleware/authenticate";


const eventRouter = Router();
// router.use(authenticate);

eventRouter.get("/", (req, res) => {
  res.status(200).json({
     status: "success",
     message: "Event route is working"
     });
});

eventRouter.post("/create", createEvent);
eventRouter.get("/all", getEvents); 


export default eventRouter;