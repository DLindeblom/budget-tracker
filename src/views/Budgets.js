import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModal from "../components/AddBudgetModal";
import AddExpenseModal from "../components/AddExpenseModal";
import ViewExpensesModal from "../components/ViewExpensesModal";
import BudgetCard from "../components/BudgetCard";
import UncategorizedBudgetCard from "../components/UncategorizedBudgetCard";
import TotalBudgetCard from "../components/TotalBudgetCard";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from 'react';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";


export function Budgets() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  if (isLoading) {

    return <div>Loading...</div>;
  }

  return (
    <>
      {!isAuthenticated && (
        <LoginButton />
      )}

      {isAuthenticated && (<>
      
        <Container className="my-4">
          <Stack direction="horizontal" gap="2" className="mb-4">
            <h3 className="me-auto">Welcome {user.name}!</h3>
            <LogoutButton/>
          </Stack>

          <Stack direction="horizontal" gap="2" className="mb-4">
            <h1 className="me-auto">Budgets</h1>
            <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
              Add Budget
            </Button>
            <Button variant="outline-primary" onClick={openAddExpenseModal}>
              Add Expense
            </Button>
          </Stack>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start"
          }}
          >
            {budgets.map(budget => {
              const amount = getBudgetExpenses(budget.id).reduce((total, expense) => Number(total) + Number(expense.amount), 0);
              return (
                <BudgetCard
                  key={budget.id}
                  name={budget.name}
                  amount={amount}
                  max={budget.max}
                  onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                  onViewExpenseClick={() => setViewExpensesModalBudgetId(budget.id)}
                />
              );
            })}
            <UncategorizedBudgetCard
              onAddExpenseClick={openAddExpenseModal}
              onViewExpenseClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}

            />
            <TotalBudgetCard />
          </div>
        </Container>
        <AddBudgetModal
          show={showAddBudgetModal}
          handleClose={() => setShowAddBudgetModal(false)}
        />
        <AddExpenseModal
          show={showAddExpenseModal}
          defaultBudgetId={addExpenseModalBudgetId}
          handleClose={() => setShowAddExpenseModal(false)}
        />
        <ViewExpensesModal
          budgetId={viewExpensesModalBudgetId}
          handleClose={() => setViewExpensesModalBudgetId()}
        />
      </>)}
    </>
  );
}
