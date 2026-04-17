import Head from "next/head";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function Layout({
  children,
  title = "ECEExamHub",
  searchValue = "",
  onSearchChange,
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="ECEExamHub helps ECE students practice MCQs, previous year questions, and exam insights."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-mesh">
        <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
          <Sidebar />

          <div className="flex min-h-screen flex-1 flex-col">
            <Navbar searchValue={searchValue} onSearchChange={onSearchChange} />
            <main className="flex-1 px-4 pb-8 pt-6 sm:px-6 lg:px-8">{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}
