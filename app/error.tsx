'use client' // Error components must be Client Components
 
import { Button } from '@nextui-org/react'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  return (
    <div className='text-center min-h-[100vh] flex flex-col items-center justify-center'>
      <h2>Something went wrong!</h2>
      <Button
      className='mt-2'
      size='sm'
      color='danger'
      radius='sm'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}
