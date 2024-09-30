import type { RejectedDataType } from "@/shared/types";
import { Alert, Heading, Text } from "@chakra-ui/react";
import { Link, useRouteError } from "react-router-dom";

export const Fallback = () => {
	const error = useRouteError();
	const knownError = error as RejectedDataType;

	return (
		<Alert>
			<Heading>Something went wrong</Heading>
			<Text>
				{knownError?.messageError} {knownError?.status}
			</Text>
			<Link to="/">Go to home page</Link>
		</Alert>
	);
};
