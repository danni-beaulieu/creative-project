# CSE330
Student ID: 497567   
Github Username: danni-beaulieu   
Currently running two detached processes on aws: 
http://ec2-44-202-59-171.compute-1.amazonaws.com:3000/login 

## Rubric

#### Rubric turned in on time (5 points)
https://piazza.com/class/ky8xiakerco4ka?cid=555_f3

#### Languages/Frameworks used (30 points)
  * 10 - Learned/Used React front-end
  * 10 - Learned/Used Express back-end
  * 10 - Learned/Used Stripe integration
  * 0 - Used MySQL database storage
  
#### Functionality (55 points)
  * 10 Users can register/login/logout
  * 10 Users can add/edit/delete a credit card
  * 10 Users can add/edit/delete a project 
  * 5 Users can donate to a project
  * 10 Database contains Users, Projects, Donations
  * 10 Other users can be added to a project as collaborators
  
#### Best Practices (5 points)
  * 3 Code is readable and well formatted
  * 2 All pages pass the html validator

#### Creative Portion (5 points)
  * Possibilities: 
    * Guests can save card to new account at/after checkout
    * Divides single donation payment among collaborators
    * Can create policy for dividing payment unequally

## Notes
For creative portion I implemented JWT with access tokens and refresh tokens for all sensitive actions.

For adding a credit card, this is done during checkout. Other credit card options available under Account.

Collaborators on a project can edit but not delete.

#### Test Card:

Visa: 4242 4242 4242 4242
Expire: 04/24
CVC: 242
Zip: 42424

