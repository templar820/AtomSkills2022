import { Router } from 'express';
import { auth } from '../middleware/authMiddleware';
import authRouter from './authRouter';
import { errorHandler } from '../middleware/errorHandler';
import stream from './stream';
import claimType from './claimType';
import claim from './claimsRouter';
import roleRouter from './roleRouter';
import state from './state';
import priority from './prioriy';
import sla from './sla';
import history from './history';
import people from './People';

const router = Router();

router.use(authRouter);
router.use(roleRouter)
// router.use(auth);
router.use(stream);
router.use(claimType)
router.use(history)
router.use(people)
router.use(claim)
router.use(priority)
router.use(state)
router.use(sla)
router.use(errorHandler);

export default router;
