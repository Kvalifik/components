import { FC } from 'react'
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
import React from 'react'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  language?: 'en' | 'da'
  color?: string
  errorReportLink: string
}

const addNewLine = (text: string) => (
  <>
    {text.split('\n').map((c) => (
      <Text mb={4}>{c}</Text>
    ))}
  </>
)

const KvBugReport: FC<Props> = ({
  isOpen,
  setIsOpen,
  language = 'en',
  color = '#191E3B',
  errorReportLink
}) => {
  const toast = useToast()

  const languages = {
    da,
    en
  }

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
              color={color}
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

export default KvBugReport

const da = {
  title: 'Rapporter en fejl',
  description:
    'For at sikre at vi bedst muligt kan identificere og rette rejlen, er det vigtigt, at du laver en god beskrivelse.\nKlik på boksen herunder for at kopiere teksten. Gå derefter til fejlrapporteringssiden. Der kan du indsætte teksten og besvare spørgsmålene.',
  whatWentWrong: 'Hvad gik galt?',
  whichPageDidYouVisit: 'Hvilken side besøgte du?',
  whatDidYouDo: 'Hvad gjorde du, da det gik galt?',
  os: 'Styresystem',
  browserInfo: 'Browser info',
  copyText: 'Kopiér tekst',
  cancel: 'Annuller',
  goToErrorReporting: 'Gå til fejlrapportering'
}

const en = {
  title: 'Report an error',
  description:
    "To ensure we can identify and correct the error, it's important to provide a good description.\nClick on 'Copy text' to copy the text and go to the error reporting page where you can paste the text and answer the questions.",
  whatWentWrong: 'What went wrong?',
  whichPageDidYouVisit: 'Which page did you visit?',
  whatDidYouDo: 'What did you do when the error occurred?',
  os: 'Operating system',
  browserInfo: 'Browser info',
  copyText: 'Copy text',
  cancel: 'Cancel',
  goToErrorReporting: 'Go to error reporting'
}
