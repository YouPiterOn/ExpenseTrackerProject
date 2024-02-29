***Expense Tracker app***

**Entities:**

*1. Expense*
  
  fields:
  
  _id: String
  
  username: String
  
  name: String
  
  sum: Number
  
  sign: Boolean
  
  date: String

*2. User*

  fields:

  _id: String

  username: String

  password: String

  roles: String array

  onlineStatus: Boolean

**Endpoints:**

**/**

*1. get '/'*

  returns main page with a list of all created expenses
  
*2. post '/create'*

  creates new expense using data from req body

  fields in body: username, name, sum, sign, date

*3. post '/delete/:id'*

  deletes expense with specified id
  
*4. post '/change'*

  finds expense with id specifieds in req body and changes its fields according to the fields in req body

  fields in body: id, name, sum, sign, date

**/user**

*1. get '/'*

  returns page for login and registration

*2. post '/login'*

  gets username and password from body, login user with this data and creates cookie with login token

  fields in body: username, password

*3. post '/register'*

  gets username and password from body, registers user with this data and creates cookie with login token

  fields in body: username, password

*4. post '/logout'*

  deletes the cookie with token

*5. get '/edit'*

  returns page to edit username or password

*6. get '/edit/username'*

  gets new username from body and changes it in the logged in user and all its expenses

  fields in body: newUsername

*6. get '/edit/password'*

  gets old and new password from body, checks if old password if valid and changes password of logged in user to new

  fields in body: oldPassword, newPassword

*admin endpoints:*

*7. get '/list'*

  returns the page with list of users registered

*8. post '/delete/:username'*

  deletes user with parameter username and all expenses with this username

**Using guide**

login page has two forms to login and register

  to login write username and password and press button 'Login'

  to register write username and password and press button 'Rigister'

main page has a list of expenses in the database

  to create new write data in fields below list and press 'Add expense'

  to delete expense press the button 'Delete' on the list

  to edit expense doubleclick it on the list, modify data in the form and click 'Submit changes'

user list has list of users, their roles and online status

  to delete user press delete near user

edit user page has two forms to edit username and edit password

  to edit username write new username and press button 'Submit'

  to edit password write your old password, new password and press button 'Submit'


**test accounts**

1. username: admin, password: admin

2. username: qwerty, password: qwerty
