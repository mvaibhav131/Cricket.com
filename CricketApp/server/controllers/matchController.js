
const Match = require("../models/Match");


const createMatch = async(req,res)=>{
    const newMatch= new Match(req.body);
    try{
        const saveMatch = await newMatch.save();
        res.status(200).send(saveMatch);
     }
     catch(err){
        res.status(500).send(err);
     }
}


const getMatchById = async(req,res)=>{
    try{
        const match=await Match.findById(req.params.id);
        res.status(200).send(match);
    }
    catch(err){
        res.status(500).send(err);
    }
}


const getMatchByDate = async(req,res)=>{
    try{
        const date=await Match.findById(req.params.matchdate_local);
        res.status(200).send(date);
    }
    catch(err){
        res.status(500).send(err);
    }
}


const getAllMatch=async(req,res)=>{
    try{
        const matches=await Match.find();
        res.status(200).send(matches);
    }
    catch(err){
        res.status(500).send(err);
    }
}

module.exports={createMatch,getMatchById,getMatchByDate ,getAllMatch}