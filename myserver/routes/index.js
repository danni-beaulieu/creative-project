import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/users.js";
import { verifyToken } from "../middleware/verify.js";
import { refreshToken } from "../controllers/refresh.js";
import { 
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject
} from "../controllers/projects.js";
import { chargeStripe, newCustomer } from "../controllers/stripe.js";
 
const router = express.Router();
 
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

router.get('/projects', getAllProjects);
router.get('/projects/:id', getProjectById);
router.post('/projects', createProject);
router.patch('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

router.post('/stripe/charge', chargeStripe);
router.get('/stripe/customer', newCustomer);
 
export default router;