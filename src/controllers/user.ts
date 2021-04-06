import {Request, Response} from "express";
import {getConnection, Repository, DeleteResult} from "typeorm";
import {getRepository} from "typeorm";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import {User} from "../entity/User";
import * as fs from  "fs";
import { PasswordReset } from "../entity/PasswordReset";

 // const userRepository: Repository<User> = await getRepository(User);

export async function getUsers(req: Request, res: Response): Promise<void> {
    const users: User[] = await getRepository(User).find({ relations: ["address"]});
        res.json(users);
}

export async function getUser(req: Request, res: Response): Promise<void> {
     const user: User = await getRepository(User).findOne(req.params.id, { relations: ["address"]});
         res.json(user);
 }

export async function getUserAddress(req: Request, res: Response): Promise<void> {
    const user: User = await getRepository(User).findOne(req.params.id, { relations: ["address"]});
        res.json(user.address);
}

export async function getUserPreferences(req: Request, res: Response): Promise<void> {
    const user: User = await getRepository(User).findOne(req.params.id, { relations: ["address", "preferences"]});
        res.json(user.preferences);
}

export async function getUserCart(req: Request, res: Response): Promise<void> {
    const user: User = await getRepository(User).findOne(req.params.id, { relations: ["address", "cart", "cart.items"]});
        res.json(user.cart);
}

export async function getUserOrders(req: Request, res: Response): Promise<void> {
    const user: User = await getRepository(User).findOne(req.params.id, { relations: ["address", "orders"]});
        res.json(user.orders);
}

export async function getFullUser(req: Request, res: Response): Promise<void> {
    const user: User = await getRepository(User).findOne(req.params.id, { relations: ["address", "preferences", "cart", "cart.items", "orders"]});
        res.json(user);
}

export async function addUser(req: Request, res: Response): Promise<any> {
     const user: any = getRepository(User).create(req.body);

    // hash the password, to securely store on DB
     user.hashPassword();

    const results: User = await getRepository(User).save(user).catch( error => {
        const imagePhat: string = user.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
        if(fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
     });
    return res.json(results);
}


export async function registerUser(req: Request, res: Response): Promise<any> {
    const user: any = getRepository(User).create(req.body);

   // hash the password, to securely store on DB
    user.hashPassword();

   const results: User = await getRepository(User).save(user);
   return res.json(results);
}

export async function updateUser(req: Request, res: Response): Promise<any> {
    const user: User = await getRepository(User).findOne(req.params.id);
    if(user.profilePicture !== req.body.profilePicture) {
        const imagePhat: string = user.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    }
    getRepository(User).merge(user, req.body);
    const results: User = await getRepository(User).save(user);
    return res.json(results);
}

export async function updateFullUser(req: Request, res: Response): Promise<any> {
    const user: User = await getRepository(User).findOne(req.params.id, { relations: ["address", "preferences", "cart", "cart.items", "orders"]});
    if(user.profilePicture !== req.body.profilePicture) {
        const imagePhat: string = user.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    }
    getRepository(User).merge(user, req.body);
    const results: User = await getRepository(User).save(user);
    return res.json(results);
}


export async function deleteUser(req: Request, res: Response): Promise<any> {
    const user: User = await getRepository(User).findOne(req.params.id);
    const imagePhat: string = user.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    const results: DeleteResult = await getRepository(User).delete(req.params.id);
    return res.json(results);
}

export async function getUserByMail(req: Request, res: Response): Promise<any> {
      const user: User = await getRepository(User).findOne({ where: { email: req.params.email } });
      return res.json(user);
}

export async function getPasswordReset(req: Request, res: Response): Promise<void> {
    const passwordReset: PasswordReset = await getRepository(PasswordReset).findOne(req.params.token);
        res.json(passwordReset);
}

export async function updateUserPassword(req: Request, res: Response): Promise<any> {
    const user: User = await getRepository(User).findOne(req.params.id);
    const oldPassword = user.password;
    const passwordReset: PasswordReset = await getRepository(PasswordReset).findOne(req.params.token);
    getRepository(User).merge(user, req.body);
    // hash the password, to securely store on DB
    user.hashPassword();
    const result: User = await getRepository(User).save(user);
    passwordReset.success = (oldPassword !== result.password);
    passwordReset.activated = passwordReset.success;
    const passwordResetResult: PasswordReset = await getRepository(PasswordReset).save(passwordReset);
    return res.json(passwordResetResult);
}


