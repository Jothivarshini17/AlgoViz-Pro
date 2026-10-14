export default function SettingsPage() {
  return (
    <div className="space-y-6 pb-10">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Settings</p>
        <h1 className="text-3xl font-bold text-white">Account preferences</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Appearance</h2>
          <div className="mt-4 space-y-3 text-sm text-gray-300">
            <div className="flex items-center justify-between"><span>Theme</span><span className="text-white">Dark</span></div>
            <div className="flex items-center justify-between"><span>Reduced motion</span><span className="text-white">Off</span></div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Learning</h2>
          <div className="mt-4 space-y-3 text-sm text-gray-300">
            <div className="flex items-center justify-between"><span>Difficulty</span><span className="text-white">Intermediate</span></div>
            <div className="flex items-center justify-between"><span>Daily goal</span><span className="text-white">2 sessions</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
