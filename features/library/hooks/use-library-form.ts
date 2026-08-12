import { ChangeEvent, useActionState, useMemo, useState } from "react";
import { createLibrary, updateLibrary } from "../actions";
import { InitialStateForm, LibraryFormState } from "../types";

const INITIAL_FIELDS: InitialStateForm = {
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
  mode: "create" | "update";
  initialState?: InitialStateForm;
}

export default function useLibraryForm({
  mode,
  initialState,
}: LibraryFormProps) {
  const [fields, setFields] = useState(initialState ?? INITIAL_FIELDS);

  const libraryItemId = initialState?.id;
  const actionFn = useMemo(() => {
    if (mode === "create") return createLibrary;

    return (prevState: LibraryFormState, formData: FormData) => {
      if (!libraryItemId)
        throw new Error("Library ID is required for update mode.");

      return updateLibrary(libraryItemId, prevState, formData);
    };
  }, [libraryItemId, mode]);

  const libraryAction = useActionState(actionFn, INITIAL_STATE);

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

  return {
    fields,
    setFields,
    libraryAction,
    handleChange,
    handleTagsChange,
    handleRemoveTag,
  };
}
