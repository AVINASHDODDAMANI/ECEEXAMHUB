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
  pageClassName = "py-3 sm:py-4",
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="relative min-h-screen overflow-x-clip bg-[#f4f7fb]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(circle_at_top,rgba(21,74,150,0.12),transparent_62%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0))]"
        />
        <div className="relative z-10">
          {!hideNavbar && <Navbar searchValue={searchValue} onSearchChange={onSearchChange} />}
          <main
            className={`mx-auto w-full max-w-[1440px] px-3 pb-8 ${pageClassName} sm:px-6 sm:pb-10 lg:px-8`}
          >
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
