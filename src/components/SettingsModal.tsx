import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Music,
  Vibrate,
  Type,
  Sun,
  Moon,
  Globe,
  RotateCcw,
  Download,
  Upload,
  AlertTriangle,
} from 'lucide-react';
import { PlayerProfile } from '../types/game';
import { exportSaveData, importSaveData } from '../services/storage';
import { sound } from '../services/sound';

interface SettingsModalProps {
  profile: PlayerProfile;
  onUpdateSettings: (newSettings: PlayerProfile['settings']) => void;
  onResetGame: () => void;
  onImportSuccess: (imported: PlayerProfile) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  profile,
  onUpdateSettings,
  onResetGame,
  onImportSuccess,
  onClose,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [importText, setImportText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const settings = profile.settings;

  const toggleSound = () => {
    const updated = !settings.soundEffects;
    sound.setMuted(!updated);
    onUpdateSettings({ ...settings, soundEffects: updated });
  };

  const toggleMusic = () => {
    onUpdateSettings({ ...settings, music: !settings.music });
  };

  const toggleVibration = () => {
    onUpdateSettings({ ...settings, vibration: !settings.vibration });
  };

  const setTextSize = (size: 'small' | 'medium' | 'large') => {
    onUpdateSettings({ ...settings, textSize: size });
  };

  const toggleTheme = () => {
    const nextTheme = settings.theme === 'dark' ? 'light' : 'dark';
    onUpdateSettings({ ...settings, theme: nextTheme });
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const setLanguage = (lang: 'en' | 'hi') => {
    onUpdateSettings({ ...settings, language: lang });
  };

  const handleExport = () => {
    const json = exportSaveData(profile);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yes_no_mystery_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    const imported = importSaveData(importText);
    if (imported) {
      onImportSuccess(imported);
      setImportStatus('Progress imported successfully!');
      setTimeout(() => setShowImportBox(false), 1200);
    } else {
      setImportStatus('Invalid save file format.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm max-h-[90vh] rounded-3xl bg-[#1A2140] border border-white/10 p-5 shadow-2xl flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <h2 className="text-lg font-bold font-display text-white">Settings & Audio</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Audio & Haptics Section */}
        <div className="flex flex-col gap-3 mb-5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
            Audio & Feedback
          </span>

          {/* Sound FX */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#101426]/70 border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300">
                {settings.soundEffects ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </div>
              <div className="text-left">
                <span className="text-xs font-semibold text-white block">Sound Effects</span>
                <span className="text-[10px] text-slate-400">Tactile question & solve sounds</span>
              </div>
            </div>
            <button
              onClick={toggleSound}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                settings.soundEffects ? 'bg-[#8257FF]' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.soundEffects ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Background Ambient */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#101426]/70 border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-300">
                <Music className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs font-semibold text-white block">Mystery Music</span>
                <span className="text-[10px] text-slate-400">Background atmosphere</span>
              </div>
            </div>
            <button
              onClick={toggleMusic}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                settings.music ? 'bg-[#8257FF]' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.music ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Vibration */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#101426]/70 border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300">
                <Vibrate className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs font-semibold text-white block">Haptic Vibration</span>
                <span className="text-[10px] text-slate-400">Android touch feedback</span>
              </div>
            </div>
            <button
              onClick={toggleVibration}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                settings.vibration ? 'bg-[#8257FF]' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.vibration ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Display & Text Size Section */}
        <div className="flex flex-col gap-3 mb-5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
            Appearance & Text Size
          </span>

          {/* Text Size Selector */}
          <div className="p-3 rounded-2xl bg-[#101426]/70 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-purple-300" />
              <span className="text-xs font-semibold text-white">Case Reading Size</span>
            </div>
            <div className="flex items-center gap-1 bg-[#1A2140] p-1 rounded-xl">
              {(['small', 'medium', 'large'] as const).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setTextSize(sz)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                    settings.textSize === sz
                      ? 'bg-[#8257FF] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Switcher */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#101426]/70 border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-300">
                {settings.theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </div>
              <div className="text-left">
                <span className="text-xs font-semibold text-white block">Theme</span>
                <span className="text-[10px] text-slate-400">
                  {settings.theme === 'dark' ? 'Night Detective Mode' : 'Light Office Mode'}
                </span>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded-xl bg-[#1A2140] hover:bg-[#252E58] text-xs font-bold text-slate-200 border border-white/10"
            >
              {settings.theme === 'dark' ? 'Dark' : 'Light'}
            </button>
          </div>

          {/* Language Selection */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#101426]/70 border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                <Globe className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs font-semibold text-white block">Game Language</span>
                <span className="text-[10px] text-slate-400">Default: English (Hindi ready)</span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-[#1A2140] p-1 rounded-xl">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  settings.language === 'en'
                    ? 'bg-[#8257FF] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  settings.language === 'hi'
                    ? 'bg-[#8257FF] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                HI
              </button>
            </div>
          </div>

          {/* Android App Installation Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/50 to-indigo-950/50 border border-purple-500/30 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-base">📱</span>
              <span className="text-xs font-bold text-white">Install on Android</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              To install directly as an Android app on your phone: tap your browser menu (<strong>⋮</strong>) and select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
            </p>
          </div>
        </div>

        {/* Data Management Section */}
        <div className="flex flex-col gap-2 pt-2 border-t border-white/10 mt-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
            Save Data & Backup
          </span>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleExport}
              className="py-2.5 px-3 rounded-xl bg-[#101426] hover:bg-[#161B33] border border-white/10 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Export Save</span>
            </button>

            <button
              onClick={() => setShowImportBox(!showImportBox)}
              className="py-2.5 px-3 rounded-xl bg-[#101426] hover:bg-[#161B33] border border-white/10 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5 text-amber-400" />
              <span>Import Save</span>
            </button>
          </div>

          {showImportBox && (
            <div className="mt-2 p-3 rounded-xl bg-[#101426] border border-white/10 flex flex-col gap-2">
              <textarea
                rows={3}
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Paste backup JSON data here..."
                className="w-full bg-[#1A2140] border border-slate-700 rounded-lg p-2 text-[11px] text-white focus:outline-none"
              />
              {importStatus && (
                <span className="text-[10px] text-amber-400">{importStatus}</span>
              )}
              <button
                onClick={handleImport}
                className="py-1.5 bg-blue-600 rounded-lg text-xs font-bold text-white hover:bg-blue-500"
              >
                Load Progress
              </button>
            </div>
          )}

          {/* Reset Confirmation Dialogue */}
          {showResetConfirm ? (
            <div className="mt-2 p-3 rounded-xl bg-rose-950/70 border border-rose-500/40 text-xs flex flex-col gap-2">
              <div className="flex items-center gap-2 text-rose-300 font-bold">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Reset all 200 cases and coins?</span>
              </div>
              <p className="text-[11px] text-rose-200/90">
                This action is irreversible and restores starting state (100 coins, Level 1).
              </p>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="py-1.5 rounded-lg bg-slate-800 text-slate-300 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onResetGame();
                    setShowResetConfirm(false);
                    onClose();
                  }}
                  className="py-1.5 rounded-lg bg-rose-600 text-white font-bold text-xs hover:bg-rose-500"
                >
                  Yes, Reset
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="mt-2 py-2 rounded-xl bg-rose-950/30 hover:bg-rose-900/40 border border-rose-500/20 text-rose-300 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
              <span>Reset Game Progress</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
