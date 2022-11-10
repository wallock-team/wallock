import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import NavDrawer from '../../components/common/nav-drawer';
import { withAuthPage } from '../../lib/with-auth-page';
import { Wallet } from '@wallock/schemas';
import Api from '../../lib/api/api';

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

const Wallets: NextPage<Props> = function (props) {
  return (
    <>
      <NavDrawer current="wallets" />
      <Container maxWidth="md">
        <AppBar>
          <Toolbar>
            <Container maxWidth="md">
              <Typography variant="h6">My Wallets</Typography>
              {props.wallets.map((wallet) => (
                <h1 key={wallet.id}>{wallet.name}</h1>
              ))}
            </Container>
          </Toolbar>
        </AppBar>
      </Container>
    </>
  );
};

export default Wallets;
