import {test,expect} from '@playwright/test';

test.skip('file uploading ',async({page})=>{
     await page.goto('https://testautomationpractice.blogspot.com/')
     const singleFile=page.locator('#singleFileInput')
     await singleFile.setInputFiles('C:/Users/Mayur/Documents/playwright/tests/test-data/abc.pdf');
     const multipleFile=page.locator('#multipleFilesInput')
     await multipleFile.setInputFiles(['C:/Users/Mayur/Documents/playwright/tests/test-data/abc.pdf',
                                        'C:/Users/Mayur/Documents/playwright/tests/test-data/xyz.txt'])

     

     const singleFileUpload=page.getByRole('button',{name:'Upload Single File'}).click();
     await expect(page.locator('#singleFileStatus')).toContainText('abc.pdf');

      
     const multipleFileUpload=page.getByRole('button',{name:'Upload Multiple Files'}).click();
    //  await expect(page.locator('#singleFileStatus')).toContainText('');
    await expect(page.locator('#multipleFilesStatus'))
  .toContainText('Multiple files selected');
     
     await page.waitForTimeout(3000);
})