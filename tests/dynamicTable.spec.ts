import{test,expect,Locator} from '@playwright/test';
test.skip('handle dynamic web table',async({page})=>{
    await page.goto('https://practice.expandtesting.com/dynamic-table');
    const table=page.locator('table.table tbody')

    ////-----find the number of rows----------
    const rows:Locator[]=await table.locator('tr').all();
    console.log('number of rows in table are:',rows.length);
    expect(rows).toHaveLength(4);

    ////-----for chrome process get value of cpu load-----
    let cpuLoad='';
    for(const row of rows){
        const processName=await row.locator('td').nth(0).innerText();
        if(processName==='Chrome'){
             cpuLoad=await row.locator('td',{hasText:'%'}).innerText();
            console.log('cpu Value for chrome :',cpuLoad);
            break;            
        }
    }

    ////---comparing it with value in the yellow label
    const yellowBox=await page.locator("#chrome-cpu").innerText();
    if(yellowBox.includes(cpuLoad)){
        console.log('cpuLoad is equal to chrome');
    }
    else{
        console.log('cpuLoad is not equal to chrome');
    }
    expect(yellowBox).toContain(cpuLoad);

});

test('search for specific data in table',async({page})=>{
    await page.goto('https://datatables.net/');
    const searchBox=page.locator('#dt-search-0');
    await searchBox.fill('Paul Byrd');
    // await page.waitForTimeout(3000);
    const rows:Locator[]=await page.locator('#example tbody tr').all();    
       if(rows.length>1){
        let matchFound=false;
        for(const row of rows){
        const text=await row.innerText();
        if(text.includes('Paul Byrd')){
            console.log('Record exist found');
            matchFound=true;
            break;
        }
        expect(matchFound).toBe(true);
       }        
    }
    else{
        console.log('No rows found with search text');
        }



})