import { layout } from '@chakra-ui/react'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/** fotter */}
    </>
  )
}

export default Layout
