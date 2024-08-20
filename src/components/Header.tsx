import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import React, { useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { deleteAllData } from "../store/actions";
import Button from "./Button";

function Header() {
  const name = useSelector((state: RootState) => state.contact.name);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modal, setModal] = useState<boolean>(false);

  const handleLogout = () => {
    dispatch(deleteAllData());
    navigate("/");
  };

  return (
    <React.Fragment>
      <div className="w-full h-[7%] flex items-center bg-[#26252B] px-5 justify-between">
        <label className="text-xl font-medium text-white">Taiyo.Ai</label>
        <div className="flex gap-2 items-center">
          <label className="text-xl font-normal text-white">{name}</label>
          <div className="w-8 h-8 rounded-full shadow-allSide bg-slate-400 text-white flex items-center justify-center">
            <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
          </div>
          <FontAwesomeIcon
            onClick={() => setModal(true)}
            icon={faRightFromBracket}
            className="text-blue-500 ml-5 cursor-pointer w-5 h-5 flex md:hidden"
          />
        </div>
      </div>
      {modal && (
        <Modal sx="w-4/5 md:w-3/5 lg:w-2/5" onClose={() => setModal(false)}>
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

export default Header;
