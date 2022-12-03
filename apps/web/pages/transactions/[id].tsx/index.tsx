import { Container, Stack, Typography } from '@mui/material';
import { Transaction } from '@wallock/schemas';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { CancelOrConfirmAppBar } from '../../../components/common/cancel-or-confirm-app-bar';
import Api from '../../../lib/api/api';
import { withAuthPage } from '../../../lib/with-auth-page';

type Props = {
  transaction: Transaction;
};

type Query = {
  id?: string | string[];
};

export const getServerSideProps = withAuthPage(async function (ctx) {
  if (
    !ctx.query.id ||
    typeof ctx.query.id !== 'string' ||
    isNaN(+ctx.query.id)
  ) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const id = +ctx.query.id;

  const api = Api.fromWebServer(ctx);

  return {
    props: {
      transaction: await api.transactions.getTransactionById(id),
    },
  };
});

const TransactionDetail: NextPage<Props, Query> = function (props) {
  const router = useRouter();

  return (
    <>
      <CancelOrConfirmAppBar
        title="Transaction Detail"
        confirm={{
          onClick: () => {
            router.push(`'/transactions/${props.transaction.id}/edit`);
          },
        }}
        cancel={{
          onClick: () => {
            router.push(`/transactions`);
          },
        }}
      />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Stack gap={4}>
          <Typography variant="body1">{`Amount: ${props.transaction.amount}`}</Typography>
          <Typography variant="body1">{`Note: ${props.transaction.note}`}</Typography>
          <Typography variant="body1">{`Time: ${props.transaction.time.toLocaleDateString()}`}</Typography>
          <Typography variant="body1">{`Category: ${props.transaction.category.name}`}</Typography>
          <Typography variant="body1">{`Wallet: ${props.transaction.wallet.name}`}</Typography>
        </Stack>
      </Container>
    </>
  );
};

export default TransactionDetail;
