import React, { useEffect, useMemo, useState } from 'react';
import { Routes, Route, NavLink, Link, useParams } from 'react-router-dom';
import {
  House,
  Clock3,
  BarChart3,
  UserPlus,
  Bell,
  Archive,
  Trash2,
  Pencil
} from 'lucide-react';
import toast from 'react-hot-toast';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const navItems = [
  { to: '/', label: 'Home', icon: House },
  { to: '/timeline', label: 'Timeline', icon: Clock3 },
  { to: '/stats', label: 'Stats', icon: BarChart3 }
];

const COLORS = ['#7c3aed', '#1f5a49', '#4ade80'];

const getStatusClasses = (status) => {
  switch (status) {
    case 'overdue':
      return 'bg-red-100 text-red-500';
    case 'almost due':
      return 'bg-amber-100 text-amber-500';
    case 'on-track':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-slate-100 text-slate-500';
  }
};

const getTagClasses = (tag) => {
  switch (tag.toLowerCase()) {
    case 'family':
      return 'bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0]';
    case 'mentor':
      return 'bg-[#fee2e2] text-[#ef4444] border border-[#fecaca]';
    case 'work':
      return 'bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0]';
    case 'travel':
      return 'bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0]';
    case 'home':
      return 'bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0]';
    case 'close friend':
      return 'bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0]';
    case 'college':
      return 'bg-[#dbeafe] text-[#2563eb] border border-[#bfdbfe]';
    case 'friend':
      return 'bg-[#dbeafe] text-[#2563eb] border border-[#bfdbfe]';
    default:
      return 'bg-[#f8fbfd] text-[#708198] border border-[#d8e1ea]';
  }
};

const formatStatus = (status) => {
  if (status === 'on-track') return 'On-Track';
  if (status === 'almost due') return 'Almost Due';
  if (status === 'overdue') return 'Overdue';
  return status;
};

const formatDateLong = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const getStoredTimeline = () => {
  const data = localStorage.getItem('keenkkeeper-timeline');
  return data ? JSON.parse(data) : [];
};

const saveStoredTimeline = (entries) => {
  localStorage.setItem('keenkkeeper-timeline', JSON.stringify(entries));
};

function Navbar() {
  return (
    <header className="border-b border-[#e7ebf0] bg-white">
      <div className="flex items-center justify-between px-10 py-[11px] lg:px-14">
        <img
          src="/assets/logo.png"
          alt="KeenKeeper"
          className="h-[22px] w-auto object-contain"
        />

        <nav className="flex items-center gap-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to}>
              {({ isActive }) => (
                <span
                  className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-[11px] font-medium transition ${
                    isActive
                      ? 'border-[#1f5a49] bg-[#1f5a49] shadow-sm'
                      : 'border-transparent bg-white text-[#64748b] hover:border-[#e2e8f0]'
                  }`}
                >
                  <Icon
                    size={12}
                    strokeWidth={1.9}
                    className={isActive ? 'text-white' : 'text-[#64748b]'}
                  />
                  <span className={isActive ? 'text-white leading-none' : 'text-[#64748b] leading-none'}>
                    {label}
                  </span>
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

function isActiveTextClass() {
  return '';
}

