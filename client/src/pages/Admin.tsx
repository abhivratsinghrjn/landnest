import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import {
  LayoutDashboard, Users, Building2, LogOut, Trash2,
  CheckCircle, XCircle, Star, StarOff, Shield, ShieldOff,
  Eye, TrendingUp, Home, RefreshCw, AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type Tab = "overview" | "properties" | "users";

function formatPrice(price: number, type: string) {
  if (type === "rent") return `₹${price.toLocaleString("en-IN")}/mo`;
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L`;
  return `₹${price.toLocaleString("en-IN")}`;
}

export default function Admin() {
  const [, setLocation] = useLocation();
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [tab, setTab] = useState<Tab>("overview");
  const [confirmDelete, setConfirmDelete] = useState<{ type: "property" | "user"; id: string | number } | null>(null);

  // Redirect if not admin
  if (!user) { setLocation("/auth"); return null; }
  if (user.role !== "admin") { setLocation("/"); return null; }

  // ── Queries ──────────────────────────────────────────────
  const { data: stats } = useQuery({
    queryKey: ["/api/admin/stats"],
    queryFn: () => fetch("/api/admin/stats").then(r => r.json()),
  });

  const { data: allProperties = [], isLoading: propsLoading } = useQuery({
    queryKey: ["/api/admin/properties"],
    queryFn: () => fetch("/api/admin/properties").then(r => r.json()),
    enabled: tab === "properties" || tab === "overview",
  });

  const { data: allUsers = [], isLoading: usersLoading } = useQuery({
    queryKey: ["/api/admin/users"],
    queryFn: () => fetch("/api/admin/users").then(r => r.json()),
    enabled: tab === "users",
  });

  // ── Mutations ─────────────────────────────────────────────
  const updateProperty = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: any }) =>
      fetch(`/api/admin/properties/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      }).then(r => r.json()),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/admin/properties"] }); toast({ description: "Property updated" }); },
  });

  const deleteProperty = useMutation({
    mutationFn: (id: number) => fetch(`/api/admin/properties/${id}`, { method: "DELETE" }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/admin/properties"] }); qc.invalidateQueries({ queryKey: ["/api/admin/stats"] }); toast({ description: "Property deleted" }); setConfirmDelete(null); },
  });

  const updateUser = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      }).then(r => r.json()),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/admin/users"] }); toast({ description: "User updated" }); },
  });

  const deleteUser = useMutation({
    mutationFn: (id: string) => fetch(`/api/admin/users/${id}`, { method: "DELETE" }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/admin/users"] }); qc.invalidateQueries({ queryKey: ["/api/admin/stats"] }); toast({ description: "User deleted" }); setConfirmDelete(null); },
  });

  const statusColor: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    sold: "bg-blue-100 text-blue-700",
    inactive: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">

      {/* ── Sidebar ── */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center font-bold text-lg">
              {user.name[0]}
            </div>
            <div>
              <p className="font-semibold text-sm">{user.name}</p>
              <p className="text-xs text-green-400 flex items-center gap-1"><Shield className="h-3 w-3" /> Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {([
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "properties", label: "Properties", icon: Building2 },
            { id: "users", label: "Users", icon: Users },
          ] as { id: Tab; label: string; icon: any }[]).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                tab === id ? "bg-green-700 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-2">
          <Button variant="ghost" size="sm" className="w-full justify-start text-gray-400 hover:text-white gap-2" onClick={() => setLocation("/")}>
            <Home className="h-4 w-4" /> View Website
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-red-400 hover:text-red-300 gap-2" onClick={() => logoutMutation.mutate()}>
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="ml-64 flex-1 p-8">

        {/* ── OVERVIEW TAB ── */}
        {tab === "overview" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { label: "Total Users", value: stats?.totalUsers ?? "—", icon: Users, color: "text-blue-400" },
                { label: "Total Properties", value: stats?.totalProperties ?? "—", icon: Building2, color: "text-purple-400" },
                { label: "Active Listings", value: stats?.activeProperties ?? "—", icon: CheckCircle, color: "text-green-400" },
                { label: "Sold Properties", value: stats?.soldProperties ?? "—", icon: TrendingUp, color: "text-yellow-400" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                  <Icon className={`h-6 w-6 ${color} mb-3`} />
                  <p className="text-3xl font-bold">{value}</p>
                  <p className="text-sm text-gray-400 mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Recent Properties */}
            <h2 className="text-lg font-semibold mb-4">Recent Listings</h2>
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-800 text-gray-400">
                  <tr>
                    <th className="text-left px-4 py-3">Title</th>
                    <th className="text-left px-4 py-3">Price</th>
                    <th className="text-left px-4 py-3">Status</th>
                    <th className="text-left px-4 py-3">Featured</th>
                    <th className="text-left px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allProperties.slice(0, 8).map((p: any) => (
                    <tr key={p.id} className="border-t border-gray-800 hover:bg-gray-800/50">
                      <td className="px-4 py-3 font-medium max-w-[200px] truncate">{p.title}</td>
                      <td className="px-4 py-3 text-green-400">{formatPrice(p.price, p.type)}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[p.status]}`}>{p.status}</span>
                      </td>
                      <td className="px-4 py-3">{p.featured ? <Star className="h-4 w-4 text-yellow-400" /> : <StarOff className="h-4 w-4 text-gray-600" />}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => setLocation(`/property/${p.id}`)} className="text-blue-400 hover:text-blue-300 mr-3"><Eye className="h-4 w-4" /></button>
                        <button onClick={() => setConfirmDelete({ type: "property", id: p.id })} className="text-red-400 hover:text-red-300"><Trash2 className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {allProperties.length > 8 && (
                <div className="px-4 py-3 border-t border-gray-800 text-center">
                  <button onClick={() => setTab("properties")} className="text-sm text-green-400 hover:text-green-300">View all {allProperties.length} properties →</button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ── PROPERTIES TAB ── */}
        {tab === "properties" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold">All Properties ({allProperties.length})</h1>
              <Button size="sm" variant="outline" className="gap-2 border-gray-700 text-gray-300" onClick={() => qc.invalidateQueries({ queryKey: ["/api/admin/properties"] })}>
                <RefreshCw className="h-4 w-4" /> Refresh
              </Button>
            </div>

            {propsLoading ? (
              <div className="text-center py-20 text-gray-500">Loading properties...</div>
            ) : (
              <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-800 text-gray-400">
                    <tr>
                      <th className="text-left px-4 py-3">ID</th>
                      <th className="text-left px-4 py-3">Title</th>
                      <th className="text-left px-4 py-3">Type</th>
                      <th className="text-left px-4 py-3">Price</th>
                      <th className="text-left px-4 py-3">Location</th>
                      <th className="text-left px-4 py-3">Status</th>
                      <th className="text-left px-4 py-3">Featured</th>
                      <th className="text-left px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProperties.map((p: any) => (
                      <tr key={p.id} className="border-t border-gray-800 hover:bg-gray-800/40">
                        <td className="px-4 py-3 text-gray-500">#{p.id}</td>
                        <td className="px-4 py-3 font-medium max-w-[180px] truncate">{p.title}</td>
                        <td className="px-4 py-3 capitalize text-gray-300">{p.type}</td>
                        <td className="px-4 py-3 text-green-400 font-medium">{formatPrice(p.price, p.type)}</td>
                        <td className="px-4 py-3 text-gray-300 max-w-[140px] truncate">{p.location}</td>
                        <td className="px-4 py-3">
                          <select
                            value={p.status}
                            onChange={(e) => updateProperty.mutate({ id: p.id, updates: { status: e.target.value } })}
                            className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-white"
                          >
                            <option value="active">Active</option>
                            <option value="sold">Sold</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => updateProperty.mutate({ id: p.id, updates: { featured: !p.featured } })}
                            className={p.featured ? "text-yellow-400 hover:text-yellow-300" : "text-gray-600 hover:text-yellow-400"}
                          >
                            {p.featured ? <Star className="h-4 w-4" /> : <StarOff className="h-4 w-4" />}
                          </button>
                        </td>
                        <td className="px-4 py-3 flex items-center gap-2">
                          <button onClick={() => setLocation(`/property/${p.id}`)} className="text-blue-400 hover:text-blue-300"><Eye className="h-4 w-4" /></button>
                          <button onClick={() => setConfirmDelete({ type: "property", id: p.id })} className="text-red-400 hover:text-red-300"><Trash2 className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}

        {/* ── USERS TAB ── */}
        {tab === "users" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold">All Users ({allUsers.length})</h1>
              <Button size="sm" variant="outline" className="gap-2 border-gray-700 text-gray-300" onClick={() => qc.invalidateQueries({ queryKey: ["/api/admin/users"] })}>
                <RefreshCw className="h-4 w-4" /> Refresh
              </Button>
            </div>

            {usersLoading ? (
              <div className="text-center py-20 text-gray-500">Loading users...</div>
            ) : (
              <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-800 text-gray-400">
                    <tr>
                      <th className="text-left px-4 py-3">Name</th>
                      <th className="text-left px-4 py-3">Email</th>
                      <th className="text-left px-4 py-3">Phone</th>
                      <th className="text-left px-4 py-3">Role</th>
                      <th className="text-left px-4 py-3">Joined</th>
                      <th className="text-left px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((u: any) => (
                      <tr key={u.id} className={`border-t border-gray-800 hover:bg-gray-800/40 ${u.id === user.id ? "bg-green-900/10" : ""}`}>
                        <td className="px-4 py-3 font-medium">
                          {u.name}
                          {u.id === user.id && <span className="ml-2 text-xs text-green-400">(you)</span>}
                        </td>
                        <td className="px-4 py-3 text-gray-300">{u.email}</td>
                        <td className="px-4 py-3 text-gray-300">{u.phone}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.role === "admin" ? "bg-green-900 text-green-300" : "bg-gray-800 text-gray-400"}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-xs">
                          {new Date(u.createdAt).toLocaleDateString("en-IN")}
                        </td>
                        <td className="px-4 py-3">
                          {u.id !== user.id && (
                            <div className="flex items-center gap-2">
                              {u.role !== "admin" ? (
                                <button
                                  onClick={() => updateUser.mutate({ id: u.id, updates: { role: "admin" } })}
                                  title="Make Admin"
                                  className="text-green-400 hover:text-green-300"
                                >
                                  <Shield className="h-4 w-4" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => updateUser.mutate({ id: u.id, updates: { role: "user" } })}
                                  title="Remove Admin"
                                  className="text-yellow-400 hover:text-yellow-300"
                                >
                                  <ShieldOff className="h-4 w-4" />
                                </button>
                              )}
                              <button
                                onClick={() => setConfirmDelete({ type: "user", id: u.id })}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* ── Confirm Delete Modal ── */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-sm w-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <h3 className="text-lg font-bold">Confirm Delete</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Are you sure you want to permanently delete this {confirmDelete.type}? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 border-gray-700" onClick={() => setConfirmDelete(null)}>
                Cancel
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                onClick={() => {
                  if (confirmDelete.type === "property") deleteProperty.mutate(confirmDelete.id as number);
                  else deleteUser.mutate(confirmDelete.id as string);
                }}
              >
                Delete
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
