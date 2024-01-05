Feature: Profile
  Background:
    Given Adolph is login
    And Ruth is login
    And Joshua is login
  Scenario: User create a comment, other user like it and vote
    When Ruth comment Adolph profile
    And Joshua like it
    Then  comment like 1

  Scenario: User edit a comment, other user like it and vote
    When Ruth comment Adolph profile
    And Joshua like it
    And Ruth edit comment
    And Ruth like it
    Then  comment like 2

  Scenario: User edit profile
    When Adolph edit profile name to Randolph
    Then Adolph profile changed
