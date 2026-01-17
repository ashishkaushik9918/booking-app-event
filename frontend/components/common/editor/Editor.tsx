"use client";

import JoditEditorNote from "jodit-react";
import { useRef } from "react";
type JoditEditorFieldProps = {
    value?: string;
    onChange?: (content: string) => void;
    height?: number | string
};
export default function JoditEditor({ value, onChange, height = "200" }: JoditEditorFieldProps) {
    const editor = useRef(null);

    return (
        <JoditEditorNote
            ref={editor}
            value={value}
            onChange={(content) => onChange ? onChange(content) : ''}
            config={{
                minHeight: height,
                readonly: false,
                width:'100%',
                placeholder: "Enter description...",
            }}
        />
    );
}
