import { CommentCard } from "@/entities/comment/ui";
import { setScrollPosition } from "@/features/comment/persistedScroll/model/scrollSlice.ts";
import { selectScrollPosition } from "@/features/comment/persistedScroll/model/selectors.ts";
import type { UseConfirmationReturn } from "@/shared/hooks/useConfirmation.ts";
import { useScrollToFn } from "@/shared/hooks/useScrollToFn.ts";
import type { CommentResponseType } from "@/shared/types/comments/getCommentsTypes.ts";
import { removeScrollBarStyles } from "@/shared/utils/removeScrollBarStyles.ts";
import { Box, HStack, Text } from "@chakra-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

type CommentsVirtualizedListProps = {
	comments: CommentResponseType[];
	hasNextPage: boolean;
	isLoading: boolean;
	isFetching: boolean;
	deleteConfirmation: UseConfirmationReturn;
	fetchNextPage: VoidFunction;
	isFetchingNextPage: boolean;
};

export const CommentsVirtualizedList = ({
	comments,
	hasNextPage,
	deleteConfirmation,
	isFetching,
	fetchNextPage,
	isFetchingNextPage,
}: CommentsVirtualizedListProps) => {
	const parentRef = useRef<HTMLDivElement>(null);
	const scrollingRef = useRef<number>(0);

	const scrollToFn = useScrollToFn(parentRef, scrollingRef);

	const dispatch = useDispatch();
	const scrollPosition = useSelector(selectScrollPosition);

	const rowVirtualizer = useVirtualizer({
		count: hasNextPage ? comments?.length + 1 : comments?.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 100,
		gap: 5,
		scrollToFn,
	});

	useEffect(() => {
		const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

		if (!lastItem) {
			return;
		}

		if (
			lastItem.index >= comments.length - 1 &&
			hasNextPage &&
			!isFetchingNextPage
		) {
			fetchNextPage();
		}
	}, [
		hasNextPage,
		fetchNextPage,
		comments.length,
		isFetchingNextPage,
		rowVirtualizer.getVirtualItems(),
	]);

	const onScroll = () => {
		const items = rowVirtualizer.getVirtualItems();
		if (items[0].index === 0) {
			dispatch(setScrollPosition(0));
		} else {
			dispatch(setScrollPosition(items[items.length - 2].index));
		}
	};

	useEffect(() => {
		if (!isFetching) {
			rowVirtualizer.scrollToIndex(scrollPosition);
		}
	}, [isFetching]);

	return (
		<Box
			ref={parentRef}
			width="60vw"
			height="50vh"
			overflowY="auto"
			borderWidth="1px"
			borderRadius="md"
			boxShadow="md"
			css={removeScrollBarStyles}
			p={4}
			onScroll={onScroll}
		>
			<Box
				style={{
					height: `${rowVirtualizer.getTotalSize()}px`,
					width: "100%",
					position: "relative",
				}}
			>
				{rowVirtualizer.getVirtualItems().map((virtualRow) => {
					const isLoaderRow = virtualRow.index > comments.length - 1;
					const comment = comments[virtualRow.index];

					return (
						<Box key={virtualRow.index}>
							{isLoaderRow ? (
								hasNextPage ? (
									<HStack
										style={{
											position: "absolute",
											top: 0,
											left: 0,
											width: "100%",
											height: `${virtualRow.size}px`,
											transform: `translateY(${virtualRow.start}px) `,
										}}
										p={2}
										borderWidth="1px"
										borderRadius="md"
										justifyContent="center"
									>
										<Text fontWeight="bold">Loading more...</Text>
									</HStack>
								) : (
									<Box
										style={{
											position: "absolute",
											top: 0,
											left: 0,
											width: "100%",
											height: `${virtualRow.size}px`,
											transform: `translateY(${virtualRow.start}px)`,
										}}
									>
										<Text>Nothing more to load</Text>
									</Box>
								)
							) : (
								<CommentCard
									key={virtualRow.index}
									comment={comment}
									virtualRow={virtualRow}
									removeComment={deleteConfirmation.handleOpen}
								/>
							)}
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};
