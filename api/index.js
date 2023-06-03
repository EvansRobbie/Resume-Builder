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
 const getUserDataFromToken = (req) =>{
  return new Promise((resolve, reject) =>{
    jwt.verify(req.cookies.token, jwtSecret, {}, (e, userData) =>{
      if (e) throw(e);
      resolve(userData)
    })
  })
 }
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
 app.get("/api/profile", (req, res) => {
  // mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  // res.json({token})
  if (token) {
    // try and verify the token
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
     const {username, email, _id} = await User.findById(user.id)
      res.json({username, email, _id});
    });
  } else {
    res.json(null);
  }
});
app.post('/api/logout', (req, res) =>{
  res.cookie('token', '').json(true)

})
// Post details to the database
app.post("/api/personal", async (req, res) => {
  // get token to verify the user
  const {token} = req.cookies
  const { name, email, address, phone, website, linked } = req.body;
  jwt.verify(token, jwtSecret, { }, async (e, user) =>{
    if (e) throw e;
    try {
      const postData = await Personal.create({
        user:user.id,
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

  })
});
app.post("/api/objective", async (req, res) => {
  const userData = await getUserDataFromToken(req)
  const { objective } = req.body;

  try {
    const postData = await Objective.create({
      objective, user:userData.id
    });
    res.json(postData);
  } catch (e) {
    res.status(500).json("ailed to post details");
  }
});
app.post("/api/experience", async (req, res) => {
  const userData = await getUserDataFromToken(req)
  const { companyName, jobTitle, start, end, details } = req.body;

  try {
    const postData = await Experience.create({
      user:userData.id,
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
  const userData = await getUserDataFromToken(req)
  // res.json(userData)
  const { course, school, grade, year } = req.body;

  try {
    const postData = await Education.create({
      user:userData.id,
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
  const userData = await getUserDataFromToken(req)
    const { content } = req.body;
  
    try {
      const postData = await Skills.create({
        user:userData.id,
        content,
      });
      res.json(postData);
    } catch (e) {
      res.status(500).json("ailed to post details");
    }
  });
  app.post("/api/projects", async (req, res) => {
    const userData = await getUserDataFromToken(req)
    const { title, description } = req.body;
  
    try {
      const postData = await Projects.create({
        user:userData.id,
        title,
        description
      });
      res.json(postData);
    } catch (e) {
      res.status(500).json("ailed to post details");
    }
  });
  app.post("/api/certifications", async (req, res) => {
    const userData = await getUserDataFromToken(req)
    const { certificate } = req.body;
  
    try {
      const postData = await Certification.create({
        user:userData.id,
        certificate
      });
      res.json(postData);
    } catch (e) {
      res.status(500).json("Failed to post details");
    }
  });
  app.post("/api/reference", async (req, res) => {
    const userData = await getUserDataFromToken(req)
    const { referees} = req.body;
    // res.json(referees)
    try {
      const postData = await Reference.create({
        user:userData.id,
          referees
      });
      res.json(postData);
    } catch (e) {
      res.status(500).json("Failed to post details");
    }
  });
// Fetch all Details for the resume Download
  app.get('/api/resume', async (req, res) =>{
    const userData =  await getUserDataFromToken(req)
    try{
        const personal = await Personal.find({user: userData.id})
        const objective = await Objective.find({user: userData.id})
        const experience = await Experience.find({user: userData.id})
        const education = await Education.find({user: userData.id})
        const skills = await Skills.find({user: userData.id})
        const projects = await Projects.find({user: userData.id})
        const certification = await Certification.find({user: userData.id})
        const reference = await Reference.find({user: userData.id})

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
  const userData =  await getUserDataFromToken(req)
  try{
    const personal = await Personal.findOne({user: userData.id})
    res.json(personal)
  }
  catch(e){
    console.error('Failed to fetch personal details', e);
    res.status(500).json({ error: 'Failed to fetch personal details' });
  }
})
app.get('/api/objective', async (req, res) =>{
  const userData =  await getUserDataFromToken(req)
  try{
    const objective = await Objective.findOne({user: userData.id})
    res.json(objective)
  }
  catch(e){
    console.error('Failed to fetch Objective', e);
    res.status(500).json({ error: 'Failed to fetch Objective' });
  }
})
app.get('/api/experience', async (req, res) =>{
  const userData =  await getUserDataFromToken(req)
  try{
    const experience = await Experience.findOne({user: userData.id})
    res.json(experience)
  }
  catch(e){
    console.error('Failed to fetch Experience details', e);
    res.status(500).json({ error: 'Failed to fetch Experience details' });
  }
})
app.get('/api/education', async (req, res) =>{
  const userData =  await getUserDataFromToken(req)
  // res.json(userData.id)
  try{
    const education = await Education.findOne({user: userData.id})
    res.json(education)
  }
  catch(e){
    console.error('Failed to fetch Education Details', e);
    res.status(500).json({ error: 'Failed to fetch  Education Details' });
  }
})
app.get('/api/skills', async (req, res) =>{
  const userData =  await getUserDataFromToken(req)
  try{
    const skills = await Skills.findOne({user: userData.id})
    res.json(skills)
  }
  catch(e){
    console.error('Failed to fetch Skills Details', e);
    res.status(500).json({ error: 'Failed to fetch  Skills Details' });
  }
})
app.get('/api/projects', async (req, res) =>{
  const userData =  await getUserDataFromToken(req)
  try{
    const projects = await Projects.findOne({user: userData.id})
    res.json(projects)
  }
  catch(e){
    console.error('Failed to fetch Projects Details', e);
    res.status(500).json({ error: 'Failed to fetch  Projects Details' });
  }
})
app.get('/api/certification', async (req, res) =>{
  const userData =  await getUserDataFromToken(req)
  try{
    const certification = await Certification.findOne({user: userData.id})
    res.json(certification)
  }
  catch(e){
    console.error('Failed to fetch Certification Details', e);
    res.status(500).json({ error: 'Failed to fetch  Certification Details' });
  }
})
app.get('/api/referee', async (req, res) =>{
  const userData =  await getUserDataFromToken(req)
  try{
    const referee = await Reference.findOne({user: userData.id})
    res.json(referee)
  }
  catch(e){
    console.error('Failed to fetch Referee Details', e);
    res.status(500).json({ error: 'Failed to fetch  Referee Details' });
  }
})

// Edit details and update them to Mongo Atlas DB
app.put('/api/personal', async (req, res) =>{
    const userData = await getUserDataFromToken(req)
    const { name, email, address, phone, website, linked } = req.body;
    // console.log({user})
    try{
      const personal = await Personal.findOneAndUpdate({
        user:userData.id,
        name, email, address, phone, website, linked,
        new: true
     } )
      res.json(personal)
    }catch(e){
      console.log('Failed to update personal details', e)
      res.status(500).json('Failed to update personal details');
    }
})
app.put('/api/objective', async (req, res) =>{
  const userData = await getUserDataFromToken(req)
  const { objective } = req.body;
  // console.log({user})
  try{
    const objectiveDetails = await Objective.findOneAndUpdate({
      user:userData.id,
      objective,
      new: true
   } )
    res.json(objectiveDetails)
  }catch(e){
    console.log('Failed to update objective details', e)
    res.status(500).json('Failed to update objective details');
  }
})
app.put('/api/experience', async (req, res) =>{
  const userData = await getUserDataFromToken(req)
  const { companyName, jobTitle, start, end, details } = req.body;
  // console.log({user})
  try{
    const experience = await Experience.findOneAndUpdate({
      user:userData.id,
      companyName, jobTitle, start, end, details,
      new: true
   } )
    res.json(experience)
  }catch(e){
    console.log('Failed to update experience details', e)
    res.status(500).json('Failed to update experience details');
  }
})
app.put('/api/education', async (req, res) =>{
  const userData = await getUserDataFromToken(req)
  const { course, school, grade, year } = req.body;
  // console.log({user})
  try{
    const education = await Education.findOneAndUpdate({
      user:userData.id,
      course, school, grade, year,
      new: true
   } )
    res.json(education)
  }catch(e){
    console.log('Failed to update education details', e)
    res.status(500).json('Failed to update education details');
  }
})
app.put('/api/skills', async (req, res) =>{
  const userData = await getUserDataFromToken(req)
  const { content } = req.body;
  // console.log({user})
  try{
    const skills = await Skills.findOneAndUpdate({
      user:userData.id,
      content,
      new: true
   } )
    res.json(skills)
  }catch(e){
    console.log('Failed to update skills details', e)
    res.status(500).json('Failed to update skills details');
  }
})
app.put('/api/projects', async (req, res) =>{
  const userData = await getUserDataFromToken(req)
  const { title, description } = req.body;
  // console.log({user})
  try{
    const projects = await Projects.findOneAndUpdate({
      user:userData.id,
      title, description,
      new: true
   } )
    res.json(projects)
  }catch(e){
    console.log('Failed to update projects details', e)
    res.status(500).json('Failed to update projects details');
  }
})
app.put('/api/certifications', async (req, res) =>{
  const userData = await getUserDataFromToken(req)
  const { certificate } = req.body;
  // console.log({user})
  try{
    const certification = await Certification.findOneAndUpdate({
      user:userData.id,
      certificate,
      new: true
   } )
    res.json(certification)
  }catch(e){
    console.log('Failed to update certification details', e)
    res.status(500).json('Failed to update certification details');
  }
})
app.put('/api/reference', async (req, res) =>{
  const userData = await getUserDataFromToken(req)
  const { referees} = req.body;
  // console.log({user})
  try{
    const reference = await Reference.findOneAndUpdate({
      user:userData.id,
      referees,
      new: true
   } )
    res.json(reference)
  }catch(e){
    console.log('Failed to update reference details', e)
    res.status(500).json('Failed to update reference details');
  }
})
// Post details for AI prompt to generate a resume Sample
app.listen(port);
