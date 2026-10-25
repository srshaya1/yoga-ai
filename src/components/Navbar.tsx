/**
 * YogaFlow AI - Navigation Header & Command Center
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Activity,
  Award,
  BookOpen,
  Calendar,
  Compass,
  FileCheck,
  Flame,
  GraduationCap,
  LayoutDashboard,
  Menu,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Video,
  X,
} from 'lucide-react';

interface NavbarProps {
  onOpenPositioningGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPositioningGuide }) => {
  const {
    activeTab,
    setActiveTab,
    activeRole,
    switchRole,
    currentUser,
    bookings,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingBookingsCount = bookings.filter((b) => b.status === 'pending').length;

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'practice', label: 'AI Practice', icon: Activity, highlight: true },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'progress', label: 'Analytics', icon: TrendingUp },
    { id: 'instructors', label: 'Marketplace', icon: Compass },
    {
      id: 'assessment',
      label: 'Instructor Assessment',
      icon: Award,
      badge: currentUser.role === 'instructor' && !currentUser.instructorData?.isEligible ? 'Required' : undefined,
    },
    {
      id: 'bookings',
      label: 'Bookings',
      icon: Calendar,
      countBadge: pendingBookingsCount > 0 ? pendingBookingsCount : undefined,
    },
    { id: 'references', label: 'References', icon: FileCheck },
    { id: 'tests', label: 'System Tests', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#080d1a]/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 p-0.5 shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow">
              <div className="w-full h-full bg-[#090e1c] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse-subtle" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  YogaFlow
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wider rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                Live Biomechanical Vision
              </p>
            </div>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                  isActive
                    ? item.highlight
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/30 font-bold'
                      : 'bg-slate-800 text-cyan-300 border border-slate-700/80 shadow-sm'
                    : item.highlight
                    ? 'text-violet-300 hover:text-white hover:bg-violet-950/40 border border-violet-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? (item.highlight ? 'text-white' : 'text-cyan-400') : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.countBadge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-amber-500 text-slate-950 animate-pulse">
                    {item.countBadge}
                  </span>
                )}
                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Role Switcher & Camera Guide */}
        <div className="flex items-center gap-2.5">
          {/* Camera positioning guide button */}
          <button
            onClick={onOpenPositioningGuide}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/70 hover:bg-slate-800 hover:text-cyan-300 border border-slate-700/60 rounded-lg transition-colors"
            title="Camera setup & positioning instructions"
          >
            <Video className="w-3.5 h-3.5 text-cyan-400" />
            <span>Camera Setup</span>
          </button>

          {/* Quick Role Switcher Pill */}
          <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 shadow-inner">
            <button
              onClick={() => switchRole('student')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                activeRole === 'student'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Switch to Student Account Mode"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Student</span>
            </button>
            <button
              onClick={() => switchRole('instructor')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                activeRole === 'instructor'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Switch to Instructor Account Mode"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Instructor</span>
            </button>
          </div>

          {/* User Avatar & Status */}
          <div className="flex items-center gap-2 pl-1 border-l border-slate-800">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-violet-500/30"
            />
            <div className="hidden xl:block text-left text-xs">
              <p className="font-bold text-slate-200 leading-tight truncate max-w-[100px]">
                {currentUser.name}
              </p>
              <p className="text-[10px] text-slate-400 capitalize">
                {currentUser.role}
              </p>
            </div>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#080d1a] px-4 pt-3 pb-5 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-violet-600/20 text-cyan-300 border border-violet-500/40'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-violet-400" />
                  <span>{item.label}</span>
                </div>
                {item.countBadge && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-slate-950">
                    {item.countBadge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-800/80">
            <button
              onClick={() => {
                onOpenPositioningGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 bg-slate-800/80"
            >
              <Video className="w-4 h-4 text-cyan-400" />
              <span>Camera Setup Instructions</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
