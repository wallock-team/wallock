import {
  AppBar,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
} from '@mui/material';
import { Transaction, Wallet } from '@wallock/schemas';
import { GetServerSideProps, NextPage } from 'next';
import NavDrawer from '../../components/common/nav-drawer';
import Api from '../../lib/api/api';
import { withAuthPage } from '../../lib/with-auth-page';

type Props = {
  wallets: Wallet[];
  transactions: Transaction[];
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

const Transactions: NextPage<Props> = function (props) {
  return (
    <>
      <NavDrawer current="transactions" />
      <Container maxWidth="md">
        <AppBar>
          <Container maxWidth="md">
            <Toolbar>
              <FormControl>
                <InputLabel>Age</InputLabel>
                <Select>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Toolbar>
          </Container>
        </AppBar>
      </Container>
    </>
  );
};

export default Transactions;
