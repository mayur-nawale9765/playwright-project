import {test,expect,Locator} from '@playwright/test'
test.skip('single select dropdown',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
    const country:Locator=page.locator('#country') 
    //await country.selectOption('India'); //using text
    // await country.selectOption({value:'india'}); //using value
    // await country.selectOption({label:'India'}); //using label 
    await country.selectOption({index:3});
    // await expect(country).toHaveValue('germany');
     await expect(country).toContainText('Germany');


     //-----------check the number of option in dropdown-------------
     const dropdownOption=page.locator('#country option')
     await expect(dropdownOption).toHaveCount(10);

     //-----------check an option present in dropdown----------
     const dropdownText=(await dropdownOption.allInnerTexts()).map(text=>text.trim())
     console.log(dropdownText); // gives the array of all options
     expect(dropdownText).toContain('Japan');
     for(const option of dropdownText){
        console.log(option); //prints the individual single 
     }

})