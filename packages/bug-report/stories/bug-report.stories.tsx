import React, { useState } from 'react'
import KvBugReport from '../src/KvBugReport'
import { Button } from '@chakra-ui/react'

export default {
  title: 'Components / Bug Report',
  decorators: [
    (Story: any) => (
      <div style={{ width: '100vw', height: '100vh' }}>
        <Story />
      </div>
    )
  ]
}

export const Default = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <KvBugReport
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        errorReportLink='https://google.com'
        language='en'
      />
    </>
  )
}
