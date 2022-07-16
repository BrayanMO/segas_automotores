import { GetServerSideProps, GetServerSidePropsContext } from "next";

export function requireAuthentication(gssp) {
  return async (context) => {
    const { req } = context;
    const { token } = req.cookies;

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return await gssp(context);
  };
}
