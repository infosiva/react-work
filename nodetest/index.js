const express = require('express')
const bodyParser = require('body-parser');;
const app = express()
app.use(bodyParser.json())
const port = 3000
const candidatesArr = []
app.post('/candidates', (req, res) => {
    const reqBody = req.body;
    const candidate = {
        id: reqBody.id,
        name: reqBody.id,
        skills: reqBody.skills
    }
    candidatesArr.push(candidate)
    res.json(candidatesArr)
})
app.get('/candidate/search', (req) => {
    const skillsToMatch = req.query.skills;
    const commaSeparatedSkills = skillsToMatch.split(',');
    const statisticsArr = [];
    const CandidateStatistics = {
        id: Number,
        skillsMatch: Number
    }
    for (cnt=0; cnt < candidatesArr.length -1 ; cnt ++) {
        const skillCount = 0;
        commaSeparatedSkills.forEach(skill => {
            if (candidatesArr[cnt].skills.indexOf(skill) >=0) {
                skillCount+=1;  
            }
        })
        if (skillCount) {
            statisticsArr.push({
                id: candidatesArr[cnt].id,
                skillsMatch: skillCount
            })  
        }
    }
    if (statisticsArr.length) {
        const maxSkillsCandidate= statisticsArr.reduce((next, prev) => next > prev ? next : prev)
        res.json(candidatesArr.filter(candidate => maxSkillsCandidate.id))
    }
    else {
        res.send(404)
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})