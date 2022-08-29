import type { NextPage } from "next";
import Head from "next/head";
// import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

// const AuthShowcase: React.FC = () => {
//   const { data: secretMessage, isLoading } = trpc.useQuery([
//     "auth.getSecretMessage",
//   ]);

//   const { data: sessionData } = useSession();

//   return (
//     <div>
//       {sessionData && <p>Logged in as {sessionData?.user?.name}</p>}
//       {secretMessage && <p>{secretMessage}</p>}
//       <button
//         className="px-4 py-2 border-2 border-blue-500 rounded-md"
//         onClick={sessionData ? () => signOut() : () => signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };

const Home: NextPage = () => {
  const context = trpc.useContext();
  const { data, isLoading } = trpc.useQuery(["example.getallassets"]);
  const deleteAsset = trpc.useMutation(["example.deleteAsset"], {
    onSuccess() {
      context.invalidateQueries("example.getallassets");
    },
  });

  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-start min-h-screen p-4">
        <h5 className="text-md md:text-[3rem] leading-normal font-extrabold text-gray-700">
          Hyperledger Fabric <span className="text-purple-300">Next</span> App
        </h5>

        <div className="flex flex-col justifiy-center w-11/12 m-10 ">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead>
                <tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <th className="py-3 px-6 text-sm">Color</th>
                  <th className="py-3 px-6 text-sm">Size</th>
                  <th className="py-3 px-6 text-sm">Owner</th>
                  <th className="py-3 px-6 text-sm">Appraised Value</th>
                  <th className="py-3 px-6 text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.assets.map((asset) => (
                  <tr key={asset.ID}>
                    <td className="py-3 px-6">{asset.Color}</td>
                    <td className="py-3 px-6">{asset.Size}</td>
                    <td className="py-3 px-6">{asset.Owner}</td>
                    <td className="py-3 px-6">{asset.AppraisedValue}</td>
                    <td className="py-3 px-6">
                      <span className="text-blue-600 hover:underline">
                        Edit
                      </span>{" "}
                      <span className="text-red-600 hover:underline">
                        <a onClick={() => deleteAsset.mutate({ ID: asset.ID })}>
                          Delete
                        </a>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
