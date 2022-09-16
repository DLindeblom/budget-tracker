import { Modal, Stack, Button } from 'react-bootstrap';
import { useBudgets } from '../contexts/BudgetsContext';

export default function DeleteExpenseModal({ budgetId, show, cancel, handleClose }) {

  const { deleteBudget, budgets } = useBudgets()

  const budget = budgets.find(b => b.id === budgetId)

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <Stack>
          <h3 className="text-align-center">
            Are you sure you want to delete budget?
          </h3>
        </Stack>
        <Stack direction='horizontal' gap='2'>
          <Button 
            onClick={() => {
              deleteBudget(budget);
              cancel()
              handleClose()
            }} 
            variant="danger"
          >
            Delete
          </Button>
          <Button
            onClick={cancel} 
            variant="secondary"
          >
            Cancel
          </Button>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
