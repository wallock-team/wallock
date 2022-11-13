import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { FormikConfig, FormikErrors, useFormik } from 'formik';

export function useClassForm<T extends SimpleClass<T>>(
  c: ClassConstructor<T>,
  formikConfig: ClassFormConfig<T>
) {
  return useFormik<T>({
    ...formikConfig,
    validate: async function (values: T) {
      const validationFunction = formikConfig.validate;

      return Object.assign(
        validationFunction ? (await validationFunction(values)) ?? {} : {},
        await validateClass(c, values)
      );
    },
  });
}

/**
 * Simple class
 *
 * Simple class is a class whose members can only be primitive types.
 *
 * Primitive types are `string`, `number`, `boolean`, `null`, `undefined`,
 * while non-primitive types are `object`, `array` and `symbol`
 */
type SimpleClass<T> = Record<keyof T, PrimitiveType>;
type PrimitiveType = number | string | boolean | null | undefined;

type ValidationErrors<T> = {
  [key in keyof T]?: string;
};

type ClassFormConfig<T extends SimpleClass<T>> = {
  validate?: (
    values: T
  ) => void | ValidationErrors<T> | Promise<ValidationErrors<T>>;
} & Omit<FormikConfig<T>, 'validationSchema' | 'validate'>;

export async function validateClass<T extends object>(
  c: ClassConstructor<T>,
  values: T
) {
  const transformed = plainToClass(c, values);
  const cvErrors = await validate(transformed);

  const fErrors: ValidationErrors<T> = {};

  cvErrors.forEach((error) => {
    const errorMessage = Object.values(error.constraints!)[0];
    fErrors[error.property as keyof T] =
      errorMessage[0].toUpperCase() + errorMessage.substring(1);
  });

  return fErrors;
}
