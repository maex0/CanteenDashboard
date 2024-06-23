Feature: Load Website
  As a user, I want to interact with the website to like or dislike images of cats, ensuring a new image is loaded each time.

  Scenario: Image is loaded
    Given User visits homepage
    When Site is loaded
    Then User sees the image

  Scenario: Like image
    Given User visits homepage
    When User clicks the like button
    Then Image is added to Three recent liked cats

  Scenario: Changed image on the dislike button click
    Given User visits homepage
    When Site is loaded
    When User clicks the dislike button
    Then A new image is loaded