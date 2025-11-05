/**
 * Course Controller
 * Handles CRUD operations for courses
 */

import { Response } from 'express';
import { AuthRequest } from '../types';
import { prisma } from '../utils/prisma';

/**
 * Create a new course
 */
export const createCourse = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }

    const { title, description, outline } = req.body;

    const course = await prisma.course.create({
      data: {
        userId: req.user.userId,
        title,
        description,
        outline
      }
    });

    res.status(201).json({
      success: true,
      data: course,
      message: 'Course created successfully'
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create course'
    });
  }
};

/**
 * Get all courses for authenticated user
 */
export const getUserCourses = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }

    const courses = await prisma.course.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { lessons: true }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: courses
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses'
    });
  }
};

/**
 * Get a specific course with all lessons
 */
export const getCourse = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }

    const { id } = req.params;

    const course = await prisma.course.findFirst({
      where: {
        id,
        userId: req.user.userId
      },
      include: {
        lessons: {
          orderBy: [
            { moduleIndex: 'asc' },
            { lessonIndex: 'asc' }
          ]
        }
      }
    });

    if (!course) {
      res.status(404).json({
        success: false,
        message: 'Course not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course'
    });
  }
};

/**
 * Delete a course
 */
export const deleteCourse = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }

    const { id } = req.params;

    // Verify ownership
    const course = await prisma.course.findFirst({
      where: {
        id,
        userId: req.user.userId
      }
    });

    if (!course) {
      res.status(404).json({
        success: false,
        message: 'Course not found'
      });
      return;
    }

    // Delete course and all associated lessons (cascade)
    await prisma.course.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete course'
    });
  }
};

/**
 * Save a generated lesson to a course
 */
export const saveLesson = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }

    const { id: courseId } = req.params;
    const { moduleIndex, lessonIndex, title, content } = req.body;

    // Verify course ownership
    const course = await prisma.course.findFirst({
      where: {
        id: courseId,
        userId: req.user.userId
      }
    });

    if (!course) {
      res.status(404).json({
        success: false,
        message: 'Course not found'
      });
      return;
    }

    // Check if lesson already exists
    const existingLesson = await prisma.lesson.findFirst({
      where: {
        courseId,
        moduleIndex,
        lessonIndex
      }
    });

    let lesson;
    if (existingLesson) {
      // Update existing lesson
      lesson = await prisma.lesson.update({
        where: { id: existingLesson.id },
        data: { title, content }
      });
    } else {
      // Create new lesson
      lesson = await prisma.lesson.create({
        data: {
          courseId,
          moduleIndex,
          lessonIndex,
          title,
          content
        }
      });
    }

    res.status(200).json({
      success: true,
      data: lesson,
      message: 'Lesson saved successfully'
    });
  } catch (error) {
    console.error('Save lesson error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save lesson'
    });
  }
};
