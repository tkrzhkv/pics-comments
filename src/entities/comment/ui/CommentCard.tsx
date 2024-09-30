import type { CommentResponseType } from "@/shared/types/comments/getCommentsTypes.ts";
import { DeleteButton } from "@/shared/ui/buttons/delete";
import { HStack, Text, VStack } from "@chakra-ui/react";
import type { VirtualItem } from "@tanstack/react-virtual";
import type { FC } from "react";

type CommentCardProps = {
	comment: CommentResponseType;
	virtualRow: VirtualItem;
	removeComment: (id: number) => void;
};
export const CommentCard: FC<CommentCardProps> = ({
	comment,
	virtualRow,
	removeComment,
}) => {
	const { id, user, body, likes } = comment ?? {};

	return (
		<HStack
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: `${virtualRow.size}px`,
				transform: `translateY(${virtualRow.start}px)`,
			}}
			p={2}
			borderWidth="1px"
			borderRadius="md"
		>
			<VStack align="start" spacing={1} width="100%">
				<Text fontWeight="bold">{user?.fullName ?? ""}</Text>
				<Text>{body}</Text>
				<Text color="gray.500">Likes: {likes ?? "2"}</Text>
			</VStack>
			<DeleteButton
				onClick={() => {
					removeComment(id ?? 0);
				}}
			/>
		</HStack>
	);
};
