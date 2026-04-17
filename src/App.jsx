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

function Footer() {
  return (
    <footer className="mt-16 bg-[#1f5a49] text-white">
      <div className="container-wrap px-4 py-14 text-center md:py-16">
        <img
          src="/assets/logo-xl.png"
          alt="KeenKeeper"
          className="mx-auto h-[52px] w-auto object-contain"
        />

        <p className="mx-auto mt-4 max-w-2xl text-[10px] text-white/75">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        <div className="mt-6">
          <h3 className="mb-3 text-[11px] font-semibold">Social Links</h3>

          <div className="flex justify-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <img
                src="/assets/instagram.png"
                alt="Instagram"
                className="h-4 w-4 object-contain"
              />
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <img
                src="/assets/facebook.png"
                alt="Facebook"
                className="h-4 w-4 object-contain"
              />
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <img
                src="/assets/twitter.png"
                alt="Twitter"
                className="h-4 w-4 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 text-[10px] text-white/70 md:flex-row">
          <p>© 2026 KeenKeeper. All rights reserved.</p>

          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex min-h-[220px] items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#1f5a49]"></div>
    </div>
  );
}

function SummaryCard({ value, label }) {
  return (
    <div className="card flex h-[106px] flex-col items-center justify-center text-center">
      <div className="text-[22px] font-semibold text-[#234f43]">{value}</div>
      <p className="mt-3 text-[11px] text-[#74829d]">{label}</p>
    </div>
  );
}

function FriendCard({ friend }) {
  return (
    <Link
      to={`/friend/${friend.id}`}
      className="card block px-4 py-4 text-center transition hover:-translate-y-0.5"
    >
      <img
        src={friend.picture}
        alt={friend.name}
        className="mx-auto h-[54px] w-[54px] rounded-full object-cover"
      />

      <h3 className="mt-3 text-[13px] font-semibold text-slate-800">
        {friend.name}
      </h3>

      <p className="mt-1.5 text-[9px] text-[#9aa6b6]">
        {friend.days_since_contact}d ago
      </p>

      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {friend.tags.map((tag) => (
          <span key={tag} className={`tag-badge uppercase ${getTagClasses(tag)}`}>
  {tag}
</span>
        ))}
      </div>

      <div className="mt-3">
        <span className={`status-badge ${getStatusClasses(friend.status)}`}>
          {formatStatus(friend.status)}
        </span>
      </div>
    </Link>
  );
}

