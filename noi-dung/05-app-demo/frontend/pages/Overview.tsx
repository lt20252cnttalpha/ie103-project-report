import React from 'react';
import { BookOpen, Database, Server, ShieldCheck, Activity, Layers, Code, FileBarChart } from 'lucide-react';
import { useConfig } from '../contexts/ConfigContext';

const Overview: React.FC = () => {
  const { config, loading } = useConfig();

  if (loading) return <div className="p-8">Loading...</div>;

  // Use config data or empty object to prevent crashes
  const ov = config?.overview;

  // Safe defaults if config.json is partial
  const header = ov?.header || { title: "Tổng Quan Đồ Án", subtitle: "Hệ thống..." };
  const sec1 = ov?.section1 || { title: "", problemStatement: "", steps: [] };
  const sec2 = ov?.section2 || { title: "", erdHighlights: [], businessConstraints: [] };
  const sec3 = ov?.section3 || { title: "", dbSystem: "", features: [] };
  const sec4 = ov?.section4 || { title: "", stats: [], security: [] };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-12 pb-12">
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{header.title}</h1>
          <p className="text-slate-700 dark:text-slate-300 mt-2 text-xl font-medium">{header.subtitle}</p>
        </div>

        {/* 1. Mô tả bài toán */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-primary-600 dark:text-primary-400">
            <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <BookOpen size={28} />
            </div>
            <h2 className="text-2xl font-bold">{sec1.title}</h2>
          </div>
          <div className="pl-4 md:pl-14 space-y-6 text-slate-800 dark:text-slate-200">
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Phát biểu bài toán & Mục tiêu</h3>
              <p className="leading-relaxed text-base font-medium">
                {sec1.problemStatement}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">Quy trình thực tế</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {sec1.steps.map((item) => (
                  <div key={item.step} className="relative bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-slate-900 dark:bg-slate-600 text-white flex items-center justify-center font-bold text-sm shadow-md">{item.step}</span>
                    <h4 className="font-bold text-slate-900 dark:text-white mt-1">{item.title}</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. Phân tích và thiết kế */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Layers size={28} />
            </div>
            <h2 className="text-2xl font-bold">{sec2.title}</h2>
          </div>
          <div className="pl-4 md:pl-14 space-y-6 text-slate-700 dark:text-slate-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-3 flex items-center gap-2"><Database size={18} /> Mô hình dữ liệu (ERD)</h3>
                <ul className="space-y-2 text-sm">
                  {sec2.erdHighlights.map((text, i) => (
                    <li key={i} className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span><span>{text}</span></li>
                  ))}
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-3 flex items-center gap-2"><ShieldCheck size={18} /> Ràng buộc nghiệp vụ</h3>
                <ul className="space-y-2 text-sm">
                  {sec2.businessConstraints.map((text, i) => (
                    <li key={i} className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span><span>{text}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Cài đặt */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <Code size={28} />
            </div>
            <h2 className="text-2xl font-bold">{sec3.title}</h2>
          </div>
          <div className="pl-4 md:pl-14 space-y-4 text-slate-700 dark:text-slate-300">
            <p className="text-base">
              Hệ quản trị CSDL lựa chọn: <strong className="text-slate-900 dark:text-white">{sec3.dbSystem}</strong>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {sec3.features.map((feat, i) => (
                <div key={i} className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-lg">
                  <span className="block font-bold text-slate-900 dark:text-white mb-1 text-base">{feat.title}</span>
                  {feat.desc}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Quản lý thông tin */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-purple-600 dark:text-purple-400">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Server size={28} />
            </div>
            <h2 className="text-2xl font-bold">{sec4.title}</h2>
          </div>
          <div className="pl-4 md:pl-14 grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-700 dark:text-slate-300">
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                <Activity size={20} className="text-purple-500" /> Xử lý thông tin (Demo)
              </h3>
              <ul className="space-y-3 text-sm">
                {sec4.stats.map((stat, i) => (
                  <li key={i} className={`flex items-center justify-between ${i !== sec4.stats.length - 1 ? 'border-b border-slate-100 dark:border-slate-700 pb-2' : ''}`}>
                    <span>{stat.label}</span>
                    <span className={`font-mono font-bold text-${stat.color}-600 bg-${stat.color}-50 dark:bg-${stat.color}-900/30 dark:text-${stat.color}-400 px-2 py-0.5 rounded`}>{stat.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                <FileBarChart size={20} className="text-purple-500" /> An toàn & Tiện ích
              </h3>
              <ul className="space-y-3 text-sm">
                {sec4.security.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ShieldCheck size={16} className="mt-0.5 text-slate-400" />
                    <div><strong>{item.label}:</strong> {item.desc}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Overview;