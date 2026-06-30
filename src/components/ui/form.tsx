"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import {
    Controller,
    FormProvider,
    useFormContext,
} from "react-hook-form";

import type {
    ControllerProps,
    FieldPath,
    FieldValues,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

/* ---------------- FORM CONTEXT ---------------- */

const Form = FormProvider;

/* ---------------- FIELD ---------------- */

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
);

const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    ...props
}: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    );
};

/* ---------------- ITEM ---------------- */

const FormItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    return (
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
    );
});
FormItem.displayName = "FormItem";

/* ---------------- LABEL ---------------- */

const FormLabel = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField();

    return (
        <Label
            ref={ref}
            className={cn(error && "text-destructive", className)}
            htmlFor={formItemId}
            {...props}
        />
    );
});
FormLabel.displayName = "FormLabel";

/* ---------------- CONTROL ---------------- */

const FormControl = React.forwardRef<
    React.ElementRef<"div">,
    React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } =
        useFormField();

    return (
        <div
            ref={ref}
            id={formItemId}
            aria-describedby={
                !error
                    ? `${formDescriptionId}`
                    : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            {...props}
        />
    );
});
FormControl.displayName = "FormControl";

/* ---------------- DESCRIPTION ---------------- */

const FormDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
        <p
            ref={ref}
            id={formDescriptionId}
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        />
    );
});
FormDescription.displayName = "FormDescription";

/* ---------------- MESSAGE ---------------- */

const FormMessage = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) return null;

    return (
        <p
            ref={ref}
            id={formMessageId}
            className={cn("text-sm text-destructive", className)}
            {...props}
        >
            {body}
        </p>
    );
});
FormMessage.displayName = "FormMessage";

/* ---------------- HOOK INTERNAL ---------------- */

function useFormField() {
    const fieldContext = React.useContext(FormFieldContext);
    const itemContext = React.useContext(FormItemContext);
    const { getFieldState, formState } = useFormContext();

    const fieldState = getFieldState(fieldContext.name, formState);

    const formItemId = `${itemContext.id}-form-item`;
    const formDescriptionId = `${itemContext.id}-form-item-description`;
    const formMessageId = `${itemContext.id}-form-item-message`;

    return {
        name: fieldContext.name,
        ...fieldState,
        formItemId,
        formDescriptionId,
        formMessageId,
    };
}

/* ---------------- ITEM CONTEXT ---------------- */

const FormItemContext = React.createContext<{ id: string }>(
    {} as { id: string }
);

export {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
};