/* eslint-disable @typescript-eslint/no-explicit-any */


export type FieldType = {
    name: string;
    label: string;
    type: "input" | "date" | "switch" | "select" | "text" | "textarea" | "file" | "number" | "components" | "email" | "time" | "textarea.editor";
    options?: { label: string; value: string }[];
    colSpan?: number;
    placeholder?: string;
    onChange?: (value: string) => void;
    onSelect?: (value: string) => void;
    onBlur?: () => void;
    required?: boolean;
    rowSpan?: number;
    rows?: number;
    components?: React.ReactNode
};

export type GlobalFormProps<T> = {
    initialValues?: Record<string, string | number | object>;
    onFinish: (values: T) => Promise<void>;
    submitText?: string;
    fields: FieldType[];
    onChangeValue?: (changedValues: any, allValues: any) => void;
    processing?: boolean;
    isDisabledSubmit?: boolean;
    layout?: "horizontal" | "vertical"

};