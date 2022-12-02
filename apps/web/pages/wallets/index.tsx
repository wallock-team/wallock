import {
  AppBar,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import NavDrawer from '../../components/common/nav-drawer';
import { withAuthPage } from '../../lib/with-auth-page';
import { Wallet } from '@wallock/schemas';
import Api from '../../lib/api/api';
import Link from 'next/link';

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
      <AppBar>
        <Container maxWidth="md">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              My Wallets
            </Typography>
            <Link href="/wallets/new">
              <Button variant="contained">New wallet</Button>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <List>
          {props.wallets.map((wallet) => (
            <ListItem key={wallet.id}>
              <ListItemText primary={wallet.name} />
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default Wallets;
