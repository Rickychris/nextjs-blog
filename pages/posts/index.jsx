import Date from "../../components/date";
import styles from "./posts.module.scss";
import { GetStaticProps, GetStaticPaths } from "next";
import Card from "../../components/card/card.jsx";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import Image from 'next/image'

const FEED_QUERY = gql`
{
  posts{
    data{
      title
      id
      body
    }
  }
}
`;
const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

export const Post = ({ item }) => {
  return (
    <div className={styles.post}>
      <p className={styles.title}>{item.title}</p>
      <p className={styles.body}>{item.body}</p>
      
    </div>
  );
};


export default function Posts({ itemData1 }) {
  const { error, data } = useQuery(FEED_QUERY, {
    context: { clientName: "mutation" },
  });
  const itemData = data;
  return (
    <>
      <div className={styles.viewall}>
        <Link href={`/`}>
          <a>{"<-- Take Me Back..!"}</a>
        </Link>
      </div>
      <div className={`${styles.viewall} ${styles.createPost}`}>
        <Link href={`/create-post`}>
          <a>Create Post</a>
        </Link>
      </div>
      <div className={styles.items}>
        {itemData &&
          itemData.posts.data.map((item) => (
            <Post item={item} key={item.id}></Post>
          ))}
        {error && error.message}
      </div>
    </>
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = getAllPostIds()
//   return {
//     paths,
//     fallback: false
//   }
// }

// export const getStaticProps = async ({ params }) => {
//   const { data } = useQuery(FEED_QUERY,{context:{clientname:'mutation'}});
//   const itemData = data
//   return {
//     props: {
//       itemData,
//     },
//   };
// };
