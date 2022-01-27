import {
  Box,
  Flex,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { mutate } from 'swr'
import { fetcher } from '../utils/fetcher'

export const AuthForm = () => {
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [authButtonState, setAuthButtonState] = useState(false)

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
          const { data, err } = await fetcher(
            `/api/${authButtonState ? 'login' : 'signup'}`,
            { email, password }
          )
          if (
            (email.length === 0 && authButtonState) ||
            (password.length === 0 && authButtonState)
          ) {
            toast({
              position: 'top',
              title: 'An error',
              description: `${err}`,
              duration: 5000,
              isClosable: true,
            })
            setLoading(false)
          } else if (err) {
            toast({
              position: 'top',
              title: 'An error',
              description: `${err}`,
              duration: 5000,
              isClosable: true,
            })
            setLoading(false)
          } else {
            toast({
              position: 'top',
              title: 'Success',
              description: 'Logged in with success',
              status: 'success',
              duration: 5000,
              isClosable: true,
            })
          }
        } catch (err: any) {
          return
        }
        await mutate('/api/me')
      }}
    >
      <Flex minH={'50vh'} align={'center'} justify={'center'}>
        <Stack spacing={8} mx={'auto'} w={600} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Text fontSize={'lg'} color={'gray.600'}>
              {authButtonState
                ? 'Login to your account'
                : 'Sign up to your account'}
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}></Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  )
}
