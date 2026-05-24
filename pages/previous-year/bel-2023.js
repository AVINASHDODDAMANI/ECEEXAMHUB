import SolutionPage from "../solution/[slug]";

export default function Bel2023PreviousYearPage(props) {
  return <SolutionPage {...props} />;
}

export function getServerSideProps() {
  return {
    props: {
      initialSlug: "bel-2023",
      seoOverride: {
        title: "BEL Previous Year Question Paper 2023 PDF",
        heading: "BEL Previous Year Question Paper 2023",
        description:
          "Download BEL previous year question paper 2023 PDF for ECE preparation.",
      },
      introContent: {
        heading: "BEL Previous Year Question Paper 2023",
        summary:
          "Download BEL previous year papers with solutions for Electronics and Communication Engineering.",
        body:
          "Download BEL previous year papers with solutions for Electronics and Communication Engineering. This page helps you revise the BEL 2023 paper pattern, practice objective questions, and connect each question back to the theory topics that matter most for ECE preparation.",
      },
    },
  };
}
