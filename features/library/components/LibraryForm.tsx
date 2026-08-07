"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { createLibrary } from "@/features/library/actions";
import { X } from "lucide-react";
import { ChangeEvent, useActionState, useState } from "react";
import { CollectionOption, LibraryFormState, TagOption } from "../types";

const DEFAULT_TAGS: TagOption[] = [
  { id: "dfq233fasdgas", name: "#auth" },
  { id: "h60asdf60adfa9", name: "#react" },
];

const DEFAULT_COLLECTIONS: CollectionOption[] = [
  { id: "collection-1", name: "Manual Note" },
  { id: "collection-2", name: "GitHub Issue" },
];

const INITIAL_FIELDS = {
  title: "",
  content: "",
  source: "",
  tags: [] as string[],
  collection: "",
  url: "",
};

const INITIAL_STATE: LibraryFormState = {
  success: false,
  message: "",
  errors: {},
};

interface LibraryFormProps {
  tags?: TagOption[];
  collections?: CollectionOption[];
}

export default function LibraryForm({
  tags = DEFAULT_TAGS,
  collections = DEFAULT_COLLECTIONS,
}: LibraryFormProps) {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [state, formAction, pending] = useActionState(
    createLibrary,
    INITIAL_STATE,
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagsChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedTagId = e.target.value;

    if (!selectedTagId) return;

    setFields((prev) => ({
      ...prev,
      tags: prev.tags.includes(selectedTagId)
        ? prev.tags
        : [...prev.tags, selectedTagId],
    }));
  };

  const handleRemoveTag = (id: string) => {
    setFields((prevFields) => {
      return {
        ...prevFields,
        tags: prevFields.tags.filter((t) => t !== id),
      };
    });
  };

  return (
    <form action={formAction}>
      {state.message && !state.success && (
        <div
          className="rounded-md border border-destructive/30 bg-destructive/15 p-3 text-sm text-destructive"
          role="alert"
        >
          {state.message}
        </div>
      )}

      {/* Hidden input elements to serialize selected tags array into FormData */}
      {fields.tags.map((tagId) => (
        <input key={tagId} type="hidden" name="tags" value={tagId} />
      ))}

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
          <NativeSelect
            id="tags"
            value=""
            onChange={handleTagsChange}
            disabled={pending}
          >
            <NativeSelectOption value="">Select tags</NativeSelectOption>
            {tags.map((item) => (
              <NativeSelectOption key={item.id} value={item.id}>
                {item.name}
              </NativeSelectOption>
            ))}
          </NativeSelect>

          {/* Selected Tag Badges */}
          {fields.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {fields.tags.map((tagId) => {
                const tag = tags.find((t) => t.id === tagId);
                return (
                  <Badge
                    key={tagId}
                    className="flex items-center gap-1 px-2 py-1 text-xs"
                  >
                    <span>{tag?.name || ""}</span>
                    <Button
                      type="button"
                      className="h-4 w-4 cursor-pointer rounded-full p-0 hover:bg-black/10 dark:hover:bg-white/20"
                      onClick={() => handleRemoveTag(tagId)}
                      disabled={pending}
                      aria-label={`Remove tag ${tag?.name}`}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                );
              })}
            </div>
          )}

          {state.errors?.tags && <FieldError>{state.errors?.tags}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="collection">Collection</FieldLabel>
          <NativeSelect
            value={fields.collection}
            onChange={handleChange}
            name="collection"
          >
            <NativeSelectOption value="">Select collection</NativeSelectOption>
            {collections.map((item) => (
              <NativeSelectOption key={item.id} value={item.id}>
                {item.name}
              </NativeSelectOption>
            ))}
          </NativeSelect>
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
