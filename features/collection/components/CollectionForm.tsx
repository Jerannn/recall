"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useActionState, useEffect, useId, useState } from "react";
import { createCollection } from "../actions";
import { CollectionFormState } from "../types";

const INITIAL_STATE: CollectionFormState = {
  success: false,
  message: "",
  errors: {},
};

export default function CollectionForm() {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    createCollection,
    INITIAL_STATE,
  );
  const formId = useId();

  useEffect(() => {
    if (state.success) {
      toast.add({
        type: "success",
        description: state.message || "Collection created successfully",
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
    } else if (state.message && !state.errors) {
      toast.add({
        type: "error",
        description: state.message || "Something went wrong!",
      });
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button variant="outline">Add new collection</Button>}
      />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add new collection</DialogTitle>
          <DialogDescription>
            Create a new collection to organize your bookmarks and resources
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} id={formId}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                type="text"
                id="name"
                name="name"
                aria-invalid={!!state.errors?.name}
                disabled={pending}
              />
              {state.errors?.name && (
                <FieldError>{state.errors?.name}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Input
                type="text"
                id="description"
                name="description"
                aria-invalid={!!state.errors?.description}
                disabled={pending}
              />
              {state.errors?.description && (
                <FieldError>{state.errors?.description}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="color">Color</FieldLabel>
              <Input
                type="color"
                id="color"
                name="color"
                aria-invalid={!!state.errors?.color}
                disabled={pending}
              />
              {state.errors?.color && (
                <FieldError>{state.errors?.color}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline" disabled={pending}>
                Cancel
              </Button>
            }
          />
          <Button type="submit" form={formId} disabled={pending}>
            {pending ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
