import Header from "../components/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faChartColumn } from "@fortawesome/free-solid-svg-icons";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="w-full h-full">
      <Header />
      <div className="w-full h-[93%] flex">
        <Sidebar />
        <div className="w-full lg:w-[80%] xl:w-[85%] h-full flex flex-col justify-center">
          <div className="w-full h-16 flex items-center justify-center md:hidden">
            <div
              onClick={() => navigate("/contacts")}
              className={`w-2/5 h-10 flex items-center justify-between ${
                location.pathname === "/contacts"
                  ? "bg-[#26252B]"
                  : "bg-transparent"
              } rounded-lg gap-3 px-3 cursor-pointer hover:bg-[#26252B]`}
            >
              <label className="text-sm font-medium text-white cursor-pointer">
                Contact
              </label>
              <FontAwesomeIcon icon={faPhone} className="text-green-500" />
            </div>
            <div
              onClick={() => navigate("/chartsandmaps")}
              className={`w-2/5 h-10 flex items-center justify-between ${
                location.pathname === "/chartsandmaps"
                  ? "bg-[#26252B]"
                  : "bg-transparent"
              } rounded-lg gap-3 px-3 cursor-pointer hover:bg-[#26252B]`}
            >
              <label className="text-sm font-medium text-white cursor-pointer">
                Chart & Map
              </label>
              <FontAwesomeIcon icon={faChartColumn} className="text-blue-500" />
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
