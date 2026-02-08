import{test,expect,Locator} from '@playwright/test'
test('hidden bootstrap dropdown',async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.locator("[name='username']").fill('Admin');
    await page.locator("[name='password']").fill('admin123');
    await page.locator("button[type='submit']").click();
   
    ////----click on the pim
    await page.getByText('PIM').click();
    
    ////----getting job title box
    await page.locator('form i').nth(2).click();
    await page.waitForTimeout(3000);
    const dropdownOption:Locator=page.locator('div[role="listbox"] span')
    ////----print the count of option having in dropdown----;
    const count:number=await dropdownOption.count();
    console.log('number of option in dropdown' ,count);

    ////----printing the all element inside the dropdown
    const dropdownText=await dropdownOption.allInnerTexts();
    console.log(dropdownText);
    ////----selecting the option ----------
     await dropdownOption.filter({hasText:'Automaton Tester'}).click();


    ////------here i dont understand how they get locator of that textbox----------
    const selectedJobTitle = page
    .locator("div.oxd-input-group")
    .filter({ hasText: "Job Title" })
    .locator("div.oxd-select-text-input");

  await expect(selectedJobTitle).toHaveText("Automaton Tester");
        await page.waitForTimeout(2000)
})