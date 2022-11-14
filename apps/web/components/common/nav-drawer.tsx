import { Drawer, List, ListItemButton, Paper, Tooltip } from '@mui/material';
import { default as WalletsIcon } from '@mui/icons-material/AccountBalanceWallet';
import { default as TransactionsIcon } from '@mui/icons-material/LocalAtm';
import { default as CategoriesIcon } from '@mui/icons-material/Category';
import { ReactNode } from 'react';
import Link from 'next/link';
import { startCase } from 'lodash';

const navEntries: readonly NavEntry[] = [
  {
    url: 'transactions',
    icon: <TransactionsIcon />,
  },
  {
    url: 'categories',
    icon: <CategoriesIcon />,
  },
  {
    url: 'wallets',
    icon: <WalletsIcon />,
  },
] as const;

type NavEntry = {
  url: string;
  icon: ReactNode;
  label?: string;
  selected?: boolean;
};

type Props = {
  current?: string;
};

export default function NavDrawer(props: Props) {
  return (
    <Drawer variant="permanent" anchor="left" open={true}>
      <Paper elevation={2}>
        <List>
          {navEntries.map((entry) => (
            <NavListItemButton
              key={entry.url}
              url={entry.url}
              icon={entry.icon}
              selected={props.current === entry.url}
            />
          ))}
        </List>
      </Paper>
    </Drawer>
  );
}

function NavListItemButton(props: NavEntry) {
  return (
    <Link href={props.url}>
      <Tooltip title={startCase(props.url)}>
        <ListItemButton
          sx={{ px: 4, py: 2 }}
          key={props.label}
          selected={props.selected}
          disabled={props.selected}
        >
          {props.icon}
        </ListItemButton>
      </Tooltip>
    </Link>
  );
}
