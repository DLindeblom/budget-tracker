import { useState } from "react";
import { Modal, Stack, Button } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetsContext';
import Expense from "./Expense";
import DeleteBudgetModal from "./DeleteBudgetModal";

export default function AddBudgetModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteExpense } = useBudgets();

  const [viewDeleteBudgetModal, setViewDeleteBudgetModal] = useState(false);

  const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? { name: "Uncatgorized", id: UNCATEGORIZED_BUDGET_ID } : budgets.find(b => b.id === budgetId);

  function openDeleteBudgetModal() {
    setViewDeleteBudgetModal(true);
  }

  const oneExpense = getBudgetExpenses(budgetId).map((expense)=> {
    return (
      <Expense
        key={expense.id}
        id={expense.id}
        description={expense.description}
        date={expense.date}
        amount={expense.amount}
        deleteExpense={deleteExpense}
        expense={expense}
      />
    )

  })
console.log(oneExpense)
  return (
    <>
      <Modal show={budgetId != null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Stack direction="horizontal" gap="2">
              <div>Expenses - {budget?.name}</div>
              {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                <Button
                  onClick={openDeleteBudgetModal}
                  variant="outline-danger"
                >
                  Delete
                </Button>
              )}
            </Stack>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {oneExpense}
        </Modal.Body>
      </Modal>
      <DeleteBudgetModal
        show={viewDeleteBudgetModal}
        budgetId={budgetId}
        cancel={() => setViewDeleteBudgetModal(false)}
        handleClose={handleClose}
      />
    </>
  );
}
