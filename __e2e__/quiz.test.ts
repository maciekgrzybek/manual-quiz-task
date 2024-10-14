import { test, expect, Page } from '@playwright/test';

test('can go through happy path', async ({ page }) => {
  let fixtures = getFixtures(page);

  await fixtures.given.page.isLoaded();
  await fixtures.when.quiz.isOpened();

  await fixtures.then.pageNumber(1).is.visible();

  await fixtures.given.answer.whichIs('correct').forQuestionNumber(1).click();
  await fixtures.given.answer.whichIs('correct').forQuestionNumber(2).click();
  await fixtures.given.answer.whichIs('correct').forQuestionNumber(3).click();

  await fixtures.then.successScreen.is.visible();
});

test('can go through rejection path', async ({ page }) => {
  let fixtures = getFixtures(page);
  await fixtures.given.page.isLoaded();
  await fixtures.when.quiz.isOpened();

  await fixtures.then.pageNumber(1).is.visible();

  await fixtures.given.answer.whichIs('incorrect').forQuestionNumber(1).click();

  await fixtures.then.rejectionScreen.is.visible();
});

test('can go back to previous question', async ({ page }) => {
  let fixtures = getFixtures(page);
  await fixtures.given.page.isLoaded();
  await fixtures.when.quiz.isOpened();

  await fixtures.then.pageNumber(1).is.visible();

  await fixtures.given.answer.whichIs('correct').forQuestionNumber(1).click();

  await fixtures.then.pageNumber(1).is.notVisible();

  await fixtures.when.goingBack();

  await fixtures.then.pageNumber(1).is.visible();
});

test('can go back to previous question from final state', async ({ page }) => {
  let fixtures = getFixtures(page);
  await fixtures.given.page.isLoaded();
  await fixtures.when.quiz.isOpened();

  await fixtures.then.pageNumber(1).is.visible();

  await fixtures.given.answer.whichIs('incorrect').forQuestionNumber(1).click();

  await fixtures.then.rejectionScreen.is.visible();
  await fixtures.then.pageNumber(1).is.notVisible();

  await fixtures.when.goingBack();

  await fixtures.then.pageNumber(1).is.visible();
});

test('can continue when they left off', async ({ page }) => {
  let fixtures = getFixtures(page);
  await fixtures.given.page.isLoaded();
  await fixtures.when.quiz.isOpened();

  await fixtures.given.answer.whichIs('correct').forQuestionNumber(1).click();
  await fixtures.given.answer.whichIs('correct').forQuestionNumber(2).click();

  await page.reload();

  await fixtures.when.quiz.isOpened();

  await fixtures.then.continueScreen.is.visible();

  await fixtures.when.continuing();

  await fixtures.then.pageNumber(2).is.visible();
});

test('can start fresh', async ({ page }) => {
  let fixtures = getFixtures(page);
  await fixtures.given.page.isLoaded();
  await fixtures.when.quiz.isOpened();

  await fixtures.given.answer.whichIs('correct').forQuestionNumber(1).click();
  await fixtures.given.answer.whichIs('correct').forQuestionNumber(2).click();

  await page.reload();

  await fixtures.when.quiz.isOpened();

  await fixtures.then.continueScreen.is.visible();

  await fixtures.when.startingFresh();

  await fixtures.then.pageNumber(1).is.visible();
});

function getFixtures(page: Page) {
  return {
    given: {
      page: {
        isLoaded: async () => await page.goto('http://localhost:3000/'),
      },
      answer: {
        whichIs: (state: 'correct' | 'incorrect') => {
          return {
            forQuestionNumber: (pageNumber: number) => {
              const answers = [
                state === 'correct'
                  ? () => page.getByAltText(/moderate/i)
                  : () => page.getByAltText(/patchy/i),
                state === 'correct'
                  ? () => page.locator('button:has-text("No")')
                  : () => page.locator('button:has-text("Yes")'),
                state === 'correct'
                  ? () => page.locator('button:has-text("No")')
                  : () => page.locator('button:has-text("Yes")'),
              ];

              return answers[pageNumber - 1]();
            },
          };
        },
      },
    },
    when: {
      quiz: {
        isOpened: async () => await page.getByText('Take the quiz').click(),
      },
      goingBack: async () =>
        await page.locator('button:has-text("Go Back")').click(),
      continuing: async () =>
        await page.locator('button:has-text("Continue")').click(),
      startingFresh: async () =>
        await page.locator('button:has-text("Start fresh")').click(),
    },
    then: {
      pageNumber: (pageNumber: number) => {
        const textSelectorPerPage = [
          'Which image',
          'Have you ever been diagnosed with prostate cancer',
          'Have you ever been diagnosed with breast cancer',
        ];

        return {
          is: {
            visible: () =>
              expect(
                page.locator(`text=${textSelectorPerPage[pageNumber - 1]}`)
              ).toBeVisible(),
            notVisible: () =>
              expect(
                page.locator(`text=${textSelectorPerPage[pageNumber - 1]}`)
              ).not.toBeVisible(),
          },
        };
      },
      successScreen: {
        is: {
          visible: async () =>
            await expect(page.getByText(/great news/i)).toBeVisible(),
        },
      },
      rejectionScreen: {
        is: {
          visible: async () =>
            await expect(
              page.getByText(
                'Unfortunately, we are unable to prescribe this medication for you.'
              )
            ).toBeVisible(),
        },
      },
      continueScreen: {
        is: {
          visible: async () => {
            await expect(
              page.getByText('We can see that you already started the quiz')
            ).toBeVisible();
          },
        },
      },
    },
  };
}
