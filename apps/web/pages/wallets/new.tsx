import { Button, Container, Stack, TextField } from '@mui/material';
import { WalletCreateDto, WalletCreateYup } from '@wallock/schemas';
import { GetServerSideProps, NextPage } from 'next';
import { CancelOrConfirmAppBar } from '../../components/common/cancel-or-confirm-app-bar';
import Api from '../../lib/api/api';
import { withAuthPage } from '../../lib/with-auth-page';
import { useFormik } from 'formik';
import * as yup from 'yup';

type Props = {
  existingWalletNames: string[];
};

export const getServerSideProps: GetServerSideProps<Props> = withAuthPage(
  async function (ctx) {
    const api = Api.fromWebServer(ctx);

    return {
      props: {
        existingWalletNames: (await api.wallets.getWallets()).map(
          (wallet) => wallet.name
        ),
      },
    };
  }
);

const NewWallet: NextPage<Props> = function (props: Props) {
  const formik = useFormik<WalletCreateDto>({
    initialValues: {
      name: '',
    },
    validationSchema: WalletCreateYup.concat(
      yup.object({
        name: yup
          .string()
          .notOneOf(props.existingWalletNames, 'Name already exists'),
      })
    ),
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
