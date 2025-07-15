# Page snapshot

```yaml
- text: Salesforce Username
- textbox "Username"
- text: Password
- textbox "Password"
- button "Log In"
- checkbox "Remember me"
- text: Remember me
- link "Forgot Your Password?":
  - /url: /secur/forgotpassword.jsp?locale=us
- link "Use Custom Domain":
  - /url: javascript:void(0);
- text: or
- link "Log In with Email":
  - /url: https://welcome.salesforce.com?ref=lsc
- paragraph: Not a customer?
- link "Try for Free":
  - /url: https://www.salesforce.com/form/trial/freetrial.jsp?d=70130000000Enus
- text: © 2025 Salesforce, Inc. All rights reserved. |
- link "Privacy":
  - /url: https://www.salesforce.com/us/company/privacy
- iframe
- text: Login
```