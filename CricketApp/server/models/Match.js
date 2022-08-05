const {Schema,model}=require("mongoose");

const MatchSchema = new Schema({
    equation:{
        type:String,
        
    },
    league:{
        type:String,
        required:true
    },
    matchstatus:{
        type:String,
        required:true
    },
    matchdate_local:{
        type:String,
        required:true
    },
    matchtime_local:{
        type:String,
        required:true
    },
    matchtype:{
        type:String,
        required:true
    },
    seriesname:{
        type:String,
        required:true
    },
    teama:{
        type:String,
        required:true
    },
    teamb:{
        type:String,
        required:true
    },
    venue:{
        type:String,
        required:true
    },
});

const Match = model("Match",MatchSchema);
module.exports=Match;