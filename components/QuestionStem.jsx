function ColumnVector({ values }) {
  return (
    <span className="mx-1 inline-grid grid-cols-[auto_auto_auto] items-center align-middle">
      <span className="text-5xl font-light leading-none">[</span>
      <span className="grid gap-0 px-1 text-center leading-tight">
        {values.map((value) => (
          <span key={value}>{value}</span>
        ))}
      </span>
      <span className="text-5xl font-light leading-none">]</span>
    </span>
  );
}

function Gate2025Q59Stem() {
  return (
    <div className="text-sm leading-7 text-slate-800 sm:text-base">
      <p>Consider the vectors</p>

      <div className="my-3 flex flex-wrap items-center justify-center gap-7 text-lg text-slate-950">
        <span>
          <strong><em>a</em></strong> =
          <ColumnVector values={["1", "1"]} />,
        </span>
        <span>
          <strong><em>b</em></strong> =
          <ColumnVector values={["0", "3 sqrt(2)"]} />.
        </span>
      </div>

      <p>
        For real-valued scalar variable <em>x</em>, the value of
      </p>

      <div className="my-3 text-center text-lg text-slate-950">
        min<sub className="text-xs">x</sub> ||<em>a</em>x - <em>b</em>||<sub className="text-xs">2</sub>
      </div>

      <p>
        is __________ <em>(rounded off to two decimal places)</em>.
      </p>

      <p className="mt-2">
        ||.||<sub>2</sub> denotes the Euclidean norm, i.e., for{" "}
        <strong><em>y</em></strong> =
        <ColumnVector values={["y1", "y2"]} />, ||<strong><em>y</em></strong>||<sub>2</sub> =
        <span className="ml-1 whitespace-nowrap">
          &radic;(y<sub>1</sub><sup>2</sup> + y<sub>2</sub><sup>2</sup>)
        </span>.
      </p>
    </div>
  );
}

function Gate2025Q60Stem() {
  const probabilityRows = [
    ["P(X = 0, Y = 0)", "0.06"],
    ["P(X = 0, Y = 1)", "0.14"],
    ["P(X = 1, Y = 0)", "0.24"],
    ["P(X = 1, Y = 1)", "0.56"],
  ];

  return (
    <div className="text-sm leading-7 text-slate-800 sm:text-base">
      <p>
        <em>X</em> and <em>Y</em> are Bernoulli random variables taking values in {"{0,1}"}.
        The joint probability mass function of the random variables is given by:
      </p>

      <div className="my-3 grid justify-center text-base leading-6 text-slate-950 sm:text-lg">
        {probabilityRows.map(([event, value]) => (
          <div key={event} className="grid grid-cols-[auto_auto_auto] items-baseline gap-2">
            <span><em>{event}</em></span>
            <span>=</span>
            <span>{value}</span>
          </div>
        ))}
      </div>

      <p>
        The mutual information <em>I(X;Y)</em> is __________{" "}
        <em>(rounded off to two decimal places)</em>.
      </p>
    </div>
  );
}

function Gate2025Q61Stem() {
  return (
    <div className="text-sm leading-7 text-slate-800 sm:text-base">
      <p>
        The diode in the circuit shown below is ideal. The input voltage (in Volts) is given by{" "}
        <em>V</em><sub>I</sub> = 10 sin 100&pi;<em>t</em>, where time <em>t</em> is in seconds.
      </p>

      <p className="mt-2">
        The time duration (in ms, <em>rounded off to two decimal places</em>) for which the diode
        is forward biased during one period of the input is __________.
      </p>
    </div>
  );
}

export default function QuestionStem({ question, className = "" }) {
  if (question?._id === "gate-2025-em-q59") {
    return (
      <div className={className}>
        <Gate2025Q59Stem />
      </div>
    );
  }

  if (question?._id === "gate-2025-communications-q60") {
    return (
      <div className={className}>
        <Gate2025Q60Stem />
      </div>
    );
  }

  if (question?._id === "gate-2025-edc-q61") {
    return (
      <div className={className}>
        <Gate2025Q61Stem />
      </div>
    );
  }

  return <p className={className}>{question?.question}</p>;
}
