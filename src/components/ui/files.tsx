import React, { useState, useEffect } from 'react';

import axios from 'axios';

export default function FilesTable({
  aleo_address,
  children,
}: React.PropsWithChildren<{}>) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (aleo_address) {
          const res = await axios.get(
            `https://api.zkdrop.xyz/api/receive/${aleo_address}`
          );
          setPosts(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    console.log(aleo_address);
    fetchData();
  }, [aleo_address]);

  return (
    <div>
      Sender: {posts.sender_address} Recepient: {posts.recipient_address} File:{' '}
      {posts.ipfs_hash}{' '}
    </div>
  );
}
