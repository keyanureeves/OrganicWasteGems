"use client"

import { User, Mail, MapPin, Wallet, Edit, Award, TrendingUp, Calendar, Shield } from "lucide-react"
import { useState } from "react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Farmer",
    email: "john.farmer@organicwaste.io",
    location: "Karnataka, India",
    phone: "+91 98765 43210",
    bio: "Sustainable waste processor and environmental advocate",
  })

  const [editData, setEditData] = useState(profileData)

  const handleSave = () => {
    setProfileData(editData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Profile</h1>
          <p className="text-muted-foreground">Manage your account information and preferences.</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold neomorph-outset neomorph-hover transition-all duration-200 flex items-center gap-2"
        >
          <Edit className="w-5 h-5" />
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Profile Info */}
          <div className="neomorph-outset p-8 rounded-3xl bg-card border border-border">
            {/* Profile Header */}
            <div className="flex items-start gap-6 pb-8 border-b border-border">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                <User className="w-10 h-10 text-accent" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-foreground">{profileData.name}</h2>
                <p className="text-muted-foreground mt-2">Verified Farmer • Active Since January 2024</p>
                <div className="flex items-center gap-2 mt-3">
                  <Shield className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium text-accent">KYC Verified</span>
                </div>
              </div>
            </div>

            {/* Profile Info Fields */}
            <div className="space-y-6 pt-8">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-input border border-border text-foreground neomorph-inset focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                  />
                ) : (
                  <p className="px-4 py-3 rounded-2xl bg-secondary/5 border border-secondary/20 text-foreground">
                    {profileData.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-input border border-border text-foreground neomorph-inset focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                  />
                ) : (
                  <p className="px-4 py-3 rounded-2xl bg-secondary/5 border border-secondary/20 text-foreground">
                    {profileData.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-input border border-border text-foreground neomorph-inset focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                  />
                ) : (
                  <p className="px-4 py-3 rounded-2xl bg-secondary/5 border border-secondary/20 text-foreground">
                    {profileData.phone}
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-input border border-border text-foreground neomorph-inset focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                  />
                ) : (
                  <p className="px-4 py-3 rounded-2xl bg-secondary/5 border border-secondary/20 text-foreground">
                    {profileData.location}
                  </p>
                )}
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground">Bio</label>
                {isEditing ? (
                  <textarea
                    value={editData.bio}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-input border border-border text-foreground neomorph-inset focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
                    rows={3}
                  />
                ) : (
                  <p className="px-4 py-3 rounded-2xl bg-secondary/5 border border-secondary/20 text-foreground">
                    {profileData.bio}
                  </p>
                )}
              </div>

              {/* Save Button */}
              {isEditing && (
                <button
                  onClick={handleSave}
                  className="w-full px-6 py-3 rounded-2xl bg-accent text-accent-foreground font-semibold neomorph-outset neomorph-hover transition-all duration-200 mt-6"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-4">
          {/* Tier Badge */}
          <div className="neomorph-outset p-6 rounded-3xl bg-gradient-to-br from-accent/10 to-secondary/10 border border-accent/20">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-6 h-6 text-accent" />
              <p className="font-semibold text-foreground">Tier Status</p>
            </div>
            <p className="text-3xl font-bold text-accent">Gold</p>
            <p className="text-sm text-muted-foreground mt-2">Top 10% contributor</p>
          </div>

          {/* Joined Date */}
          <div className="neomorph-card p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground font-medium">Member Since</p>
            </div>
            <p className="text-lg font-semibold text-foreground">January 15, 2024</p>
          </div>

          {/* Wallet Connected */}
          <div className="neomorph-card p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Wallet className="w-5 h-5 text-accent" />
              <p className="text-sm text-muted-foreground font-medium">Wallet Status</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <p className="font-semibold text-foreground">Connected</p>
            </div>
          </div>

          {/* Lifetime Stats */}
          <div className="neomorph-card p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
              <TrendingUp className="w-5 h-5 text-accent" />
              <p className="font-semibold text-foreground">Lifetime Stats</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Waste Processed</span>
                <span className="font-semibold text-foreground">8,520 kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tokens Earned</span>
                <span className="font-semibold text-accent">38,340 OWG</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">CO₂ Saved</span>
                <span className="font-semibold text-foreground">2,556 kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="neomorph-card p-8 rounded-3xl bg-card border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-6">Account Settings</h2>

        <div className="space-y-4">
          {/* Password Section */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/5 border border-secondary/20 hover:bg-secondary/10 transition-colors">
            <div>
              <p className="font-semibold text-foreground">Password</p>
              <p className="text-sm text-muted-foreground">Change your password</p>
            </div>
            <button className="px-4 py-2 rounded-lg text-accent font-medium hover:bg-accent/10 transition-colors">
              Update
            </button>
          </div>

          {/* 2FA Section */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/5 border border-secondary/20 hover:bg-secondary/10 transition-colors">
            <div>
              <p className="font-semibold text-foreground">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Add extra security to your account</p>
            </div>
            <button className="px-4 py-2 rounded-lg text-accent font-medium hover:bg-accent/10 transition-colors">
              Enable
            </button>
          </div>

          {/* Notifications Section */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/5 border border-secondary/20 hover:bg-secondary/10 transition-colors">
            <div>
              <p className="font-semibold text-foreground">Notifications</p>
              <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
            </div>
            <button className="px-4 py-2 rounded-lg text-accent font-medium hover:bg-accent/10 transition-colors">
              Manage
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
