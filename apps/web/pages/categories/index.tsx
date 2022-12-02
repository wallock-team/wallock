import {
  AppBar,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import NavDrawer from '../../components/common/nav-drawer';
import { withAuthPage } from '../../lib/with-auth-page';
import { Category, CategoryTypeValues } from '@wallock/schemas';
import Api from '../../lib/api/api';
import Link from 'next/link';

type Props = {
  categories: Category[];
};

export const getServerSideProps: GetServerSideProps<Props> = withAuthPage(
  async function (ctx) {
    return {
      props: {
        categories: await Api.fromWebServer(ctx).categories.getCategories(),
      },
    };
  }
);

const Categories: NextPage<Props> = function (props) {
  return (
    <>
      <NavDrawer current="categories" />
      <AppBar>
        <Container maxWidth="md">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              My Categories
            </Typography>
            <Link href="/categories/new">
              <Button variant="contained">New Category</Button>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <List>
          {CategoryTypeValues.map((categoryType) => (
            <>
              <ListSubheader>{categoryType}</ListSubheader>
              {props.categories
                .filter((category) => category.type === categoryType)
                .map((category) => (
                  <ListItem key={category.id}>
                    <ListItemText primary={category.name} />
                  </ListItem>
                ))}
            </>
          ))}
        </List>
      </Container>
    </>
  );
};

export default Categories;
