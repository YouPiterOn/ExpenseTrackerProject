***Expense Tracker app***

**Entities:**

*1. Expense*
  
  fields:
  
  _id: String
  
  userId: String
  
  name: String
  
  sum: Number
  
  sign: Boolean
  
  date: String

**Endpoints:**

*1. get '/'*

  returns main page with a list of all created expenses

*2. get '/:id'*

  finds expence with cpecified id and returns it
  
*3. post '/create'*

   creates new expense using data from req body

   fields in body: userId, name, sum, sign, date

*4. post '/delete/:id'*

  deletes expense with specified id
  
*5. post '/change'*

  finds expense with id specifieds in req body and changes its fields according to the fields in req body

  fields in body: id, name, sum, sign, date

**Using guide**

main page has a list of expenses in the database

to create new write data in fields below list and press 'Add expense'

to delete expense press the button 'Delete' on the list

to edit expense doubleclick it on the list, modify data in the form and click 'Submit changes'


