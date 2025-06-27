import React from 'react';
import { useField } from 'formik';
import { TextField } from '@mui/material';

interface Props {
  name: string;
  label: string;
  type?: string;
}

const TextfieldWrapper: React.FC<Props> = ({ name, label, type = 'text' }) => {
  const [field, meta] = useField(name);
  const errorText = meta.touched && meta.error ? meta.error : '';
  return (
    <TextField
      fullWidth
      label={label}
      type={type}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default TextfieldWrapper;
