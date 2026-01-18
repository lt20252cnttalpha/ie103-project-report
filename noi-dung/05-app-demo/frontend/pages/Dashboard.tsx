import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfig } from '../contexts/ConfigContext';
import { Play, FileCode, ChevronRight, Loader2, Database, Zap, Box, GitBranch } from 'lucide-react';
import { ScenarioType } from '../types';

// Dark blue-red professional theme
const typeStyles: Record<string, { bg: string; text: string; border: string; iconBg: string; badgeBg: string; badgeText: string; badgeBorder: string }> = {
      'Stored Procedure': {
            bg: 'bg-blue-50/50 dark:bg-blue-950/20',
            text: 'text-blue-900 dark:text-blue-300',
            border: 'border-blue-200 dark:border-blue-900',
            iconBg: 'bg-gradient-to-br from-blue-700 to-blue-900',
            badgeBg: 'bg-red-600 dark:bg-red-700',
            badgeText: 'text-white',
            badgeBorder: 'border-red-700/30'
      },
      'Trigger': {
            bg: 'bg-blue-50/50 dark:bg-blue-950/20',
            text: 'text-blue-900 dark:text-blue-300',
            border: 'border-blue-200 dark:border-blue-900',
            iconBg: 'bg-gradient-to-br from-blue-700 to-blue-900',
            badgeBg: 'bg-red-600 dark:bg-red-700',
            badgeText: 'text-white',
            badgeBorder: 'border-red-700/30'
      },
      'Function': {
            bg: 'bg-blue-50/50 dark:bg-blue-950/20',
            text: 'text-blue-900 dark:text-blue-300',
            border: 'border-blue-200 dark:border-blue-900',
            iconBg: 'bg-gradient-to-br from-blue-700 to-blue-900',
            badgeBg: 'bg-red-600 dark:bg-red-700',
            badgeText: 'text-white',
            badgeBorder: 'border-red-700/30'
      },
      'Cursor': {
            bg: 'bg-blue-50/50 dark:bg-blue-950/20',
            text: 'text-blue-900 dark:text-blue-300',
            border: 'border-blue-200 dark:border-blue-900',
            iconBg: 'bg-gradient-to-br from-blue-700 to-blue-900',
            badgeBg: 'bg-red-600 dark:bg-red-700',
            badgeText: 'text-white',
            badgeBorder: 'border-red-700/30'
      }
};

const Dashboard: React.FC = () => {
      const navigate = useNavigate();
      const { config, loading } = useConfig();
      const [activeTab, setActiveTab] = useState<string>(ScenarioType.StoredProcedure);

      if (loading) {
            return (
                  <div className="flex items-center justify-center h-full">
                        <Loader2 className="animate-spin text-primary-500" size={32} />
                        <span className="ml-2 text-slate-500">Loading Configuration...</span>
                  </div>
            );
      }

      const scenarios = config?.scenarios || [];

      const filteredScenarios = scenarios.filter(s => s.type === activeTab);

      const tabs = [
            { key: ScenarioType.StoredProcedure, label: 'Stored Procedures', icon: Box, count: scenarios.filter(s => s.type === ScenarioType.StoredProcedure).length },
            { key: ScenarioType.Trigger, label: 'Triggers', icon: Zap, count: scenarios.filter(s => s.type === ScenarioType.Trigger).length },
            { key: ScenarioType.Function, label: 'Functions', icon: GitBranch, count: scenarios.filter(s => s.type === ScenarioType.Function).length },
            { key: ScenarioType.Cursor, label: 'Cursors', icon: FileCode, count: scenarios.filter(s => s.type === ScenarioType.Cursor).length },
      ];



      return (
            <div className="h-full flex flex-col bg-slate-100 dark:bg-slate-900">
                  {/* Redesigned Tabs - More Prominent */}
                  <div className="flex-none bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 shadow-lg">
                        <div className="max-w-7xl mx-auto px-8 py-4">
                              <div className="flex gap-3 overflow-x-auto">
                                    {tabs.map((tab) => {
                                          const Icon = tab.icon;
                                          const isActive = activeTab === tab.key;
                                          return (
                                                <button
                                                      key={tab.key}
                                                      onClick={() => setActiveTab(tab.key)}
                                                      className={`group relative flex items-center gap-3 px-6 py-4 rounded-lg text-sm font-bold transition-all duration-200 whitespace-nowrap ${isActive
                                                            ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl scale-105'
                                                            : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white hover:scale-102 shadow-md'
                                                            }`}
                                                >
                                                      <Icon size={22} className={`transition-transform duration-200 ${isActive ? 'drop-shadow-lg' : 'group-hover:scale-110'}`} strokeWidth={2.5} />
                                                      <span className="text-base">{tab.label}</span>
                                                      <span className={`ml-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${isActive
                                                            ? 'bg-white/20 text-white backdrop-blur-sm'
                                                            : 'bg-slate-900/50 text-slate-300 group-hover:bg-slate-600'
                                                            }`}>
                                                            {tab.count}
                                                      </span>
                                                </button>
                                          );
                                    })}
                              </div>
                        </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto p-8 bg-slate-50 dark:bg-slate-900">
                        <div className="max-w-7xl mx-auto">
                              {filteredScenarios.length === 0 ? (
                                    <div className="text-center py-16">
                                          <FileCode size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                                          <p className="text-slate-500 dark:text-slate-400 text-lg">
                                                Không có demo nào trong danh mục này
                                          </p>
                                    </div>
                              ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                                          {filteredScenarios.map((scenario) => {
                                                const styles = typeStyles[scenario.type] || typeStyles['Stored Procedure'];
                                                return (
                                                      <div
                                                            key={scenario.id}
                                                            onClick={() => navigate(`/scenario/${scenario.id}`)}
                                                            className={`group bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-7 flex flex-col gap-5 hover:border-red-500 dark:hover:border-red-600 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer ${styles.bg}`}
                                                      >
                                                            <div className="flex justify-between items-start">
                                                                  <div className={`p-3 rounded-lg ${styles.iconBg} text-white shadow-md group-hover:shadow-lg transition-all duration-200`}>
                                                                        <FileCode size={24} strokeWidth={2} />
                                                                  </div>
                                                                  <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${styles.badgeBg} ${styles.badgeText} border ${styles.badgeBorder}`}>
                                                                        {scenario.type}
                                                                  </span>
                                                            </div>

                                                            <div className="flex flex-col gap-2 flex-1 min-h-[6rem]">
                                                                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors line-clamp-2">
                                                                        {scenario.title}
                                                                  </h3>
                                                                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                                                                        {scenario.shortDesc}
                                                                  </p>
                                                            </div>

                                                            <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-700">
                                                                  <div className="flex items-center gap-2">
                                                                        <span className="text-xs font-mono text-slate-400 dark:text-slate-500 truncate max-w-[200px]" title={scenario.sqlFile}>
                                                                              {scenario.sqlFile}
                                                                        </span>
                                                                  </div>
                                                                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold text-sm group-hover:gap-2.5 transition-all">
                                                                        <span>Xem chi tiết</span>
                                                                        <ChevronRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                                                                  </div>
                                                            </div>
                                                      </div>
                                                );
                                          })}
                                    </div>
                              )}
                        </div>
                  </div>
            </div>
      );
};

export default Dashboard;