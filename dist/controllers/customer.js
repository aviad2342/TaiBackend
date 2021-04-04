"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export async function getCustomers(req: Request, res: Response): Promise<void> {
//     const customers: Customer[] = await getRepository(Customer).find();
//         res.json(customers);
// }
// export async function getCustomer(req: Request, res: Response): Promise<void> {
//      const customer: Customer = await getRepository(Customer).findOne(req.params.id);
//          res.json(customer);
//  }
//  export async function addCustomer(req: Request, res: Response): Promise<any> {
//      const customer: any = getRepository(Customer).create(req.body);
//      customer.hashPassword();
//     const results: Customer = await getRepository(Customer).save(customer).catch( error => {
//         const imagePhat: string = customer.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
//         if(fs.existsSync(imagePhat)) {
//             fs.unlinkSync(imagePhat);
//         }
//      });
//     return res.json(results);
// }
// export async function createCustomer(req: Request, res: Response): Promise<any> {
//     let user: User = await getRepository(User).findOne(req.params.id);
//     const customerObj: any = getRepository(Customer).create(req.body);
//     let customer: Customer = new Customer();
//     customer = customerObj;
//     user = customer;
//     // getRepository(User).merge(user, customer);
//     const results: User = await getRepository(User).save(user);
//     return res.json(results);
// }
// export async function updateCustomer(req: Request, res: Response): Promise<any> {
//     const customer: Customer = await getRepository(Customer).findOne(req.params.id);
//     if(customer.profilePicture !== req.body.profilePicture) {
//         const imagePhat: string = customer.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
//     if(fs.existsSync(imagePhat)) {
//         fs.unlinkSync(imagePhat);
//     }
//     }
//     getRepository(Customer).merge(customer, req.body);
//     const results: Customer = await getRepository(Customer).save(customer);
//     return res.json(results);
// }
// export async function deleteCustomer(req: Request, res: Response): Promise<any> {
//     const customer: Customer = await getRepository(Customer).findOne(req.params.id);
//     const imagePhat: string = customer.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
//     if(fs.existsSync(imagePhat)) {
//         fs.unlinkSync(imagePhat);
//     }
//     const results: DeleteResult = await getRepository(Customer).delete(req.params.id);
//     return res.json(results);
// }
// export async function getCustomerByMail(req: Request, res: Response): Promise<any> {
//       const customer: Customer = await getRepository(Customer).findOne({ where: { email: req.params.email } });
//       return res.json(customer);
// }
//# sourceMappingURL=customer.js.map