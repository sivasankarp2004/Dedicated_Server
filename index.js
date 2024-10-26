const mongoose=require("mongoose")
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const {Smodel}=require("./sModel")

const mongoURI = 'mongodb+srv://kaschostel4:sivasankar@kaschostelcluster0.nopfs.mongodb.net/studentform'

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const app = express();
app.use(bodyParser.json());
app.use(cors());


async function callApi() {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC + 5:30
    const istDate = new Date(now.getTime() + istOffset);

    const hours = istDate.getUTCHours().toString().padStart(2, '0');  
    const minutes = istDate.getUTCMinutes().toString().padStart(2, '0');
    const seconds = istDate.getUTCSeconds().toString().padStart(2, '0');
    

    if ((hours == 9 && minutes == 0) || (hours == 13 && minutes == 0) || (hours == 16 && minutes == 0)) {
        let response1 = await Smodel.find({});
        for (let i = 0; i < response1.length; i++) {
            response1[i].status = "on";
            await response1[i].save();
           console.log("Changed to on")
        }
    }

    if ((hours == 9 && minutes == 50) || (hours == 14 && minutes == 0) || (hours == 20 && minutes == 6)) {
        let response2 = await Smodel.find({});
        for (let i = 0; i < response2.length; i++) {
            response2[i].status = "off";
            await response2[i].save();
            console.log("Changed to off")
        }
    }
}
cron.schedule('* * * * * *', () => { 
    callApi()
});
app.listen(process.env.PORT||5000,()=>console.log("Port connected"))
