import LoginForm from "../../components/forms/LoginForm"
import Logo from '../../assets/badge.png'
const Login = () => {
  return (
    <div className="auth__container">
        <div className="auth__card">
            <div className="auth__logo-container">
                <img src={Logo} alt="auth__logo" />
            </div>
            <LoginForm/>
        </div>
    </div>
  )
}

export default Login