import React, { useState } from 'react';
import { useConfig } from '../contexts/ConfigContext';
import { FileText, Image as ImageIcon, X, Eye, ExternalLink, Cloud } from 'lucide-react';

const Reports: React.FC = () => {
  const { config, loading } = useConfig();
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const getPreviewUrl = (url: string) => {
    // Logic to convert Google Drive View/Share links to Preview/Embed links
    if (url.includes('drive.google.com') && (url.includes('/view') || url.includes('/edit'))) {
        return url.replace(/\/view.*$/, '/preview').replace(/\/edit.*$/, '/preview');
    }
    return url;
  };

  const openPreview = (file: any, groupName: string) => {
    setSelectedFile({
        ...file,
        groupName: groupName,
        previewUrl: getPreviewUrl(file.url)
    });
  };

  const closePreview = () => {
    setSelectedFile(null);
  };

  const reportGroups = config?.reportGroups || [];

  if (loading) return <div className="p-8">Loading reports...</div>;

  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-50 dark:bg-dark-bg relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-200 dark:border-dark-border">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Trình Bày Thông Tin</h1>
            <p className="text-slate-500 max-w-2xl text-lg">
                Kho lưu trữ báo cáo, biểu đồ. Dữ liệu được cấu hình động theo từng nhóm.
            </p>
          </div>
          {/* Button moved to Layout Header */}
        </div>

        {/* Groups Loop */}
        <div className="flex flex-col gap-12 pb-10">
          {reportGroups.length === 0 && <div className="text-slate-400 italic">Chưa có nhóm báo cáo nào trong config.json</div>}
          
          {reportGroups.map((group) => (
               <div key={group.id} className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 {/* Group Header */}
                 <div className="flex flex-col gap-1 border-l-4 border-primary-500 pl-4">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        {group.title}
                        <span className="text-sm font-normal text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 rounded-full">
                            {group.files.length}
                        </span>
                    </h2>
                    <p className="text-slate-500 text-sm max-w-3xl leading-relaxed">
                        {group.description}
                    </p>
                 </div>
                 
                 {/* Files Grid */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {group.files.length === 0 && <span className="text-slate-400 text-sm italic col-span-full ml-4">Danh sách trống.</span>}
                    
                    {group.files.map(file => {
                      const isGoogleDrive = file.url.includes('drive.google.com');
                      return (
                      <div 
                        key={file.id} 
                        className="group relative flex flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-surface overflow-hidden hover:shadow-xl hover:border-primary-500/50 transition-all duration-300 cursor-pointer"
                        onClick={() => openPreview(file, group.title)}
                      >
                        {/* Thumbnail Container */}
                        <div className="h-44 bg-slate-100 dark:bg-slate-900 relative overflow-hidden flex items-center justify-center">
                          {file.thumbnailUrl ? (
                              <img 
                                src={file.thumbnailUrl} 
                                alt={file.name} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                    // Fallback if image fails
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                          ) : (
                              <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-300">
                                  {file.type === 'pdf' ? <FileText size={48} /> : <ImageIcon size={48} />}
                              </div>
                          )}
                          
                          {/* Fallback Icon Container (Hidden by default if img exists) */}
                          <div className={`hidden w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-300 absolute inset-0 ${!file.thumbnailUrl ? '!flex' : ''}`}>
                               {file.type === 'pdf' ? <FileText size={48} /> : <ImageIcon size={48} />}
                          </div>
                          
                          <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5 z-10">
                             {file.type === 'pdf' ? <FileText size={12} className="text-red-400" /> : <ImageIcon size={12} className="text-blue-400" />}
                             {file.type}
                          </div>
                          
                          {isGoogleDrive && (
                              <div className="absolute top-3 right-3 px-2 py-1 bg-blue-600/80 backdrop-blur-sm rounded text-[10px] font-bold text-white flex items-center gap-1 z-10">
                                  <Cloud size={10} /> Drive
                              </div>
                          )}

                          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[2px] z-20">
                              <button className="bg-white/90 hover:bg-white text-slate-900 px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">
                                 <Eye size={14} /> Xem trước
                              </button>
                          </div>
                        </div>
                        
                        {/* Card Footer */}
                        <div className="p-4 flex flex-col gap-2 border-t border-slate-100 dark:border-slate-700/50 bg-white dark:bg-dark-surface z-10">
                          <div className="flex justify-between items-start">
                             <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate pr-2 group-hover:text-primary-600 transition-colors" title={file.name}>
                               {file.name}
                             </h3>
                          </div>
                          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                             <span className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">{file.size || 'N/A'}</span>
                             <span>{file.date || '-'}</span>
                          </div>
                        </div>
                      </div>
                    )})}
                 </div>
               </div>
          ))}
        </div>
      </div>

      {/* Live Preview Modal (Lightbox) */}
      {selectedFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200">
          <button 
            onClick={(e) => { e.stopPropagation(); closePreview(); }}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
          >
            <X size={24} />
          </button>

          <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex flex-col bg-transparent rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between bg-slate-900 text-white px-6 py-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                   {selectedFile.type === 'pdf' ? <FileText size={20} className="text-red-400" /> : <ImageIcon size={20} className="text-blue-400" />}
                   <div className="flex flex-col">
                      <span className="font-medium truncate max-w-md text-sm md:text-base">{selectedFile.name}</span>
                      <span className="text-xs text-slate-400">{selectedFile.groupName}</span>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <a 
                     href={selectedFile.url} 
                     target="_blank" 
                     rel="noreferrer"
                     className="p-2 hover:bg-white/10 rounded-md text-slate-300 hover:text-white transition-colors" 
                     title="Open in new tab"
                   >
                      <ExternalLink size={18} />
                   </a>
                </div>
            </div>

            <div className="flex-1 bg-black flex items-center justify-center overflow-hidden relative">
              <iframe 
                  src={selectedFile.previewUrl}
                  className="w-full h-full bg-white"
                  title="File Preview"
                  allow="autoplay"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;