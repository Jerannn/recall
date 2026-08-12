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
import { X } from "lucide-react";
import { useEffect } from "react";
import useLibraryForm from "../hooks/use-library-form";
import { CollectionOption, InitialStateForm, TagOption } from "../types";

interface LibraryFormProps {
  tags?: TagOption[];
  collections?: CollectionOption[];
  mode: "create" | "update";
  initialState?: InitialStateForm;
}

export default function LibraryForm({
  tags,
  collections,
  mode,
  initialState,
}: LibraryFormProps) {
  const {
    fields,
    setFields,
    libraryAction,
    handleChange,
    handleTagsChange,
    handleRemoveTag,
  } = useLibraryForm({
    mode,
    initialState,
  });
  const [state, formAction, pending] = libraryAction;

  useEffect(() => {
    if (initialState) {
      setFields(initialState);
    }
  }, [setFields, initialState]);

  return (
    <form action={formAction}>
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
            disabled={pending}
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
            disabled={pending}
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
            disabled={pending}
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
            {tags?.map((item) => (
              <NativeSelectOption key={item.id} value={item.id}>
                {item.name}
              </NativeSelectOption>
            ))}
          </NativeSelect>

          {/* Selected Tag Badges */}
          {fields.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {fields.tags.map((tagId) => {
                const tag = tags?.find((t) => t.id === tagId);
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
            disabled={pending}
          >
            <NativeSelectOption value="">Select collection</NativeSelectOption>
            {collections?.map((item) => (
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
            value={fields.url || ""}
            onChange={handleChange}
            disabled={pending}
          />
        </Field>

        <Button type="submit" disabled={pending}>
          {pending ? (mode === "create" ? "Creating..." : "Updating...") : mode}
        </Button>
      </FieldGroup>
    </form>
  );
}
