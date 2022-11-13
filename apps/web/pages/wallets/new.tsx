import { Container, Stack, TextField, Typography } from '@mui/material';
import { WalletCreateDto } from '@wallock/schemas';
import { GetServerSideProps, NextPage } from 'next';
import { CancelOrConfirmAppBar } from '../../components/common/cancel-or-confirm-app-bar';
import Api from '../../lib/api/api';
import { withAuthPage } from '../../lib/with-auth-page';
import { useApi } from '../../components/contexts/api-context';
import { ErrorToast, SuccessToast } from '../../components/common/toast';
import { ReactNode, useState } from 'react';
import { useClassForm } from '../../lib/hooks/use-class-form';

type Props = {
  existingWalletNames: string[];
};

export const getServerSideProps: GetServerSideProps<Props> = withAuthPage(
  async function (ctx) {
    const api = Api.fromWebServer(ctx);

    const wallets = await api.wallets.getWallets();

    return {
      props: {
        existingWalletNames: wallets.map((wallet) => wallet.name),
      },
    };
  }
);

const NewWallet: NextPage<Props> = function (props: Props) {
  const [toast, setToast] = useState<ReactNode>(null);
  const [creating, setCreating] = useState(false);
  const api = useApi();

  const formik = useClassForm(WalletCreateDto, {
    initialValues: {
      name: '',
    },
    validate: (values) => {
      const result: { [key in keyof typeof values]?: string } = {};

      if (props.existingWalletNames.includes(values.name)) {
        result.name = `Wallet with name '${values.name}' already exists`;
      }
      return result;
    },
    onSubmit: async function (formData) {
      setCreating(true);
      await api.wallets.createWallet(formData);
      setCreating(false);
    },
  });

  return (
    <>
      {toast}
      <CancelOrConfirmAppBar title="New Wallet" onConfirm={formik.submitForm} />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography>{creating ? 'Creating...' : ''}</Typography>
        <Stack>
          <TextField
            label="Name"
            {...formik.getFieldProps('name')}
            error={!!(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Stack>
      </Container>
    </>
  );
};

export default NewWallet;
