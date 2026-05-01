"use client"

import { useState } from "react"
import { User, Mail, Bell, Shield, Palette, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

// Settings sections
const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile")
  const [profileData, setProfileData] = useState({
    name: "Dr. Jane Smith",
    email: "jane.smith@university.edu",
    institution: "MIT Research Lab",
    bio: "Computational biologist focusing on protein structure prediction.",
  })
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  return (
    <DashboardLayout 
      title="Settings" 
      description="Manage your account preferences and settings."
    >
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {section.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="rounded-xl border border-border bg-card p-6">
            {activeSection === "profile" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Profile Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Update your personal information and profile details.
                  </p>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
                    <User className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                    <p className="mt-1 text-xs text-muted-foreground">
                      JPG, PNG or GIF. Max 2MB.
                    </p>
                  </div>
                </div>

                {/* Form */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground">
                      Full Name
                    </label>
                    <Input
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="mt-2 bg-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="mt-2 bg-secondary"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground">
                      Institution
                    </label>
                    <Input
                      value={profileData.institution}
                      onChange={(e) => setProfileData({ ...profileData, institution: e.target.value })}
                      className="mt-2 bg-secondary"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground">
                      Bio
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      rows={4}
                      className="mt-2 w-full rounded-lg border border-input bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    {isSaved ? "Saved!" : "Save Changes"}
                  </Button>
                </div>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Notification Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage how you receive notifications.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Email notifications", description: "Receive email updates about your account" },
                    { label: "Research alerts", description: "Get notified about new papers in your field" },
                    { label: "Product updates", description: "Learn about new features and improvements" },
                    { label: "Weekly digest", description: "Receive a summary of your research activity" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div>
                        <div className="font-medium text-foreground">{item.label}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" className="peer sr-only" defaultChecked />
                        <div className="h-6 w-11 rounded-full bg-secondary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-foreground after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:ring-2 peer-focus:ring-primary/20" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "security" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Security Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage your password and security preferences.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground">
                      Current Password
                    </label>
                    <Input type="password" className="mt-2 bg-secondary" placeholder="Enter current password" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground">
                      New Password
                    </label>
                    <Input type="password" className="mt-2 bg-secondary" placeholder="Enter new password" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground">
                      Confirm New Password
                    </label>
                    <Input type="password" className="mt-2 bg-secondary" placeholder="Confirm new password" />
                  </div>
                </div>

                <Button>Update Password</Button>

                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-foreground">Two-Factor Authentication</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Add an extra layer of security to your account.
                  </p>
                  <Button variant="outline" className="mt-4">Enable 2FA</Button>
                </div>
              </div>
            )}

            {activeSection === "appearance" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Appearance Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Customize how InnovaSci looks for you.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Theme
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {["Light", "Dark", "System"].map((theme) => (
                        <button
                          key={theme}
                          className={`rounded-lg border p-4 text-center transition-colors ${
                            theme === "Dark"
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="font-medium text-foreground">{theme}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Sidebar Position
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {["Left", "Right"].map((position) => (
                        <button
                          key={position}
                          className={`rounded-lg border p-4 text-center transition-colors ${
                            position === "Left"
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="font-medium text-foreground">{position}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
