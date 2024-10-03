const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const Employee = require('../models/t_Employee');


const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single('file');

const generateHash = ()=> {
  const timestamp = Date.now();
  return timestamp%1000;
}

exports.addEmployee = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({
        error: 'File upload failed',
        message: err.message,
      });
    }
    const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: 'Image is required',
      });
    }

    const user = await Employee.findOne({ f_Email : f_Email });
    if (user) {
          return res.status(409).json({ message: 'User email exits' });
    }

    const data = new Employee({
      f_Id: generateHash(), 
      f_Image: req.file.filename,
      f_Name: f_Name,
      f_Email: f_Email,
      f_Mobile: f_Mobile,
      f_Designation: f_Designation,
      f_gender: f_gender,
      f_Course: f_Course,
      f_Createdate: new Date(),
    });

    try {
      const projectSaved = await data.save();

      res.status(201).json({
        message: 'Employee added successfully',
        employee: projectSaved,
      });
    } catch (err) {
      console.error(err);
      console.log("lh")
      res.status(500).json({
        message: 'An error occurred while processing your request.',
      });
    }
  });
};

exports.updateEmployee = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({
        error: 'File upload failed',
        message: err.message,
      });
    }

    const { id } = req.params; 
    const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;

    try {
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({
          message: 'Employee not found',
        });
      }

      const user = await Employee.findOne({ f_Email : f_Email,
        _id: { $ne: employee._id}});
      if (user) {
          return res.status(409).json({ message: 'User email exits' });
      }

      if (req.file) {
        employee.f_Image = req.file.filename; 
      }
      employee.f_Name = f_Name || employee.f_Name; 
      employee.f_Email = f_Email || employee.f_Email;
      employee.f_Mobile = f_Mobile || employee.f_Mobile;
      employee.f_Designation = f_Designation || employee.f_Designation;
      employee.f_gender = f_gender || employee.f_gender;
      employee.f_Course = f_Course || employee.f_Course; 
      employee.f_Updatedate = new Date();
      const updatedEmployee = await employee.save();

      res.status(200).json({
        message: 'Employee updated successfully',
        employee: updatedEmployee,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'An error occurred while processing your request.',
      });
    }
  });
};

exports.getEmployees = async (req,res) => {
    try {
        const employees = await Employee.find(); 
        res.json(employees); 
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching employee data' });
      }
}

exports.deleteEmployee = async(req, res)=>{
  const { id } = req.params;

    try {
        const deletedUser = await Employee.findByIdAndDelete(id);
        
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getEmployeeDetails = async(req, res) => {
  const userId = req.params.id;

    try {
        const user = await Employee.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); 
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}