
import { Chip } from "@mui/material";
import { FC } from "react";



interface Props {
  error: boolean;
  msg: string;
}

const AlertChip: FC<Props>= (alert) => {
  return (
    <Chip
    label={alert.msg}
    color={alert.error ? 'error': 'success'}
    className="fadeIn"
  />

  );
};

export default AlertChip;


