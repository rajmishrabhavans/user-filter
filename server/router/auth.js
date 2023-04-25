const express = require('express');
const router = express.Router();
const Sample= require('../model/sampleSchema');

router.get('/', (req, res) => {
  res.send('home page')
});

function isInteger(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseInt(str)) // ...and ensure strings of whitespace fail
}

//sends the users with the given type
router.post('/fetchUsers', async (req, res) => {
  const { type } = req.body;
  if (!type || !isInteger(type)) return res.status(400).json({ error: "type not provided/Invalid type" })
  if(parseInt(type)>4 || parseInt(type)<1) return res.status(400).json({ error: "Invalid type provided" })
  let sample;
  try {
    if (type === "1") {
      sample = await Sample.find({
        $and: [
          { $expr: { $lt: [{ $toDouble: { $substr: ["$income", 1, -1] } }, 5] } },
          { $or: [{ "car": { $eq: "BMW" } }, { "car": { $eq: "Mercedes-Benz" } }] },
        ]
      })
    } else if (type === "2") {
      sample = await Sample.find({
        $and: [
          { "phone_price": { $gt: 10000 } },
          { "gender": { $eq: "Male" } },
        ]
      })

    } else if (type === "3") {
      sample = await Sample.find({
        $and: [
          { "last_name": /^M/ },
          { $expr: { $gt: [{ $strLenCP: '$quote' }, 15] } },
          { $expr: { $gte: [{ $indexOfCP: ["$email", { $toLower: "$last_name" }] }, 0] } }
        ]
      })

    } else if (type === "4") {
      sample = await Sample.find({
        $and: [
          { $or: [{ "car": { $eq: "BMW" } }, { "car": { $eq: "Mercedes-Benz" } }, { "car": { $eq: "Audi" } }] },
          { "email": { $not: { $regex: "[0-9]+" } } }
        ]
      })

    }
    res.json({ matchedUsers: sample })
  } catch (err) {
    return res.status(500).json({ error: "Unable to fetch with type " + type })
  }
})


//sends the top 10 group with average income
router.post('/fetchGroup', async (req, res) => {
      Sample.aggregate([
        {$group: { _id: "$city", avgIncome: {$avg: {$toDouble :{ $substr: ["$income", 1, -1]}}}, count: { $sum: 1 } }},
        {$sort:{"count":-1,avgIncome:-1}},
        {$limit:10}
      ]).exec().then((group) => {
        console.log(group);
        return res.json({ matchedGroup: group })
      }).catch((err) =>{
        return res.status(500).json({ error: "Unable to fetch with type " + type })
      })
})

module.exports = router;