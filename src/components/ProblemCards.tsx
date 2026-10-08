'use client';

interface ProblemCard {
  title: string;
  desc: string;
  icon: string;
  problemKey: string;
}

export default function ProblemCards() {
  const problems: ProblemCard[] = [
    {
      title: "Printer Won't Print",
      desc: "Nothing happens when you try to print.",
      icon: "🖨️",
      problemKey: "wont_print",
    },
    {
      title: "Printer Says Offline",
      desc: "Your printer is on, but your computer can't connect.",
      icon: "⚠️",
      problemKey: "offline",
    },
    {
      title: "Wi-Fi Connection Problem",
      desc: "Having trouble connecting your printer to Wi-Fi?",
      icon: "📶",
      problemKey: "wifi",
    },
    {
      title: "Printer Error",
      desc: "Seeing an error message or warning light?",
      icon: "🚨",
      problemKey: "error",
    },
    {
      title: "New Printer Setup",
      desc: "Need help getting your new printer connected and ready?",
      icon: "🔌",
      problemKey: "setup",
    },
    {
      title: "Computer Can't Find Printer",
      desc: "Your computer doesn't recognize your printer.",
      icon: "💻",
      problemKey: "cant_find",
    },
  ];

  const handleSelectProblem = (key: string) => {
    const formElement = document.getElementById('get-help-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
      // If select exists, map problem
      const select = document.getElementById('problemType') as HTMLSelectElement | null;
      if (select) {
        const mapping: Record<string, string> = {
          wont_print: "Won't print",
          offline: "Offline",
          wifi: "Wi-Fi/connection problem",
          error: "Error message",
          setup: "Setup",
          cant_find: "Offline",
        };
        if (mapping[key]) {
          select.value = mapping[key];
          // Trigger change event so React state updates
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    }
  };

  return (
    <div className="problem-cards-grid">
      {problems.map((item, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => handleSelectProblem(item.problemKey)}
          className="problem-card"
          aria-label={`Select problem: ${item.title}`}
        >
          <div className="problem-card-icon">{item.icon}</div>
          <div className="problem-card-content">
            <h3 className="problem-card-title">{item.title}</h3>
            <p className="problem-card-desc">{item.desc}</p>
          </div>
          <span className="problem-card-link">Fix this issue ➔</span>
        </button>
      ))}
    </div>
  );
}
