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

function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      const response = await fetch('/friends.json');
      const data = await response.json();

      setTimeout(() => {
        setFriends(data);
        setLoading(false);
      }, 650);
    };

    fetchFriends();
  }, []);

  const summary = useMemo(() => {
    return {
      total: 12,
      onTrack: 3,
      needAttention: 6,
      interactionsThisMonth: 12
    };
  }, []);

  return (
    <section className="pt-[46px]">
      <div className="mx-auto max-w-[770px] text-center">
        <h1 className="text-[34px] font-bold leading-[1.15] tracking-[-0.04em] text-[#1f2a37] md:text-[38px]">
          Friends to keep close in your life
        </h1>

        <p className="mx-auto mt-4 max-w-[430px] text-[11px] leading-5 text-[#94a3b8]">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        <button className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#1f5a49] px-4 py-2 text-[11px] font-semibold text-white">
          <UserPlus size={14} />
          Add a Friend
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="summary-grid mt-9">
            <SummaryCard value={summary.total} label="Total Friends" />
            <SummaryCard value={summary.onTrack} label="On Track" />
            <SummaryCard value={summary.needAttention} label="Need Attention" />
            <SummaryCard value={summary.interactionsThisMonth} label="Interactions This Month" />
          </div>

          <div className="mt-6 border-t border-[#e8edf3] pt-6">
            <h2 className="mb-4 text-[14px] font-semibold text-[#1f2a37]">
              Your Friends
            </h2>

            <div className="friend-grid">
              {friends.map((friend) => (
                <FriendCard key={friend.id} friend={friend} />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function FriendDetails() {
  const { id } = useParams();
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    fetch('/friends.json')
      .then((res) => res.json())
      .then((data) => {
        const selectedFriend = data.find((item) => item.id === Number(id));
        setFriend(selectedFriend || null);
      });
  }, [id]);

  const handleQuickCheckIn = (type) => {
    if (!friend) return;

    const newEntry = {
      id: Date.now(),
      type,
      title: `${type} with ${friend.name}`,
      date: new Date().toISOString()
    };

    const existingEntries = getStoredTimeline();
    const updatedEntries = [newEntry, ...existingEntries];
    saveStoredTimeline(updatedEntries);

    toast.success(`${type} logged for ${friend.name}`);
  };

  if (!friend) {
    return <div className="py-16 text-center text-lg font-medium">Friend not found.</div>;
  }

  return (
    <section className="pt-8">
      <div className="grid gap-5 lg:grid-cols-[240px_1fr]">
        <div className="card p-5 text-center">
          <img
            src={friend.picture}
            alt={friend.name}
            className="mx-auto h-16 w-16 rounded-full object-cover"
          />

          <h1 className="mt-3 text-[15px] font-semibold">{friend.name}</h1>

          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <span className={`status-badge ${getStatusClasses(friend.status)}`}>
              {formatStatus(friend.status)}
            </span>

            {friend.tags.map((tag) => (
              <span key={tag} className={`tag-badge uppercase ${getTagClasses(tag)}`}>
  {tag}
</span>
            ))}
          </div>

          <p className="mt-4 text-[11px] leading-5 text-slate-500">{friend.bio}</p>
          <p className="mt-2 text-[11px] text-slate-500">{friend.email}</p>

          <div className="mt-5 space-y-2">
            <button className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-2.5 text-[12px] text-slate-600">
              <Bell size={14} />
              Snooze 2 Weeks
            </button>

            <button className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-2.5 text-[12px] text-slate-600">
              <Archive size={14} />
              Archive
            </button>

            <button className="flex w-full items-center justify-center gap-2 rounded-md border border-red-200 px-4 py-2.5 text-[12px] text-red-500">
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="card flex h-[94px] flex-col items-center justify-center text-center">
              <div className="text-[24px] font-semibold text-[#1f5a49]">
                {friend.days_since_contact}
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Days Since Contact</p>
            </div>

            <div className="card flex h-[94px] flex-col items-center justify-center text-center">
              <div className="text-[24px] font-semibold text-[#1f5a49]">
                {friend.goal}
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Goal (Days)</p>
            </div>

            <div className="card flex h-[94px] flex-col items-center justify-center text-center">
              <div className="text-[22px] font-semibold text-[#1f5a49]">
                {formatDateLong(friend.next_due_date)}
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Next Due</p>
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[13px] font-semibold">Relationship Goal</h2>
                <p className="mt-2 text-[12px] text-slate-500">
                  Contact every {friend.goal} days
                </p>
              </div>

              <button className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2.5 text-[12px] text-slate-600">
                <Pencil size={13} />
                Edit
              </button>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="mb-4 text-[13px] font-semibold">Quick Check-In</h2>

            <div className="grid gap-4 md:grid-cols-3">
              <button
                onClick={() => handleQuickCheckIn('Call')}
                className="flex h-[80px] flex-col items-center justify-center rounded-md border border-slate-200 px-6 text-[12px] text-slate-700"
              >
                <img
                  src="/assets/call.png"
                  alt="Call"
                  className="h-4 w-4 object-contain"
                />
                <span className="mt-2">Call</span>
              </button>

              <button
                onClick={() => handleQuickCheckIn('Text')}
                className="flex h-[80px] flex-col items-center justify-center rounded-md border border-slate-200 px-6 text-[12px] text-slate-700"
              >
                <img
                  src="/assets/text.png"
                  alt="Text"
                  className="h-4 w-4 object-contain"
                />
                <span className="mt-2">Text</span>
              </button>

              <button
                onClick={() => handleQuickCheckIn('Video')}
                className="flex h-[80px] flex-col items-center justify-center rounded-md border border-slate-200 px-6 text-[12px] text-slate-700"
              >
                <img
                  src="/assets/video.png"
                  alt="Video"
                  className="h-4 w-4 object-contain"
                />
                <span className="mt-2">Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

