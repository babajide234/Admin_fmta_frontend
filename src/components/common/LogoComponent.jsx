import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const LogoComponent = () => {
  return (
    <div className="fmtaLogo">
      <Link to='/'>
        <img src={Logo} alt="" srcSet="" />
      </Link>
  
    </div>
  )
}

export default LogoComponent