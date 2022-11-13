import { Container, Stack, TextField } from '@mui/material';
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
  const api = useApi();

  const formik = useClassForm(WalletCreateDto, {
    initialValues: {
      name: '',
    },
    validate: (values) => {
      return {
        name: props.existingWalletNames.includes(values.name)
          ? `Wallet with name ${values.name} already exists`
          : undefined,
      };
    },
    onSubmit: (formData) =>
      api.wallets
        .createWallet(formData)
        .then((_wallet) =>
          setToast(<SuccessToast message="Wallet created succesfully!" />)
        )
        .catch((_error) =>
          setToast(<ErrorToast message="Oops... Try again later :(" />)
        ),
  });

  return (
    <>
      {toast}
      <CancelOrConfirmAppBar title="New Wallet" onConfirm={formik.submitForm} />
      <Container maxWidth="md" sx={{ mt: 4 }}>
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
