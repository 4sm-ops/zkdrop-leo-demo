import React, { useState, useEffect } from 'react';

import axios from 'axios';

export default function FilesTable({
  aleo_address,
  children,
}: React.PropsWithChildren<{}>) {
  const [posts, setPosts] = useState([]);

  //   useEffect(() => {
  //     const stored = localStorage.getItem("received_files");
  //     setPosts(stored ? JSON.parse(stored) : "");
  //     }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        if (aleo_address) {
          const res = await axios.get(
            `https://api.zkdrop.xyz/api/receive/${aleo_address}`
          );

          console.log('111');
          if (res.data.ipfs_hash) {
            console.log('222');
            let stored = localStorage.getItem('received_files');

            if (stored) {
              var filesFromLocalStorage = JSON.parse(stored);

              delete res.data.recipient_address;
              const newJson = res.data;

              filesFromLocalStorage.push(newJson);

              // filesFromLocalStorage.push(res.data);
              console.log(filesFromLocalStorage);

              // localStorage.setItem("received_files", JSON.stringify(filesFromLocalStorage));
              localStorage.setItem(
                'received_files',
                JSON.stringify(filesFromLocalStorage)
              );
            } else {
              delete res.data.recipient_address;
              localStorage.setItem(
                'received_files',
                '[' + JSON.stringify(res.data) + ']'
              );
            }
          }
          setPosts(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [aleo_address]);

  return (
    <div>
      Sender: {posts.sender_address} Recepient: {posts.recipient_address} File:{' '}
      {posts.ipfs_hash}{' '}
    </div>
  );
}
