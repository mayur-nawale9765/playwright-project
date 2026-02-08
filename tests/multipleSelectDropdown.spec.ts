import{test,expect,Locator} from '@playwright/test'
test.skip('multipple select dropdown',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    // await page.locator('#colors').selectOption(['Red','Green','blue']);// by text
    // await page.locator('#colors').selectOption([{value:'red'},{value:'green'},{value:'blue'},]) //by value
    await page.locator('#colors').selectOption([{label:'Red'},{label:'Green'},{label:'Blue'},]) //by label


    //---------check the number of option in dropdown---------
    const dropdownOption=page.locator('#colors option')
    await expect(dropdownOption).toHaveCount(7);

    //----------check the option present in the dropdown---------------
    const dropdownText= await dropdownOption.allInnerTexts();
    expect(dropdownText).toContain('White');

    //----------print the all option------------
    console.log(dropdownText);
    for(const option of dropdownText){
        console.log(option);
    }
    
})