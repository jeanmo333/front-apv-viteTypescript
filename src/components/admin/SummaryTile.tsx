import { FC } from "react";

import { Grid, Card, CardContent, Typography } from "@mui/material";

interface Props {
  title: string | number | undefined;
  subTitle: string;
  icon: JSX.Element;
}

export const SummaryTile: FC<Props> = ({ title, subTitle, icon }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ display: "flex" }}>
        <CardContent
          sx={{
            width: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          {/* <CreditCardOffOutlined color="secondary" sx={{ fontSize: 40 }} /> */}
          {icon}
        </CardContent>
        <CardContent
          sx={{ flex: " 0 auto", display: "flex", flexDirection: "column" }}>
          <Typography variant="h3" sx={{fontSize: 30}}>{title}</Typography>
          <Typography variant="caption">{subTitle}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
