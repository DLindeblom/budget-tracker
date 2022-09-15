import { useBudgets } from "../contexts/BudgetsContext"
import BudgetCard from "./BudgetCard"

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudgets()
  const amount = expenses.reduce(
    (total, expense) => Number(total) + Number(expense.amount),
    0
  )

  const max = budgets.reduce(
    (total, budget) => Number(total) + Number(budget.max),
    0
  )

  if (max === 0) return null

  return <BudgetCard amount={amount} name="Total" gray max={max} hideButtons/>
}