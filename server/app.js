require('dotenv').config(); //to save sensitive information on .env file
const express= require('express');
const cors= require('cors');
require('./db/conn')  //connect to DB
const app= express();

const PORT= process.env.PORT || 8000;

// app.options('*', cors())
app.use(cors({credentials: false, origin: "*"}));
app.use(express.json())  //to get data from user as json format
const router = require('./router/auth');
app.use(router);  //all restAPi calls

app.listen(PORT,'0.0.0.0',()=>{
    console.log('Connected to port '+PORT);
    const Sample= require('./model/sampleSchema');
    
  Sample.aggregate([
    // {
    //   $match: {
    //     $or: [
    //       {
    //         $and: [
    //           { $expr: { $lt: [{ $toDouble: { $substr: ["$income", 1, -1] } }, 5] } },
    //           { $or: [{ "car": { $eq: "BMW" } }, { "car": { $eq: "Mercedes-Benz" } }] },
    //         ]
    //       },
    //       {
    //         $and: [
    //           { "phone_price": { $gt: 10000 } },
    //           { "gender": { $eq: "Male" } },
    //         ]
    //       },
    //       {
    //         $and: [
    //           { "last_name": /^M/ },
    //           { $expr: { $gt: [{ $strLenCP: '$quote' }, 15] } },
    //           { $expr: { $gte: [{ $indexOfCP: ["$email", { $toLower: "$last_name" }] }, 0] } }
    //         ]
    //       },
    //       {
    //         $and: [
    //           { $or: [{ "car": { $eq: "BMW" } }, { "car": { $eq: "Mercedes-Benz" } }, { "car": { $eq: "Audi" } }] },
    //           { "email": { $not: { $regex: "[0-9]+" } } }
    //         ]
    //       }

    //     ]
    //   }
    // },
    {$group: { _id: "$city", avgIncome: {$avg: {$toDouble :{ $substr: ["$income", 1, -1]}}}, count: { $sum: 1 } }},
    {$sort:{"count":-1}},
    {$limit:10}
  ]).exec().then((users) => {
    console.log(users);
    // res.json({ matchedusers: users })
  })
})