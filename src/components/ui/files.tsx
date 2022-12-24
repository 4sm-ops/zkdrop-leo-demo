import React, { useState, useEffect } from 'react';

import axios from 'axios';

export default function FilesTable({
  aleo_address,
  children,
}: React.PropsWithChildren<{}>) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const query =
      'https://api.zkdrop.xyz/api/receive/aleo18s7l90nhhw6jsz60wl6la0k8zzp2q7u5esdjmr7xpyl9d96rzvgsz2n4kx';

    async function fetchData() {
      try {
        const res = await axios.get(
          'https://api.zkdrop.xyz/api/receive/aleo18s7l90nhhw6jsz60wl6la0k8zzp2q7u5esdjmr7xpyl9d96rzvgsz2n4kx'
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  console.log(posts);

  return <div>{posts.recipient_address}</div>;
}
