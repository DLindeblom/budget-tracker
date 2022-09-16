import { Modal, Stack } from 'react-bootstrap';
import { useBudgets } from '../contexts/BudgetsContext';

export default function DeleteBudgetModal() {

  const { deleteBudget } = useBudgets()

  return (
    <Modal className="bg-danger bg-opacity-7">
      <Modal.Body>
        <Stack>
          <h3 className="text-align-center">
            Are you sure you want to delete budget - {budget.name}?
          </h3>
        </Stack>
        <Stack direction='horizontal' gap='2'>
          <Button onClick={() => deleteBudget(budget)} variant="danger">Delete</Button>
          <Button variant="secondary">Cancel</Button>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
