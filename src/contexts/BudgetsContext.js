import React, { useContext, useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";

const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = 0

export function useBudgets() {
  return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
  
  const [budgets, setBudgets] = useState([])
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    axios.get('/budgets')
         .then((res) => {
          setBudgets(res.data)
         })
    axios.get('/expenses')
         .then((res) => {
          setExpenses(res.data)
         })
  }, [])
  

  function getBudgetExpenses(budgetId) {
    return expenses.filter(expense => expense.budget_id === budgetId)
  } 
  
  function addExpense({ description, amount, budgetId, date }) {
    // setExpenses(prevExpenses => {
    //   return [...prevExpenses, { id: uuidv4(), description, amount, budgetId, date }]
    // })
    axios.post('/expenses', {description, amount, date, budgetId})
         .then(() => {
            axios.get('/expenses')
            .then((res) => {
            setExpenses(res.data)
            })
          })
  }
    
  function addBudget({ user_id, name, max }) {

    axios.post('/budgets', {user_id, name, max})
         .then(() => {
            axios.get('/budgets')
            .then((res) => {
             setBudgets(res.data)
            })
         })
    // setBudgets(prevBudgets => {
    //   if (prevBudgets.find(budget => budget.name === name)) {
    //     return prevBudgets
    //   }
    //   return [...prevBudgets, { id: uuidv4(), name, max }]
    // })
  }

  function deleteBudget({ id }) {

    axios.delete(`/budgets/delete/${id}`)
         .then(() => {
           axios.get('/budgets')
            .then((res) => {
              setBudgets(res.data)
            })
            axios.get('/expenses')
            .then((res) => {
            setExpenses(res.data)
            })
         })
    // setExpenses(prevExpenses => {
    //   return prevExpenses.map(expense => {
    //     if (expense.budgetId !== id) return expense
    //     return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID}
    //   })
    // })
    // setBudgets(prevBudgets => {
    //   return prevBudgets.filter(budget => budget.id !== id)
    // })
  }
    
  function deleteExpense({ id }) {
    console.log(id)
    axios.delete(`/expenses/delete/${id}`).then(res => {
      console.log(res)
    })
    setExpenses(prevExpenses=> {
      return prevExpenses.filter(expense => expense.id !== id)
    })
  }

  return (
    <BudgetsContext.Provider value={{
      budgets, 
      expenses, 
      getBudgetExpenses, 
      addExpense,
      addBudget,
      deleteBudget,
      deleteExpense
    }}>{children}</BudgetsContext.Provider>
  )
}