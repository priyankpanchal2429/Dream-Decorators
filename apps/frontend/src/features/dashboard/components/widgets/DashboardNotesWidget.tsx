'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Home,
  Layers,
  Truck,
  CheckCircle,
  Circle,
  ChevronUp,
  ChevronDown,
  Clock,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export interface DashboardTaskItem {
  id: string;
  title: string;
  category: 'BLINDS' | 'UPHOLSTERY' | 'DELIVERY' | 'CURTAINS' | 'GENERAL';
  scheduledTime: string;
  isCompleted: boolean;
  completedTime?: string;
  createdAt: string;
}

const STORAGE_KEY = 'dream_decorators_dashboard_tasks_v2';

export const DashboardNotesWidget: React.FC = () => {
  const [tasks, setTasks] = useState<DashboardTaskItem[]>([]);
  const [isCompletedOpen, setIsCompletedOpen] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'BLINDS' | 'UPHOLSTERY' | 'DELIVERY' | 'CURTAINS' | 'GENERAL'>('GENERAL');
  const [newTime, setNewTime] = useState('02:00 PM');
  const [isHydrated, setIsHydrated] = useState(false);

  // Initial Sample items matching reference image
  const defaultTasks: DashboardTaskItem[] = [
    {
      id: 'task-1',
      title: 'Blinds & Carpets - Tech Corp',
      category: 'BLINDS',
      scheduledTime: 'Sep 13, 01:00 PM',
      isCompleted: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'task-2',
      title: 'Sofa Upholstery - Main St',
      category: 'UPHOLSTERY',
      scheduledTime: 'Sep 13, 02:45 PM',
      isCompleted: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'task-3',
      title: 'Mattress Delivery - Elite Tower',
      category: 'DELIVERY',
      scheduledTime: 'Sep 13, 04:30 PM',
      isCompleted: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'task-4',
      title: 'Window Curtains - Smith Villa',
      category: 'CURTAINS',
      scheduledTime: 'Sep 13, 08:30 AM',
      isCompleted: true,
      completedTime: '09:15 AM',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'task-5',
      title: 'Wallpaper Install - Office HQ',
      category: 'GENERAL',
      scheduledTime: 'Sep 13, 10:30 AM',
      isCompleted: true,
      completedTime: '11:40 AM',
      createdAt: new Date().toISOString(),
    },
  ];

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setTasks(JSON.parse(saved));
      } else {
        setTasks(defaultTasks);
      }
    } catch {
      setTasks(defaultTasks);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const saveTasks = (updated: DashboardTaskItem[]) => {
    setTasks(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleToggle = (id: string) => {
    const nowStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const updated = tasks.map((t) => {
      if (t.id === id) {
        const nextCompleted = !t.isCompleted;
        return {
          ...t,
          isCompleted: nextCompleted,
          completedTime: nextCompleted ? nowStr : undefined,
        };
      }
      return t;
    });
    saveTasks(updated);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const dateStr = `Sep ${new Date().getDate()}, ${newTime}`;
    const newTask: DashboardTaskItem = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      scheduledTime: dateStr,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };

    saveTasks([newTask, ...tasks]);
    setNewTitle('');
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    saveTasks(updated);
  };

  const activeTasks = tasks.filter((t) => !t.isCompleted);
  const completedTasks = tasks.filter((t) => t.isCompleted);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'BLINDS':
        return <Home className="h-4 w-4 text-zinc-400" />;
      case 'UPHOLSTERY':
        return <Layers className="h-4 w-4 text-zinc-400" />;
      case 'DELIVERY':
        return <Truck className="h-4 w-4 text-zinc-400" />;
      default:
        return <Sparkles className="h-4 w-4 text-zinc-400" />;
    }
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-[#161618] text-white shadow-2xl p-5 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <h3 className="text-base font-extrabold text-white tracking-tight">
            To Do List
          </h3>

          <div className="flex items-center gap-2.5">
            {/* 2/5 Counter Badge (Enlarged) */}
            <span className="text-base md:text-lg font-black text-amber-400 tracking-tight font-mono">
              {completedTasks.length}/{tasks.length}
            </span>

            {/* + Add Button */}
            <button
              onClick={() => setIsAdding((prev) => !prev)}
              className="h-7 w-7 rounded-full bg-zinc-800 hover:bg-amber-400 hover:text-black border border-zinc-700 text-zinc-300 flex items-center justify-center transition-all cursor-pointer shadow-xs"
              title="Add New Task"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quick Add Form Modal/Panel */}
        {isAdding && (
          <form onSubmit={handleAddTask} className="mt-3 p-3 rounded-2xl bg-zinc-900 border border-zinc-700/80 space-y-2 animate-fade-in">
            <input
              type="text"
              placeholder="e.g. Living Room Curtain Installation"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400"
              autoFocus
            />
            <div className="flex items-center justify-between gap-2">
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="text-[10px] font-bold bg-zinc-800 text-zinc-300 px-2 py-1.5 rounded-lg border border-zinc-700 focus:outline-none"
              >
                <option value="GENERAL">General</option>
                <option value="CURTAINS">Curtains</option>
                <option value="BLINDS">Blinds & Carpets</option>
                <option value="UPHOLSTERY">Sofa Upholstery</option>
                <option value="DELIVERY">Delivery</option>
              </select>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-2.5 py-1 text-[10px] font-bold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newTitle.trim()}
                  className="px-3 py-1 rounded-lg bg-amber-400 text-black text-[11px] font-black hover:bg-amber-300 disabled:opacity-50 cursor-pointer"
                >
                  Save Task
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Active Tasks List */}
        <div className="space-y-3.5 pt-4">
          {activeTasks.length === 0 ? (
            <p className="text-xs text-zinc-500 py-3 text-center">
              No pending tasks! All caught up.
            </p>
          ) : (
            activeTasks.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-3 group/task transition-all"
              >
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  {/* Category Box Icon */}
                  <div className="p-2 rounded-xl bg-zinc-800/80 border border-zinc-700/60 shrink-0">
                    {getCategoryIcon(item.category)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      onClick={() => handleToggle(item.id)}
                      className="text-xs font-bold text-zinc-200 hover:text-amber-400 cursor-pointer truncate transition-colors"
                    >
                      {item.title}
                    </p>
                    <p className="text-[10px] text-zinc-500 flex items-center gap-1 mt-0.5 font-medium">
                      <Clock className="h-3 w-3" />
                      {item.scheduledTime}
                    </p>
                  </div>
                </div>

                {/* Check Action */}
                <button
                  onClick={() => handleToggle(item.id)}
                  className="text-zinc-600 hover:text-amber-400 transition-colors p-1 cursor-pointer shrink-0 mt-0.5"
                  title="Mark Completed"
                >
                  <Circle className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Completed Section (Collapsible) */}
      <div className="pt-4 border-t border-zinc-800/90 mt-4">
        <button
          onClick={() => setIsCompletedOpen((prev) => !prev)}
          className="flex items-center justify-between w-full text-[10px] font-black text-zinc-400 uppercase tracking-wider mb-2 cursor-pointer hover:text-zinc-200"
        >
          <span>COMPLETED ({completedTasks.length})</span>
          {isCompletedOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>

        {isCompletedOpen && (
          <div className="space-y-3 pt-1">
            {completedTasks.length === 0 ? (
              <p className="text-[10px] text-zinc-600 italic py-1">No completed tasks yet.</p>
            ) : (
              completedTasks.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-3 group/done opacity-70 hover:opacity-100 transition-all"
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 shrink-0 text-zinc-500">
                      {getCategoryIcon(item.category)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        onClick={() => handleToggle(item.id)}
                        className="text-xs font-semibold text-zinc-400 line-through cursor-pointer truncate"
                      >
                        {item.title}
                      </p>
                      <p className="text-[9.5px] text-emerald-400/90 flex items-center gap-1 mt-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                        Done at {item.completedTime || '09:15 AM'} • <span className="text-zinc-500">{item.scheduledTime}</span>
                      </p>
                    </div>
                  </div>

                  {/* Yellow checkmark circle */}
                  <div className="flex items-center gap-1 shrink-0 mt-0.5">
                    <button
                      onClick={() => handleToggle(item.id)}
                      className="text-amber-400 hover:text-zinc-400 transition-colors p-1 cursor-pointer"
                      title="Undo Completion"
                    >
                      <CheckCircle className="h-4 w-4 fill-amber-400/20 text-amber-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-zinc-600 hover:text-rose-400 opacity-0 group-hover/done:opacity-100 p-1 transition-all cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
