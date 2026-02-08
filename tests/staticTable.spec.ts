import { test, expect, Locator } from "@playwright/test";

test.skip("handle the static web table", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const table = page.locator("table[name='BookTable']");
  await expect(table).toBeVisible();

  ////-----count the number of rows----------
  const row = page.locator("table[name='BookTable'] tbody tr");
  const rowCount: number = await row.count();
  console.log("Total rows are: ", rowCount);
  await expect(row).toHaveCount(7);
  expect(rowCount).toBe(7);

  ////--------Number of hearders------------------
  const column = row.locator("th");
  const colCount: number = await column.count();
  console.log("Total column are: ", colCount);
  await expect(column).toHaveCount(4);
  expect(colCount).toBe(4);

  ////----Read the all data from the index 2 which menas 3rd row------------

  const secondRow: Locator = row.nth(2).locator("td");
  const secondRowText = await secondRow.allInnerTexts();
  console.log(secondRowText);
  for (let i = 0; i < secondRowText.length; i++) {
    console.log(secondRowText[i]);
  }

  //------Read all the data from excluding header----------
  /*
  const allRowData=await row.all();
  for(let roww of allRowData.slice(1)){
    const cols=await roww.locator('td').allInnerTexts();
    console.log(cols.join('\t'));
  }
    */

  const allRowData: Locator[] = await row.locator("td").all();
  console.log(allRowData.length);

  for (let i = 0; i < allRowData.length; i++) {
    console.log(await allRowData[i].allInnerTexts());
  }
});

test("static table", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const rows: Locator = page.locator("[name='BookTable'] tbody tr");
  await expect(rows).toHaveCount(7);
  // console.log((await row.count()));
  const allRowsdata: Locator[] = await rows.all();
  const mukeshBooks: string[] = [];
  for (let row of allRowsdata) {
    let data = row.locator("td");
    const allData = await data.allInnerTexts();
    // console.log(allData);
    const author = allData[1];
    const bookName = allData[0];
    if (author === "Mukesh") {
      console.log(`${author} ${bookName}`);
      mukeshBooks.push(bookName);
    }
  }
  console.log(mukeshBooks);
  expect(mukeshBooks).toHaveLength(2);
  
  ////---------calculate total price of all book------------
  let totalPrice:number=0;
  for(let bookprice of allRowsdata.slice(1)){
    const bprice=await bookprice.locator('td').allInnerTexts();
    const price=bprice[3];  
    totalPrice=totalPrice+parseInt(price);   
    
  }
  console.log(totalPrice);
});
