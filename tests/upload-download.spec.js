import { test, expect } from '@playwright/test'
import ExcelJs from 'exceljs';
import path from 'path';
import os from 'os';

async function writeExcelTest(searchText, replaceText, change, filePath) {

  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');
  const output = await readExcel(worksheet, searchText);

  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);

}


async function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.column = colNumber;
      }


    })

  })
  return output;
}
//update Mango Price to 350. 
//writeExcelTest("Mango",350,{rowChange:0,colChange:2},"/Users/rahulshetty/downloads/excelTest.xlsx");
test('Upload download excel validation', async ({ page }) => {
  const textSearch = 'Mango';
  const updateValue = '350';
  
  // Use dynamic download path
  const downloadsPath = path.join(os.homedir(), 'Downloads');
  const filePath = path.join(downloadsPath, 'download.xlsx');
  
  await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download' }).click();
  const download = await downloadPromise;
  
  // Save the downloaded file
  await download.saveAs(filePath);
  
  writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);
  await page.locator("#fileinput").click();
  await page.locator("#fileinput").setInputFiles(filePath);
  const textlocator = page.getByText(textSearch);
  const desiredRow = await page.getByRole('row').filter({ has: textlocator });
  await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);




















})







