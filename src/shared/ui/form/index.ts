import type { FC } from "react";

import { Input, type InputFormProps } from "@/shared/ui/form/input";
import FormSubmitButton, {
	type FormSubmitButtonProps,
} from "@/shared/ui/form/submit-button/SubmitButton.tsx";
import {
	FormTextarea,
	type TextAreaFormProps,
} from "@/shared/ui/form/textarea";
import type { FieldValues } from "react-hook-form";

export const createInputList = <FV extends FieldValues>() => ({
	FormInput: Input as FC<InputFormProps<FV>>,
	FormTextarea: FormTextarea as FC<TextAreaFormProps<FV>>,
	FormSubmitButton: FormSubmitButton as FC<FormSubmitButtonProps<FV>>,
});
