/* eslint-disable react/prop-types */
import ScrollToTop from "./ScrollToTop"

const Container = ({ children }) => {
  return (
    <div className="landing-container">
        <ScrollToTop/>
        <div className="landing-container__bg"></div>
        <div className="landing-container__bg-2"></div>
        { children }
    </div>
  )
}

export default Container