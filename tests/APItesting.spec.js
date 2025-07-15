import { test, expect, request } from '@playwright/test'
import { APiUtilities } from './utils/APiUtilities';

//test data
let responce;
const LoginData = {
    userEmail: "anshika@gmail.com",
    userPassword: "Iamking@000"
}
const orderData = {
    orders: [{ country: "Bahrain", productOrderedId: "67a8dde5c0d3e6622a297cc8" }]
}


test.beforeAll('Setting, to user authorization)', async () => {
    const apiContext = await request.newContext();
    const apiutils = new APiUtilities(apiContext, LoginData)
    responce = await apiutils.creatOrder(orderData);

})

test('client app login', async ({ page }) => {

    console.log(responce.token);

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, responce.token);

    await page.goto('https://rahulshettyacademy.com/client');

    await page.locator(".card-body b").first().waitFor();

    await page.locator(".card-body").filter({ hasText: "ZARA COAT 3" })
        .getByRole("button", { name: "Add to Cart" }).click();

    await page.getByRole("listitem").getByRole('button', { name: "Cart" }).click();

    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    await page.getByRole("button", { name: "Checkout" }).click();

    await page.getByPlaceholder("Select Country").pressSequentially("ind");

    await page.getByRole("button", { name: "India" }).nth(1).click();
    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});

test('@API Place the order', async ({ page }) => {


    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, responce.token);


    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (responce.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    //await page.pause();
    expect(responce.orderId.includes(orderIdDetails)).toBeTruthy();

});