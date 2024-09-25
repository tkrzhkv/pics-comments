import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { Input as ControlledInput } from "@chakra-ui/react";
import { ReactElement } from "react";

export type InputFormProps<
  TFieldValuesType extends FieldValues = FieldValues,
  TNameType extends FieldPath<TFieldValuesType> = FieldPath<TFieldValuesType>,
> = {
  name: TNameType;
  control: Control<TFieldValuesType>;
  type?: string;
  placeholder?: string;
};

export const Input = <
  TFieldValuesType extends FieldValues = FieldValues,
  TNameType extends FieldPath<TFieldValuesType> = FieldPath<TFieldValuesType>,
>(
  props: InputFormProps<TFieldValuesType, TNameType>,
): ReactElement => {
  const { control, name, type, placeholder } = props;

  const { field } = useController({ name, control });

  return (
    <ControlledInput
      {...field}
      value={field.value || ""}
      type={type ?? "text"}
      placeholder={placeholder}
    />
  );
};
