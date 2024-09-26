import { Button, ButtonProps } from "@chakra-ui/react";

import type { FieldValues, FormState } from "react-hook-form";

export type FormSubmitButtonProps<FV extends FieldValues> = ButtonProps & {
  formState: FormState<FV>;
  isLoading?: boolean;
};

const FormSubmitButton = <FV extends FieldValues>({
  name,
  formState,
  isLoading,
  ...props
}: FormSubmitButtonProps<FV>) => {
  const { isSubmitting, isValid } = formState;

  return (
    <Button
      type="submit"
      variant="solid"
      bgColor="blue.400"
      _disabled={{
        backgroundColor: "gray.400",
        color: "gray.300",
        cursor: "not-allowed",
      }}
      color="black"
      isLoading={isLoading || isSubmitting}
      isDisabled={isSubmitting || !isValid}
      {...props}
    >
      {name}
    </Button>
  );
};

export default FormSubmitButton;
