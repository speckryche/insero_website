'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, WifiHigh, Monitor, Cloud, VideoCamera, Headset, FilmStrip, HardDrives, Users } from '@phosphor-icons/react';

const ACTIVITIES = [
  { id: 'baseline' as const, label: 'Email, browsing, basic office work', icon: Monitor, always: true },
  { id: 'video' as const, label: 'Video calls (Zoom, Teams, Meet)', icon: VideoCamera, always: false },
  { id: 'cloud' as const, label: 'Cloud-hosted apps (Salesforce, Google Workspace, M365)', icon: Cloud, always: false },
  { id: 'largeFiles' as const, label: 'Large file uploads/downloads (CAD, video, design, dev)', icon: FilmStrip, always: false },
  { id: 'voip' as const, label: 'VoIP business phone system', icon: Headset, always: false },
  { id: 'streaming' as const, label: 'Streaming for break rooms or lobbies', icon: FilmStrip, always: false },
  { id: 'hosted' as const, label: 'Hosted services (servers, cameras, VPN, remote desktop)', icon: HardDrives, always: false },
];

type ActivityId = typeof ACTIVITIES[number]['id'];

const TOLERANCE_OPTIONS = [
  { id: 'relaxed', label: "It can slow down occasionally — we're not picky", factor: 1.0 },
  { id: 'normal', label: 'It should stay snappy most of the time', factor: 1.5 },
  { id: 'critical', label: 'It absolutely cannot slow down — every minute matters', factor: 2.0 },
] as const;

const DOWN_TIERS = [100, 250, 500, 1000, 2000, 5000, 10000];
const UP_TIERS = [50, 100, 250, 500, 1000, 2000, 5000];

function roundToTier(value: number, tiers: number[]): number {
  for (const tier of tiers) {
    if (value <= tier) return tier;
  }
  return tiers[tiers.length - 1];
}

function formatSpeed(mbps: number): string {
  if (mbps >= 1000) return `${mbps / 1000} Gbps`;
  return `${mbps} Mbps`;
}

export function BandwidthCalculator() {
  const [users, setUsers] = useState(10);
  const [activities, setActivities] = useState<Set<ActivityId>>(new Set(['baseline']));
  const [guestUsers, setGuestUsers] = useState(0);
  const [videoCalls, setVideoCalls] = useState(0);
  const [tolerance, setTolerance] = useState<'relaxed' | 'normal' | 'critical'>('normal');

  const toggleActivity = (id: ActivityId) => {
    if (id === 'baseline') return;
    const next = new Set(activities);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setActivities(next);
  };

  const result = useMemo(() => {
    let downRaw = users * 2;
    let upRaw = users * 1;
    const contributors: string[] = [];

    if (activities.has('video') && videoCalls > 0) {
      downRaw += videoCalls * 3;
      upRaw += videoCalls * 3;
      contributors.push(`${videoCalls} concurrent video calls driving upload need`);
    }

    if (activities.has('cloud')) {
      downRaw += users * 1;
      upRaw += users * 0.5;
      contributors.push('cloud app usage across all users');
    }

    if (activities.has('largeFiles')) {
      downRaw += users * 5;
      upRaw += users * 5;
      contributors.push('large file transfers pushing both download and upload');
    }

    if (activities.has('voip')) {
      const concurrentCalls = Math.ceil(users * 0.25);
      downRaw += concurrentCalls * 0.1;
      upRaw += concurrentCalls * 0.1;
      contributors.push('VoIP phone system');
    }

    if (activities.has('streaming')) {
      const streams = Math.max(1, Math.ceil(users / 25));
      downRaw += streams * 5;
      contributors.push(`${streams} streaming source${streams > 1 ? 's' : ''}`);
    }

    if (activities.has('hosted')) {
      downRaw += 10;
      upRaw += 10;
      contributors.push('hosted services requiring dedicated upstream');
    }

    // Guest Wi-Fi
    const concurrentGuests = Math.ceil(guestUsers * 0.3);
    if (concurrentGuests > 0) {
      downRaw += concurrentGuests * 3;
      upRaw += concurrentGuests * 1;
      contributors.push(`~${concurrentGuests} concurrent guest Wi-Fi users`);
    }

    // Quality factor
    const factor = TOLERANCE_OPTIONS.find(t => t.id === tolerance)?.factor || 1.5;
    downRaw *= factor;
    upRaw *= factor;

    const downTier = roundToTier(Math.ceil(downRaw), DOWN_TIERS);
    const upTier = roundToTier(Math.ceil(upRaw), UP_TIERS);

    let connectionType: string;
    let connectionDetail: string;
    if (upTier <= 50) {
      connectionType = 'Cable internet is likely sufficient';
      connectionDetail = 'Your upload needs are modest enough that cable\'s asymmetric speeds work fine at this scale.';
    } else if (upTier <= 250) {
      connectionType = 'Fiber recommended';
      connectionDetail = 'Your upload demands exceed what cable can reliably deliver. Fiber\'s symmetric speeds will prevent upstream bottlenecks.';
    } else {
      connectionType = 'Dedicated fiber required';
      connectionDetail = 'Cable cannot deliver this level of upstream bandwidth. You need dedicated fiber with symmetric speeds and an SLA.';
    }

    // Build commentary from top contributors
    let commentary = '';
    if (contributors.length > 0) {
      const top = contributors.slice(0, 2).join(' and ');
      commentary = `The biggest factors in your estimate: ${top}. `;
    }
    if (factor > 1) {
      commentary += factor === 2.0
        ? 'Your zero-tolerance requirement doubles the headroom — worth it when downtime costs real money.'
        : 'We\'ve added 50% headroom for consistent performance during peak hours.';
    }

    return { downTier, upTier, connectionType, connectionDetail, commentary, downRaw: Math.ceil(downRaw / factor), upRaw: Math.ceil(upRaw / factor) };
  }, [users, activities, guestUsers, videoCalls, tolerance]);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Inputs */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8 space-y-8">

        {/* Users */}
        <div>
          <label className="block font-display font-bold text-[#1e293b] mb-2 text-lg">
            How many people in your office?
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={1} max={500} value={users}
              onChange={e => setUsers(Number(e.target.value))}
              className="flex-grow accent-[#008838] h-2"
            />
            <input
              type="number" inputMode="numeric"
              min={1} max={500} value={users}
              onChange={e => setUsers(Math.min(500, Math.max(1, Number(e.target.value) || 1)))}
              className="w-20 px-3 py-2 border-2 border-gray-200 rounded-xl text-center font-semibold focus:border-[#008838] focus:outline-none"
            />
          </div>
        </div>

        {/* Activities */}
        <div>
          <label className="block font-display font-bold text-[#1e293b] mb-3 text-lg">
            What does your team do online?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ACTIVITIES.map(act => {
              const Icon = act.icon;
              const checked = act.always || activities.has(act.id);
              return (
                <label
                  key={act.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                    checked
                      ? 'border-[#008838] bg-[#E6F5EC]'
                      : 'border-gray-200 hover:border-[#008838]/50'
                  } ${act.always ? 'opacity-70 cursor-default' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={act.always}
                    onChange={() => toggleActivity(act.id)}
                    className="w-5 h-5 shrink-0 rounded border-gray-300 text-[#008838] focus:ring-[#008838] cursor-pointer"
                  />
                  <Icon weight="fill" className={`w-5 h-5 flex-shrink-0 ${checked ? 'text-[#008838]' : 'text-[var(--color-gray-500)]'}`} />
                  <span className="text-sm text-[#1e293b]">{act.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Video calls conditional */}
        {activities.has('video') && (
          <div>
            <label className="block font-display font-bold text-[#1e293b] mb-2">
              How many simultaneous video calls during peak times?
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={0} max={50} value={videoCalls}
                onChange={e => setVideoCalls(Number(e.target.value))}
                className="flex-grow accent-[#008838] h-2"
              />
              <input
                type="number" inputMode="numeric"
                min={0} max={50} value={videoCalls}
                onChange={e => setVideoCalls(Math.min(50, Math.max(0, Number(e.target.value) || 0)))}
                className="w-20 px-3 py-2 border-2 border-gray-200 rounded-xl text-center font-semibold focus:border-[#008838] focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Guest Wi-Fi */}
        <div>
          <label className="block font-display font-bold text-[#1e293b] mb-2">
            Guest Wi-Fi users typically connected
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={0} max={200} value={guestUsers}
              onChange={e => setGuestUsers(Number(e.target.value))}
              className="flex-grow accent-[#008838] h-2"
            />
            <input
              type="number" inputMode="numeric"
              min={0} max={200} value={guestUsers}
              onChange={e => setGuestUsers(Math.min(200, Math.max(0, Number(e.target.value) || 0)))}
              className="w-20 px-3 py-2 border-2 border-gray-200 rounded-xl text-center font-semibold focus:border-[#008838] focus:outline-none"
            />
          </div>
        </div>

        {/* Tolerance */}
        <div>
          <label className="block font-display font-bold text-[#1e293b] mb-3 text-lg">
            Tolerance for slowness during peak times
          </label>
          <div className="space-y-2">
            {TOLERANCE_OPTIONS.map(opt => (
              <label
                key={opt.id}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                  tolerance === opt.id
                    ? 'border-[#008838] bg-[#E6F5EC]'
                    : 'border-gray-200 hover:border-[#008838]/50'
                }`}
              >
                <input
                  type="radio"
                  name="tolerance"
                  checked={tolerance === opt.id}
                  onChange={() => setTolerance(opt.id)}
                  className="w-5 h-5 shrink-0 text-[#008838] focus:ring-[#008838] cursor-pointer"
                />
                <span className="text-sm text-[#1e293b]">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-8 rounded-2xl overflow-hidden border border-[#008838]/20 shadow-md">
        {/* Header */}
        <div className="bg-[#008838] px-6 lg:px-8 py-5">
          <div className="flex items-center gap-3">
            <WifiHigh weight="fill" className="w-6 h-6 text-white" />
            <h3 className="font-display font-bold text-white text-xl">Your Recommendation</h3>
          </div>
        </div>

        <div className="bg-white px-6 lg:px-8 py-6 space-y-6">
          {/* Speed numbers */}
          {/* Stacked below sm rather than shrunk. At 360 the two-up cell is
              114px and "100 Mbps" needs ~132px at this size, so side-by-side
              wrapped the download figure to two lines while upload stayed on
              one and the pair sat at different heights. Dropping the figure a
              size fixed 390 but still wrapped at 360, and would break again on
              a wider tier -- "250 Mbps" is the same width and 10 Gbps exists.
              Full width holds for every tier at every phone width, and keeps
              the number at the size the payoff deserves. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-[#64748b] mb-1">Recommended Download</div>
              <div className="text-3xl lg:text-4xl font-display font-extrabold text-[#1e293b]">
                {formatSpeed(result.downTier)}
              </div>
            </div>
            <div>
              <div className="text-sm text-[#64748b] mb-1">Recommended Upload</div>
              <div className="text-3xl lg:text-4xl font-display font-extrabold text-[#008838]">
                {formatSpeed(result.upTier)}
              </div>
            </div>
          </div>

          {/* Connection type */}
          <div className="bg-[#f8fafb] rounded-xl p-4 border border-gray-100">
            <div className="font-display font-bold text-[#1e293b] mb-1">{result.connectionType}</div>
            <p className="text-sm text-[#475569]">{result.connectionDetail}</p>
          </div>

          {/* Commentary */}
          {result.commentary && (
            <p className="text-sm text-[#64748b] leading-relaxed">{result.commentary}</p>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 bg-[#E6F5EC] rounded-2xl p-6 lg:p-8 text-center">
        <h3 className="font-display font-bold text-xl text-[#1e293b] mb-2">
          Want to know what&apos;s actually available at your address — and what it costs?
        </h3>
        <p className="text-[#475569] mb-6 text-sm max-w-xl mx-auto">
          We&apos;ll pull real serviceability and quotes from every carrier in your area. Same pricing as going direct.
        </p>
        <Link href="/contact">
          <button className="group inline-flex items-center gap-3 px-8 py-4 bg-[#008838] text-white font-semibold text-lg rounded-xl hover:bg-[#005C28] transition-colors shadow-lg shadow-[#008838]/20">
            <span>Get Started</span>
            <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>

      {/* Disclaimer */}
      <p className="mt-6 text-xs text-[var(--color-gray-500)] text-center max-w-xl mx-auto">
        This is a starting estimate. Actual needs vary based on real-world usage patterns. We can refine this with a quick conversation about your business.
      </p>
    </div>
  );
}
