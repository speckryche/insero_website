interface ComparisonItem {
  label: string;
  value: string;
}

interface ComparisonProps {
  left: { title: string; items: ComparisonItem[] };
  right: { title: string; items: ComparisonItem[] };
}

export function Comparison({ left, right }: ComparisonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      {[left, right].map((side, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h4 className="font-display font-bold text-[#1e293b] mb-4 text-lg">{side.title}</h4>
          <ul className="space-y-3">
            {side.items.map((item, j) => (
              <li key={j} className="flex justify-between text-sm border-b border-gray-100 pb-2 last:border-0">
                <span className="text-[#64748b]">{item.label}</span>
                <span className="font-semibold text-[#1e293b]">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
