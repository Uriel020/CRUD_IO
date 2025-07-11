import { IUser } from "../interfaces/IUser";
import UserRepository from "../repositories/user.repository";

enum Condition {
  Hash = "hash",
  Verify = "verify",
}

class UserService {

  constructor(private readonly userRepo = new UserRepository()) {}

  async registerUser (body: Partial<IUser>):Promise<IUser>{
    const {email, password, username, active} = body;


    // const newUser = await this.userRepo.create()
  }
  async login (body: Partial<IUser>):Promise<void>{
    
  }
  async logout (body: Partial<IUser>):Promise<void>{
    
  }
  async softDeleteuser (idUser: string):Promise<void>{

  }

  async validateExistUser (email: string):Promise<boolean>{
    const exist = await this.userRepo.findByEmail(email);
    return !!exist;
  }

  async handlePassword (receivedPassword: string, condition: Condition, userPassword?:string ): Promise<string | boolean>{
   

  }


}

export default UserService;
