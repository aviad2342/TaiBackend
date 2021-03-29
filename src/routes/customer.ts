import {Router} from "express";

import * as CustomerController from "../controllers/customer";


const router: Router = Router();

router.get("/customers", CustomerController.getCustomers);

router.get("/customer/:id", CustomerController.getCustomer);

router.get("/customer/email/:email", CustomerController.getCustomerByMail);

router.get("/customer/orders/:id", CustomerController.getCustomerByMail);

router.post("/customer", CustomerController.addCustomer);

router.put("/customer/:id", CustomerController.updateCustomer);

router.put("/customer/user/:id", CustomerController.createCustomer);

router.delete("/customer/:id", CustomerController.deleteCustomer);


export const customerRouter: Router = router;