import React, { FC } from 'react'
import {
  Box,
  Text,
  Modal,
  Button,
  Center,
  useToast,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalCloseButton
} from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'
import {
  browserName,
  fullBrowserVersion,
  osName,
  osVersion
} from 'react-device-detect'
import { da } from './locale/da'
import { en } from './locale/en'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  language?: 'en' | 'da'
  color?: string
  errorReportLink: string
}

const languages = {
  da,
  en
}

const addNewLine = (text: string) => (
  <>
    {text.split('\n').map((c) => (
      <Text mb={4}>{c}</Text>
    ))}
  </>
)

export const KvBugReport: FC<Props> = ({
  isOpen,
  setIsOpen,
  language = 'en',
  color = '#191E3B',
  errorReportLink
}) => {
  const toast = useToast()
  const t = languages[language]

  const onCopyTextClicked = () => {
    navigator.clipboard.writeText(`${t.whatWentWrong} 
${t.whichPageDidYouVisit} 
${t.whatDidYouDo}

${t.os}: ${osName} ${osVersion}
${t.browserInfo}: ${browserName} ${fullBrowserVersion} (${window.innerWidth} x ${window.innerHeight})`)
    toast({
      title: 'Text copied to clipboard',
      status: 'success',
      duration: 9000,
      isClosable: true
    })
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {addNewLine(t.description)}
            <Box
              color={'gray.500'}
              borderRadius={4}
              p={4}
              border='1px'
              borderColor='gray.200'
            >
              <Text>{t.whatWentWrong}</Text>
              <Text>{t.whichPageDidYouVisit}</Text>
              <Text>{t.whatDidYouDo}</Text>
              <Box h={2} />
              <Text>
                {t.os}: {osName} {osVersion}
              </Text>
              <Text>
                {t.browserInfo}: {browserName} {fullBrowserVersion} (
                {window.innerWidth} x {window.innerHeight})
              </Text>
              <Center>
                <Button
                  mt={4}
                  borderColor={color}
                  color={color}
                  variant='outline'
                  onClick={onCopyTextClicked}
                >
                  {t.copyText}
                  <CopyIcon ml={2} />
                </Button>
              </Center>
            </Box>
          </ModalBody>

          <ModalFooter justifyContent={'space-between'}>
            <Button
              w='100%'
              borderColor={color}
              variant='outline'
              onClick={() => setIsOpen(false)}
            >
              {t.cancel}
            </Button>
            <Box w={16} />
            <Button
              w='100%'
              bg={color}
              color={'white'}
              as='a'
              href={errorReportLink}
              target='_blank'
            >
              {t.goToErrorReporting}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
