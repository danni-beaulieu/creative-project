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
  getCollaboratorsByProjectId } from "../controllers/collaborators.js";
import { makeDonation, 
  getDonationsByCustomerId } from "../controllers/donations.js";
 
const router = express.Router();
 
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.patch('/users/:id', verifyToken, updateUser);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

router.get('/projects', verifyToken, getAllProjects);
router.get('/projects/:id', verifyToken, getProjectById);
router.post('/projects', verifyToken, createProject);
router.patch('/projects/:id', verifyToken, updateProject);
router.delete('/projects/:id', verifyToken, deleteProject);

router.get('/collaborators/:id', verifyToken, getCollaboratorsByProjectId);
router.post('/collaborators', verifyToken, createCollaborator);

router.get('/donations/:id', verifyToken, getDonationsByCustomerId);
router.post('/donations', verifyToken, makeDonation);

router.post('/stripe/charge', verifyToken, chargeStripe);
router.post('/stripe/customer', verifyToken, newCustomer);
router.get('/stripe/customer/:id', verifyToken, getMethods);
router.post('/stripe/intent', verifyToken, createIntent);
router.delete('/stripe/method/:id', verifyToken, deleteMethod);
router.patch('/stripe/method/:id', verifyToken, updateMethod);
router.get('/stripe/method/:id', verifyToken, getMethod);
 
export default router;