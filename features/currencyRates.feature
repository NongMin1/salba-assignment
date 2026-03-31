Feature: Historical Currency Rate Validation
  Scenario Outline: Verify <target_currency> rate against EUR on 2023-02-01
    Given the user navigates to the historical rates page
    When the user sets base currency to "EUR"
    And selects historical date "2023-02-01"
    And the user confirms the selection
    Then the rate for "<target_currency>" should be "<expected_rate>"

    Examples:
      | target_currency | expected_rate       |
      | USD             | 1.0918121631244302  |
      | GBP             | 0.8871386636267415  |