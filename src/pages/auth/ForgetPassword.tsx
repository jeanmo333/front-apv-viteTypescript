import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../../components/ui/Alert";
import { CircularLoading } from "../../components/ui/CircularLoading";
import axiosClient from "../../config/axios";
import { useAuth } from "../../hooks/useAuth";
import { IAlert } from "../../interfaces/alert";

const FogetPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState<IAlert | null>();

  const { loading, setLoading } = useAuth();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlert({ msg: "El Email es obligatorio", error: true });

      setTimeout(() => setAlert(null), 7000);
      return;
    }

    try {
      setLoading(true);
      const { data } = await axiosClient.post("/users/forget-password", {
        email,
      });
      setAlert({ msg: data.msg });
      setLoading(false);
      setTimeout(() => setAlert(null), 7000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setLoading(false);
        setAlert({
          msg: error.response!.data.msg,
          error: true,
        });
      }
      setTimeout(() => setAlert(null), 7000);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-3xl text-center">
          Recupera tu Acceso en apv y no Pierdas {""}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className=" md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {alert?.msg && <Alert alert={alert!} />}

        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email de Registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto ">
            {loading ? <CircularLoading /> : "Enviar Instrucciones"}
          </button>
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link className="block text-center my-5 text-gray-500" to="/register">
            ¿No tienes una cuenta? Regístrate
          </Link>
        </nav>
      </div>
    </>
  );
};

export default FogetPassword;
