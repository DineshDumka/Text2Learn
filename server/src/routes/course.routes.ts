/**
 * Course management routes
 * CRUD operations for user courses
 */

import { Router } from 'express';
import {
  createCourse,
  getUserCourses,
  getCourse,
  deleteCourse,
  saveLesson
} from '../controllers/course.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// All course routes require authentication
router.use(authMiddleware);

router.post('/', createCourse);
router.get('/', getUserCourses);
router.get('/:id', getCourse);
router.delete('/:id', deleteCourse);
router.post('/:id/lessons', saveLesson);

export default router;
