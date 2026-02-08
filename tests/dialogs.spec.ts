import{test,expect,Locator} from '@playwright/test';


test('Handle Alerts',async({page})=>{
await page.goto('https://testautomationpractice.blogspot.com/');

//----register a dialog handler-------------
page.on('dialog',(dialog)=>{
    console.log(dialog.type());
    console.log(dialog.message());
    expect(dialog.message()).toContain('I am an alert box!');
    dialog.accept();
})
await page.locator('#alertBtn').click();
await page.waitForTimeout(3000);
})

//------------------handle confim alert------------
test('handle confirm Dialog',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    page.on('dialog',(dialog)=>{
        console.log(dialog.type());
        console.log(dialog.message());
        expect(dialog.message()).toContain('Press a button!');
        // dialog.accept();     // for ok
        dialog.dismiss();       //for cancel
    })

    page.locator('#confirmBtn').click();
    // await expect(page.locator('#demo')).toContainText('You pressed OK!'); //for ok
    await expect(page.locator('#demo')).toContainText('You pressed Cancel!');  //for cancel
    await page.waitForTimeout(3000);

})


//-----handle perompt dialog---------
test('handle prompt dialog',async({page})=>{
    page.goto('https://testautomationpractice.blogspot.com/');
    page.on('dialog',(dialog)=>{
        console.log(dialog.type());
        console.log(dialog.defaultValue())
        expect(dialog.defaultValue()).toContain('Harry Potter')
        // dialog.accept('Mayur');
        dialog.dismiss();
    })
    page.locator('#promptBtn').click();
    // await expect(page.locator('#demo')).toHaveText('Hello Mayur! How are you today?');
    await expect(page.locator('#demo')).toHaveText('User cancelled the prompt.')
    await page.waitForTimeout(3000);
})