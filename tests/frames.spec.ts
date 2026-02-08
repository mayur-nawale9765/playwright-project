import { test, expect } from "@playwright/test";

test.skip("handle frames using frameloactor", async ({ page }) => {
  await page.goto("https://vinothqaacademy.com/iframe/");


  ////--------frames present in the current page----------
  const frames=page.frames();
  console.log(frames.length);

  const frame=page.frameLocator('iframe[src="https://vinothqaacademy.com/webtable/"]');
  const name=frame.getByPlaceholder('Name');
  await name.fill('John Doe');
  const Role=frame.getByPlaceholder('Role');
  await Role.fill('Project Manager');
  const EmailAddress=frame.getByPlaceholder('Email Address');
  await EmailAddress.fill('john.doe@example.com');
  await page.waitForTimeout(4000); 
  
});

////-----------handling inner child frames-------------
test('handle inner child frame',async({page})=>{
    await page.goto('https://ui.vision/demo/webtest/frames/');
    const frames=page.frames();
    console.log(frames.length);
    const parentFrame=page.frame({url:'https://ui.vision/demo/webtest/frames/frame_3.html'});    
    if(parentFrame){
        await parentFrame.locator('[name="mytext3"]').fill('Welcome');
        await expect(parentFrame.locator('[name="mytext3"]')).toHaveValue('Welcome');
    const childFrame=parentFrame?.childFrames();
    
    if(childFrame && childFrame.length > 0){
        console.log(childFrame.length);
        const radio=childFrame[0].getByText('I am a human');
        await radio.click();
        // await expect(radio).toBeChecked();
    }
    else{
        console.log('child frame is not found');
    }
}
else{
    console.log('parent frame is not found');

}
await page.waitForTimeout(3000);

})
