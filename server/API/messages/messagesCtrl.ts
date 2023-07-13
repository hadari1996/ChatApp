import MessagesModel from "./messagesModel";

export async function addMessage(req, res) {
  try {
    const {from, to, message , createdDate}= req.body;
    const data= await MessagesModel.create({
        message:{text:message},
        users:[from, to], 
        from:from,
        createdDate:createdDate

    })
    if(data) 
        return res.send({msg:"Message addedd successfully"})
   throw new Error("Failed to add message to DB ");
   
   }
   
   catch(error) {
    res.status(500).send({error: error.message, status:false });
  }
}


export async function getAllMessage(req, res) {
    try {
        const {from, to}= req.body;
        const messages=  await MessagesModel.find({
            users:{
                $all:[from ,to],
                
            }
        }).sort({updateAt:1});
        const allMessages= messages.map((msg)=>{
            return{
                fromSelf:msg.from.toString()===from,
                message: msg.message.text, 
                createdDate:msg.createdDate
        
            }
        });

        res.send(allMessages);
     }
     
     catch(error) {
      res.status(500).send({error: error.message, status:false });
    }
  }