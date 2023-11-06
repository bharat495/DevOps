const cloudinary = require("cloudinary").v2;
const nodemailer = require('nodemailer');
const Admin = require('../models/adminSchema');
const jwt = require('jsonwebtoken');

// Models
const Member = require('../models/membersSchema');
const Students = require('../models/studentSchema');
const Event = require('../models/eventsSchema');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use the email service you prefer (e.g., Gmail, Yahoo, etc.)
  auth: {
    user: 'bharatsharma98971@gmail.com', // Your email address
    pass: 'yvnk mzsy btiz ucdj', 
  },
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res;
  }

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username && password) {
      // Assuming Admin is your Mongoose model for administrators
      const admin = await Admin.findOne({ username, password });

      if (admin) {
        // Authentication succeeded
        const expirationTime = 7 * 24 * 60 * 60;
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: expirationTime });

        // Set a cookie and send a success response
        res.cookie('admin_token', token, {
          maxAge: expirationTime * 1000, 
        });
        
        return res.status(200).json({ message: 'Success', status: 200 });
      } else {
        // Authentication failed
        return res.status(400).json({ message: 'Invalid credentials', status: 400 });
      }
    } else {
      // Invalid request, missing username or password
      return res.status(400).json({ message: 'Missing credentials', status: 400 });
    }
  } catch (error) {
    console.error(error);
    // Internal server error
    return res.status(500).json({ message: 'Internal server error', status: 500 });
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie('jwt_token');
    return res.status(200).json({ message: 'Success', status: 200 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', status: 500 });
  }
}

const PostMember = async(req,res)=>{
  try {
    let imageUrl = null;
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI);
      imageUrl = cldRes.url;
    }
    const { name,position,role,description,year,branch,linkedin,github,instagram } = req.body;
    const member = new Member({ name,position,description,year,branch,linkedin,github,instagram,image : imageUrl });
    await member.save();
  setTimeout(() => {
    res.status(201).json({ message: 'Member Added!!!' });
  }, 1000);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Operation failed' });
  }
}

const PostEvent = async(req, res) => {
  try {
    let imageUrl = null;

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI);
      imageUrl = cldRes.url;
    }

    const { title, description } = req.body;
    const event = new Event({ title, description, image : imageUrl });
    await event.save();
    // Fetch all user emails from your database
    const users = await Students.find({}, 'email');
    const emailList = users.map(user => user.email);

    const mailOptions = {
      from: 'bharatsharma232@apsit.edu.in', // Sender's email address
      to: emailList, // Recipient's email addresses (array of user emails)
      subject: 'APSIT', // Email subject
      text: 'APSIT here!!!', // Email body in plain text
    };

    // Send the email to all users
    await transporter.sendMail(mailOptions);
    res.status(201).json({ message: 'Post registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Operation failed' });
  }
}

const logout = async(req,res)=>{
  try {
    res.clearCookie('admin_token');
    return res.status(200).json({ message: 'Success', status: 200 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', status: 500 });
  }
}

module.exports = { Login,PostMember,PostEvent,logout }