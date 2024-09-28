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
import { useEffect } from "react";
import {
  addLocalComment,
  resetComment,
  setEnteredComment,
} from "@/features/comment/createComment/model/commentSlice.ts";
import { selectEnteredComment } from "@/features/comment/createComment/model/selectors.ts";

const { FormTextarea, FormSubmitButton } = createInputList<CommentSchemaType>();

export const CommentForm = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const enteredComment = useSelector(selectEnteredComment);

  const { mutate: createPost, isPending } = usePostComment();

  const methods = useForm<CommentSchemaType>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      comment: "",
    },
    mode: "onChange",
  });

  const { control, formState, handleSubmit, reset, setValue } = methods;

  const onSubmit: SubmitHandler<CommentSchemaType> = (data) => {
    createPost(
      { body: data.comment ?? "", postId: 2, userId: 1 },
      {
        onSuccess: async (res) => {
          dispatch(
            addLocalComment({
              body: res.body,
              postId: res.postId,
              id: Date.now(),
              likes: res.likes,
              user: res.user,
            }),
          );

          await queryClient.invalidateQueries({ queryKey: ["comments"] });
          toast({
            status: "success",
            title: "Your comment was successfully posted",
          });
          reset();
          dispatch(resetComment());
        },
        onError: (error: Error) => handleMutationError(error, toast),
      },
    );
  };

  const commentWatch = useWatch({
    control,
    name: "comment",
  });

  useEffect(() => {
    if (enteredComment) {
      setValue("comment", enteredComment);
    }
  }, [enteredComment, setValue]);

  useEffect(() => {
    dispatch(setEnteredComment(commentWatch ?? ""));
  }, [commentWatch, dispatch]);

  const handleCleanTextarea = () => {
    dispatch(resetComment());
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form style={{ width: "60%" }} onSubmit={handleSubmit(onSubmit)}>
        <VStack w="full" justifyContent="center">
          <FormTextarea
            label="Comment"
            error={formState.errors.comment?.message}
            w="full"
            control={control}
            placeholder="Please enter your comment"
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
