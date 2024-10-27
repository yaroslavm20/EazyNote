import { createContext, useState } from "react";

type ModalContextType = {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalContext = createContext<ModalContextType>({
    isOpen: false,
    setOpen: () => { },
});

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <ModalContext.Provider value={{ isOpen, setOpen }}>
            {children}
        </ModalContext.Provider>
    );
}

export default ModalProvider;
