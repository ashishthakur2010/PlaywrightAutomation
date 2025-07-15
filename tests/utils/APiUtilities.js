const { test, expect, request } = require('@playwright/test');

class APiUtilities {

    constructor(apiContext, LoginData) {

        this.apiContext = apiContext;
        this.LoginData = LoginData;

    }

    async getToken() {  
        const uri = 'https://rahulshettyacademy.com/api/ecom/auth/login';


        const responce = await this.apiContext.post(uri, { data: this.LoginData });
        expect(responce.ok()).toBeTruthy();
        const responseBody = await responce.json()
        console.log(responseBody);
        const token = responseBody.token;
        console.log(token);

        return token

    }
    

    async creatOrder(orderData) {

        const uri = 'https://rahulshettyacademy.com/api/ecom/order/create-order';
        let response = {};
        response.token = await this.getToken();

        const respncse = await this.apiContext.post(uri, {
            data: orderData,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        })
        expect(respncse.ok()).toBeTruthy();
        const responseBody = await respncse.json();
        console.log(responseBody);
        const orderId = responseBody.orders[0];
        response.orderId = orderId;
        console.log(orderId);

        return response;
    }
}
module.exports = { APiUtilities };