"use client";

import { Camera, Check, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Beautiful custom multi-color SVGs for exact brand fidelity matching the figma mockup
const GmailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 193"
    width="20"
    height="20"
    className="opacity:1;"
  >
    <path
      fill="#4285F4"
      d="M58.182 192.05V93.14L27.507 65.077L0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455z"
    />
    <path
      fill="#34A853"
      d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837l-27.026 25.798z"
    />
    <path
      fill="#EA4335"
      d="m58.182 93.14l-4.174-38.647l4.174-36.989L128 69.868l69.818-52.364l4.669 34.992l-4.669 40.644L128 145.504z"
    />
    <path
      fill="#FBBC04"
      d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945z"
    />
    <path
      fill="#C5221F"
      d="m0 49.504l26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23z"
    />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="20"
    height="20"
    className="shrink-0"
    {...props}
  >
    <title>Instagram</title>
    <defs>
      <radialGradient id="ig-grad" cx="15%" cy="95%" r="135%">
        <stop offset="0%" stopColor="#FED576" />
        <stop offset="25%" stopColor="#F47F35" />
        <stop offset="50%" stopColor="#E1306C" />
        <stop offset="75%" stopColor="#C13584" />
        <stop offset="100%" stopColor="#405DE6" />
      </radialGradient>
    </defs>
    <rect width="42" height="42" x="3" y="3" rx="10" fill="url(#ig-grad)" />
    <rect
      width="26"
      height="26"
      x="11"
      y="11"
      rx="7"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="3"
    />
    <circle
      cx="24"
      cy="24"
      r="6"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="3"
    />
    <circle cx="34" cy="14" r="1.8" fill="#FFFFFF" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="20"
    height="20"
    className="shrink-0"
    {...props}
  >
    <title>LinkedIn</title>
    <rect width="42" height="42" x="3" y="3" rx="6" fill="#0077B5" />
    <path
      d="M12.5 37V18h6v19h-6zM15.5 15.6c-2 0-3.5-1.5-3.5-3.5s1.5-3.5 3.5-3.5 3.5 1.5 3.5 3.5-1.5 3.5-3.5 3.5zM22.5 37V18h6v2.6c0.8-1.3 2.5-2.9 5.4-2.9 5.8 0 6.6 3.8 6.6 8.7V37h-6v-9.5c0-2.3-0.1-5.2-3.2-5.2-3.2 0-3.7 2.5-3.7 5V37h-5.1z"
      fill="#FFFFFF"
    />
  </svg>
);

interface Achievement {
  id: string;
  image: string;
  name: string;
  description: string;
}

interface ProfileData {
  name: string;
  username: string;
  pronouns: string;
  bio: string;
  email: string;
  instagram: string;
  linkedin: string;
  avatar: string;
}

interface SideProfileProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const DEFAULT_PROFILE: ProfileData = {
  name: "Aemeath",
  username: "FleetSnowfluff",
  pronouns: "she/her",
  bio: "Right now I'm studying in University of Brawijaya in Indonesia majoring in Faculty of Computer Science - Information Technology.",
  email: "fleetsnowfluff@gmail.com",
  instagram: "@fltsnowflf",
  linkedin: "in/fleetsnowfluff",
  avatar: "/aemeath_avatar.png",
};

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: "1",
    image: "/yuji.webp",
    name: "Jujutsu Novice",
    description: "Taking the first steps into the jujutsu world.",
  },
  {
    id: "2",
    image: "/gojo.webp",
    name: "Limitless Potential",
    description: "Unlocking the absolute power within.",
  },
  {
    id: "3",
    image: "/sukuna.webp",
    name: "Spiritual Spark",
    description: "Igniting a fiery passion for technology.",
  },
];

export default function SideProfile({ isOpen, onClose }: SideProfileProps) {
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [editProfile, setEditProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("geulist_profile");
    if (stored) {
      try {
        setProfile(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse profile data from localStorage", e);
      }
    }
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleEditClick = () => {
    setEditProfile({ ...profile });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfile(editProfile);
    localStorage.setItem("geulist_profile", JSON.stringify(editProfile));

    window.dispatchEvent(new Event("geulist_profile_updated"));
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEditProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditProfile((prev) => ({
          ...prev,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // The inner content of the profile, shared between desktop sidebar and mobile drawer
  const profileContent = (
    <>
      <div className="flex flex-col items-start text-left w-full">
        <div className="relative group self-start">
          <div className="w-32 h-32 md:w-70 md:h-70 rounded-full overflow-hidden border border-black relative transition-transform duration-200">
            <Image
              src={isEditing ? editProfile.avatar : profile.avatar}
              alt={profile.name}
              width={176}
              height={176}
              className="w-full h-full object-cover"
              unoptimized
            />

            {isEditing && (
              <button
                type="button"
                onClick={triggerFileInput}
                className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-background-cream transition-opacity duration-200 cursor-pointer opacity-100"
              >
                <Camera className="w-6 h-6 mb-1" />
                <span className="text-xs font-semibold">Change Photo</span>
              </button>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        {isEditing && (
          <div className="mt-3 w-full">
            <label
              htmlFor="avatar-url-input"
              className="text-[10px] uppercase font-bold text-[#4A3728] block mb-1"
            >
              Or Paste Avatar URL
            </label>
            <input
              id="avatar-url-input"
              type="text"
              name="avatar"
              value={editProfile.avatar}
              onChange={handleChange}
              placeholder="https://example.com/avatar.jpg"
              className="w-full text-xs px-2 py-1 bg-[#F5F2EB] border border-black rounded focus:ring-1 focus:ring-brownbold text-black outline-none"
            />
          </div>
        )}

        {!isEditing ? (
          <div className="w-full space-y-1 mt-4">
            <h2 className="text-[20px] md:text-[24px] font-extrabold text-black tracking-tight leading-none">
              {profile.name}
            </h2>
            <p className="text-[16px] md:text-[20px] font-medium text-black/60 pt-0.5">
              {profile.username} <span className="text-black/30">•</span>{" "}
              {profile.pronouns}
            </p>
            <p className="text-[14px] md:text-[20px] text-black leading-5 md:leading-6 pt-2 text-left font-normal">
              {profile.bio}
            </p>
          </div>
        ) : (
          <div className="w-full mt-4 space-y-3">
            <div>
              <label
                htmlFor="name-input"
                className="text-[10px] uppercase font-bold text-brownbold block text-left mb-1"
              >
                Display Name
              </label>
              <input
                id="name-input"
                type="text"
                name="name"
                value={editProfile.name}
                onChange={handleChange}
                className="w-full text-sm px-3 py-1.5 bg-[#F5F2EB] border border-black rounded focus:ring-2 focus:ring-brownbold text-black font-semibold outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label
                  htmlFor="username-input"
                  className="text-[10px] uppercase font-bold text-brownbold block text-left mb-1"
                >
                  Username
                </label>
                <input
                  id="username-input"
                  type="text"
                  name="username"
                  value={editProfile.username}
                  onChange={handleChange}
                  className="w-full text-xs px-2.5 py-1.5 bg-[#F5F2EB] border border-black rounded focus:ring-2 focus:ring-brownbold text-black outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="pronouns-input"
                  className="text-[10px] uppercase font-bold text-brownbold block text-left mb-1"
                >
                  Pronouns
                </label>
                <input
                  id="pronouns-input"
                  type="text"
                  name="pronouns"
                  value={editProfile.pronouns}
                  onChange={handleChange}
                  className="w-full text-xs px-2.5 py-1.5 bg-[#F5F2EB] border border-black rounded focus:ring-2 focus:ring-brownbold text-black outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="bio-input"
                className="text-[10px] uppercase font-bold text-brownbold block text-left mb-1"
              >
                Biography
              </label>
              <textarea
                id="bio-input"
                name="bio"
                value={editProfile.bio}
                onChange={handleChange}
                rows={3}
                className="w-full text-xs px-3 py-2 bg-[#F5F2EB] border border-black rounded focus:ring-2 focus:ring-brownbold text-black outline-none resize-none leading-relaxed"
              />
            </div>
          </div>
        )}
      </div>

      <div className="w-full">
        {!isEditing ? (
          <button
            type="button"
            onClick={handleEditClick}
            className="w-full py-1.5 bg-boldcream shadow-[6px_6px_0px_0px_#4A3728] hover:shadow-[0px_0px_0px_0px_#4A3728] hover:translate-x-[6px] hover:translate-y-[6px]  text-brownbold font-semibold rounded border-2  border-brownbold transition-all duration-200 cursor-pointer text-sm"
          >
            Edit profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 py-1.5 bg-brownbold text-[#EFEAD8] font-bold rounded border border-black transition-colors duration-150 cursor-pointer text-sm flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-1.5 bg-transparent hover:bg-black/5 text-black font-semibold rounded border border-black transition-colors duration-150 cursor-pointer text-sm flex items-center justify-center gap-1.5"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
          </div>
        )}
      </div>

      <div className="w-full">
        {!isEditing ? (
          <div className="flex flex-col gap-2 text-base md:text-lg">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 text-black hover:opacity-80 transition-opacity duration-150"
            >
              <GmailIcon />
              <span className="truncate">{profile.email}</span>
            </a>

            <a
              href={`https://instagram.com/${profile.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-black hover:opacity-80 transition-opacity duration-150"
            >
              <InstagramIcon />
              <span>{profile.instagram}</span>
            </a>

            <a
              href={`https://linkedin.com/${profile.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-black hover:opacity-80 transition-opacity duration-150"
            >
              <LinkedinIcon />
              <span>{profile.linkedin}</span>
            </a>
          </div>
        ) : (
          <div className="space-y-3 bg-[#F5F2EB] p-3 rounded border border-black border-dashed">
            <h4 className="text-[10px] uppercase font-bold text-[#4A3728] mb-1">
              Contact Details
            </h4>

            <div>
              <label
                htmlFor="email-input"
                className="text-[9px] uppercase font-bold text-black/50 block mb-0.5"
              >
                Email
              </label>
              <input
                id="email-input"
                type="email"
                name="email"
                value={editProfile.email}
                onChange={handleChange}
                className="w-full text-xs px-2 py-1 bg-white border border-black rounded focus:ring-1 focus:ring-[#4A3728] text-black outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="instagram-input"
                className="text-[9px] uppercase font-bold text-black/50 block mb-0.5"
              >
                Instagram
              </label>
              <input
                id="instagram-input"
                type="text"
                name="instagram"
                value={editProfile.instagram}
                onChange={handleChange}
                className="w-full text-xs px-2 py-1 bg-white border border-black rounded focus:ring-1 focus:ring-[#4A3728] text-black outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="linkedin-input"
                className="text-[9px] uppercase font-bold text-black/50 block mb-0.5"
              >
                LinkedIn
              </label>
              <input
                id="linkedin-input"
                type="text"
                name="linkedin"
                value={editProfile.linkedin}
                onChange={handleChange}
                className="w-full text-xs px-2 py-1 bg-white border border-black rounded focus:ring-1 focus:ring-[#4A3728] text-black outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Dividers and Achievements Section */}
      <div className="w-full">
        {/* Simple thin divider line */}
        <div className="border-t border-black/15 my-1" />

        <div className="pt-3">
          <h3 className="text-[13px] font-bold text-black tracking-wide mb-3">
            Achievements
          </h3>

          <div className="flex gap-2">
            {DEFAULT_ACHIEVEMENTS.map((badge) => (
              <button
                type="button"
                key={badge.id}
                className="relative group cursor-pointer focus:outline-none"
                onMouseEnter={() => setHoveredBadge(badge.id)}
                onMouseLeave={() => setHoveredBadge(null)}
                onFocus={() => setHoveredBadge(badge.id)}
                onBlur={() => setHoveredBadge(null)}
              >
                {/* Clean flat circular border, matching figma */}
                <div className="w-10 h-10 rounded-full overflow-hidden border border-black bg-white hover:scale-105 transition-all duration-200">
                  <Image
                    src={badge.image}
                    alt={badge.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Enhanced Interactive Tooltip */}
                {hoveredBadge === badge.id && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#4A3728] text-[#EFEAD8] text-xs p-3 rounded-lg border border-black z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
                    <p className="font-bold border-b border-[#EFEAD8]/20 pb-1 mb-1 text-[11px] tracking-wide text-left">
                      {badge.name}
                    </p>
                    <p className="text-[10px] text-[#EDE8D9]/80 leading-relaxed text-left">
                      {badge.description}
                    </p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-6 border-x-transparent border-t-6 border-t-black" />
                    <div className="absolute top-[calc(full-1px)] left-1/2 -translate-x-1/2 border-x-[5px] border-x-transparent border-t-[5px] border-t-[#4A3728]" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-black/15 mt-4" />
      </div>
    </>
  );

  if (!mounted) {
    return (
      <>
        {/* Desktop skeleton */}
        <aside className="hidden md:flex w-72 md:w-80 shrink-0 border-r-2 border-black p-6 flex-col gap-6 min-h-[calc(100vh-66px)] animate-pulse ml-20 mt-10">
          <div className="flex flex-col items-start w-full">
            <div className="w-44 h-44 rounded-full bg-black/5 border border-dashed border-black/20" />
            <div className="h-6 w-32 bg-black/5 rounded mt-4" />
            <div className="h-4 w-40 bg-black/5 rounded mt-2" />
            <div className="h-16 w-full bg-black/5 rounded mt-4" />
          </div>
        </aside>
      </>
    );
  }

  return (
    <>
      <aside className="hidden lg:flex w-72 md:w-80 shrink-0 border-black p-6 flex-col gap-5 min-h-[calc(100vh-66px)] transition-all duration-300 ml-20 mt-10">
        {profileContent}
      </aside>
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="drawer-backdrop"
            onClick={onClose}
            onKeyDown={(e) => e.key === "Escape" && onClose?.()}
          />

          {/* Drawer panel */}
          <aside className="drawer-enter fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background-cream border-l-2 border-black z-50 flex flex-col overflow-y-auto">
            {/* Drawer header with close button */}
            <div className="flex items-center justify-between p-4 border-b border-black/15">
              <h2 className="text-sm font-bold text-[#4A3728] uppercase tracking-wider">
                Profile
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-md hover:bg-black/5 transition-colors duration-150 cursor-pointer"
                aria-label="Close profile drawer"
              >
                <X className="w-5 h-5 text-black" />
              </button>
            </div>

            {/* Drawer content */}
            <div className="p-5 flex flex-col gap-5 flex-1">
              {profileContent}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
