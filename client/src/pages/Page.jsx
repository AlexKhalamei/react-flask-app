import Layout from '../components/Layout/Layout';

const Page = ({ url, title, content }) => {
  return (
    <Layout>
      <h1 className="text-5xl font-bold">{title}</h1>
      <p>{content}</p>
      <p>
        Page Content for URL: <span className="bg-emerald-400 p-2">/{url}</span>
      </p>
    </Layout>
  );
};

export default Page;
