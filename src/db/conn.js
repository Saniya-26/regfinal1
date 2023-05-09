
/*main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://27017/login');  
}*/
const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://saniya2604:Pbl2604@cluster0.ithxs3u.mongodb.net/", {
    useNEWUrlParser:true,
    useUnifiedTopology:true,
    //useCreateIndex:true,
    //useFindAndModify:true
}).then(()=>{
    console.log(`connection successful`);
}).catch((e)=>{
    console.log(e);
});
