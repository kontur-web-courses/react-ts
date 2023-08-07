type InputProps = {
    title: string;
    onInputChange: (value: string) => void;
};

export interface RowProps extends InputProps {
    placeholder?: string;
    isError: boolean;
}

export interface SelectProps extends InputProps {
    title: string;
}

export type ModeOnSaveProps = {
    close: () => void;
    changeMessage: string[];
};
