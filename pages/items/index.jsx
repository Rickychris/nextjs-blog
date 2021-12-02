import Date from '../../components/date'
import styles from './items.module.scss'
import { GetStaticProps, GetStaticPaths } from 'next'
import Card from '../../components/card/card.jsx'
import { useQuery, gql } from '@apollo/client';

const FEED_QUERY = gql`
{
    characters{
      results{
        name
        id
        image
      }
    }
  }
`;

export default function Items({
  itemData
}
// : {
//     itemData: {name:string,img:string,id:string}[]
// }
) {
    const { data } = useQuery(FEED_QUERY);
  return (
    <div className={styles.items}>
      {data && data.characters.results.map(((item)=><Card {...item} key={item.id}/>))}
    </div>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = getAllPostIds()
//   return {
//     paths,
//     fallback: false
//   }
// }

export const getStaticProps = async ({ params }) => {
  const itemData = [{name:'Rock'},{name:'Rock'},{name:'Rock'},{name:'Rock'},{name:'Rock'}]
  return {
    props: {
        itemData
    }
  }
}