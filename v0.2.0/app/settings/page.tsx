'use client';

import { Quicksand } from 'next/font/google';
import { Varela_Round } from "next/font/google";
import {useState, useEffect, useRef, memo} from 'react';
import Switch from "@/app/ui/switch";
import Cookies from "js-cookie";
import ProfileUpload from "@/app/(auth)/register/pfpUpload";
import Modal from '@/app/ui/modal';

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
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

    const addMessage = (type: 'success' | 'error', content: string) => {
        setMessages(prev => [...prev, { type, content }]);
        setTimeout(() => {
            setMessages(prev => prev.slice(1));
        }, 5000);
    };

    const [messages, setMessages] = useState<{
        type: 'success' | 'error',
        content: string
    }[]>([]);

    const [userData, setUserData] = useState<{
        id: string;
        name: string;
        email: string;
        bio: string;
        image: string;
        twoFactorEnabled: boolean;
    } | null>(null);

    const [password, setPassword] = useState({
        current: '',
        new: '',
        confirm: '',
    });

    const calculatePasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const validatePassword = (newPassword: string, confirmPassword: string) => {
        const errors: string[] = [];

        if (newPassword.length < 8) {
            errors.push("Password must be at least 8 characters");
        }
        if (!/[A-Z]/.test(newPassword)) {
            errors.push("Must contain at least one uppercase letter");
        }
        if (!/[0-9]/.test(newPassword)) {
            errors.push("Must contain at least one number");
        }
        if (!/[^A-Za-z0-9]/.test(newPassword)) {
            errors.push("Must contain at least one special character");
        }
        if (newPassword !== confirmPassword) {
            errors.push("Passwords do not match");
        }

        setPasswordErrors(errors);
        return errors.length === 0;
    };

    const [privacySettings, setPrivacySettings] = useState({
        profilePublic: true,
        twoFactorAuth: false,
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await Cookies.get("authToken");
                if (!token) {
                    window.location.href = '/login';
                    return;
                }

                const response = await fetch('/api/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!response.ok) new Error('Failed to fetch user data');

                const data = await response.json();
                setUserData({
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    bio: data.user.bio || '',
                    image: data.user.image || '/default-avatar.jpg',
                    twoFactorEnabled: data.user.two_factor_enabled || false
                });

            } catch (error) {
                console.error('Error fetching user data:', error);
                addMessage('error', 'Failed to load user data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleSaveField = async (field: string, value: string | File) => {
        if (!userData) return;

        try {
            setIsUpdating(true);
            const formData = new FormData();

            if (value instanceof File) {
                formData.append('avatar', value);
            } else {
                formData.append(field, value);
            }

            const response = await fetch('/api/user/update', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                },
                body: formData
            });

            if (!response.ok) { new Error(await response.text());}

            const updatedData = await response.json();
            setUserData(prev => ({
                ...prev!,
                ...updatedData.user
            }));

            addMessage('success', 'Changes saved successfully');
        } catch (error) {
            addMessage('error', error instanceof Error ? error.message : 'Update failed');
        } finally {
            setIsUpdating(false);
        }
    };

    const handlePasswordChange = (field: keyof typeof password, value: string) => {
        setPassword(prev => {
            const newPassword = { ...prev, [field]: value };
            if (field === 'new') {
                setPasswordStrength(calculatePasswordStrength(newPassword.new));
            }
            return newPassword;
        });
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsChangingPassword(true);

        try {
            if (!validatePassword(password.new, password.confirm)) {
                return;
            }

            const response = await fetch('/api/user/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                },
                body: JSON.stringify({
                    currentPassword: password.current,
                    newPassword: password.new
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                new Error(errorData.error || 'Password change failed');
            }

            addMessage('success', 'Password changed successfully');
            setPassword({ current: '', new: '', confirm: '' });
            setPasswordStrength(0);
            setPasswordErrors([]);

        } catch (error) {
            const message = error instanceof Error ? error.message : 'Password change failed';
            addMessage('error', message);
        } finally {
            setIsChangingPassword(false);
        }
    };

    const handleAccountDelete = async () => {
        try {
            const response = await fetch('/api/user/delete', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            });

            if (!response.ok) new Error('Deletion failed');

            Cookies.remove('authToken');
            window.location.href = '/';
        } catch (error) {
            addMessage('error', 'Account deletion failed');
        }
    };

    const SettingsSection = memo(({ title, children }: { title: string; children: React.ReactNode }) => (
        <div className="mb-8">
            <h2 className={`${varela_round.className} text-xl text-gray-100 mb-4`}>{title}</h2>
            <div className="bg-gray-900 rounded-lg p-6 space-y-6">
                {children}
            </div>
        </div>
    ));

    const EditableField = ({ label, value, fieldName, masked } : {
        label: string;
        value: string;
        fieldName: string,
        masked?: boolean }) => {

        const [localValue, setLocalValue] = useState(value);
        const [showValue, setShowValue] = useState(!masked);
        const [isEditing, setIsEditing] = useState(false);
        const inputRef = useRef<HTMLInputElement>(null);

        const handleSave = async () => {
            try {
                await handleSaveField(fieldName, localValue);
                setIsEditing(false);
            } catch (error) {
                setIsEditing(true);
            }
        };

        return (
            <div className="flex items-center justify-between py-3 border-b border-gray-700">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300 mb-1 uppercase
                    tracking-wide">{label}</label>
                    <div className="text-gray-100">
                        {isEditing ? (
                            <input
                                ref={inputRef}
                                type="text"
                                value={localValue}
                                onChange={(e) => setLocalValue(e.target.value)}
                                className={`${quicksand.className} bg-gray-800 text-white px-3 py-2 rounded w-full 
                                focus:outline-none focus:ring-2 focus:ring-[#66B539]`}
                                autoFocus
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSave();
                                    }
                                }}
                            />
                        ) : (
                            <div className="flex items-center">
                                <span className={masked && !showValue ? 'filter blur-sm' : ''}>
                                    {masked && !showValue ? '••••••••••' : value}
                                </span>
                                {masked && (
                                    <button
                                        onClick={() => setShowValue(!showValue)}
                                        className="ml-2 text-discord-blue text-sm hover:underline"
                                    >
                                        {showValue ? 'Hide' : 'Reveal'}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {!masked && (
                    <button
                        onClick={() => {
                            if (!isEditing) {
                                setIsEditing(true);
                                setTimeout(() => inputRef.current?.focus(), 0);
                            } else {
                                handleSave();
                            }
                        }}
                        className={`ml-4 px-3 py-1.5 text-sm ${
                            isEditing ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#66B539] hover:bg-[#6D4C41]'
                        } rounded text-white`}
                    >
                        {isEditing ? 'Save' : 'Edit'}
                    </button>
                )}
            </div>
        );
    };

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
                <div className="fixed top-4 right-4 space-y-2 z-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`p-3 rounded-md text-sm ${
                            msg.type === 'success'
                                ? 'bg-green-600 text-white'
                                : 'bg-red-600 text-white'
                        }`}>
                            {msg.content}
                        </div>
                    ))}
                </div>

                {activeTab === 'profile' && (
                    <>
                        <h1 className={`${varela_round.className} text-2xl font-bold mb-8`}>My Account</h1>

                        <SettingsSection title="Profile">
                            <div className="flex items-center space-x-6 mb-6">
                                <ProfileUpload
                                    currentImage={userData?.image || '/default-avatar.jpg'}
                                    onImageSelect={(file) => handleSaveField('image', file)}
                                    isLoading={isUpdating}
                                />
                            </div>

                            {userData && (
                                <EditableField
                                    label="NAME"
                                    value={userData.name}
                                    fieldName="name"
                                    onSave={(value) => handleSaveField('name', value)}
                                    isLoading={isUpdating}
                                />
                            )}
                            {userData && (
                                <EditableField
                                    label="EMAIL"
                                    value={userData.email}
                                    fieldName="email"
                                    onSave={(value) => handleSaveField('email', value)}
                                    isLoading={isUpdating}
                                />
                            )}
                        </SettingsSection>

                        <SettingsSection title="About Me">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">BIO</label>
                                <textarea
                                    value={userData?.bio}
                                    onChange={(e) => setUserData({...userData, bio: e.target.value})}
                                    className="w-full bg-gray-800 rounded p-3 text-gray-100
                                    focus:outline-none focus:ring-2 focus:ring-[#66B539]"
                                    rows={3}
                                    placeholder="Tell us about yourself..."
                                />
                            </div>
                        </SettingsSection>

                        <div className="mt-8 border-t border-red-500/20 pt-6">
                            <h2 className={`${varela_round.className} text-xl text-red-400 mb-4`}>Danger Zone</h2>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white transition-colors"
                            >
                                Delete Account
                            </button>
                        </div>
                    </>
                )}

                {activeTab === 'privacy' && (
                    <SettingsSection title="Privacy">
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
                    <>
                        <SettingsSection title="Change Password">
                            <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-sm text-gray-100">Current Password</label>
                                    <input
                                        type="password"
                                        value={password.current}
                                        onChange={(e) => handlePasswordChange('current', e.target.value)}
                                        className="w-full bg-gray-600 rounded px-3 py-2 text-gray-100
                                        focus:outline-none focus:ring-2 focus:ring-[#66B539]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm text-gray-100">New Password</label>
                                    <input
                                        type="password"
                                        value={password.new}
                                        onChange={(e) => handlePasswordChange('new', e.target.value)}
                                        className="w-full bg-gray-600 rounded px-3 py-2 text-gray-100
                                        focus:outline-none focus:ring-2 focus:ring-[#66B539]"
                                    />
                                    <div className="flex gap-1 h-2">
                                        {[...Array(4)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`flex-1 rounded-sm ${
                                                    passwordStrength > i ? 'bg-green-500' : 'bg-gray-600'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm text-gray-100">Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={password.confirm}
                                        onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                                        className="w-full bg-gray-600 rounded px-3 py-2 text-gray-100
                                        focus:outline-none focus:ring-2 focus:ring-[#66B539]"
                                    />
                                </div>

                                {passwordErrors.length > 0 && (
                                    <div className="text-red-400 text-sm space-y-1">
                                        {passwordErrors.map((error, index) => (
                                            <p key={index}>• {error}</p>
                                        ))}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className={`ml-4 px-3 py-1.5 text-sm ${
                                        isChangingPassword ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#66B539] hover:bg-[#6D4C41]'
                                    } rounded text-white`}
                                    disabled={isChangingPassword}
                                >
                                    {isChangingPassword ? (
                                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : 'Change Password'}
                                </button>
                            </form>
                        </SettingsSection>

                        <SettingsSection title="Two-Factor Authentication">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-gray-100">2FA Status</h3>
                                    <p className="text-gray-300 text-sm">
                                        {privacySettings.twoFactorAuth
                                            ? 'Enabled'
                                            : 'Add an extra layer of security to your account'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {privacySettings.twoFactorAuth ? (
                                        <button
                                            onClick={() => setShow2FAModal(true)}
                                            className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 rounded text-white"
                                        >
                                            Disable
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setShow2FAModal(true)}
                                            className="px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 rounded text-white"
                                        >
                                            Enable
                                        </button>
                                    )}
                                </div>
                            </div>
                        </SettingsSection>
                    </>
                )}

                <Modal isOpen={show2FAModal} onClose={() => setShow2FAModal(false)}>
                    <h3 className={`${varela_round.className} text-xl mb-4`}>Two-Factor Authentication</h3>
                    <p>TODO: Add 2FA setup </p>
                </Modal>

                <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                    <div className="text-center">
                        <h3 className={`${varela_round.className} text-xl mb-4`}>Delete Account</h3>
                        <p className="text-gray-300 mb-6">
                            Are you sure you want to delete your account? This action is irreversible!
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAccountDelete}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </Modal>
            </main>
        </div>
    )
}