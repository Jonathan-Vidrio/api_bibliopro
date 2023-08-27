import mongoose from "mongoose";
import { configDB } from "../config";

mongoose.connect(configDB.cluster, {
        useNewUrlParser: true,
        useUnifiedTopology: true
})
    .then(db => console.log("DB is connected"))
    .catch(err => console.log(err));