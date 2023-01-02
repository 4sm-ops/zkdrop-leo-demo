import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import lightLogo from '@/assets/images/logo.svg';
import darkLogo from '@/assets/images/icon-128-white.png';
import logo from '@/assets/images/icon-128.png';

// import React, { useState, useEffect, FormEvent, SyntheticEvent } from 'react';
// import type { NextPageWithLayout } from '@/types';
// import { NextSeo } from 'next-seo';
// import DashboardLayout from '@/layouts/dashboard/_dashboard';
// import Trade from '@/components/ui/trade';
// import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';
// import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo';
// import { Check } from '@/components/icons/check';
// import Button from '@/components/ui/button';
// import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard';
// import { Copy } from '@/components/icons/copy';
// import { WalletNotConnectedError } from '@demox-labs/aleo-wallet-adapter-base';

import { useQRCode } from 'next-qrcode';

const QR: React.FC<React.SVGAttributes<{}>> = (
  aleo_address,
  children,
  props
) => {
  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();

  const { Image } = useQRCode();

  // console.log(publicKey);

  return (
    <Image
      text={'https://github.com/bunlong/next-qrcode'}
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
};

export default QR;
