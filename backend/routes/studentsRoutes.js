const express = require("express")
const router = express.Router()
const Student = require("../model/Students")

// GET students
router.get("/", async (req, res) => {

 const students = await Student.find()

 res.json(students)

})

// CREATE student
router.post("/", async (req, res) => {

 const student = new Student(req.body)

 const saved = await student.save()

 res.json(saved)

})

// UPDATE student
router.put("/:id", async (req, res) => {

 await Student.findByIdAndUpdate(req.params.id, req.body)

 res.json({ message: "Student updated" })

})

// DELETE student
router.delete("/:id", async (req, res) => {

 await Student.findByIdAndDelete(req.params.id)

 res.json({ message: "Student deleted" })

})

module.exports = router