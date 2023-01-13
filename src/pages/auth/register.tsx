import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../../components/ui/Alert";
import Alerta from "../../components/ui/Alert";
import { CircularLoading } from "../../components/ui/CircularLoading";
import axiosClient from "../../config/axios";
import { useAuth } from "../../hooks/useAuth";
import { IAlert } from "../../interfaces/alert";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [alert, setAlert] = useState<IAlert | null>();

  const {loading, setLoading } = useAuth();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if ([name, email, password, repeatPassword].includes("")) {
      setAlert({ msg: "Hay campos vacios", error: true });

      setTimeout(() => setAlert(null), 7000);
      return;
    }

    if (password !== repeatPassword) {
      setAlert({ msg: "Los Password no son iguales", error: true });

      setTimeout(() => setAlert(null), 7000);
      return;
    }

    if (password.length < 6) {
      setAlert({
        msg: "El Password es muy corto, agrega minimo 6 caracteres",
        error: true,
      });

      setTimeout(() => setAlert(null), 5000);
      return;
    }

    setAlert(null);

    // Crear el usuario en la api
    try {
      setLoading(true)
      const { data } = await axiosClient.post("/users/register", {
        name,
        email,
        password,
      });
      setAlert({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => setAlert(null), 7000);

      setEmail("");
      setName("");
      setPassword("");
      setRepeatPassword("");
      setLoading(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setLoading(false)
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
          Crea tu Cuenta en apv y Administra {""}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className=" md:mt-2 shadow-lg px-2 py-4 rounded-xl bg-white">
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu Nombre"
              className="border w-full p-3 mt-2 bg-gray-50 rounded-xl"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="my-2">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email de Registro"
              className="border w-full p-3 mt-2 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-2">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Tu Password"
              className="border w-full p-3 mt-2 bg-gray-50 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="my-2">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Repetir Password
            </label>
            <input
              type="password"
              placeholder="Repite tu Password"
              className="border w-full p-3 mt-2 bg-gray-50 rounded-xl"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>


          <button
            type="submit"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
            >
            {loading ? <CircularLoading /> : "Crear Cuenta"}
          </button>
        </form>

        {alert?.msg && <Alert alert={alert!} />}

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/forget-password">
            Olvide mi Password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Register;
