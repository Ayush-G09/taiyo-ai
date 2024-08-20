import {
  faChartColumn,
  faPhone,
  faRightFromBracket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { deleteAllData } from "../store/actions";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modal, setModal] = useState<boolean>(false);

  const handleLogout = () => {
    dispatch(deleteAllData());
    navigate("/");
  };

  return (
    <React.Fragment>
      <div className="w-[25%] lg:w-[20%] xl:w-[15%] h-full py-3 hidden md:flex flex-col gap-4 pt-10">
        <div
          onClick={() => navigate("/contacts")}
          className={`w-[90%] h-10 flex items-center justify-between ${
            location.pathname === "/contacts"
              ? "bg-[#26252B]"
              : "bg-transparent"
          } rounded-r-lg gap-3 px-3 cursor-pointer hover:bg-[#26252B]`}
        >
          <label className="text-sm font-medium text-white cursor-pointer">
            Contact
          </label>
          <FontAwesomeIcon icon={faPhone} className="text-green-500" />
        </div>
        <div
          onClick={() => navigate("/chartsandmaps")}
          className={`w-[90%] h-10 flex items-center justify-between ${
            location.pathname === "/chartsandmaps"
              ? "bg-[#26252B]"
              : "bg-transparent"
          } rounded-r-lg gap-3 px-3 cursor-pointer hover:bg-[#26252B]`}
        >
          <label className="text-sm font-medium text-white cursor-pointer">
            Chart & Map
          </label>
          <FontAwesomeIcon icon={faChartColumn} className="text-blue-500" />
        </div>
        <div
          onClick={() => setModal(true)}
          className={`w-[90%] h-10 flex items-center justify-between rounded-r-lg gap-3 px-3 cursor-pointer hover:bg-[#26252B] mt-auto`}
        >
          <label className="text-sm font-medium text-white cursor-pointer">
            Logout
          </label>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="text-blue-500"
          />
        </div>
      </div>
      {modal && (
        <Modal sx="w-3/5 lg:w-2/5" onClose={() => setModal(false)}>
          <div className="w-full flex flex-col gap-5">
            <label className="text-lg font-semibold text-white">
              Are you sure ?
            </label>
            <label className="text-base font-normal text-white">
              You want to logut
            </label>
            <div className="w-full flex items-center gap-5">
              <Button
                sx={"w-[30%] h-8 bg-green-500 hover:bg-green-400"}
                onClick={handleLogout}
                placeholder="Delete"
              />
              <Button
                sx={"w-[30%] h-8 bg-red-500 hover:bg-red-400"}
                onClick={() => setModal(false)}
                placeholder="Cancel"
              />
            </div>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
}

export default Sidebar;
