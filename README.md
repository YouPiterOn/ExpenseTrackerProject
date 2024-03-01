# Expense Tracker app

## Entities:

### 1. Expense
  
  fields:
  
  _id: String
  
  username: String
  
  name: String
  
  sum: Number
  
  sign: Boolean
  
  date: String

### 2. User

  fields:

  _id: String

  username: String

  password: String

  roles: String array

  onlineStatus: Boolean

# Endpoints:

## /

### 1. get '/'

  returns main page with a list of all created expenses

  fields in query: sortBy, sortOrder, month
  
### 2. post '/create'

  creates new expense using data from req body

  fields in body: username, name, sum, sign, date

### 3. post '/delete/:id'

  deletes expense with specified id
  
### 4. post '/change'

  finds expense with id specifieds in req body and changes its fields according to the fields in req body

  fields in body: id, name, sum, sign, date

### 5. get '/months'

  months view with list of months with compiled expenses in them

## /user

### 1. get '/'

  returns page for login and registration

### 2. post '/login'

  gets username and password from body, login user with this data and creates cookie with login token

  fields in body: username, password

### 3. post '/register'

  gets username and password from body, registers user with this data and creates cookie with login token

  fields in body: username, password

### 4. post '/logout'

  deletes the cookie with token

### 5. get '/edit'*

  returns page to edit username or password

### 6. get '/edit/username'

  gets new username from body and changes it in the logged in user and all its expenses

  fields in body: newUsername

### 6. get '/edit/password'

  gets old and new password from body, checks if old password if valid and changes password of logged in user to new

  fields in body: oldPassword, newPassword

### admin endpoints:

### 7. get '/list'

  returns the page with list of users registered

### 8. post '/delete/:username'

  deletes user with parameter username and all expenses with this username

## Using guide

### login page 

  has two forms to login and register

  to login write username and password and press button 'Login'

  to register write username and password and press button 'Rigister'

### main page 

  has a list of expenses in the database

  to create new write data in fields below list and press 'Add expense'

  to delete expense press the button 'Delete' on the list

  to edit expense doubleclick it on the list, modify data in the form and click 'Submit changes'

  to sort choose parameters in sorting form and press 'Sort'

  to change to month view press button 'View by month'

### months view 

  has list of months with compiled expenses in them

  to show expenses in particular month press show on the month you want to see

  to sort choose parameters in sorting form and press 'Sort'

  to change back to expenses view press button 'View by expenses'

### user list 

  has list of users, their roles and online status

  to delete user press delete near user

### edit user page 

  has two forms to edit username and edit password

  to edit username write new username and press button 'Submit'

  to edit password write your old password, new password and press button 'Submit'


## test accounts

1. username: admin, password: admin

2. username: qwerty, password: qwerty

# Task 11 documentation

## Logging

  two middlewares

  - one is writing detailed logs about each request so server in file request.log

  - the second is logging errors if them occur in file error.log

## Error handling

  - when errors occur they are transfered to middleware which write them into log and console

  - if user tries to access not existing page it will trigger last middleware and 404 error will be thrown

## Caching

  - all the expenses after first load stores in cache

  - when user creates/updates/deletes expense all these actions are performed with data not only in database but in cache also