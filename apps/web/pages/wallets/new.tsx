import { Button, Container, Stack, TextField } from '@mui/material';
import { Wallet } from '@wallock/schemas';
import { WalletCreateDto } from '@wallock/schemas';
import { GetServerSideProps, NextPage } from 'next';
import { CancelOrConfirmAppBar } from '../../components/common/cancel-or-confirm-app-bar';
import Api from '../../lib/api/api';
import { withAuthPage } from '../../lib/with-auth-page';
import { FormikErrors, useFormik } from 'formik';
import { validate } from 'class-validator';

type Props = {
  wallets: Wallet[];
};

export const getServerSideProps: GetServerSideProps<Props> = withAuthPage(
  async function (ctx) {
    const api = Api.fromWebServer(ctx);

    const wallets = await api.wallets.getWallets();

    return {
      props: {
        wallets,
      },
    };
  }
);

const NewWallet: NextPage<Props> = function (props: Props) {
  const formik = useFormik<WalletCreateDto>({
    initialValues: new WalletCreateDto(),
    validate: async function (values) {
      const errors = await validate(values);

      const formikErrors: any = {};
      errors.forEach((error) => {
        if (!error.constraints) {
          return;
        }
        formikErrors[error.property] = Object.values(error.constraints);
      });

      return formikErrors;
    },
    onSubmit: console.log,
  });

  return (
    <>
      <CancelOrConfirmAppBar title="New Wallet" />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Stack>
          <TextField
            label="Name"
            {...formik.getFieldProps('name')}
            error={!!(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <Button onClick={formik.submitForm}>Submit</Button>
        </Stack>
      </Container>
    </>
  );
};

export default NewWallet;
