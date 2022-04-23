import express from "express";
import { getUsers, Register, Login, Logout, updateUser } from "../controllers/users.js";
import { verifyToken } from "../middleware/verify.js";
import { refreshToken } from "../controllers/refresh.js";
import { 
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject
} from "../controllers/projects.js";
import { chargeStripe, createIntent, newCustomer, getMethods, deleteMethod, updateMethod } from "../controllers/stripe.js";
 
const router = express.Router();
 
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.patch('/users/:id', updateUser);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

router.get('/projects', getAllProjects);
router.get('/projects/:id', getProjectById);
router.post('/projects', createProject);
router.patch('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

router.post('/stripe/charge', chargeStripe);
router.post('/stripe/customer', newCustomer);
router.get('/stripe/customer/:id', getMethods);
router.post('/stripe/intent', createIntent);
router.delete('/stripe/method/:id', deleteMethod);
router.patch('/stripe/method/:id', updateMethod);
 
export default router;