import { useState } from 'react'
import { currencyFormatter } from "../utils";
import { Stack, Button } from "react-bootstrap";


export default function Expense(
{  key,
  id,
  description,
  date,
  amount,
  deleteExpense,
  expense}
) {

  const [confirmDeleteExpense, setConfirmDeleteExpense] = useState(false);

  return (
    <Stack direction="vertical" gap="3" >
      <Stack className="d-flex" direction="horizontal" gap="2">

        {!confirmDeleteExpense ? (
          <>
            <div className="me-auto fs-4">
              {description}
            </div>
            <div className="fs-5">{date}</div>
            <div className="fs-5">
              {currencyFormatter.format(Number(amount))}
            </div>
            <Button
              onClick={() => setConfirmDeleteExpense(true)}
              size="sm"
              variant="outline-danger"
            >
              &times;
            </Button>
          </>
          ) : (
          <>
            <div className='me-auto fs-5'>
              Delete expense {description}?
            </div>
            <Button variant='outline-danger' onClick={() => {
              deleteExpense(expense);
              setConfirmDeleteExpense(false)
            }}>
              Delete
            </Button>
            <Button variant='outline-secondary' onClick={() => setConfirmDeleteExpense(false)}>
              Cancel
            </Button>
          </>
        )}
      </Stack>
    
  </Stack>
  )
}
