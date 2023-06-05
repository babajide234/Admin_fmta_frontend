import { Outlet } from "react-router-dom"
import Container from "../components/common/Container"

const AuthLayout = () => {
  return (
    <Container>
        <Outlet/>
    </Container>
  )
}

export default AuthLayout