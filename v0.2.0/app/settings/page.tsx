'use client';

import { Quicksand } from 'next/font/google';
import { Varela_Round } from "next/font/google";
import { useState, useEffect } from 'react';
import Switch from "@/app/ui/switch";
import Cookies from "js-cookie";
import ProfileUpload from "@/app/(auth)/register/pfpUpload";

const quicksand = Quicksand({
    weight: ['400'],
    subsets: ['latin']
})

const varela_round = Varela_Round({
    weight: ['400'],
    subsets: ['latin']
})

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [editingField, setEditingField] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const [userData, setUserData] = useState({
        name: 'Appleminer',
        username: 'appleminer',
        email: '**********@gmail.com',
        phone: '*********2428',
        bio: 'Cycling enthusiast',
    });

    const [password, setPassword] = useState({
        current: '',
        new: '',
        confirm: '',
    });
    const [privacySettings, setPrivacySettings] = useState({
        profilePublic: true,
        activityVisible: true,
        twoFactorAuth: false,
    });

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedDarkMode);
        document.documentElement.classList.toggle('dark', savedDarkMode);
    }, []);

    const handleUserUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add profile update logic
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add password change logic
        setMessage('Password changed successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    const SettingsSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <div className="mb-8">
            <h2 className={`${varela_round.className} text-xl text-gray-100 mb-4`}>{title}</h2>
            <div className="bg-gray-900 rounded-lg p-6 space-y-6">
                {children}
            </div>
        </div>
    );

    const EditableField = ({ label, value, fieldName }: { label: string; value: string; fieldName: string }) => (
        <div className="flex items-center justify-between py-3 border-b border-gray-700">
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
                <div className="text-gray-100">
                    {editingField === fieldName ? (
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => setUserData({...userData, [fieldName]: e.target.value})}
                            className={`${quicksand.className} bg-gray-800 text-white px-3 py-2 rounded w-full 
                            focus:outline-none focus:ring-2 focus:ring-[#66B539]`}
                            autoFocus
                        />
                    ) : (
                        <span>{value}</span>
                    )}
                </div>
            </div>
            <button
                onClick={() => setEditingField(editingField === fieldName ? null : fieldName)}
                className="ml-4 px-3 py-1.5 text-sm bg-[#66B539] hover:bg-[#6D4C41] rounded text-white"
            >
                {editingField === fieldName ? 'Save' : 'Edit'}
            </button>
        </div>
    );

    return (
        <div className={`${quicksand.className} min-h-screen flex bg-gray-900 text-white`}>

            <div className="w-64 bg-gray-900 border-r border-gray-700 p-6 mt-[5.5%]">
                <h1 className={`${varela_round.className} text-xl font-bold mb-6`}>User Settings</h1>
                <nav className="space-y-2">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full text-left px-3 py-2 rounded ${activeTab === 'profile' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                    >
                        My Account
                    </button>
                    <button
                        onClick={() => setActiveTab('privacy')}
                        className={`w-full text-left px-3 py-2 rounded ${activeTab === 'privacy' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                    >
                        Privacy & Safety
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        className={`w-full text-left px-3 py-2 rounded ${activeTab === 'security' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                    >
                        Security
                    </button>
                </nav>
            </div>

            <main className="flex-1 p-8 max-w-3xl mt-[5%] mb-[3%]">
                {activeTab === 'profile' && (
                    <>
                        <h1 className={`${varela_round.className} text-2xl font-bold mb-8`}>My Account</h1>
                        <SettingsSection title="Profile">
                            <div className="flex items-center space-x-6 mb-6">
                                <ProfileUpload onImageSelect={(file) => setImageFile(file)} />
                            </div>

                            <EditableField
                                label="NAME"
                                value={userData.name}
                                fieldName="Name"
                            />
                            <EditableField
                                label="EMAIL"
                                value={userData.email}
                                fieldName="email"
                            />
                        </SettingsSection>

                        <SettingsSection title="About Me">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">BIO</label>
                                <textarea
                                    value={userData.bio}
                                    onChange={(e) => setUserData({...userData, bio: e.target.value})}
                                    className="w-full bg-gray-800 rounded p-3 text-gray-100
                                    focus:outline-none focus:ring-2 focus:ring-[#66B539]"
                                    rows={3}
                                />
                            </div>
                        </SettingsSection>

                        <div className="mt-8 border-t border-red-500/20 pt-6">
                            <h2 className={`${varela_round.className} text-xl text-red-400 mb-4`}>Danger Zone</h2>
                            <button
                                onClick={() => confirm('Are you sure? This cannot be undone!') && handleAccountDelete()}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white transition-colors"
                            >
                                Delete Account
                            </button>
                        </div>
                    </>
                )}

                {activeTab === 'privacy' && (
                    <SettingsSection title="Privacy & Safety">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-gray-100">Public Profile</h3>
                                    <p className="text-gray-400 text-sm">Allow others to see your profile</p>
                                </div>
                                <Switch
                                    checked={privacySettings.profilePublic}
                                    onCheckedChange={(checked) => setPrivacySettings({...privacySettings, profilePublic: checked})}
                                />
                            </div>
                        </div>
                    </SettingsSection>
                )}

                {activeTab === 'security' && (
                    <SettingsSection title="Security">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-gray-100">Two-Factor Authentication</h3>
                                    <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                                </div>
                                <Switch
                                    checked={privacySettings.twoFactorAuth}
                                    onCheckedChange={(checked) => setPrivacySettings({...privacySettings, twoFactorAuth: checked})}
                                />
                            </div>
                        </div>
                    </SettingsSection>
                )}
            </main>
        </div>
    )
}