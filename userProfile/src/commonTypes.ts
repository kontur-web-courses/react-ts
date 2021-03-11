export interface DiffFormState {
    [key: string]: {
        prevValue: string;
        value: string;
        hasChanged: boolean;
    };
}
