import { test, expect, request } from '@playwright/test'
import { APiUtilities } from './utils/APiUtilities';

const LoginData = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000"
}

const orderData = {
  orders: [{ country: "Bahrain", productOrderedId: "67a8dde5c0d3e6622a297cc8" }]
}

// Mock payload for orders
const fakePayLoadOrders = {
  data: [],
  message: "No Orders",
  count: 0
}

let responce;
test.beforeAll('Setting, to user authorization)', async () => {
  const apiContext = await request.newContext();
  const apiutils = new APiUtilities(apiContext, LoginData)
  responce = await apiutils.creatOrder(orderData);

})


//create order is success
test('@SP Place the order', async ({ page }) => {
  page.addInitScript(value => {

    window.localStorage.setItem('token', value);
  }, responce.token);
  await page.goto("https://rahulshettyacademy.com/client");


  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill(
        {
          response,
          body,

        });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    });

  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")

  console.log(await page.locator(".mt-4").textContent());



});

