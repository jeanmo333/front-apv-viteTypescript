
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "../../components/ui/Alert";
import axiosClient from "../../config/axios";
import { IAlert } from "../../interfaces/alert";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState<IAlert | null>();
  const [tokenValid, setTokenValid] = useState(false);
  const [passwordModify, setPasswordModify] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axiosClient(`/users/forget-password/${token}`);
        setAlert({
          msg: "Coloca tu Nuevo Password",
        });
        setTokenValid(true);
      } catch (error) {
        setAlert({
          msg: "Hubo un error con el enlace",
          error: true,
        });
      }
    };
    checkToken();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({
        msg: "El Password debe ser mínimo de 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const url = `/users/forget-password/${token}`;
      const { data } = await axiosClient.post(url, { password });
      setAlert({
        msg: data.msg,
      });
      setPasswordModify(true);
    } catch (error) {

      if (axios.isAxiosError(error)) {
        setAlert({
          msg: error.response!.data.msg,
          error: true,
        });
      }
      
    }
  };

  return (
    <>
    <div>
    <h1 className="text-indigo-600 font-black text-4xl text-center">
      Reestablece tu password en apv y no Pierdas Acceso a {""}
      <span className="text-black">tus Pacientes</span>
    </h1>
  </div><div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
      {alert?.msg && <Alert alert={alert} />}

      {tokenValid && (
        <>
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Nuevo Password
              </label>
              <input
                type="password"
                placeholder="Tu Nuevo Password"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <input
              type="submit"
              value="Guardar Nuevo Password"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto " />
          </form>
        </>
      )}

      {passwordModify && (
        <Link className="block text-center my-5 text-gray-500" to="/">
          Iniciar Sesión
        </Link>
      )}
    </div>
    </>
  );
};

export default NewPassword;
