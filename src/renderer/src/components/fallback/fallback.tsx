import { Grid, Alert, Typography, Button } from "@mui/material";
import type { FallbackProps } from "react-error-boundary";

export const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <Grid container justifyContent="center">
      <Alert severity="error">
        <Typography variant="h3">Что-то пошло не так 😵</Typography>
        <Typography variant="subtitle1">
          Детали ошибки: {error?.message}
        </Typography>
        <Button variant="contained" onClick={resetErrorBoundary}>
          Обновить
        </Button>
      </Alert>
    </Grid>
  );
};
