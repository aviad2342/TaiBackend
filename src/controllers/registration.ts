import {Request, Response} from "express";
import {DeleteResult} from "typeorm";
import {getRepository} from "typeorm";
import {User} from "../entity/User";
import * as fs from  "fs";
import * as nodemailer from 'nodemailer';
import { Registered } from "../entity/registered";
import { PasswordReset } from "../entity/PasswordReset";


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

    const resObject = {
      id: '',
      firstName: '',
      lastName: '',
      success: true,
      verified: false,
      alreadyVerified: false,
      userSaved: true,
      UpdateRegisteredUser: true,
      notRegistered: false
    }

    if (!pendingUser) {
      resObject.notRegistered = true;
      resObject.success = false;
      return res.json(resObject);
    }

    resObject.id = pendingUser.id;
    resObject.firstName = pendingUser.firstName;
    resObject.lastName = pendingUser.lastName;

    if (pendingUser.verified) {
      resObject.verified = true;
      resObject.alreadyVerified = true;
      resObject.success = false;
      return res.json(resObject);
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
      resObject.userSaved = false;
      resObject.success = false;
     });

     resObject.verified = true;

     pendingUser.verificationDate = new Date();
     pendingUser.verified = true;

     await getRepository(Registered).save(pendingUser).catch( error => {
      resObject.UpdateRegisteredUser = false;
      resObject.verified = false;
      resObject.success = false;
   });


     return res.json(resObject);
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

    const verificationUrl = 'http://localhost:8100/verification/' + result.verificationToken;
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

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        minfo = error;
      }
      result.emailSent = true;
      await getRepository(Registered).save(result);
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

export async function resetUserPassword(req: Request, res: Response): Promise<any> {
    const passwordReset: any = getRepository(PasswordReset).create(req.body);
    const result: PasswordReset = await getRepository(PasswordReset).save(passwordReset);

    const token = result.token;
    const email = result.email;
    const resetPasswordUrl = 'http://localhost:8100/passwordreset/' + token;
    const link = `<p>לאיפוס הסיסמה לחץ על הקישור:</p>
    <br>
    <a href="${resetPasswordUrl}"> קישור לאיפוס הסיסמה</a>
    <br>
    <img src="https://images.ravpages.co.il/xsite_resources/user_content/5c/f5/a5/b4/5cf5a5b4496ea854fc907351d3823ee1/images/3495e0655839037a776975053843933c_226X236.png?ver=3.12&rxc=1532355884" alt="פילאי הנשמה">
  `;

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
       to : email,
       subject : 'איפוס סיסמה',
       text: 'לאיפוס הסיסמה לחץ על הקישור:',
       html: link,
     };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        result.emailSent = false;
        return res.send(result);
      }
    });

   return res.json(result);
}


