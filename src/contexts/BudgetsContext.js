import React, { useContext, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = React.createContext()

export function useBudgets() {
  return useContext(BudgetsContext)
}

// budget {
//   id:
//   name:
//   max:
// }

// expense {
//   id:
//   budgetId:
//   amount:
//   description:
// }


export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage([])
  const [expenses, setExpenses] = useLocalStorage([])

  function getBudgetExpenses(budgetId) {
    return expenses.filter(expense => expense.budgetId === budgetId)
  } 
  
  function addExpense({ description, amount, budgetId }) {
    setExpenses(prevExpenses => {
      return [...prevExpenses, { id: uuidv4(), description, amount, budgetId }]
    })
  }
    
  function addBudget({ name, max }) {
    setBudgets(prevBudgets => {
      if (prevBudgets.find(budget => budget,name === name)) {
        return prevBudgets
      }
      return [...prevBudgets, { id: uuidv4(), name, max }]
    })
  }

  function deleteBudget({ id }) {
    //TODO deal with expenses
    setBudgets(prevBudgets => {
      return prevBudgets.filter(budget => budget.id !== id)
    })
  }
    
  function deleteExpense({ id }) {
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