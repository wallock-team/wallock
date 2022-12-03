import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import { useField } from 'formik';

type Props = TextFieldProps & {
  name: string;
  options: { value: any; label: string }[];
};

export default function Select(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <TextField
      select
      {...field}
      error={!!(meta.touched && meta.error)}
      helperText={meta.touched && meta.error}
    >
      <MenuItem key={0} value={0} disabled>
        Select one
      </MenuItem>
      {props.options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
