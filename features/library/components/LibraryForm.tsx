"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createLibrary } from "@/features/library/actions";
import { ChangeEvent, useActionState, useState } from "react";

const INITIAL_STATE = {
  success: false,
  message: "",
  errors: {},
  fields: {
    title: "",
    content: "",
    source: "",
    tags: "",
    collection: "",
    url: "",
  },
};

export default function LibraryForm() {
  const [fields, setFields] = useState(INITIAL_STATE.fields);
  const [state, formAction, pending] = useActionState(
    createLibrary,
    INITIAL_STATE,
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [field.name]: field.value,
    }));
  };

  return (
    <form action={formAction}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            type="text"
            id="title"
            name="title"
            value={fields.title}
            onChange={handleChange}
          />
          {state.errors?.title && (
            <FieldError>{state.errors?.title}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="content">Content</FieldLabel>
          <Textarea
            id="content"
            name="content"
            rows={5}
            value={fields.content}
            onChange={handleChange}
          />
          {state.errors?.content && (
            <FieldError>{state.errors?.content}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="source">Source</FieldLabel>
          <Input
            type="text"
            id="source"
            name="source"
            value={fields.source}
            onChange={handleChange}
          />
          {state.errors?.source && (
            <FieldError>{state.errors?.source}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="tags">Tags</FieldLabel>
          <Input
            type="text"
            id="tags"
            name="tags"
            value={fields.tags}
            onChange={handleChange}
          />
          {state.errors?.tags && <FieldError>{state.errors?.tags}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="collection">Collection</FieldLabel>
          <Input
            type="text"
            id="collection"
            name="collection"
            value={fields.collection}
            onChange={handleChange}
          />
          {state.errors?.collection && (
            <FieldError>{state.errors?.collection}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="url">URL (optional)</FieldLabel>
          <Input
            type="text"
            id="url"
            name="url"
            value={fields.url}
            onChange={handleChange}
          />
        </Field>

        <Button type="submit">{pending ? "Creating..." : "Create"}</Button>
      </FieldGroup>
    </form>
  );
}
