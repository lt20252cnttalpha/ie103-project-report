import React from 'react';
import { Users, CheckCircle2, FileText, UserCircle } from 'lucide-react';
import { useConfig } from '../contexts/ConfigContext';

const Logs: React.FC = () => {
  const { config, loading } = useConfig();
  
  if (loading) return <div className="p-8">Loading...</div>;

  const members = config?.teamMembers || [];

  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-50 dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-6 border-b border-slate-200 dark:border-slate-700">
           <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <Users className="text-primary-600" size={32} />
              Thành Viên Nhóm & Phân Công
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Danh sách chi tiết các thành viên thực hiện đồ án và nhiệm vụ được giao.
            </p>
          </div>
          <div className="flex gap-3 items-center">
             <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 shadow-sm">
                Tổng số: <span className="text-primary-600">{members.length} thành viên</span>
             </div>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                  <th className="py-4 px-6 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-40">MSSV</th>
                  <th className="py-4 px-6 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Họ và Tên</th>
                  <th className="py-4 px-6 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tasks</th>
                  <th className="py-4 px-6 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {members.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-400 italic">
                      Danh sách thành viên trống (kiểm tra config.json)
                    </td>
                  </tr>
                ) : members.map((member) => (
                  <tr key={member.mssv} className="group hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    {/* MSSV */}
                    <td className="py-4 px-6 font-mono text-slate-600 dark:text-slate-400 font-medium group-hover:text-primary-600 transition-colors">
                      {member.mssv}
                    </td>

                    {/* Name */}
                    <td className="py-4 px-6">
                       <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 font-bold text-sm shadow-sm ring-2 ring-white dark:ring-slate-800">
                            {member.name.split(' ').pop()?.charAt(0) || <UserCircle size={20}/>}
                          </div>
                          <span className="font-semibold text-slate-900 dark:text-white">{member.name}</span>
                       </div>
                    </td>

                    {/* Tasks */}
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                      {member.tasks ? (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium border border-blue-100 dark:border-blue-900/30">
                          <CheckCircle2 size={14} className="text-blue-500" />
                          {member.tasks}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic text-sm">Đang cập nhật...</span>
                      )}
                    </td>

                    {/* Notes */}
                    <td className="py-4 px-6 text-slate-500 dark:text-slate-400 text-sm">
                      {member.notes && (
                        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/10 px-2 py-1 rounded w-fit">
                           <FileText size={14} />
                           {member.notes}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;