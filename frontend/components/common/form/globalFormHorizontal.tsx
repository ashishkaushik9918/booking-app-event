/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";
import { Form, Input, DatePicker, Switch, Select, Button, Row, Col,TimePicker } from "antd";
import { GlobalFormProps } from "@/types/form";
import JoditEditor from "../editor/Editor";

export default function GlobalFormHorizontal<T>({
    initialValues,
    onFinish,
    submitText = "Submit",
    fields,
    onChangeValue,
    processing = false,
    isDisabledSubmit = false,
    layout = "horizontal"

}: GlobalFormProps<T>) {

    const [form] = Form.useForm();
    const genRules = (field: any) => {
        const typeMessage = field.type === 'input' || field.type === 'text' ? 'enter' : 'select';
        return field.required
            ? [{ required: true, message: `Please ${typeMessage} ${field.label.toLowerCase()}` }]
            : [];
    }


    const renderField = useCallback((field: any) => {
        const commonProps: any = {
            placeholder: field.placeholder,
            onBlur: field.onBlur,
            onChange: (v: any) =>
                field.type === "input" ||
                    field.type === "text" ||
                    field.type === "number" ||
                    field.type === "textarea"
                    ? field.onChange?.(v.target.value)
                    : field.onChange?.(v),
        };

        switch (field.type) {
            case "input":
            case "text":
                return <Input {...commonProps} />;
            case "file":
                return <Input {...commonProps} type="file" />;

            case "email":
                return <Input {...commonProps} type="email" />;

            case "number":
                return <Input {...commonProps} type="number" />;
            case "time":
                return <TimePicker {...commonProps} type="number" style={{width:"100%"}} />;

            case "textarea":
                return <Input.TextArea {...commonProps} rows={field.rows}
                />;
              case "textarea.editor":
                return <JoditEditor {...commonProps} rows={field.rows}
                />;

            case "date":
                return (
                    <DatePicker
                        style={{ width: "100%" }}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                    />
                );


            case "components":
                return field.components;

            case "select":
                return (
                    <Select
                        {...commonProps}
                        optionFilterProp="children"
                        onSelect={field.onSelect}
                        showSearch
                    >
                        {field.options?.map((opt: any) => (
                            <Select.Option key={opt.value} value={opt.value}>
                                {opt.label}
                            </Select.Option>
                        ))}
                    </Select>
                );
            case "switch":
                return <Switch onChange={field.onChange} />;

            default:
                return null;
        }
    }, []);

    return (
        <Form
            layout={layout}
            initialValues={initialValues}
            onFinish={onFinish}
            form={form}
            onValuesChange={onChangeValue}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}
            colon={false}
            size="middle"
            labelAlign="left"

        >
            <Row gutter={16}>
                {fields.map((field) => (
                    <Col span={field.colSpan || 24} key={field.name}>
                        <Form.Item
                            name={field.name}
                            label={field.label}
                            valuePropName={field.type === "switch" ? "checked" : undefined}
                            className={field.type === "textarea" ? "textarea-label-top" : ""}
                            rules={genRules(field)}
                        >
                            {renderField(field)}
                        </Form.Item>
                    </Col>
                ))}
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={processing} disabled={isDisabledSubmit} >
                    {processing ? 'Please wait' : submitText}
                </Button>
            </Form.Item>
        </Form>
    );
}
