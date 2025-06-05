
import React, { useState, useEffect, useRef } from 'react';
import { User, Monitor, Smartphone, Globe, Cpu } from 'lucide-react';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState({
    screenResolution: '',
    platform: '',
    browser: '',
    userAgent: '',
    language: '',
    cookieEnabled: false,
    onlineStatus: true
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get device/hardware information
    const getDeviceInfo = () => {
      setDeviceInfo({
        screenResolution: `${screen.width} x ${screen.height}`,
        platform: navigator.platform || 'Unknown',
        browser: navigator.userAgent.split(' ').pop() || 'Unknown',
        userAgent: navigator.userAgent,
        language: navigator.language || 'en-US',
        cookieEnabled: navigator.cookieEnabled,
        onlineStatus: navigator.onLine
      });
    };

    getDeviceInfo();

    // Handle clicks outside dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center font-semibold text-sm hover:bg-red-700 transition-colors"
      >
        U
      </button>

      {isOpen && (
        <div className="absolute right-0 top-10 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
          {/* User Section */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-sm flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">User Profile</h3>
                <p className="text-gray-400 text-sm">Premium Member</p>
              </div>
            </div>
          </div>

          {/* Device Info Section */}
          <div className="p-4 space-y-3">
            <h4 className="text-white font-medium flex items-center space-x-2">
              <Monitor className="w-4 h-4" />
              <span>Device Information</span>
            </h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Screen:</span>
                <span className="text-white">{deviceInfo.screenResolution}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Platform:</span>
                <span className="text-white">{deviceInfo.platform}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Language:</span>
                <span className="text-white">{deviceInfo.language}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Online:</span>
                <span className={`${deviceInfo.onlineStatus ? 'text-green-400' : 'text-red-400'}`}>
                  {deviceInfo.onlineStatus ? 'Connected' : 'Offline'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Cookies:</span>
                <span className={`${deviceInfo.cookieEnabled ? 'text-green-400' : 'text-red-400'}`}>
                  {deviceInfo.cookieEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

            {/* Browser Info */}
            <div className="pt-2 border-t border-gray-700">
              <h5 className="text-white font-medium flex items-center space-x-2 mb-2">
                <Globe className="w-4 h-4" />
                <span>Browser</span>
              </h5>
              <p className="text-gray-400 text-xs break-all">
                {deviceInfo.userAgent}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 border-t border-gray-700 space-y-2">
            <button className="w-full text-left text-gray-300 hover:text-white py-2 px-2 rounded hover:bg-gray-800 transition-colors text-sm">
              Account Settings
            </button>
            <button className="w-full text-left text-gray-300 hover:text-white py-2 px-2 rounded hover:bg-gray-800 transition-colors text-sm">
              Help Center
            </button>
            <button className="w-full text-left text-gray-300 hover:text-white py-2 px-2 rounded hover:bg-gray-800 transition-colors text-sm">
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
