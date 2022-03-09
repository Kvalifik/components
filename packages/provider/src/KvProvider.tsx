import React from 'react'
import { FC } from 'react'
import { ChakraProvider, ChakraProviderProps } from '@chakra-ui/react'

type KvProviderProps = {
  children: JSX.Element
  chakraProviderProps?: ChakraProviderProps
}

export const KvProvider: FC<KvProviderProps> = ({
  children,
  chakraProviderProps
}) => {
  return <ChakraProvider {...chakraProviderProps}>{children}</ChakraProvider>
}
