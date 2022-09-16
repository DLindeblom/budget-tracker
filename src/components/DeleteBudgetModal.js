import { Modal, Stack, Button } from 'react-bootstrap';
import { useBudgets } from '../contexts/BudgetsContext';

export default function DeleteBudgetModal({ budgetId, show, cancel, handleClose }) {

  const { deleteBudget, budgets } = useBudgets()

  const budget = budgets.find(b => b.id === budgetId)

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body className='bg-danger bg-opacity-10'>
        <Stack>
          <h3 className="text-center">
            Are you sure you want to delete budget?
          </h3>
        </Stack>
        <Stack direction='horizontal' gap='2' className='d-flex justify-content-around mt-4'>
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
