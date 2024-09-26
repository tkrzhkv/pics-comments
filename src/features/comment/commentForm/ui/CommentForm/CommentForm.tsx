import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CommentSchema,
  CommentSchemaType,
} from "@/features/comment/commentForm/model/schema.ts";
import { createInputList } from "@/shared/ui/form";
import { useQueryClient } from "@tanstack/react-query";
import { Heading, useToast, VStack } from "@chakra-ui/react";
import { usePostComment } from "@/features/comment/createComment/api/usePostComment.ts";
import { handleMutationError } from "@/shared/utils/handleMutationError.ts";

const { FormTextarea, FormSubmitButton } = createInputList<CommentSchemaType>();

export const CommentForm = () => {
  const methods = useForm<CommentSchemaType>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      comment: "",
    },
    mode: "onChange",
  });

  const { mutate: createPost, isPending } = usePostComment();

  const queryClient = useQueryClient();

  const { control, formState, handleSubmit, reset } = methods;

  const toast = useToast();

  const onSubmit: SubmitHandler<CommentSchemaType> = (data) => {
    createPost(
      { body: data.comment, postId: 2, userId: 1 },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ["comments"] });
          toast({
            status: "success",
            title: "Your comment successfully posted",
          });
          reset();
        },

        onError: (error: Error) => {
          handleMutationError(error, toast);
        },
      },
    );
  };

  return (
    <FormProvider {...methods}>
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <VStack w="full">
          <Heading color="blue.300">Enter your comment!</Heading>
          <FormTextarea w="full" maxW="60vw" control={control} name="comment" />
          <FormSubmitButton
            name="Submit"
            formState={formState}
            isLoading={isPending}
          />
        </VStack>
      </form>
    </FormProvider>
  );
};
