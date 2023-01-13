import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "../../components/ui/Alert";
import { FullScreenLoading } from "../../components/ui/FullScreenLoading";
import axiosClient from "../../config/axios";
import { useAuth } from "../../hooks/useAuth";
import { IAlert } from "../../interfaces/alert";

const ConfirmAccount = () => {
  const [accountConfirm, setAccountConfirm] = useState(false);
  const [loadingConfrim, setLoadingConfrim] = useState(false);
  const [alert, setAlert] = useState<IAlert | null>();

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    confirmAccountApi();
  }, []);

  const confirmAccountApi = async () => {
    try {
      setLoadingConfrim(true);
      const url = `/users/confirm-account/${token}`;
      const { data } = await axiosClient(url);
      console.log(data.msg);
      setAccountConfirm(true);
      setAlert({
        msg: data.msg,
        error: false,
      });
      setLoadingConfrim(false);
      return;
    } catch (e) {
      //   if (axios.isAxiosError(e)) {
      //     setCargando(false);
      //     setAlerta({
      //       msg: e.response!.data.msg,
      //       error: true,
      //     });
      //     console.log(e.response!.data.msg);
      //     setCargando(false);
      //   }
      //   setCargando(false);
      //   // setAlerta({
      //   //   msg: error.response.data.msg,
      //   //   error: true,
      //   // });
    }

    setLoadingConfrim(false);
  };


  if (loadingConfrim)
    return (
      <>
        <FullScreenLoading />
      </>
    );
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl text-center">
          Confirma tu Cuenta y Comienza a Administrar {""}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-3 md:mt-5 shadow-lg px-5 py-5 rounded-xl bg-white">
        {!loadingConfrim && <Alert alert={alert!} />}

        {accountConfirm && (
          <Link className="block text-center my-5 text-gray-500" to="/">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
