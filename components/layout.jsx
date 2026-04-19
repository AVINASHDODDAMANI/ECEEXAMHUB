import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./navbar";

export default function Layout({
  children,
  title = "ECEExamHub",
  description = "ECEExamHub helps ECE students learn concepts, solve PYQs, practice topic-wise questions, and track exam progress.",
  searchValue = "",
  onSearchChange,
  hideNavbar = false,
  pageClassName = "pt-6",
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

      <div className="min-h-screen bg-app-shell">
        <div className="pointer-events-none fixed inset-x-0 top-0 z-0 mx-auto h-[340px] max-w-[1280px] bg-hero-glow opacity-90 blur-3xl" />

        <div className="relative z-10">
          {!hideNavbar && <Navbar searchValue={searchValue} onSearchChange={onSearchChange} />}
          <main className={`mx-auto w-full max-w-[1280px] px-4 pb-12 ${pageClassName} sm:px-6 lg:px-8`}>
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
