import BudgetCard from "./BudgetCard"

export default function UNcategorizedBudgetCard(props) {
  const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0);

  return (
    <BudgetCard amount={amount} name="Uncategorized" gray {...props}/>
  )
}
