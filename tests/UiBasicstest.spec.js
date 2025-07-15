const { test, expect } = require('@playwright/test');

let userEmail = 'eve.holt@reqres.in';
let userPassword = 'Google@12';

test.describe('first playwright Test', () => {
    test('first playwright Test', async ({ browser }) => {
        const context = await browser.newContext()
        const page = await context.newPage();

        await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
        

    });

    test('secont test', async ({ page }) => {

        await page.goto('https://www.google.com');
        await expect(page).toHaveTitle('Google');
    })

    test('register test', async ({ page }) => {

        await page.goto('https://rahulshettyacademy.com/client');
        await page.locator('a[class="text-reset"]').click();
        await page.locator('#firstName').fill('John');
        await page.locator('#lastName').fill('Doe');
        await page.locator('#userEmail').fill(userEmail);
        await page.locator('#userMobile').fill('1234567890');

        await page.locator('input[value="Male"]').check();

        await page.locator('#userPassword').fill(userPassword);
        await page.locator('#confirmPassword').fill(userPassword);

        await page.locator('input[type="checkbox"]').check();

        await page.locator('#login').click();

        await page.waitForTimeout(2000);

    });

    test('login test', async ({ page }) => {

        await page.goto('https://rahulshettyacademy.com/client');
        await page.locator('#userEmail').fill(userEmail);
        await page.locator('#userPassword').fill(userPassword);
        await page.locator('#login').click();

        await page.waitForLoadState('networkidle'); // Wait for the network to be idle// sometime it behaves weirdly flaky
        await page.locator('div h5 b').last().waitFor();// waitfor only expect one element so you can use last() to wait for the last card to be loaded
        //const email = "anshika@gmail.com";
        const productName = 'IPHONE 13 PRO';
        const products = page.locator(".card-body");
        const cardTitles = await page.locator('div h5 b').allTextContents();
        console.log(cardTitles);

        const productInfo = await page.locator('.card-body');
        const count = await productInfo.count();
        console.log(count);
        for (let i = 0; i < count; i++) {
            const title = await productInfo.nth(i).locator('h5 b').textContent();
            console.log(title);
            if (title === productName) {

                await productInfo.nth(i).locator('text=Add to Cart').click();
                break;
            }
        }
        await page.locator('.card-body').filter({ hasText: 'ZARA COAT 3' }).locator('text=Add to Cart').click();
        const cart = page.locator('[routerlink="/dashboard/cart"]');

        await cart.waitFor();
        await cart.click();

        await page.waitForLoadState('networkidle');
        await page.locator('ul li').first().waitFor();
        expect(await page.locator('div[class="cartSection"] h3').filter({ hasText: `${productName}` })).toBeVisible();

        const bool = await page.locator(`text='${productName}'`).isVisible();
        expect(bool).toBeTruthy();
        await page.locator("text=Checkout").click();

        await page.locator("[placeholder*='Country']").pressSequentially("ind");
        const dropdown = page.locator(".ta-results");
        await dropdown.waitFor();
        const optionsCount = await dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await dropdown.locator("button").nth(i).textContent();
            if (text === " India") {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }

        expect(page.locator(".user__name [type='text']").first()).toHaveText(userEmail);
        await page.locator(".action__submit").click();
        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent();
        console.log(orderId);

        await page.locator("button[routerlink*='myorders']").click();
        await page.locator("tbody").waitFor();
        const rows = await page.locator("tbody tr");


        for (let i = 0; i < await rows.count(); ++i) {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
        const orderIdDetails = await page.locator(".col-text").textContent();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();


    })

    test('@Webst Client App login', async ({ page }) => {
        //js file- Login js, DashboardPage
        const email = "anshika@gmail.com";
        const productName = 'ZARA COAT 3';
        const products = page.locator(".card-body");
        await page.goto("https://rahulshettyacademy.com/client");
        await page.getByPlaceholder("email@example.com").fill(email);
        await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
        await page.getByRole('button', { name: "Login" }).click();
        await page.waitForLoadState('networkidle');
        await page.locator(".card-body b").first().waitFor();

        await page.locator(".card-body").filter({ hasText: "ZARA COAT 3" })
            .getByRole("button", { name: "Add to Cart" }).click();

        await page.getByRole("listitem").getByRole('button', { name: "Cart" }).click();

        //await page.pause();
        await page.locator("div li").first().waitFor();
        await expect(page.getByText("ZARA COAT 3")).toBeVisible();

        await page.getByRole("button", { name: "Checkout" }).click();

        await page.getByPlaceholder("Select Country").pressSequentially("ind");

        await page.getByRole("button", { name: "India" }).nth(1).click();
        await page.getByText("PLACE ORDER").click();

        await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    })

    test('handel child window', async ({ browser }) => {

        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

        await expect(page.locator('[href*="documents-request"]')).toHaveAttribute('class', 'blinkingText');

        const [newPage] = await Promise.all(
            [
                context.waitForEvent('page'),
                page.locator('a[href*="documents-request"]').click()
            ]
        )

        const text = await newPage.locator('.red').textContent();
        console.log(text);

        const email = text.split('at')[1].trim().split(' ')[0];
        console.log(email);


    });

    test("Calendar validations", async ({ page }) => {
        const monthNumber = "6";
        const date = "15";
        const year = "2027";
        const expectedList = [monthNumber, date, year];
        await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
        await page.locator(".react-date-picker__inputGroup").click();
        await page.locator(".react-calendar__navigation__label").click();
        await page.locator(".react-calendar__navigation__label").click();
        await page.getByText(year).click();
        await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber) - 1).click();
        await page.locator("//abbr[text()='" + date + "']").click();
        const inputs = await page.locator(".react-date-picker__inputGroup input");
        for (let index = 0; index < inputs.length; index++) {
            const value = inputs[index].getAttribute("value");
            expect(value).toEqual(expectedList[index]);
        }
    });

    test("handle browser actions", async ({ page }) => {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        await page.goto("https://google.com/");
        await page.goBack();
        await page.goForward()
        await page.reload();
        await page.pause();
    });

    test("handle JS based Popup", async ({ page }) => {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        await expect(page.locator("#displayed-text")).toBeVisible();
        await page.locator("#hide-textbox").click();
        await expect(page.locator("#displayed-text")).not.toBeVisible(); //OR
        await expect(page.locator("#displayed-text")).toBeHidden();

        await page.locator("#show-textbox").click();
        await expect(page.locator("#displayed-text")).toBeVisible();
    });

    test('handle Mouse Actions', async ({ page }) => {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        await page.locator("#mousehover").hover();
        await page.locator("a[href='#top']").click();
        await page.setContent(
            "This is firefox Context and Page, I will close this and open webkit Context"
        );

    });

    test('handle Iframes', async ({ page }) => {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        const frame = page.frameLocator('#course-frame');



        await frame.locator("li a[href*='lifetime-access']:visible").click();
        const text = await frame.locator(".text h2").textContent();
        console.log(text);
        console.log(text.split(" ")[1]);

    });

    test("Browser new Context @newContext @browsercontext", async ({ browser }) => {
        // Launch the browser
        //const browser = await chromium.launch();

        // Create a new browser context with various options
        const context = await browser.newContext({
            recordVideo: { dir: "videos/" }, // Enable video recording
            recordHar: { path: "logs/test.har" }, // Enable HAR recording
            recordTrace: {
                name: "trace",
                screenshots: true,
                screenshotsPath: "screenshots/",
            }, // Enable tracing
            viewport: { width: 1200, height: 1200, deviceScaleFactor: 1 }, // Set viewport size
            ignoreHTTPSErrors: true, // Ignore HTTPS errors
            locale: "en-US", // Set locale
            timezoneId: "America/New_York", // Set timezone
            permissions: ["geolocation", "notifications"], // Grant permissions
        });

        // Create a new page in the browser context
        const page = await context.newPage();

        // Navigate to google.com
        await page.goto("https://www.google.com");

        await page
            .locator("//textarea[@id='APjFqb']")
            .fill("what is my browser location");

        await page.locator("//div[@class='lJ9FBc']//input[@name='btnK']").click();
        await page.waitForEvent("domcontentloaded");

        await page.waitForTimeout(2000);

        // Close the browser context
        //   await context.close();

        // Close the browser
        //   await browser.close();
    });
})