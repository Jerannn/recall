"use client";

import { Field, FieldError } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useActionState, useEffect } from "react";
import { createTag } from "../actions";
import { TagFormState } from "../types";

const INITIAL_STATE: TagFormState = {
  success: false,
  message: "",
  errors: {},
};

export default function TagForm() {
  const [state, formAction, pending] = useActionState(createTag, INITIAL_STATE);

  useEffect(() => {
    if (state.success) {
      toast.add({
        type: "success",
        description: state.message || "Collection created successfully",
      });
    } else if (state.message && !state.errors) {
      toast.add({
        type: "error",
        description: state.message || "Something went wrong!",
      });
    }
  }, [state]);

  return (
    <form action={formAction}>
      <Field>
        <InputGroup>
          <InputGroupInput
            placeholder="Add a tag here..."
            type="text"
            id="name"
            name="name"
            aria-invalid={!!state.errors?.name}
            disabled={pending}
          />
          <InputGroupAddon align="inline-end">
            {pending ? (
              <>
                <InputGroupText>Saving...</InputGroupText>
                <Spinner />
              </>
            ) : (
              <InputGroupButton type="submit" variant="secondary">
                Add
              </InputGroupButton>
            )}
          </InputGroupAddon>
        </InputGroup>
        {state.errors?.name && <FieldError>{state.errors?.name}</FieldError>}
      </Field>
    </form>
  );
}
