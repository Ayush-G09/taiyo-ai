import React, { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { addName } from "../store/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type State = {
  name: { value: string; error: boolean };
};

function Auth() {
  const [state, setState] = useState<State>({
    name: { value: "", error: false },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = () => {
    if (state.name.value) {
      dispatch(addName(state.name.value));
      setState((prev) => ({
        ...prev,
        name: { value: "", error: false },
      }));
      navigate("/contacts");
    } else {
      setState((prev) => ({
        ...prev,
        name: { ...prev.name, error: true },
      }));
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-6">
      <img
        alt="logo"
        src="https://photos.wellfound.com/startups/i/8514589-851e7c45de88ddc70740b1b3e47308ac-medium_jpg.jpg?buster=1631822539"
        className="w-40 h-40 rounded-full"
      />
      <div className="flex flex-col gap-1 w-1/4">
        <label className="text-xl text-white font-semibold">Name</label>
        <div className="w-full h-12">
          <InputField
            placeholder={"Eg: Ayush Gokhle"}
            type={"text"}
            value={state.name.value}
            onChange={(v) =>
              setState((prev) => ({
                ...prev,
                name: { ...prev.name, value: v },
              }))
            }
          />
        </div>
        {state.name.error && (
          <label className="text-red-500 text-sm">Name is required*</label>
        )}
      </div>
      <div className="w-1/4">
        <Button sx={"w-[30%] h-10"} onClick={handleSave} placeholder="Save" />
      </div>
    </div>
  );
}

export default Auth;
