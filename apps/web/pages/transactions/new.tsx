import {
  Container,
  MenuItem,
  Stack,
  TextField as MuiTextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Wallet, Category, TransactionCreateDto } from '@wallock/schemas';
import { Form, Formik } from 'formik';
import { GetServerSideProps, NextPage } from 'next';
import { CancelOrConfirmAppBar } from '../../components/common/cancel-or-confirm-app-bar';
import Api from '../../lib/api/api';
import { withAuthPage } from '../../lib/with-auth-page';
import * as y from 'yup';
import { useRouter } from 'next/router';
import TextField from '../../components/common/text-field';
import Select from '../../components/common/select';
import DateTimeField from '../../components/common/date-time-field';
import { useState } from 'react';
import { toast } from 'react-toastify';

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
  const router = useRouter();
  const [isCreating, setCreating] = useState(false);

  return (
    <Formik<TransactionCreateDto>
      initialValues={{
        amount: 0,
        categoryId: 0,
        walletId: 0,
        time: new Date(),
      }}
      validationSchema={y.object({
        amount: y.number().positive().required(),
        categoryId: y
          .number()
          .oneOf(
            props.categories.map((c) => c.id),
            'You must select a category'
          )
          .required(),
        walletId: y
          .number()
          .oneOf(
            props.wallets.map((w) => w.id),
            'You must select a wallet'
          )
          .required(),
      })}
      onSubmit={async (value) => {
        setCreating(true);
        try {
          await api.transactions.createTransaction(value);
          toast.info('Created transaction successfully');
          setCreating(false);
          router.push('/transactions');
        } catch (err) {
          toast.error('Unexpected error');
        }
      }}
    >
      <Form>
        <CancelOrConfirmAppBar
          title="New transaction"
          cancel={{ onClick: () => router.push('/transactions') }}
          confirm={{ type: 'submit' }}
        />
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Stack gap={4}>
            <TextField name="amount" type="number" label="Amount" />

            <Select
              label="Category"
              name="categoryId"
              options={props.categories.map((c) => ({
                value: c.id,
                label: c.name,
              }))}
            />

            <Select
              label="Wallet"
              name="walletId"
              options={props.wallets.map((c) => ({
                value: c.id,
                label: c.name,
              }))}
            />

            <DateTimeField name="time" label="Time" />

            <TextField label="Note" name="note" />
          </Stack>
        </Container>
      </Form>
    </Formik>
  );
};

export default NewTransaction;
