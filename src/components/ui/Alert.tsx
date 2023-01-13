import { FC } from "react";
import { IAlert } from "../../interfaces/alert";

type Props= {
  alert?: IAlert ;
}

const Alert = ({alert}: Props ) => {
  return (
    <div
      className={`${
        alert?.error
          ? "from-red-400 to-red-600"
          : "from-indigo-400 to-indigo-600"
      } bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm mt-6`}>
      {alert?.msg}
    </div>
  );
};

export default Alert;
