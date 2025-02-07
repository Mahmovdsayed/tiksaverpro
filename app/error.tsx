'use client'

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
    console.error(error)
  }, [error])
  return (
    <div className='text-center min-h-[100dvh] flex flex-col items-center justify-center'>
      <h2>Something went wrong!</h2>
      <Button
        className='mt-2'
        size='sm'
        color='danger'
        radius='sm'
        onPress={
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}
