import {
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Switch,
  Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

/**
 * Switch form component with layout to match IPG style. Must include two text options which are displayed either side of the switch.
 */
export default function FormSwitch({
  checked,
  disabled = false,
  helperText,
  label,
  onChange,
  options
}) {
  // return components
  return (
    <FormControl disabled={disabled}>
      {label && <FormLabel style={{ fontSize: "0.75rem" }}>{label}</FormLabel>}
      <FormGroup>
        <Typography
          component="div"
          color={disabled ? "textSecondary" : "textPrimary"}
          style={{ cursor: disabled ? "default" : "pointer" }}
        >
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>
              <SwitchOptionLabel disabled={disabled} label={options[0]} />
            </Grid>
            <Grid item>
              <Switch checked={checked} onChange={onChange} />
            </Grid>
            <Grid item>
              <SwitchOptionLabel disabled={disabled} label={options[1]} />
            </Grid>
          </Grid>
        </Typography>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormGroup>
    </FormControl>
  );
}

/**
 * Returns a label for displaying on either side of the switch
 */
function SwitchOptionLabel({ disabled, label }) {
  return (
    <Typography
      color={disabled ? "textSecondary" : "textPrimary"}
      style={{ cursor: disabled ? "default" : "pointer" }}
    >
      {label}
    </Typography>
  );
}

// prop types
FormSwitch.propTypes = {
  /**
   * If true, the component is checked.
   */
  checked: PropTypes.bool.isRequired,
  /**
   * If true, the switch will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The helper text content.
   */
  helperText: PropTypes.string,
  /**
   * The label content.
   */
  label: PropTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * **Signature**
   * ```
   * function(event) => void
   * ```
   *
   * _event_: The event source of the callback. You can pull out the new checked state by accessing event.target.checked (boolean).
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Options to display either side of the switch. Must be an array of length 2, with type string.
   */
  options: function (props, propName, componentName) {
    if (
      !Array.isArray(props[propName]) ||
      props[propName].length !== 2 ||
      !props[propName].every(s => typeof s === "string")
    ) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Expected a string array of length 2.`
      );
    }
  }
};
