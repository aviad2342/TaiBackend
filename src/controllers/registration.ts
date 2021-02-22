import {Request, Response} from "express";
import {DeleteResult} from "typeorm";
import {getRepository} from "typeorm";
import {User} from "../entity/User";
import * as fs from  "fs";
import * as nodemailer from 'nodemailer';
import { Registered } from "../entity/registered";


export async function getRegisteredUsers(req: Request, res: Response): Promise<void> {
    const users: Registered[] = await getRepository(Registered).find();
        res.json(users);
}

export async function getRegisteredUser(req: Request, res: Response): Promise<void> {
     const user: Registered = await getRepository(Registered).findOne(req.params.id);
         res.json(user);
 }

 export async function verifyUser(req: Request, res: Response): Promise<any> {
    const pendingUser: Registered = await getRepository(Registered).findOne({ where: { verificationToken: req.params.token } });

    if (!pendingUser) {
        return;
    }

    const newUser = new User();
        newUser.id = pendingUser.id;
        newUser.firstName = pendingUser.firstName;
        newUser.lastName = pendingUser.lastName;
        newUser.password = pendingUser.password;
        newUser.phone = pendingUser.phone;
        newUser.email = pendingUser.email;
        newUser.date = pendingUser.date;
        newUser.country = pendingUser.country;
        newUser.city = pendingUser.city;
        newUser.street = pendingUser.street;
        newUser.houseNumber = pendingUser.houseNumber;
        newUser.apartment = pendingUser.apartment;
        newUser.entry = pendingUser.entry;
        newUser.profilePicture = pendingUser.profilePicture;

    const user: any = getRepository(User).create(newUser);

    const results: User = await getRepository(User).save(user).catch( error => {
        return ;
     });

     pendingUser.verificationDate = new Date();
     pendingUser.verified = true;
     await getRepository(Registered).save(pendingUser);

     return res.json(results);
}

 export async function registerUser(req: Request, res: Response): Promise<any> {
     const user: any = getRepository(Registered).create(req.body);
     let minfo;
    // hash the password, to securely store on DB
     user.hashPassword();

    const result: Registered = await getRepository(Registered).save(user).catch( error => {
      const imagePhat: string = user.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
      if(fs.existsSync(imagePhat)) {
          fs.unlinkSync(imagePhat);
      }
   });

    const verificationUrl = 'http://aviadbenhayun.com:3000/api/register/verify/' + result.verificationToken;
    const link = `<a href="${verificationUrl}">קישור להפעלת חשבון</a>`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
        auth: {
          user: 'subconsciou.Service@gmail.com',
          pass: 'aviad2342'
        },
     }
    );
    const mailOptions = {
       from : 'subconsciou.Service@gmail.com',
       to : result.email,
       subject : 'הפעלת חשבון פלאי הנשמה',
       text: 'להפעלת החשבון לחץ על הקישור:',
       html: link,
     };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        minfo = error;
      }
      minfo = info;
    });

    return res.json(result);
}


export async function deleteRegisteredUser(req: Request, res: Response): Promise<any> {
    const user: Registered = await getRepository(Registered).findOne(req.params.id);
    const imagePhat: string = user.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    const results: DeleteResult = await getRepository(Registered).delete(req.params.id);
    return res.json(results);
}

export async function getRegisteredUserByMail(req: Request, res: Response): Promise<any> {
      const user: Registered = await getRepository(Registered).findOne({ where: { email: req.params.email } });
      return res.json(user);
}

export async function testMail(req: Request, res: Response): Promise<any> {

    let minfo;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
        auth: {
          user: 'subconsciou.Service@gmail.com',
          pass: 'aviad2342'
        },
     }
    );
    const mailOptions = {
       from : 'subconsciou.Service@gmail.com',
       to : 'aviad2342@walla.com',
       subject : 'Hello',
       text: 'Hello from node.js',
       html: "<b>Hello world?</b>",
     };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        minfo = error;
      }
      minfo = info;
    });

   return res.json(minfo);
}


