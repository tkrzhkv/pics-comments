import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { FormControlProps, Textarea } from "@chakra-ui/react";

export type TextAreaFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  width?: string;
  maxW?: string;
} & FormControlProps;

export const FormTextarea = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: TextAreaFormProps<TFieldValues, TName>,
) => {
  const { control, name, disabled, required, placeholder, width, maxW } = props;
  const { field } = useController({
    name,
    control,
    rules: { required },
  });

  return (
    <Textarea
      width={width}
      maxW={maxW}
      border="1px solid #C3CAD6"
      {...field}
      value={field.value || ""}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
};
