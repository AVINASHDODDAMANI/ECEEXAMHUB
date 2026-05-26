import SolutionPage from "../solution/[slug]";

export default function Bel2023PreviousYearPage(props) {
  return <SolutionPage {...props} />;
}

export function getServerSideProps() {
  return {
    props: {
      initialSlug: "bel-december-2023",
      seoOverride: {
        title: "BEL December 2023 Previous Year Question Paper PDF",
        heading: "BEL December 2023 Previous Year Question Paper",
        description:
          "Download BEL December 2023 previous year question paper PDF for ECE preparation.",
      },
      introContent: {
        heading: "BEL December 2023 Previous Year Question Paper",
        summary:
          "Download BEL December 2023 previous year paper with solutions for Electronics and Communication Engineering.",
        body:
          "Download BEL December 2023 previous year paper with solutions for Electronics and Communication Engineering. This page helps you revise the BEL December 2023 paper pattern, practice objective questions, and connect each question back to the theory topics that matter most for ECE preparation.",
      },
    },
  };
}
