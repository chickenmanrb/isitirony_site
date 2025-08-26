import React, { useMemo, useState } from "react";

// ------------------------------
// Is It Irony? — Duolingo-style skin (playful, bold, friendly)
// TailwindCSS recommended. Single-file React mockup.
// ------------------------------

// Types
 type Example = {
  text: string;
  proper: boolean; // true = Proper use of "irony"
  type: "Verbal" | "Situational" | "Dramatic" | "Coincidence" | "Bad luck / timing" | "Hypocrisy" | "Sarcasm (not irony)" | "Paradox / Contradiction";
  explanation: string;
  instead?: string[]; // suggested words when improper
  sourceTag?: string; // e.g., "(popular example)", "(song lyric)"
};

const EXAMPLES: Example[] = [
  // PROPER — Verbal
  {
    text: "Staring at a downpour and saying, ‘What lovely weather.’",
    proper: true,
    type: "Verbal",
    explanation: "You intentionally say the opposite of what you mean. That mismatch between literal words and intended meaning is verbal irony (often sarcasm).",
    sourceTag: "(popular)",
  },
  // PROPER — Situational
  {
    text: "A fire station burns down.",
    proper: true,
    type: "Situational",
    explanation: "The place dedicated to preventing fires is itself destroyed by fire—an outcome that clashes with what we’d reasonably expect.",
    sourceTag: "(popular)",
  },
  {
    text: "A police station is robbed while the officers attend a ‘crime prevention’ ceremony.",
    proper: true,
    type: "Situational",
    explanation: "The outcome directly undercuts the expectation created by the situation (and the event’s theme).",
  },
  {
    text: "An English teacher unveils a ‘GRAMMAR CHAMPTION’ banner.",
    proper: true,
    type: "Situational",
    explanation: "A public display meant to signal mastery instead exposes the opposite—an incongruity between intent and result.",
  },
  {
    text: "A highway billboard that warns ‘Don’t text and drive’ is knocked down by a texting driver.",
    proper: true,
    type: "Situational",
    explanation: "The message and the outcome collide—the exact harm the warning sought to prevent causes the damage.",
  },
  // PROPER — Dramatic
  {
    text: "In *Romeo and Juliet*, the audience knows Juliet is alive when Romeo does not.",
    proper: true,
    type: "Dramatic",
    explanation: "Classic dramatic irony: the audience has crucial information that a character lacks, so words and actions take on double meanings.",
  },
  {
    text: "In a thriller, we watch the villain hide in the closet while the hero strolls in, unaware.",
    proper: true,
    type: "Dramatic",
    explanation: "The audience’s knowledge reshapes the scene—the characters’ expectations don’t match reality we can already see.",
  },

  // IMPROPER — Coincidence / Bad luck (popular misuses)
  {
    text: "Rain on your wedding day.",
    proper: false,
    type: "Bad luck / timing",
    explanation: "That’s misfortune or bad timing, not irony. There’s no built‑in contradiction between expectation and outcome.",
    instead: ["unfortunately", "unlucky", "coincidentally"],
    sourceTag: "(song lyric)",
  },
  {
    text: "A free ride when you’ve already paid.",
    proper: false,
    type: "Coincidence",
    explanation: "Annoying coincidence / redundancy. Irony requires an expectation set and a reversal, not mere inconvenience.",
    instead: ["annoyingly", "redundantly", "coincidentally"],
    sourceTag: "(song lyric)",
  },
  {
    text: "Good advice that you just didn’t take.",
    proper: false,
    type: "Coincidence",
    explanation: "That’s regret or poor judgment, not irony.",
    instead: ["regrettably", "unwisely"],
    sourceTag: "(song lyric)",
  },
  {
    text: "A traffic jam when you’re already late.",
    proper: false,
    type: "Bad luck / timing",
    explanation: "Inconvenient timing, not irony.",
    instead: ["inconveniently", "unfortunately"],
    sourceTag: "(song lyric)",
  },
  {
    text: "Ten thousand spoons when all you need is a knife.",
    proper: false,
    type: "Coincidence",
    explanation: "Mismatch of resources; not an expectation–reality reversal.",
    instead: ["impractically", "unhelpfully"],
    sourceTag: "(song lyric)",
  },
  {
    text: "Meeting the person of your dreams and then meeting their spouse.",
    proper: false,
    type: "Coincidence",
    explanation: "Awkward and unlucky, but not ironic by itself.",
    instead: ["awkwardly", "unluckily"],
    sourceTag: "(song lyric)",
  },
  {
    text: "A death‑row pardon two minutes too late.",
    proper: false,
    type: "Bad luck / timing",
    explanation: "Tragic timing, not irony.",
    instead: ["tragically", "sadly"],
    sourceTag: "(song lyric)",
  },
  {
    text: "It rains right after I wash my car.",
    proper: false,
    type: "Bad luck / timing",
    explanation: "Maddening timing, but no expectation–reality inversion.",
    instead: ["unfortunately", "annoyingly"],
  },
  {
    text: "I always bump into a friend the day I look terrible.",
    proper: false,
    type: "Coincidence",
    explanation: "Coincidence combined with self‑consciousness—not irony.",
    instead: ["coincidentally", "embarrassingly"],
  },
  // IMPROPER — Hypocrisy / Sarcasm / Paradox mislabels
  {
    text: "A politician who preaches honesty but secretly lies.",
    proper: false,
    type: "Hypocrisy",
    explanation: "That’s hypocrisy—claiming a virtue you don’t practice. It can be ironic **if** the exposure flips expectations in a revealing way, but the label ‘ironic’ alone is too imprecise.",
    instead: ["hypocritically"],
  },
  {
    text: "Calling something ‘literally unbelievable’ when you just mean ‘surprising’.",
    proper: false,
    type: "Sarcasm (not irony)",
    explanation: "That’s exaggeration or sarcasm. Verbal irony requires saying the opposite of what you mean, not merely intensifying it.",
    instead: ["figuratively", "hyperbolically"],
  },
  {
    text: "A sign reads ‘Nothing is written in stone’ on a whiteboard.",
    proper: false,
    type: "Paradox / Contradiction",
    explanation: "This is a cute contradiction only if it’s *actually* on stone. On a whiteboard, there’s no clash between message and medium.",
    instead: ["amusingly", "cheekily"],
  },

  // PROPER — Visual / structural irony done right
  {
    text: "A plaque engraved in granite: ‘Nothing is written in stone.’",
    proper: true,
    type: "Situational",
    explanation: "Here the medium (stone) contradicts the message, creating an expectation–reality clash.",
    sourceTag: "(popular)",
  },
  {
    text: "A city unveils a ‘flood‑proof’ museum that floods on opening week.",
    proper: true,
    type: "Situational",
    explanation: "The claim sets a clear expectation; the outcome inverts it.",
  },
  {
    text: "A company launches an app called ‘Focus’ and the launch video is riddled with pop‑up notifications.",
    proper: true,
    type: "Situational",
    explanation: "Brand promise vs. presentation undermines itself—an expectation–reality reversal.",
  },
  {
    text: "Posting ‘I never post on social media’… as a post.",
    proper: true,
    type: "Situational",
    explanation: "The statement contradicts the act that delivers it.",
    sourceTag: "(popular)",
  },
];

const TYPES_ORDER = [
  "Verbal",
  "Situational",
  "Dramatic",
  "Coincidence",
  "Bad luck / timing",
  "Hypocrisy",
  "Sarcasm (not irony)",
  "Paradox / Contradiction",
] as const;

// Small Badge component (Duolingo-ish colors)
function Pill({ children, kind }: { children: React.ReactNode; kind: "proper" | "improper" | "type" }) {
  const base = "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-tight";
  const map: Record<string, string> = {
    proper: "bg-emerald-500 text-white ring-1 ring-emerald-600",
    improper: "bg-rose-500 text-white ring-1 ring-rose-600",
    type: "bg-sky-100 text-sky-800 ring-1 ring-sky-200",
  };
  return <span className={`${base} ${map[kind]}`}>{children}</span>;
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-900 tracking-tight">{title}</h2>
      {subtitle && <p className="mt-2 text-emerald-800/80 max-w-3xl">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function IsItIronySite() {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState<"all" | "proper" | "improper">("all");
  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const filtered = useMemo(() => {
    return EXAMPLES.filter((ex) => {
      if (show !== "all" && ((show === "proper") !== ex.proper)) return false;
      if (activeTypes.length && !activeTypes.includes(ex.type)) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = `${ex.text} ${ex.explanation} ${ex.type} ${ex.sourceTag ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, show, activeTypes]);

  function toggleType(t: string) {
    setActiveTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 via-emerald-50 to-white text-emerald-950">
      {/* Header / Hero */}
      <header className="border-b border-emerald-200/60 bg-gradient-to-r from-emerald-500 via-lime-500 to-emerald-500 text-white sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-white/90 text-emerald-600 grid place-content-center font-extrabold shadow-sm">i</div>
            <div>
              <div className="text-lg font-extrabold tracking-tight">Is It Irony?</div>
              <div className="text-xs text-white/90 -mt-0.5">A quick guide to using the word right</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a className="text-sm font-bold text-white/90 hover:text-white" href="#definition">Definition</a>
            <a className="text-sm font-bold text-white/90 hover:text-white" href="#types">Types</a>
            <a className="text-sm font-bold text-white/90 hover:text-white" href="#examples">Examples</a>
            <a className="text-sm font-bold text-white/90 hover:text-white" href="#make-it-ironic">Make it ironic</a>
          </div>
        </div>
      </header>

      {/* Definition */}
      <Section
        title="What ‘irony’ means"
        subtitle="Irony is a meaningful mismatch between expectation and reality. The setup creates a clear expectation, and the outcome flips it—often revealing something about the situation, speaker, or story."
      >
        <div id="definition" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-emerald-200 bg-white shadow-sm">
            <div className="text-sm font-extrabold text-emerald-800">Verbal irony</div>
            <p className="mt-2 text-sm text-emerald-900/80">You say the opposite of what you mean. Sarcasm is a sharp, often mocking <em>form</em> of verbal irony.</p>
          </div>
          <div className="p-5 rounded-2xl border border-emerald-200 bg-white shadow-sm">
            <div className="text-sm font-extrabold text-emerald-800">Situational irony</div>
            <p className="mt-2 text-sm text-emerald-900/80">An outcome subverts a reasonable expectation created by the context, claim, or role.</p>
          </div>
          <div className="p-5 rounded-2xl border border-emerald-200 bg-white shadow-sm">
            <div className="text-sm font-extrabold text-emerald-800">Dramatic irony</div>
            <p className="mt-2 text-sm text-emerald-900/80">The audience knows key facts that a character doesn’t, so words/actions land differently for us.</p>
          </div>
        </div>
      </Section>

      {/* Controls */}
      <Section title="Spotting it in the wild" subtitle="Search, filter, and compare proper vs. improper uses.">
        <div className="flex flex-col gap-4">
          <div className="grid md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search examples (e.g., wedding, Romeo, billboard)…"
                className="w-full h-11 px-3 rounded-2xl border border-emerald-300 focus:ring-2 focus:ring-emerald-400/60 focus:outline-none bg-white"
              />
            </div>
            <div className="flex items-center gap-2">
              {(["all", "proper", "improper"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setShow(opt)}
                  className={`flex-1 h-11 rounded-2xl border-2 text-sm font-extrabold transition ${
                    show === opt
                      ? "bg-emerald-600 text-white border-emerald-600 shadow ring-1 ring-emerald-700"
                      : "bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50"
                  }`}
                >
                  {opt[0].toUpperCase() + opt.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {TYPES_ORDER.map((t) => (
              <button
                key={t}
                onClick={() => toggleType(t)}
                className={`px-3 py-1.5 rounded-full border-2 text-xs font-bold transition ${
                  activeTypes.includes(t)
                    ? "bg-emerald-600 text-white border-emerald-600 shadow ring-1 ring-emerald-700"
                    : "bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50"
                }`}
              >
                {t}
              </button>
            ))}
            {activeTypes.length > 0 && (
              <button
                onClick={() => setActiveTypes([])}
                className="px-3 py-1.5 rounded-full border text-xs font-bold bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </Section>

      {/* Examples */}
      <Section
        title="Examples: Proper vs. Improper"
        subtitle="Green = proper use of ‘irony’. Red = common misuses, with better word choices."
      >
        <div id="examples" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((ex, i) => (
            <article key={i} className="p-5 rounded-2xl border border-emerald-200 bg-white shadow-sm flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="text-base font-extrabold text-emerald-950 leading-snug">{ex.text}</div>
                {ex.proper ? (
                  <Pill kind="proper">Proper</Pill>
                ) : (
                  <Pill kind="improper">Improper</Pill>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Pill kind="type">{ex.type}</Pill>
                {ex.sourceTag && <span className="text-xs text-emerald-700/60">{ex.sourceTag}</span>}
              </div>
              <p className="text-sm text-emerald-900/80">{ex.explanation}</p>
              {!ex.proper && ex.instead && (
                <div className="text-sm">
                  <span className="text-emerald-700/80">Say this instead:</span>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {ex.instead.map((w, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-900 text-xs border border-emerald-200">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <button
                onClick={() => setExpanded((s) => ({ ...s, [i]: !s[i] }))}
                className="mt-auto self-start text-xs font-bold text-emerald-700 hover:text-emerald-900"
              >
                {expanded[i] ? "Hide notes" : "Why this is (not) irony"}
              </button>
              {expanded[i] && (
                <div className="text-xs text-emerald-900/80 bg-emerald-50 border border-emerald-200 rounded-xl p-3 -mt-2">
                  <p>
                    <strong>Test:</strong> What expectation is clearly set, and how does the outcome <em>invert</em> it? If you can’t name both, it’s probably not irony.
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      </Section>

      {/* Make it ironic */}
      <Section
        title="How to ‘make it ironic’ (without forcing it)"
        subtitle="Irony isn’t just bad luck. Add a claim, role, or context that creates a specific expectation—then overturn it."
      >
        <div id="make-it-ironic" className="grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-emerald-200 bg-white shadow-sm">
            <div className="text-sm font-extrabold text-emerald-800">1) Add an explicit expectation</div>
            <ul className="mt-2 text-sm text-emerald-900/80 list-disc pl-5 space-y-1">
              <li>Claim: “This museum is flood‑proof.” → <em>It floods.</em></li>
              <li>Role: A fire station should be safe from fire. → <em>It burns down.</em></li>
              <li>Promise: An app called “Focus.” → <em>Launch video is full of pop‑ups.</em></li>
            </ul>
          </div>
          <div className="p-5 rounded-2xl border border-emerald-200 bg-white shadow-sm">
            <div className="text-sm font-extrabold text-emerald-800">2) Or shift to a better word</div>
            <p className="mt-2 text-sm text-emerald-900/80">If there’s no expectation to overturn, pick a precise alternative:</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <div className="font-extrabold text-emerald-900">Coincidence</div>
                <div className="text-emerald-900/80">coincidentally, by chance</div>
              </div>
              <div>
                <div className="font-extrabold text-emerald-900">Bad luck / timing</div>
                <div className="text-emerald-900/80">unfortunately, inconveniently</div>
              </div>
              <div>
                <div className="font-extrabold text-emerald-900">Tragedy / misfortune</div>
                <div className="text-emerald-900/80">tragically, sadly</div>
              </div>
              <div>
                <div className="font-extrabold text-emerald-900">Hypocrisy</div>
                <div className="text-emerald-900/80">hypocritically</div>
              </div>
              <div>
                <div className="font-extrabold text-emerald-900">Surprise</div>
                <div className="text-emerald-900/80">surprisingly, unexpectedly</div>
              </div>
              <div>
                <div className="font-extrabold text-emerald-900">Sarcasm only</div>
                <div className="text-emerald-900/80">sarcastically</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 text-center text-sm text-emerald-800/80">
        Built to teach, not to nitpick. Language shifts, but clarity wins. — <span className="font-extrabold text-emerald-900">Is It Irony?</span>
      </footer>
    </div>
  );
}
