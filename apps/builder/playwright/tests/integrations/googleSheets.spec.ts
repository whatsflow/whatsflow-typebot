import test, { expect, Page } from '@playwright/test'
import { importTypebotInDatabase } from '../../services/database'
import path from 'path'
import { typebotViewer } from '../../services/selectorUtils'

test.describe.parallel('Google sheets integration', () => {
  test('Insert row should work', async ({ page }) => {
    const typebotId = 'google-sheets-insert'
    await importTypebotInDatabase(
      path.join(
        __dirname,
        '../../fixtures/typebots/integrations/googleSheets.json'
      ),
      {
        id: typebotId,
      }
    )
    await page.goto(`/typebots/${typebotId}/edit`)
    await fillInSpreadsheetInfo(page)
    await page.click('text=Select an operation')
    await page.click('text=Insert a row')

    await page.click('text=Select a column')
    await page.click('text="Email" >> nth = 1')
    await page.click('[aria-label="Insert a variable"]')
    await page.click('text="Email" >> nth = 2')

    await page.click('text=Add a value')
    await page.click('text=Select a column')
    await page.click('text=First name')
    await page.fill(
      'input[placeholder="Type a value..."] >> nth = 1',
      'Georges'
    )

    await page.click('text=Preview')
    await typebotViewer(page)
      .locator('input[placeholder="Type your email..."]')
      .fill('georges@gmail.com')
    await typebotViewer(page)
      .locator('input[placeholder="Type your email..."]')
      .press('Enter')
    await page.waitForResponse(
      (resp) =>
        resp
          .request()
          .url()
          .includes(
            '/api/integrations/google-sheets/spreadsheets/1k_pIDw3YHl9tlZusbBVSBRY0PeRPd2H6t4Nj7rwnOtM/sheets/0'
          ) &&
        resp.status() === 200 &&
        resp.request().method() === 'POST'
    )
  })

  test('Update row should work', async ({ page }) => {
    const typebotId = 'google-sheets-update'
    await importTypebotInDatabase(
      path.join(
        __dirname,
        '../../fixtures/typebots/integrations/googleSheets.json'
      ),
      {
        id: typebotId,
      }
    )
    await page.goto(`/typebots/${typebotId}/edit`)
    await fillInSpreadsheetInfo(page)
    await page.click('text=Select an operation')
    await page.click('text=Update a row')

    await page.click('text=Select a column')
    await page.click('text="Email" >> nth = 1')
    await page.click('[aria-label="Insert a variable"]')
    await page.click('text="Email" >> nth = 2')

    await page.click('text=Select a column')
    await page.click('text=Last name')
    await page.fill(
      'input[placeholder="Type a value..."] >> nth = 1',
      'Last name'
    )

    await page.click('text=Preview')
    await typebotViewer(page)
      .locator('input[placeholder="Type your email..."]')
      .fill('test@test.com')
    await typebotViewer(page)
      .locator('input[placeholder="Type your email..."]')
      .press('Enter')
    await page.waitForResponse(
      (resp) =>
        resp
          .request()
          .url()
          .includes(
            '/api/integrations/google-sheets/spreadsheets/1k_pIDw3YHl9tlZusbBVSBRY0PeRPd2H6t4Nj7rwnOtM/sheets/0'
          ) &&
        resp.status() === 200 &&
        resp.request().method() === 'PATCH'
    )
  })

  test('Get row should work', async ({ page }) => {
    const typebotId = 'google-sheets-get'
    await importTypebotInDatabase(
      path.join(
        __dirname,
        '../../fixtures/typebots/integrations/googleSheetsGet.json'
      ),
      {
        id: typebotId,
      }
    )
    await page.goto(`/typebots/${typebotId}/edit`)
    await fillInSpreadsheetInfo(page)
    await page.click('text=Select an operation')
    await page.click('text=Get data from sheet')

    await page.click('text=Select a column')
    await page.click('text="Email" >> nth = 1')
    await page.click('[aria-label="Insert a variable"]')
    await page.click('text="Email" >> nth = 2')

    await page.click('text=Select a column')
    await page.click('text="First name"')
    await createNewVar(page, 'First name')

    await page.click('text=Add a value')

    await page.click('text=Select a column')
    await page.click('text="Last name"')
    await createNewVar(page, 'Last name')

    await page.click('text=Preview')
    await typebotViewer(page)
      .locator('input[placeholder="Type your email..."]')
      .fill('test2@test.com')
    await typebotViewer(page)
      .locator('input[placeholder="Type your email..."]')
      .press('Enter')
    await expect(
      typebotViewer(page).locator('text=Your name is: John Smith')
    ).toBeVisible()
  })
})

const fillInSpreadsheetInfo = async (page: Page) => {
  await page.click('text=Configure...')
  await page.click('text=Select an account')
  await page.click('text=test2@gmail.com')

  await page.fill('input[placeholder="Search for spreadsheet"]', 'CR')
  await page.click('text=CRM')

  await page.fill('input[placeholder="Select the sheet"]', 'Sh')
  await page.click('text=Sheet1')
}

const createNewVar = async (page: Page, name: string) => {
  await page.fill('input[placeholder="Select a variable"] >> nth=-1', name)
  await page.click(`text=Create "${name}"`)
}