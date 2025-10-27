"use client";

import { useState, useRef } from "react";

interface Tab {
  label: string;
  value: string;
  count?: number; // 🆕 Optional count prop
}

interface TabsProps {
  tabs: Tab[];
  children: React.ReactNode;
}

export default function Tabs({ tabs, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      const next = (index + 1) % tabs.length;
      tabRefs.current[next]?.focus();
      setActiveTab(tabs[next].value);
    } else if (e.key === "ArrowLeft") {
      const prev = (index - 1 + tabs.length) % tabs.length;
      tabRefs.current[prev]?.focus();
      setActiveTab(tabs[prev].value);
    }
  };

  return (
    <div className="bg-base-400 text-base-400 w-full rounded-lg px-4 pb-4">
      {/* Tabs header */}
      <div
        role="tablist"
        aria-label="Dashboard sections"
        className="flex border-b border-gray-300"
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.value}
            ref={(el) => (tabRefs.current[i] = el)}
            role="tab"
            aria-selected={activeTab === tab.value}
            tabIndex={activeTab === tab.value ? 0 : -1}
            onClick={() => setActiveTab(tab.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`flex items-center gap-1 px-4 py-3 text-sm font-medium transition-all duration-300 ${
              activeTab === tab.value
                ? "border-b-2 border-blue-600 text-blue-600"
                : "hover:text-blue-500"
            }`}
          >
            {tab.label}
            {typeof tab.count === "number" && (
              <span className="btn btn-inverted ml-2 rounded-full px-2 py-0.5 text-xs hover:cursor-default">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tabs content */}
      <div className="mt-6">
        {Array.isArray(children)
          ? children.find((child: any) => child.props.value === activeTab)
          : children}
      </div>
    </div>
  );
}

export function TabPanel({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div role="tabpanel" aria-labelledby={value} className="focus:outline-none">
      {children}
    </div>
  );
}
