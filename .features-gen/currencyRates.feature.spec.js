// Generated from: features\currencyRates.feature
import { test } from "playwright-bdd";

test.describe('Historical Currency Rate Validation', () => {

  test.describe('Verify <target_currency> rate against EUR on 2023-02-01', () => {

    test('Verify USD rate against EUR on 2023-02-01', async ({ Given, When, Then, And, page }) => { 
      await Given('the user navigates to the historical rates page', null, { page }); 
      await When('the user sets base currency to "EUR"'); 
      await And('the user selects historical date "2023-02-01"'); 
      await And('the user confirms the selection'); 
      await Then('the rate for "USD" should be "1.0918121631244302"'); 
    });

    test('Verify GBP rate against EUR on 2023-02-01', async ({ Given, When, Then, And, page }) => { 
      await Given('the user navigates to the historical rates page', null, { page }); 
      await When('the user sets base currency to "EUR"'); 
      await And('the user selects historical date "2023-02-01"'); 
      await And('the user confirms the selection'); 
      await Then('the rate for "GBP" should be "0.8871386636267415"'); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\currencyRates.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":11,"tags":[],"steps":[{"pwStepLine":9,"gherkinStepLine":3,"keywordType":"Context","textWithKeyword":"Given the user navigates to the historical rates page","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":4,"keywordType":"Action","textWithKeyword":"When the user sets base currency to \"EUR\"","stepMatchArguments":[{"group":{"start":31,"value":"\"EUR\"","children":[{"start":32,"value":"EUR","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"And the user selects historical date \"2023-02-01\"","stepMatchArguments":[{"group":{"start":33,"value":"\"2023-02-01\"","children":[{"start":34,"value":"2023-02-01","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"And the user confirms the selection","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then the rate for \"USD\" should be \"1.0918121631244302\"","stepMatchArguments":[{"group":{"start":13,"value":"\"USD\"","children":[{"start":14,"value":"USD","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":29,"value":"\"1.0918121631244302\"","children":[{"start":30,"value":"1.0918121631244302","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":16,"pickleLine":12,"tags":[],"steps":[{"pwStepLine":17,"gherkinStepLine":3,"keywordType":"Context","textWithKeyword":"Given the user navigates to the historical rates page","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":4,"keywordType":"Action","textWithKeyword":"When the user sets base currency to \"EUR\"","stepMatchArguments":[{"group":{"start":31,"value":"\"EUR\"","children":[{"start":32,"value":"EUR","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"And the user selects historical date \"2023-02-01\"","stepMatchArguments":[{"group":{"start":33,"value":"\"2023-02-01\"","children":[{"start":34,"value":"2023-02-01","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":20,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"And the user confirms the selection","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then the rate for \"GBP\" should be \"0.8871386636267415\"","stepMatchArguments":[{"group":{"start":13,"value":"\"GBP\"","children":[{"start":14,"value":"GBP","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":29,"value":"\"0.8871386636267415\"","children":[{"start":30,"value":"0.8871386636267415","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end