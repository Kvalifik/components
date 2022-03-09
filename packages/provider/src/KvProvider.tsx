import { FC, ReactNode } from 'react'
import { ChakraProvider, ChakraProviderProps } from '@chakra-ui/react'
import React from 'react'

type KvProviderProps = {
  children: ReactNode
  chakraProviderProps?: ChakraProviderProps
}

const KvProvider: FC<KvProviderProps> = ({ children, chakraProviderProps }) => {
  return <ChakraProvider {...chakraProviderProps}>{children}</ChakraProvider>
}

export default KvProvider
