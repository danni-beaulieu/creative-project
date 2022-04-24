import express from "express";
import { getUsers, 
  Register, 
  Login, 
  Logout, 
  updateUser } from "../controllers/users.js";
import { verifyToken } from "../middleware/verify.js";
import { refreshToken } from "../controllers/refresh.js";
import { 
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject
} from "../controllers/projects.js";
import { chargeStripe, 
  createIntent, 
  newCustomer, 
  getMethods, 
  deleteMethod, 
  updateMethod, 
  getMethod } from "../controllers/stripe.js";
import { createCollaborator, 
  getAllCollaborators } from "../controllers/collaborators.js";
import { makeDonation } from "../controllers/donations.js";
 
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

router.get('/collaborators', getAllCollaborators);
router.post('/collaborators', createCollaborator);

router.post('/donations', makeDonation);

router.post('/stripe/charge', chargeStripe);
router.post('/stripe/customer', newCustomer);
router.get('/stripe/customer/:id', getMethods);
router.post('/stripe/intent', createIntent);
router.delete('/stripe/method/:id', deleteMethod);
router.patch('/stripe/method/:id', updateMethod);
router.get('/stripe/method/:id', getMethod);
 
export default router;