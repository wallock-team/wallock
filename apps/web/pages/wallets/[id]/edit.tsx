import { Container, Stack } from '@mui/material';
import { WalletUpdateDto } from '@wallock/schemas';
import { Form, Formik } from 'formik';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { CancelOrConfirmAppBar } from '../../../components/common/cancel-or-confirm-app-bar';
import { useApi } from '../../../components/contexts/api-context';
import Api from '../../../lib/api/api';
import { withAuthPage } from '../../../lib/with-auth-page';
import * as y from 'yup';
import TextField from '../../../components/common/text-field';

type Props = {
  walletIdToUpdate: number;
  existingWallets: Wallet[];
};

type Query = {
  id?: string | string[];
};

export const getServerSideProps: GetServerSideProps<Props, Query> =
  withAuthPage(async function (ctx) {
    const invalidWalletId =
      !ctx.query.id || typeof ctx.query.id !== 'string' || isNaN(+ctx.query.id);

    if (invalidWalletId) {
      return {
        redirect: {
          destination: '/wallets',
          permanent: false,
        },
      };
    }

    const api = Api.fromWebServer(ctx);

    const wallets = await api.wallets.getWallets();

    const walletIdToUpdate = +ctx.query.id!;

    const walletWithIdDoesntExist = wallets.find(
      (w) => w.id === walletIdToUpdate
    );

    if (!walletWithIdDoesntExist) {
      return {
        redirect: {
          destination: '/wallets',
          permanent: false,
        },
      };
    }

    return {
      props: {
        walletIdToUpdate,
        existingWallets: wallets,
      },
    };
  });

const EditWallet: NextPage<Props, Query> = function (props) {
  const router = useRouter();
  const api = useApi();

  return (
    <Formik<WalletUpdateDto>
      initialValues={{
        id: props.walletIdToUpdate,
        name: props.existingWallets.find(
          (w) => w.id === props.walletIdToUpdate
        )!.name,
      }}
      validationSchema={y.object({
        name: y
          .string()
          .notOneOf(props.existingWallets.map((w) => w.name))
          .required(),
      })}
      onSubmit={console.log}
    >
      <Form>
        <CancelOrConfirmAppBar title="Edit Wallet" />
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Stack>
            <TextField name="name" />
          </Stack>
        </Container>
      </Form>
    </Formik>
  );
};

export default EditWallet;
