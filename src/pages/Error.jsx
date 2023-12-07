// eslint-disable-next-line no-unused-vars
import React from "react";
import { ReactComponent as FileBroken } from "../assets/main/icon/file-broken.svg";
import { ReactComponent as Plugs } from "../assets/main/icon/plugs.svg";
import { ReactComponent as Lock } from "../assets/main/icon/error-lock.svg";
import { ReactComponent as FaceId } from "../assets/main/icon/face-id-error.svg";
import { Link, useLocation, useParams } from "react-router-dom/dist";

const Error = () => {
  const location = useLocation();
  const currentUrl = location.pathname + location.search + location.hash;
  const { errorCode } = useParams();
  const statusCode = Number(errorCode) || 404;
  return (

    <main className="errorpage">
      <div className="errorpage__div-container sm:pt-[10px] pt-[20px]">
        <div className="errorpage__div-tracking w-3/4 text-center mx-auto">
          <header className="errorpage__header">
            <div className="errorpage__div-icon flex justify-center items-center">
              {statusCode === 400 || (statusCode === 404 && <FileBroken />)}
              {statusCode === 401 && <FaceId />}
              {statusCode === 403 && <Lock />}
              {statusCode === 500 && <Plugs />}
            </div>
            <h2 className="errorpage__tracking-text header__2 secondary w-[70%] mx-auto">
              {statusCode === 400 &&
                "There appears to have been an issue with the request you sent."}
              {statusCode === 401 &&
                "Looks like you're not authorized. You need proper credentials to continue."}
              {statusCode === 403 &&
                "Sorry, but you're not allowed to access this page. Forbidden territory."}
              {statusCode === 404 &&
                " The page you requested does not exist. Sadly, we are still looking for it."}
              {statusCode === 500 &&
                "Something went wrong on our end. Don’t worry, we’re working on it right now."}
            </h2>
          </header>
          <div>
            <p className="errorpage__tracking-data p4 ink">
              Here’s what you can do at the moment
            </p>

            <div className="errorpage__div-link ">
              <Link to={currentUrl}
                className="p4 secondary errorpage__link"

              >
                Try the request again
              </Link>
              <Link to="/" className="p4 secondary errorpage__link">
                Home
              </Link>
              <Link to="/buy" className="p4 secondary errorpage__link">
                Buy an Item
              </Link>
              <Link to="/track" className="p4 secondary errorpage__link">
                Track an Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>

  );
};

export default Error;
