const express = require('express');
const router = express.Router();

const { upload, uploadLessonFiles } = require('../middleware/upload');
const { createLesson } = require('../controllers/lessonController');
const Course = require('../models/Course');
const {
  createCourse,
  getAllCourses,
  getCourse,
  buyCourse,
  enrollFreeCourse
} = require('../controllers/courseController');

// 🟢 Create Course (with thumbnail upload)
router.post('/create', upload.single('thumbnail'), createCourse);

// 🟢 Get all courses
router.get('/all', getAllCourses);

// 🟢 Get one course by ID
router.get('/:id', getCourse);

// 🟢 Get courses by instructor
router.get('/instructor/:instructorId', async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.params.instructorId }, '_id title');
    res.json({ data: courses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Purchase course
router.post('/buy/:courseId', buyCourse);

// 🟢 Enroll in free course
router.post('/enroll/:id', enrollFreeCourse);

// 🟢 Add lessons (uses pre-configured fields upload)
router.post('/:courseId/lessons', uploadLessonFiles, createLesson);

module.exports = router;
