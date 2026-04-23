import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./navbar";

export default function Layout({
  children,
  title = "ECE Exam Guide",
  description = "ECE Exam Guide helps ECE students learn concepts, solve previous papers, practice MCQs, and track exam progress.",
  searchValue = "",
  onSearchChange,
  hideNavbar = false,
  pageClassName = "py-4",
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={description}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-[#f5f7fb]">
        <div className="relative z-10">
          {!hideNavbar && <Navbar searchValue={searchValue} onSearchChange={onSearchChange} />}
          <main className={`mx-auto w-full max-w-[1440px] px-4 pb-10 ${pageClassName} sm:px-6 lg:px-8`}>
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
