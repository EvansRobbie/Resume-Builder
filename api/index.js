const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
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

app.get("/api/test", (req, res) => {
  res.json("Test Ok");
});

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
