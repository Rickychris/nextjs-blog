import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Search from "../components/search/search.jsx";

export default function Home() {
  return (
    <div
      className={utilStyles.homepage}
      style={{ backgroundImage: 'url("/images/rnm-background.jpg")' }}
    >
      <Search />
      <div className={utilStyles.viewall}>
        <Link href={`/items`}>
          <a>View All the Characters</a>
        </Link>
      </div>
      <div className={`${utilStyles.viewall} ${utilStyles.posts}`}>
        <Link href={`/posts`}>
          <a>View Posts</a>
        </Link>
      </div>
    </div>
  );
}
