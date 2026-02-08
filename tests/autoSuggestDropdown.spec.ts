import { test, expect, Locator } from "@playwright/test";
test.skip("multiple select dropdown", async ({ page }) => {
  await page.goto("https://www.amazon.in/");
  const searchBox = page.locator("#twotabsearchtextbox");
  await searchBox.fill("darma");
  const suggestionBox = page.locator(
    "div.autocomplete-results-container div.s-suggestion",
  );
  const count = await suggestionBox.count();
  console.log(count);
  await expect(suggestionBox).toHaveCount(10);

  const suggestText = await suggestionBox.allInnerTexts();   
  console.log(suggestText);
  for (let i = 0; i <= count; i++) {
    if ((await suggestionBox.nth(i).innerText()) === "darma sunscreen") {
      suggestionBox.nth(i).click();
      break;
    }
  }
  const targetText = "darma sunscreen";
  await suggestionBox.filter({ hasText: targetText }).first().click();
  await expect(searchBox).toHaveValue(targetText);
  await page.waitForTimeout(4000);
});

test.skip("flipcart demo", async ({ page }) => {
  await page.goto("https://www.flipkart.com/");
  const searchBox = page.locator("[name='q']");
  await searchBox.fill("smart");
  await page.waitForTimeout(2000);
  const dropdownOption: Locator = page.locator("ul>li");
  const count1: number = await dropdownOption.count();
  console.log(count1);

 const dropDownText:string[]=await dropdownOption.allInnerTexts();
 expect(dropDownText).toContain('smartphone');
// await dropdownOption.filter({hasText:'smartphone'}).click();
// await expect(searchBox).toHaveValue('smartphone');

for(let i=0;i<count1;i++){
const text= await dropdownOption.nth(i).innerText();
if(text==='smartphone'){
    dropdownOption.nth(i).click();
    await expect(searchBox).toHaveValue('smartphone');
    await page.waitForTimeout(4000)
}
}

});
