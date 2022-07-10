/* VARIABLES */

const expName = document.querySelector('#expenseName')
const expDate = document.querySelector('#expenseDate')
const expAmount = document.querySelector('#expenseAmount')
const submitBtn = document.querySelector('#submitBtn')
const expenses = document.querySelector('.mainTable tbody')
const totalSum = document.querySelector('#sum')
const clear = document.querySelector('#clear')

/* Cleaning Inputs values */
expName.value = ''
expDate.value = ''
expAmount.value = ''

/* Settting local storage */
let expList = JSON.parse(localStorage.getItem('spense-list'))

/* Renders expenses */
const renderExpenses = () => {
  let sum = 0
  let tr = ''
  if (expList) {
    expList.forEach((expense, id) => {
      tr += `<tr class="expTr" id="${id}">
              <td>${expense.name}</td>
              <td class="expDateTd">${expense.date}</td>
              <td class="expAmountTd">${expense.amount}</td>
              <td Class="optionsTd" id="options">
                <button class="btn" onclick="editExp(this)">Edit</button>
                <button class="btn" onclick="eraseExp(this)">Erase</button>
              </td>
            </tr>`
      sum += parseInt(expense.amount)
    })
  }
  expenses.innerHTML = tr
  totalSum.textContent = '$' + sum
}

/* Clear all the data */
const clearAll = () => {
  expList = []
  localStorage.setItem('spense-list', JSON.stringify(expList))
  renderExpenses()
}

renderExpenses()

/* Adding evento to submit button */
submitBtn.addEventListener('click', () => {
  if (expName.value !== '' || expDate.value !== '' || expAmount.value !== '') {
    if (!expList) {
      expList = []
    }
    expenseInfo = {name: expName.value.trim(), date: expDate.value, amount: expAmount.value}
    expList.push(expenseInfo)
    localStorage.setItem('spense-list', JSON.stringify(expList))
    expName.value = ''
    expDate.value = ''
    expAmount.value = ''
  }
  renderExpenses()
})

clear.addEventListener('click', () => {
  clearAll()
})

const editExp = (btn) => {
  const tr = btn.parentElement.parentElement
  const id = tr.id
  const expText = expList[id]
  tr.innerHTML = `<tr>
                  <th>
                    <label for="name">Name: </label>
                    <input type="text" name="name" id="editExpName" required="required" value="${expText.name}">
                  </th>
                  <th>
                    <label for="name">Date: </label>
                    <input type="date" name="date" id="editExpDate" required value="${expText.date}">
                  </th>
                  <th>
                    <label for="number">Amount: </label>
                    <input type="number" name="amount" id="editExpAmount" required value="${expText.amount}">
                  </th>
                  <th>
                    <button class="btn" type="submit" id="endEdit">End Edit</button>
                  </th>
                </tr>`
  const endEdit = document.querySelector('#endEdit')
  endEdit.addEventListener('click', () => {
    const editExpName = document.querySelector('#editExpName')
    const editExpDate = document.querySelector('#editExpDate')
    const editExpAmount = document.querySelector('#editExpAmount')
    if (editExpName.value !== '' || editExpDate.value !== '' || editExpAmount.value !== '') {
      expenseInfo = {name: editExpName.value.trim(), date: editExpDate.value, amount: editExpAmount.value}
      expList[tr.id] = expenseInfo
      localStorage.setItem('spense-list', JSON.stringify(expList))
      renderExpenses()
    }
  })
}

const eraseExp = (btn) => {
  const tr = btn.parentElement.parentElement
  const id = tr.id
  expList.splice(id, 1)
  localStorage.setItem('spense-list', JSON.stringify(expList))
  renderExpenses()
}