import {test,expect} from '@playwright/test'
test('1st test',async({page})=>{
    await page.goto('https://demo.nopcommerce.com/')
   await expect(page.getByAltText('nopCommerce demo store')).toBeVisible();
   await expect(page.getByText('Welcome to our store')).toBeVisible();
   await expect(page.getByText('Welcome to our store')).toContainText('Welcome to our store')
})

test('2nd test',async({page})=>{
   await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  await expect(page.getByAltText('company-branding')).toBeVisible();
  await expect(page.getByText('Forgot your password?')).toBeVisible();
  await page.getByPlaceholder('Username').fill('Mayur');
  await page.getByPlaceholder('Password').fill('Nawale');
  await page.getByRole('button',{name:"Login"}).click();

  })