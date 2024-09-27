import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";

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
  error?: string;
} & FormControlProps;

export const FormTextarea = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: TextAreaFormProps<TFieldValues, TName>,
) => {
  const {
    control,
    name,
    disabled,
    required,
    placeholder,
    width,
    maxW,
    label,
    error,
  } = props;

  const { field } = useController({
    name,
    control,
    rules: { required },
  });

  return (
    <FormControl isInvalid={!!error} width={width} maxW={maxW} pos="relative">
      {label && <FormLabel>{label}</FormLabel>}
      <Textarea
        {...field}
        value={field.value || ""}
        disabled={disabled}
        placeholder={placeholder}
        border="1px solid"
        borderColor="#C3CAD6"
      />
      {error && <FormErrorMessage pos="absolute">{error}</FormErrorMessage>}
    </FormControl>
  );
};
