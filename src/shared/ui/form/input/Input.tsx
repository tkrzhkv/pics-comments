import {
	Input as ControlledInput,
	FormControl,
	FormLabel,
} from "@chakra-ui/react";
import type { ReactElement } from "react";
import {
	type Control,
	type FieldPath,
	type FieldValues,
	useController,
} from "react-hook-form";

export type InputFormProps<
	TFieldValuesType extends FieldValues = FieldValues,
	TNameType extends FieldPath<TFieldValuesType> = FieldPath<TFieldValuesType>,
> = {
	name: TNameType;
	control: Control<TFieldValuesType>;
	type?: string;
	placeholder?: string;
	label?: string;
};

export const Input = <
	TFieldValuesType extends FieldValues = FieldValues,
	TNameType extends FieldPath<TFieldValuesType> = FieldPath<TFieldValuesType>,
>(
	props: InputFormProps<TFieldValuesType, TNameType>,
): ReactElement => {
	const { control, name, type, placeholder, label } = props;

	const { field } = useController({ name, control });

	return (
		<FormControl>
			{label && <FormLabel>{label}</FormLabel>}
			<ControlledInput
				{...field}
				value={field.value || ""}
				type={type ?? "text"}
				placeholder={placeholder}
			/>
		</FormControl>
	);
};
