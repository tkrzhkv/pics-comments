import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CommentSchema,
  CommentSchemaType,
} from "@/features/comment/commentForm/model/schema.ts";
import { createInputList } from "@/shared/ui/form";
import { useQueryClient } from "@tanstack/react-query";
import { Button, HStack, useToast, VStack } from "@chakra-ui/react";
import { usePostComment } from "@/features/comment/createComment/api/usePostComment.ts";
import { handleMutationError } from "@/shared/utils/handleMutationError.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/appStore.ts";
import {
  resetComment,
  setEnteredComment,
} from "@/features/comment/persistedComment/model/commentSlice.ts";
import { useEffect } from "react";

const { FormTextarea, FormSubmitButton } = createInputList<CommentSchemaType>();

export const CommentForm = () => {
  const methods = useForm<CommentSchemaType>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      comment: "",
    },
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const enteredComment = useSelector(
    (state: RootState) => state.comment.enteredComment,
  );

  const { mutate: createPost, isPending } = usePostComment();
  const queryClient = useQueryClient();
  const { control, formState, handleSubmit, reset, setValue } = methods;
  const toast = useToast();

  const onSubmit: SubmitHandler<CommentSchemaType> = (data) => {
    createPost(
      { body: data.comment ?? "", postId: 2, userId: 1 },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ["comments"] });
          toast({
            status: "success",
            title: "Your comment successfully posted",
          });
          reset();
          dispatch(resetComment());
        },

        onError: (error: Error) => {
          handleMutationError(error, toast);
        },
      },
    );
  };

  const watchedTextarea = useWatch({
    control,
    name: "comment",
  });

  useEffect(() => {
    dispatch(setEnteredComment(watchedTextarea || ""));
  }, [watchedTextarea, dispatch]);

  useEffect(() => {
    if (enteredComment) {
      setValue("comment", enteredComment);
    }
  }, [enteredComment, setValue]);

  const handleCleanTextarea = () => {
    dispatch(resetComment());
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <VStack w="full">
          <FormTextarea
            error={formState.errors.comment?.message}
            w="full"
            maxW="60vw"
            control={control}
            name="comment"
          />
          <HStack maxW="60vw" justifyContent="space-between" pt={5}>
            <FormSubmitButton
              w="250px"
              name="Submit"
              formState={formState}
              isLoading={isPending}
            />
            <Button onClick={handleCleanTextarea}>Reset</Button>
          </HStack>
        </VStack>
      </form>
    </FormProvider>
  );
};
