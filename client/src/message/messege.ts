// import User from "../user";

import { User } from "../features/user/userModel";


export interface Message {
    createdDate: Date,
    message: {
      text: String
      },
    users: User[],
    from: User,
}