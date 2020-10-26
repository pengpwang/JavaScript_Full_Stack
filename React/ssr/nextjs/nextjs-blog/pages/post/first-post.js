import Header from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';

const FirstPost = () => {
  return (
    <Layout>
      <Header>
        <title>First Post</title>
      </Header>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  );
  
}

export default FirstPost;