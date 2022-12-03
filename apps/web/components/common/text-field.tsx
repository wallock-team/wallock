import { TextField as MuiTextField, TextFieldProps } from '@mui/material';
import { useField } from 'formik';

type Props = TextFieldProps & {
  name: string;
};

export default function TextField(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <MuiTextField
      {...props}
      {...field}
      error={!!(meta.touched && meta.error)}
      helperText={meta.touched && meta.error ? meta.error : ''}
      name={props.name}
    />
  );
}
