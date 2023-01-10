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

          // var fromAPI = JSON.parse(res.data);

          // console.log(res.data);

          // array of json objects with list of received files

          res.data.forEach((element) => {
            if (element.ipfs_hash) {
              // local storage has a list of previously received files
              let stored = localStorage.getItem('received_files');

              if (stored) {
                // we parse data from localstorage
                var filesFromLocalStorage = JSON.parse(stored);

                // remove unused json element from API data - recipient_address

                delete element.recipient_address;

                // we push data to localshorage array
                const newJson = element;

                var check_ifps_hash_exists = filesFromLocalStorage.filter(
                  (x) => x.ipfs_hash === element.ipfs_hash
                );
                // console.log('searching for dublicates.. ');
                // console.log(check_ifps_hash_exists);
                if (check_ifps_hash_exists.length === 0) {
                  filesFromLocalStorage.push(newJson);
                }

                // then write data to local storage

                localStorage.setItem(
                  'received_files',
                  JSON.stringify(filesFromLocalStorage)
                );
              } else {
                delete element.recipient_address;
                localStorage.setItem(
                  'received_files',
                  '[' + JSON.stringify(element) + ']'
                );
              }
            }
          });
          // setPosts(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [aleo_address]);

  return (
    <div>
      {/* Sender: {posts.sender_address} Recepient: {posts.recipient_address} File:{' '}
      {posts.ipfs_hash}{' '} */}
    </div>
  );
}
