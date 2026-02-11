import { create } from "zustand"

interface DialogState {
	dialogs: Record<string, boolean>
}

interface DialogStore {
	dialogs: DialogState["dialogs"]
	isOpen: (id: string) => boolean
	openDialog: (id: string) => void
	closeDialog: (id: string) => void
	toggleDialog: (id: string) => void
}

const useDialogStore = create<DialogStore>((set, get) => ({
	dialogs: {},
	isOpen: (id: string) => get().dialogs[id],

	openDialog: (id: string) =>
		set((state) => ({
			dialogs: { ...state.dialogs, [id]: true },
		})),

	closeDialog: (id: string) =>
		set((state) => ({ dialogs: { ...state.dialogs, [id]: false } })),

	toggleDialog: (id: string) =>
		set((state) => ({
			dialogs: { ...state.dialogs, [id]: !state.dialogs[id] },
		})),
}))

export const useDialog = () => {
	const isOpen = useDialogStore((state) => state.isOpen)
	const dialogs = useDialogStore((state) => state.dialogs)

	return {
		isOpen,
		dialogs,
	}
}

export const useDialogActions = () => {
	const openDialog = useDialogStore((state) => state.openDialog)
	const closeDialog = useDialogStore((state) => state.closeDialog)
	const toggleDialog = useDialogStore((state) => state.toggleDialog)

	return {
		openDialog,
		closeDialog,
		toggleDialog,
	}
}
