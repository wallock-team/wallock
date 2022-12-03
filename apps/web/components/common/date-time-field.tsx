import { TextField as MuiTextField } from '@mui/material';
import { TextFieldProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useField } from 'formik';

type Props = TextFieldProps & {
  name: string;
};

export default function DateTimeField(props: Props) {
  const [field, meta, helper] = useField(props.name);

  return (
    <DatePicker
      value={field.value}
      onChange={(value) => value && helper.setValue(Date.parse(value))}
      renderInput={(params) => (
        <MuiTextField
          {...field}
          {...params}
          name="time"
          error={!!(meta.touched && meta.error)}
          helperText={meta.touched && meta.error}
        />
      )}
    />
  );
}
