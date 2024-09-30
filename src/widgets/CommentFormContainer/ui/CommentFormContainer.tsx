import { CommentForm } from "@/features/comment/commentForm/ui/CommentForm";
import { Heading, VStack } from "@chakra-ui/react";

export const CommentFormContainer = () => {
	return (
		<VStack w="full" pt={8}>
			<Heading color="blue.300">Enter your comment!</Heading>
			<CommentForm />
		</VStack>
	);
};
