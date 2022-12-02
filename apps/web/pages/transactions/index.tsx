import {
  AppBar,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from '@mui/material';
import { Transaction, Wallet } from '@wallock/schemas';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import NavDrawer from '../../components/common/nav-drawer';
import Api from '../../lib/api/api';
import { withAuthPage } from '../../lib/with-auth-page';

type Props = {
  transactions: Transaction[];
  totalBalance: number;
};

export const getServerSideProps: GetServerSideProps<Props> = withAuthPage(
  async function (ctx) {
    const api = Api.fromWebServer(ctx);
    const transactions = await api.transactions.getTransactions();

    return {
      props: {
        transactions,
        totalBalance: transactions.reduce(function (
          totalBalance: number,
          transaction: Transaction
        ) {
          const amount =
            transaction.category.type === 'income'
              ? transaction.amount
              : -transaction.amount;
          return totalBalance + amount;
        },
        0),
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
              <Typography sx={{ flexGrow: 1 }}>{props.totalBalance}</Typography>
              <Link href='/transactions/new'>
              <Button variant="contained">New transaction</Button>
              </Link>
            </Toolbar>
          </Container>
        </AppBar>
      </Container>
    </>
  );
};

export default Transactions;
