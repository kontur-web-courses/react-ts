export enum FieldType {
    Select = 'select',
    Input = 'input',
}

export type Change = {
    before: string;
    after: string;
    fieldName: string;
}