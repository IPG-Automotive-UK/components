import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField
} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";

/**
 * Password change form
 */
export default function RequestPasswordResetForm({ loading, onReset }) {
  // form state
  const { register, errors, handleSubmit } = useForm({
    mode: "onSubmit"
  });

  return (
    <form onSubmit={handleSubmit(onReset)} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus={!loading}
            inputProps={{ "aria-label": "email" }}
            inputRef={register({
              pattern: {
                message: "Please enter a valid email address",
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              },
              required: true
            })}
            error={Boolean(errors.email)}
            helperText={errors.email && errors.email.message}
            disabled={loading}
          />
        </Grid>
      </Grid>
      <Box mt={2} mb={1}>
        <Button
          type="submit"
          fullWidth
          id="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          endIcon={loading ? <CircularProgress size={24} /> : null}
        >
          Request reset
        </Button>
      </Box>
    </form>
  );
}

// prop types
RequestPasswordResetForm.propTypes = {
  /**
   * Loading state of the login form. Disables submit button and shows loading indicator.
   */
  loading: PropTypes.bool,
  /**
   * Callback function fired when user submits form.
   *
   * **Signature**
   * ```
   * function(data, event) => void
   * ```
   *
   * _data_: Object containing _password, passwordRepeat_
   *
   * _event_: Synthetic event
   */
  onReset: PropTypes.func.isRequired
};