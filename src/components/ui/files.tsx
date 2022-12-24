import React, { useState, useEffect } from 'react';

import axios from 'axios';

export default function FilesTable({ children }: React.PropsWithChildren<{}>) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('http://ip.jsontest.com');
        setPosts(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  console.log(posts.ip);

  return <div>{posts.ip}</div>;
}
