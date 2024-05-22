import './global.css';
import { UiLayout } from '@/components/ui/ui-layout';
import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { ReactQueryProvider } from './react-query-provider';

export const metadata = {
  title: 'MINT TOGETHER',
  description: 'Community generated NFT launchpad',
};

const links: { label: string; path: string }[] = [
  // { label: 'Account', path: '/account' },
  { label: 'Create', path: '/create' },
  { label: 'Collections', path: '/collections' },
  { label: 'Vote', path: '/vote' },
  { label: 'Mint', path: '/collections' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
              <UiLayout links={links}>{children}</UiLayout>
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
