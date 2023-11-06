const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Models
const User = require('../models/studentSchema');
const Member = require('../models/membersSchema');
const Event = require('../models/eventsSchema');
const Feedback = require('../models/feedbackSchema');

const Register = async (req, res) => {
    try {
      const { name,email,password,confirm_password,year,branch,division } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(409).json({ message: 'User with this email already exists' });
      }

      // Hash the user's password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
      const hashedConfirmPassword = await bcrypt.hash(confirm_password, 10);
  
      // Create a new user in the database
      const user = new User({ name, email, password: hashedPassword,confirm_password : hashedConfirmPassword,year,branch,division });
      await user.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Registration failed' });
    }
  };

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });

    console.log("u",user);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('p',passwordMatch);
    if (!passwordMatch) {
return res.status(401).json({ message: 'Invalid email or password' });
}
    const expirationTime = 7 * 24 * 60 * 60; // Set the token expiration time in seconds
    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id, email: user.email,name: user.name }, process.env.JWT_SECRET, {
      expiresIn: expirationTime, // Set the expiration time as needed
    });

    // Send the token as a response and store it as a cookie
    res.cookie('student_token', token, {
      maxAge: expirationTime * 1000, // Convert to milliseconds
    });

    // Respond with the token and user ID
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie('student_token');
    return res.status(200).json({ message: 'Success', status: 200 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', status: 500 });
  }
}

const getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const fetchEvents = async(req,res)=>{
  try {
    const events = await Event.find();
    res.status(200).json({events:events});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Operation failed' });
  }
}

const getDetailedEvent = async(req,res)=>{
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json({event:event});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Operation failed' });
  }
}

const storeFeedback = async(req,res)=>{
  try {
    const { name,message,eventId } = req.body;
    console.log(name,message,eventId);
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0];
    const feedback = new Feedback({loggedinuser:name,message,time:currentDate});
    await feedback.save();

    const event = await Event.findById(eventId);
    event.comments.push(feedback);
    await event.save();
    
    res.status(201).json({ message: 'Feedback stored successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Operation failed' });
  }
}

const loadFeedbacks = async(req,res)=>{
  try {
    const { id } = req.body;
    const comments = await Event.findById(id).populate('comments');
    res.status(200).json({comments:[comments]});
  } catch (error) {
    console.error(error);
  }

}

const logout = async(req,res)=>{
  try {
    res.clearCookie('student_token');
    return res.status(200).json({ message: 'Success', status: 200 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', status: 500 });
  }
}

module.exports = { Register, Login, Logout, getMembers,fetchEvents,getDetailedEvent,storeFeedback,loadFeedbacks,logout };