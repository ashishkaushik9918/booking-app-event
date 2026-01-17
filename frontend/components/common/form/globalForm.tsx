/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";
import { Form, Input, DatePicker, Switch, Select, Button, Row, Col } from "antd";
import { GlobalFormProps } from "@/types/form";

export default function GlobalForm<T>({
  initialValues,
  onFinish,
  submitText = "Submit",
  fields,
  onChangeValue
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

      case "number":
        return <Input {...commonProps} type="number" />;

      case "textarea":
        return <Input.TextArea {...commonProps} />;

      case "date":
        return (
          <DatePicker
            style={{ width: "100%" }}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        );

      case "switch":
        return <Switch onChange={field.onChange} />;

      case "select":
        return (
          <Select
            {...commonProps}
            optionFilterProp="children"
            onSelect={field.onSelect}
          >
            {field.options?.map((opt: any) => (
              <Select.Option key={opt.value} value={opt.value}>
                {opt.label}
              </Select.Option>
            ))}
          </Select>
        );

      default:
        return null;
    }
  }, []);

  return (
    <Form
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
      form={form}
      onValuesChange={onChangeValue}
    >
      <Row gutter={16}>
        {fields.map((field) => (
          <Col span={field.colSpan || 24} key={field.name}>
            <Form.Item
              name={field.name}
              label={field.label}
              valuePropName={field.type === "switch" ? "checked" : undefined}
              rules={genRules(field)}
            >
              {renderField(field)}
            </Form.Item>
          </Col>
        ))}
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
}
