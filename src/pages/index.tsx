import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import DashboardLayout from '@/layouts/dashboard/_dashboard';
import Button from '@/components/ui/button';
import routes from '@/config/routes';
import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';

// import QR from '@/components/ui/qr';

import React, { useState, useEffect, FormEvent, SyntheticEvent } from 'react';

import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo';
import { Check } from '@/components/icons/check';
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard';
import { Copy } from '@/components/icons/copy';
import { WalletNotConnectedError } from '@demox-labs/aleo-wallet-adapter-base';

import { useQRCode } from 'next-qrcode';

type SectionProps = {
  title: string;
  bgColor: string;
};

function Section({
  title,
  bgColor,
  children,
}: React.PropsWithChildren<SectionProps>) {
  return (
    <div className="mb-3">
      <div className={`rounded-lg ${bgColor}`}>
        <div className="relative flex items-center justify-between gap-4 p-4">
          <div className="flex items-center ltr:mr-6 rtl:ml-6">
            <div>
              <span className="block text-xs font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:text-sm">
                {title}
              </span>
              <span className="mt-1 hidden text-xs tracking-tighter text-gray-600 dark:text-gray-400 sm:block">
                {children}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type QRProps = {
  aleo_address: string;
};

function QR({ aleo_address, children }: React.PropsWithChildren<QRProps>) {
  const { Image } = useQRCode();

  const url = 'https://www.zkdrop.xyz/api/account/' + aleo_address;

  return (
    <Image
      text={url}
      options={{
        type: 'image/jpeg',
        quality: 0.3,
        level: 'M',
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: '#010599FF',
          light: '#FFFFFFFF',
        },
      }}
    />
  );
}

const GettingStartedPage: NextPageWithLayout = () => {
  const { wallet, publicKey, sendTransaction, signAllTransactions } =
    useWallet();
  let [message, setMessage] = useState('');
  let [signature, setSignature] = useState('');
  let [copyButtonStatus, setCopyButtonStatus] = useState(false);
  let [_, copyToClipboard] = useCopyToClipboard();
  const handleCopyToClipboard = () => {
    copyToClipboard(signature);
    setCopyButtonStatus(true);
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 1500);
  };

  return (
    <>
      <NextSeo
        title="zkDrop.xyz | Digital ID for Aleo"
        description="Aleo based Digital ID concept"
      />
      <div className="mx-auto w-full px-4 pt-8 pb-14 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 xl:px-10 2xl:px-0">
        <h2 className="mb-6 text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:mb-10 sm:text-2xl">
          zkDrop.xyz Overview
        </h2>
        <Section
          title="STEP 1 - GET A WALLET"
          bgColor="bg-white shadow-card dark:bg-light-dark"
        >
          &bull; Download and Install an Aleo compatible wallet. We recommend{' '}
          <a href="https://demoxlabs.xyz">Leo Wallet</a>
        </Section>
        <Section title="STEP 2 - CREATE A NEW WALLET ACCOUNT" bgColor="">
          &bull; Once installed - click on &quot;Create a new wallet&quot;{' '}
          <br />
          &bull; Type in your password <br />
          &bull; Save the provided Secret Recovery Phrase somewhere safe and
          finish creating your account. Never share this phrase.
        </Section>
        <Section
          title="STEP 3 - CONNECT YOUR WALLET"
          bgColor="bg-white shadow-card dark:bg-light-dark"
        >
          &bull; Now that you have your wallet setup with funds, connect it to
          our site by clicking the button below <br />
          <br />
          <WalletMultiButton className="bg-[#154bf9]" />
          <QR aleo_address={publicKey} />
        </Section>
        <Section title="STEP 4 - START zkDrop" bgColor="">
          &bull; Click on the button below to start signing your first Aleo
          messages! <br /> <br />
          <a href={`${routes.sign}`}>
            <Button>Check your files</Button>
          </a>
        </Section>
      </div>
    </>
  );
};

GettingStartedPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default GettingStartedPage;
