const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const User = require('./models/User')
const Personal = require("./models/Personal");
const Objective = require("./models/Objective");
const Experience = require("./models/Experience");
const Education = require("./models/Education");
const Skills = require("./models/Skills");
const Projects = require("./models/Projects");
const Certification = require("./models/Certification");
const Reference = require("./models/Reference");
const app = express();
require("dotenv").config();
const port = 4000;
mongoose.connect(process.env.MONGO_URL);
// console.log(process.env.MONGO_URL)

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
app.use(cookieParser())
const jwtSecret = 'E3P5S8X4G2B7F1Y9D6I0C3R6K9T2Z1A7L'
const bcryptSalt = bcrypt.genSaltSync(10)
app.get("/api/test", (req, res) => {
  res.json("Test Ok");
});
 app.post('/api/register', async (req, res)=>{
    const {username, email, password} = req.body
    // res.json(username, email, password)
    try {
      const userData = await User.create({
        username, email, password:bcrypt.hashSync(password, bcryptSalt)
      })
      res.json(userData)
    } catch (e) {
      console.log('Failed to create User', e)
      res.status(422).json("Failed to create User")
    }

 })

 app.post('/api/login', async (req, res) =>{
    const {username, password} = req.body
    const userData = await User.findOne({username})
    if (userData){
      const passOk = bcrypt.compareSync(password, userData.password)
      if (passOk){
        jwt.sign({
          username:userData.username,
          id:userData._id
        }, jwtSecret, {}, (e, token)=>{
          if(e) throw e;
          res.cookie('token', token).json(userData)
        })
      }else{
          res.status(422).json('Password Did not match')
      }
    }else{
      res.json('User Details Not Found')
    }
 })
// Post details to the database
app.post("/api/personal", async (req, res) => {
  const { name, email, address, phone, website, linked } = req.body;

  try {
    const postData = await Personal.create({
      name,
      email,
      address,
      phone,
      website,
      linked,
    });
    res.json(postData);
  } catch (e) {
    res.status(500).json("ailed to post details");
  }
});
app.post("/api/objective", async (req, res) => {
  const { objective } = req.body;

  try {
    const postData = await Objective.create({
      objective,
    });
    res.json(postData);
  } catch (e) {
    res.status(500).json("ailed to post details");
  }
});
app.post("/api/experience", async (req, res) => {
  const { companyName, jobTitle, start, end, details } = req.body;

  try {
    const postData = await Experience.create({
      companyName,
      jobTitle,
      start,
      end,
      details,
    });
    res.json(postData);
  } catch (e) {
    res.status(500).json("Failed to post details");
  }
});
app.post("/api/education", async (req, res) => {
  const { course, school, grade, year } = req.body;

  try {
    const postData = await Education.create({
      course,
      school,
      grade,
      year,
    });
    res.json(postData);
  } catch (e) {
    res.status(500).json("Failed to post details");
  }
});
app.post("/api/skills", async (req, res) => {
    const { content } = req.body;
  
    try {
      const postData = await Skills.create({
        content,
      });
      res.json(postData);
    } catch (e) {
      res.status(500).json("ailed to post details");
    }
  });
  app.post("/api/projects", async (req, res) => {
    const { title, description } = req.body;
  
    try {
      const postData = await Projects.create({
        title,
        description
      });
      res.json(postData);
    } catch (e) {
      res.status(500).json("ailed to post details");
    }
  });
  app.post("/api/certifications", async (req, res) => {
    const { certificate } = req.body;
  
    try {
      const postData = await Certification.create({
        certificate
      });
      res.json(postData);
    } catch (e) {
      res.status(500).json("Failed to post details");
    }
  });
  app.post("/api/reference", async (req, res) => {
    const { name, title, companyName, email, phone,} = req.body;
  
    try {
      const postData = await Reference.create({
        name,
        title,
        companyName,
        email,
        phone,
      });
      res.json(postData);
    } catch (e) {
      res.status(500).json("Failed to post details");
    }
  });
// Fetch all Details for the resume Download
  app.get('/api/resume', async (req, res) =>{
    try{
        const personal = await Personal.find()
        const objective = await Objective.find()
        const experience = await Experience.find()
        const education = await Education.find()
        const skills = await Skills.find()
        const projects = await Projects.find()
        const certification = await Certification.find()
        const reference = await Reference.find()

        const resumeData = {
            personal,
            objective,
            experience,
            education,
            skills ,
            projects,
            certification,
            reference,

        }
        res.json(resumeData)

    }catch(e){
        console.error('Failed to fetch resume data', e);
        res.status(500).json({ error: 'Failed to fetch resume data' });
    
    }
  })

  // Fetch details from the database for edit purposes
app.get('/api/personal', async (req, res) =>{
  try{
    const personal = await Personal.findOne()
    res.json(personal)
  }
  catch(e){
    console.error('Failed to fetch personal details', e);
    res.status(500).json({ error: 'Failed to fetch personal details' });
  }
})
app.get('/api/objective', async (req, res) =>{
  try{
    const objective = await Objective.findOne()
    res.json(objective)
  }
  catch(e){
    console.error('Failed to fetch Objective', e);
    res.status(500).json({ error: 'Failed to fetch Objective' });
  }
})
app.get('/api/experience', async (req, res) =>{
  try{
    const experience = await Experience.findOne()
    res.json(experience)
  }
  catch(e){
    console.error('Failed to fetch Experience details', e);
    res.status(500).json({ error: 'Failed to fetch Experience details' });
  }
})
app.get('/api/education', async (req, res) =>{
  try{
    const education = await Education.findOne()
    res.json(education)
  }
  catch(e){
    console.error('Failed to fetch Education Details', e);
    res.status(500).json({ error: 'Failed to fetch  Education Details' });
  }
})
app.get('/api/skills', async (req, res) =>{
  try{
    const skills = await Skills.findOne()
    res.json(skills)
  }
  catch(e){
    console.error('Failed to fetch Skills Details', e);
    res.status(500).json({ error: 'Failed to fetch  Skills Details' });
  }
})
app.get('/api/projects', async (req, res) =>{
  try{
    const projects = await Projects.findOne()
    res.json(projects)
  }
  catch(e){
    console.error('Failed to fetch Projects Details', e);
    res.status(500).json({ error: 'Failed to fetch  Projects Details' });
  }
})
app.get('/api/certification', async (req, res) =>{
  try{
    const certification = await Certification.findOne()
    res.json(certification)
  }
  catch(e){
    console.error('Failed to fetch Certification Details', e);
    res.status(500).json({ error: 'Failed to fetch  Certification Details' });
  }
})
app.get('/api/referee', async (req, res) =>{
  try{
    const referee = await Reference.findOne()
    res.json(referee)
  }
  catch(e){
    console.error('Failed to fetch Referee Details', e);
    res.status(500).json({ error: 'Failed to fetch  Referee Details' });
  }
})

// Edit details and update them to Mongo Atlas DB

// Post details for AI prompt to generate a resume Sample
app.listen(port);
