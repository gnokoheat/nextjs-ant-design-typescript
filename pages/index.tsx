import { useRouter } from 'next/router';

const redirectTo = '/menu1';

const Index = () => {
  if (typeof window !== 'undefined') {
    const router = useRouter();
    router.push(redirectTo);
  }
  return <></>;
};

Index.getInitialProps = async ({ ctx }) => {
  if (ctx && ctx.req) {
    ctx.res.statusCode = 302;
    ctx.res.setHeader('Location', redirectTo);
  }
  return { props: '' };
};

export default Index;
