import React, { useState } from 'react';
import { Network, Filter, ArrowRight, Share2 } from 'lucide-react';
import { BibleKnowledgeGraph, KnowledgeGraphNode } from '../../types/researchEngine';

interface KnowledgeGraphViewProps {
  graph: BibleKnowledgeGraph;
  onSelectNode?: (nodeId: string) => void;
}

export const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = ({ graph, onSelectNode }) => {
  const [selectedNode, setSelectedNode] = useState<KnowledgeGraphNode | null>(() => graph.nodes[0] || null);
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredNodes = graph.nodes.filter((node) => {
    if (typeFilter === 'all') return true;
    return node.type === typeFilter;
  });

  const connectedLinks = selectedNode
    ? graph.links.filter((l) => l.source === selectedNode.id || l.target === selectedNode.id)
    : [];

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'doctrine':
        return 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-700';
      case 'concept':
        return 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700';
      case 'verse':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700';
      case 'person':
        return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-700';
      case 'event':
        return 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-700';
      case 'original_word':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-700';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-navy-800 dark:text-slate-300 dark:border-navy-700';
    }
  };

  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-navy-800 pb-3">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-gold-500" />
          <h3 className="font-serif font-bold text-navy-950 dark:text-gold-300 text-base">
            বাইবেল নলেজ গ্রাফ ও সম্পর্কজাল (Bible Knowledge Graph)
          </h3>
        </div>

        {/* Filter by node type */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          {['all', 'doctrine', 'concept', 'verse', 'person', 'event', 'original_word'].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                typeFilter === t
                  ? 'bg-gold-500 text-navy-950 font-bold'
                  : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {t === 'all'
                ? 'সকল'
                : t === 'doctrine'
                ? 'মতবাদ'
                : t === 'concept'
                ? 'ধারণা'
                : t === 'verse'
                ? 'পদ'
                : t === 'person'
                ? 'ব্যক্তি'
                : t === 'event'
                ? 'ঘটনা'
                : 'মূলশব্দ'}
            </button>
          ))}
        </div>
      </div>

      {/* Nodes interactive cloud */}
      <div className="bg-slate-50/70 dark:bg-navy-950/60 p-4 rounded-xl border border-slate-200/80 dark:border-navy-800/80 min-h-[140px] flex flex-wrap gap-2 items-center justify-center">
        {filteredNodes.map((node) => {
          const isSelected = selectedNode?.id === node.id;
          return (
            <button
              key={node.id}
              onClick={() => {
                setSelectedNode(node);
                onSelectNode?.(node.id);
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-serif transition-all flex items-center gap-1.5 ${getNodeColor(
                node.type
              )} ${
                isSelected
                  ? 'ring-2 ring-gold-500 shadow-md scale-105 font-bold'
                  : 'hover:scale-102 hover:shadow-sm opacity-90'
              }`}
            >
              <span>{node.label}</span>
              <span className="text-[10px] opacity-60 uppercase">({node.type})</span>
            </button>
          );
        })}
      </div>

      {/* Selected Node Details & Connected Edges */}
      {selectedNode && (
        <div className="p-4 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800/70 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold text-slate-400">নির্বাচিত নোড:</span>
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-bold border ${getNodeColor(
                    selectedNode.type
                  )}`}
                >
                  {selectedNode.label}
                </span>
              </div>
              {selectedNode.descriptionBn && (
                <p className="text-sm font-serif text-slate-700 dark:text-slate-200 mt-1">
                  {selectedNode.descriptionBn}
                </p>
              )}
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-1">
              <Share2 className="w-3.5 h-3.5" />
              <span>{connectedLinks.length}টি সংযোগ</span>
            </div>
          </div>

          {/* Connected Edges List */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              সরাসরি সম্পর্ক ও সংযোগসমূহ (Direct Relationships):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {connectedLinks.map((link, idx) => {
                const isSource = link.source === selectedNode.id;
                const otherId = isSource ? link.target : link.source;
                const otherNode = graph.nodes.find((n) => n.id === otherId);

                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-navy-900 border border-slate-200/80 dark:border-navy-700/80 text-xs flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-semibold text-gold-600 dark:text-gold-400 whitespace-nowrap">
                        [{link.labelBn}]
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
                      <span className="font-serif truncate font-medium text-slate-800 dark:text-slate-200">
                        {otherNode?.label || otherId}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase flex-shrink-0">
                      {link.type}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
