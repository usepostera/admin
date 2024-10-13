import { ChangeEvent, useCallback, useState } from "react";
import { TValidatorError, Validator } from "../@types";

export type FormError<T extends object> = {
  [Prop in keyof T]: TValidatorError;
};

export type UseFormType<T extends object> = ReturnType<typeof useForm<T>>;

export const useForm = <T extends object>(
  initialState: T,
  validators: Partial<Validator<T>>
) => {
  const [form, setForm] = useState<T>(initialState);

  const getDefaultFormErrors = useCallback((): FormError<T> => {
    return Object.keys(initialState).reduce((acc, key) => {
      acc[key as keyof T] = null;
      return acc;
    }, {} as FormError<T>);
  }, [initialState]);

  const [formErrors, setFormErrors] = useState<FormError<T>>(
    getDefaultFormErrors()
  );

  const resetFormErrors = (key?: keyof T) => {
    if (!key) {
      setFormErrors(getDefaultFormErrors());
    } else {
      setFormErrors((prev) => ({ ...prev, [key]: null }));
    }
  };

  const onChange =
    (name: keyof T) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      setForm((prev) => ({ ...prev, [name]: e.target.value }));

      const validator = validators[name];

      const error = validator ? validator.validate(e.target.value, form) : null;

      if (error) {
        setFormErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
      } else {
        setFormErrors((prev) => ({ ...prev, [name]: null }));
      }
    };

  const onChangeText = useCallback(
    (name: keyof T) =>
      (value: string | number | Date | boolean | File | null) => {
        setForm((prev) => ({ ...prev, [name]: value }));

        const validator = validators[name];

        const error = validator ? validator.validate(value, form) : null;

        if (error) {
          setFormErrors((prev) => ({
            ...prev,
            [name]: error,
          }));
        } else {
          setFormErrors((prev) => ({ ...prev, [name]: null }));
        }
      },
    [form, validators]
  );

  const validate = useCallback(
    (keys: (keyof T)[] = Object.keys(form) as (keyof T)[]): boolean => {
      let valid = true;

      for (const key of keys) {
        const validator = validators[key];

        if (validator) {
          const error = validator.validate(form[key], form);

          console.log(error);

          setFormErrors((prev) => ({
            ...prev,
            [key]: error,
          }));

          if (error && typeof error === "string") {
            valid = false;
          } else if (
            Array.isArray(error) &&
            error.some((e) => typeof e === "string")
          ) {
            valid = false;
          }
        }
      }

      return valid;
    },
    [form, validators]
  );

  const validateForm = <X extends T>(form: X, keys: (keyof X)[]): boolean => {
    let valid = true;

    for (const key of keys) {
      const validator = validators[key as keyof T];

      if (validator) {
        const error = validator.validate(form[key as keyof T], form);

        if (error) {
          valid = false;
          setFormErrors((prev) => ({
            ...prev,
            [key]: error,
          }));
        }
      }
    }

    return valid;
  };

  const reset = useCallback(
    (newInitialState?: T) => {
      setForm(newInitialState || initialState);
      setFormErrors(getDefaultFormErrors());
    },
    [getDefaultFormErrors, initialState]
  );

  return {
    form,
    onChange,
    onChangeText,
    reset,
    resetFormErrors,
    validate,
    validateForm,
    formErrors,
  };
};
