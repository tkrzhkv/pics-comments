import { CommentFormContainer } from "@/widgets/CommentFormContainer";
import { CommentsListContainer } from "@/widgets/CommentsListContainer";
import { VStack } from "@chakra-ui/react";

export const HomePage = () => {
	return (
		<VStack>
			<CommentsListContainer />
			<CommentFormContainer />
		</VStack>
	);
};
