import { Box, Text } from "@chakra-ui/react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { createInputList } from "@/shared/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const ClientsPersonSchema = z.object({
  text: z
    .string()
    .min(1, { message: "Min 200" })
    .max(200, { message: "Max 200" }),
});

export type ClientPersonType = z.infer<typeof ClientsPersonSchema>;

const { FormInput } = createInputList<ClientPersonType>();

export const LoginPage = () => {
  const methods = useForm<ClientPersonType>({
    resolver: zodResolver(ClientsPersonSchema),
    defaultValues: {
      text: "",
    },
    mode: "onChange",
  });

  const { control } = methods;

  const textW = useWatch({
    control,
    name: "text",
  });

  console.log(textW, "textW");

  return (
    <Box>
      <Text>LOGIN</Text>
      <FormProvider {...methods}>
        <form>
          <FormInput name="text" control={methods.control} />
        </form>
      </FormProvider>
    </Box>
  );
};
