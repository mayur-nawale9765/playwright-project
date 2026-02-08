import{test,expect,Locator} from '@playwright/test'
const url='https://testautomationpractice.blogspot.com/'
test('playwright Actions',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
    const textBox:Locator=page.locator('#name')
    await textBox.fill('mayur');
    await expect(textBox).toBeVisible();
    await expect(textBox).toBeEnabled();
//-----------------textbox have maxlength attribute and assert its value------------
    const maxlength=await textBox.getAttribute('maxlength')
    expect(maxlength).toBe('15');
})

//Handling Radio button
test('Handle Radio Button',async({page})=>{
  await page.goto('https://testautomationpractice.blogspot.com/')
  const maleRadio:Locator=page.locator('#male')
  const femaleRadio:Locator=page.locator('#female');
  await expect(maleRadio).toBeVisible();
  await expect(maleRadio).toBeEnabled();
  await maleRadio.check();
  await expect(maleRadio).toBeChecked(); 
  await expect(femaleRadio).toBeVisible(); 
  await femaleRadio.check();  
   await expect(femaleRadio).toBeChecked(); 
  
})


//------Handling checkboxes-------
test.skip('handling checkboxes',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
//-----------select specific using label-----------
    const sundayCheck:Locator=page.getByLabel('Sunday')
    sundayCheck.check();
await expect(sundayCheck).toBeChecked()

// ------ select multiple checkboxes---------
const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
/*
//// ---this is the one way we get the all the locators in on
const chechboxLocator:Locator[]=days.map(index=>page.getByLabel(index));
for( const day of chechboxLocator){
    await day.check();
    await expect(day).toBeChecked();
}
 await page.waitForTimeout(5000);
 */

// //----we can directoly access------------
for( const day of days){
    await page.getByLabel(day).check();
    await expect(page.getByLabel(day)).toBeChecked()
}
//  ------unchecked last 3 slice(-3)
 for( const day of days.slice(-3)){
    await page.getByLabel(day).uncheck();
    await expect(page.getByLabel(day)).not.toBeChecked()
}
await page.waitForTimeout(5000);

}) 


test ('randomaly select checkboxes',async({page})=>{
 await page.goto(url);
 const days:string[]=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
 ////--------------find based on index-----------
// const checkbox:Locator[]=days.map(day=>{return page.getByLabel(day)})
// const indexes=[1,5,6];
// for(const i of indexes){
//    await checkbox[i].check();
//    await expect(checkbox[i]).toBeChecked();
// }


////--------find based on the label----------
const weekname='Friday'
for(const label of days){
    if(label.toLowerCase()===weekname.toLowerCase()){
       await page.getByLabel(label).check();
      await expect(page.getByLabel(label)).toBeChecked(); 
    }
}
await page.waitForTimeout(5000);

})
