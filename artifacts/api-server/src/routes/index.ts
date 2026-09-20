import { Router, type IRouter } from "express";
import healthRouter from "./health";
import weaponsRouter from "./weapons";

const router: IRouter = Router();

router.use(healthRouter);
router.use(weaponsRouter);

export default router;
