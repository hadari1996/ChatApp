
import mongoose from "mongoose";
const MessagesSchema = new mongoose.Schema(

  {

    createdDate: Date,

    message: {
      text: {
        type: String,
        required: true,
      },
    },

    users: Array,
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

  
  },
    

  {
    timestamps: true,
  },


);
const MessagesModel = mongoose.model("Messages", MessagesSchema);

export default MessagesModel;
