import { Container, Stack, TextField } from '@mui/material';
import { Wallet } from '@wallock/schemas';
import { GetServerSideProps, NextPage } from 'next';
import { CancelOrConfirmAppBar } from '../../components/common/cancel-or-confirm-app-bar';
import Api from '../../lib/api/api';
import { withAuthPage } from '../../lib/with-auth-page';

type Props = {
  wallets: Wallet[];
};

export const getServerSideProps: GetServerSideProps<Props> = withAuthPage(
  async function (ctx) {
    const api = Api.fromWebServer(ctx);

    return {
      props: {
        wallets: await api.wallets.getWallets(),
      },
    };
  }
);

const NewWallet: NextPage<Props> = function (props: Props) {
  return (
    <>
      <CancelOrConfirmAppBar title="New Wallet" />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Stack>
          <TextField label="Name" />
        </Stack>
      </Container>
    </>
  );
};

export default NewWallet;
