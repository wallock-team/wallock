import { Container, MenuItem, Stack, TextField } from '@mui/material';
import { Wallet, Category, TransactionCreateDto } from '@wallock/schemas';
import { GetServerSideProps, NextPage } from 'next';
import { CancelOrConfirmAppBar } from '../../components/common/cancel-or-confirm-app-bar';
import Api from '../../lib/api/api';
import { useClassForm } from '../../lib/hooks/use-class-form';
import { withAuthPage } from '../../lib/with-auth-page';

type Props = {
  wallets: Wallet[];
  categories: Category[];
};

export const getServerSideProps: GetServerSideProps<Props> = withAuthPage(
  async function (ctx) {
    const api = Api.fromWebServer(ctx);

    return {
      props: {
        wallets: await api.wallets.getWallets(),
        categories: await api.categories.getCategories(),
      },
    };
  }
);

const NewTransaction: NextPage<Props> = function (props) {
  const api = Api.fromBrowser();

  const form = useClassForm(TransactionCreateDto, {
    initialValues: {
      amount: 0,
      categoryId: 0,
      walletId: 0,
      note: '',
      time: new Date(),
    },
    validate: function (values) {
      return {};
    },
    onSubmit: async function (values) {
      await api.transactions.createTransaction(values);
    },
  });

  return (
    <>
      <CancelOrConfirmAppBar title="New transaction" />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Stack gap={4}>
          <TextField
            type="number"
            label="Amount"
            {...form.getFieldProps('amount')}
            error={!!(form.touched.amount && form.errors.amount)}
            helperText={form.touched.amount && form.errors.amount}
          />
          <TextField
            select
            label="Category"
            {...form.getFieldProps('categoryId')}
            error={!!(form.touched.categoryId && form.errors.categoryId)}
            helperText={form.touched.categoryId && form.errors.categoryId}
          >
            {props.categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Wallet"
            {...form.getFieldProps('walletId')}
            error={!!(form.touched.walletId && form.errors.walletId)}
            helperText={form.touched.walletId && form.errors.walletId}
          >
            {props.wallets.map((wallet) => (
              <MenuItem key={wallet.id} value={wallet.id}>
                {wallet.name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Container>
    </>
  );
};

export default NewTransaction;
