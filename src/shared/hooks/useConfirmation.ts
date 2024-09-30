import { useCallback, useEffect, useState } from "react";

export interface UseConfirmationReturn {
	isOpen: boolean;
	handleOpen: (id: number) => void;
	handleCancel: () => void;
	handleConfirm: () => void;
}

export const useConfirmation = (
	onConfirm: (id: number) => void,
): UseConfirmationReturn => {
	const [isOpen, setIsOpen] = useState(false);

	const [selectedId, setSelectedId] = useState<number | null>(null);

	const handleOpen = useCallback((id: number) => {
		setSelectedId(id);

		setIsOpen(true);
	}, []);

	const handleCancel = useCallback(() => {
		setSelectedId(null);

		setIsOpen(false);
	}, []);

	const handleConfirm = useCallback(() => {
		if (selectedId !== null) {
			onConfirm(selectedId);
			setSelectedId(null);
		}
	}, [onConfirm, selectedId]);

	useEffect(() => {
		if (selectedId !== null) {
			handleOpen(selectedId);
		}
	}, [handleOpen, selectedId]);

	return { isOpen, handleOpen, handleCancel, handleConfirm };
};
