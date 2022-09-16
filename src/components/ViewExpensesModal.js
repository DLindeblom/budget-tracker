import { useState } from "react";
import { Modal, Stack, Button } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetsContext';
import { currencyFormatter } from "../utils";
import DeleteBudgetModal from "./DeleteBudgetModal";

export default function AddBudgetModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();

  const [viewDeleteBudgetModal, setViewDeleteBudgetModal] = useState(false);
  const [openDeleteExpenseModal, setOpenDeleteExpenseModal] = useState(false);

  const expenses = getBudgetExpenses(budgetId);
  const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? { name: "Uncatgorized", id: UNCATEGORIZED_BUDGET_ID } : budgets.find(b => b.id === budgetId);

  function openDeleteBudgetModal() {
    setViewDeleteBudgetModal(true)
  }

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
          <Stack direction="vertical" gap="3" >
            {expenses.map(expense => (
              <Stack className="d-flex" direction="horizontal" gap="2" key={expense.id}>
                <div className="me-auto fs-4">
                  {expense.description}
                </div>
                <div className="fs-5">{expense.date}</div>
                <div className="fs-5">
                  {currencyFormatter.format(Number(expense.amount))}
                </div>
                <Button
                  onClick={() => deleteExpense(expense)}
                  size="sm"
                  variant="outline-danger"
                >
                  &times;
                </Button>
              </Stack>
            ))}
          </Stack>
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
