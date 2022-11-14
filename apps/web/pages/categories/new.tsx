import {
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import { Category, CategoryCreateDto, CategoryType } from '@wallock/schemas';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { CancelOrConfirmAppBar } from '../../components/common/cancel-or-confirm-app-bar';
import { useApi } from '../../components/contexts/api-context';
import Api from '../../lib/api/api';
import { useClassForm, ValidationErrors } from '../../lib/hooks/use-class-form';
import { withAuthPage } from '../../lib/with-auth-page';

type Props = {
  existingCategories: Category[];
};

export const getServerSideProps: GetServerSideProps<Props> = withAuthPage(
  async function (ctx) {
    return {
      props: {
        existingCategories: await Api.fromWebServer(
          ctx
        ).categories.getCategories(),
      },
    };
  }
);
const NewCategory: NextPage<Props> = function (props) {
  const api = useApi();
  const router = useRouter();
  const form = useClassForm(CategoryCreateDto, {
    initialValues: {
      name: '',
      type: 'expense' as CategoryType,
    },
    validate: async function (formData) {
      const errors: ValidationErrors<CategoryCreateDto> = {};
      if (
        props.existingCategories.find(
          (category) =>
            category.name === formData.name && category.type === formData.type
        )
      ) {
        errors.name =
          errors.type = `The ${formData.type} category named '${formData.name}' already exists`;
      }
      return errors;
    },
    onSubmit: async function (formData) {
      await api.categories.createCategory(formData);
      router.push('/categories');
    },
  });
  return (
    <>
      <CancelOrConfirmAppBar
        title="New Category"
        confirm={{ onClick: form.submitForm }}
      />
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Stack gap={2}>
          <TextField
            label="Name"
            {...form.getFieldProps('name')}
            error={!!(form.touched.name && form.errors.name)}
            helperText={form.touched.name && form.errors.name}
          />
          <FormControl>
            <FormLabel error={!!(form.touched.type && form.errors.type)}>
              Type
            </FormLabel>
            <RadioGroup row {...form.getFieldProps('type')}>
              <FormControlLabel
                value={'income' as CategoryType}
                control={<Radio />}
                label="Income"
              />
              <FormControlLabel
                value={'expense' as CategoryType}
                control={<Radio />}
                label="Expense"
              />
            </RadioGroup>
            <FormHelperText error={!!(form.touched.type && form.errors.type)}>
              {form.touched && form.errors.type}
            </FormHelperText>
          </FormControl>
        </Stack>
      </Container>
    </>
  );
};

export default NewCategory;
