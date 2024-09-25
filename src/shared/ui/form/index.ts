import { FC } from "react";

import { FieldValues } from "react-hook-form";
import { Input, InputFormProps } from "@/shared/ui/form/input";
import { FormTextarea, TextAreaFormProps } from "@/shared/ui/form/textarea";
import FormSubmitButton, {
  FormSubmitButtonProps,
} from "@/shared/ui/form/submit-button/SubmitButton.tsx";

export const createInputList = <FV extends FieldValues>() => ({
  FormInput: Input as FC<InputFormProps<FV>>,
  FormTextarea: FormTextarea as FC<TextAreaFormProps<FV>>,
  FormSubmitButton: FormSubmitButton as FC<FormSubmitButtonProps<FC>>,
});
