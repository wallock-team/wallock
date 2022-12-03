import {
  AppBar,
  Button,
  Container,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
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
  type TransactionGroup = {
    month: string;
    transactions: Transaction[];
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  });

  // WARNING: QUANG PHAM'S DIRTY CODE, READ WITH CAUTION

  const transGroups: TransactionGroup[] = [];

  for (const transaction of props.transactions) {
    const time = transaction.time as unknown as string;
    const month = new Date(time).toISOString().split('T')[0];

    const group = transGroups.find((g) => g.month === month);

    if (!group) {
      transGroups.push({
        month,
        transactions: [],
      });
    }

    transGroups.find((g) => g.month === month)!.transactions.push(transaction);
  }

  return (
    <>
      <NavDrawer current="transactions" />
      <AppBar>
        <Container maxWidth="md">
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }}>
              {formatter.format(props.totalBalance)}
            </Typography>
            <Link href="/transactions/new">
              <Button variant="contained">New transaction</Button>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <List>
          {transGroups.sort().map((g) => (
            <>
              <ListSubheader>{g.month}</ListSubheader>
              {g.transactions.map((transaction) => (
                <ListItem key={transaction.id}>
                  <ListItemText
                    primary={transaction.category.name}
                    secondary={transaction.note}
                  />
                  <ListItemSecondaryAction>
                    {transaction.category.type === 'income'
                      ? formatter.format(transaction.amount)
                      : formatter.format(-transaction.amount)}
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </>
          ))}
        </List>
      </Container>
    </>
  );
};

export default Transactions;
