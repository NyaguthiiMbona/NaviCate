import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { CSVLink } from "react-csv";
import { useAuth } from "@/context/AuthContext";

interface UserRecord {
  email: string;
  tier: string;
  updatedAt: string;
}

interface EventRecord {
  id: string;
  eventType: string;
  pivotRole?: string;
  userEmail?: string;
  jobTitle?: string;
  jobLink?: string;
  userAgent?: string;
  createdAt?: string;
}

export default function AdminPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);

  // 🔐 Restrict access to admin email(s)
  const adminEmails = ["rnjaramba@gmail.com"];
  const isAdmin = user && adminEmails.includes(user.email || "");

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnap = await getDocs(collection(db, "users"));
      const userList: UserRecord[] = querySnap.docs.map((docSnap) => ({
        email: docSnap.id,
        ...(docSnap.data() as any),
      }));
      setUsers(userList);
      setLoadingUsers(false);
    };

    const fetchEvents = async () => {
      const q = query(collection(db, "events"), orderBy("createdAt", "desc"), limit(200));
      const querySnap = await getDocs(q);
      const eventList: EventRecord[] = querySnap.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as any),
        createdAt: docSnap.data().createdAt?.toDate().toISOString() ?? "",
      }));
      setEvents(eventList);
      setLoadingEvents(false);
    };

    if (isAdmin) {
      fetchUsers();
      fetchEvents();
    }
  }, [isAdmin]);

  const toggleTier = async (email: string, newTier: string) => {
    await updateDoc(doc(db, "users", email), { tier: newTier });
    setUsers((prev) =>
      prev.map((u) => (u.email === email ? { ...u, tier: newTier } : u))
    );
  };

  if (!isAdmin) {
    return <p className="text-center text-red-600 mt-20">Access denied</p>;
  }

  return (
    <main className="max-w-6xl mx-auto py-10 space-y-12">
      <h1 className="text-3xl font-bold text-teal mb-6">Admin Dashboard</h1>

      {/* USERS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        {loadingUsers ? (
          <p>Loading users...</p>
        ) : (
          <div className="overflow-x-auto border rounded-lg shadow-md">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Tier</th>
                  <th className="px-4 py-2">Updated</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.email} className="border-t">
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2 capitalize">{u.tier}</td>
                    <td className="px-4 py-2">{u.updatedAt}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => toggleTier(u.email, "starter")}
                        className="bg-gray-200 px-2 py-1 rounded"
                      >
                        Starter
                      </button>
                      <button
                        onClick={() => toggleTier(u.email, "pro")}
                        className="bg-blue-200 px-2 py-1 rounded"
                      >
                        Pro
                      </button>
                      <button
                        onClick={() => toggleTier(u.email, "business")}
                        className="bg-green-200 px-2 py-1 rounded"
                      >
                        Business
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4">
          <CSVLink
            data={users}
            filename={`users-${new Date().toISOString()}.csv`}
            className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-teal-dark transition"
          >
            Export Users CSV
          </CSVLink>
        </div>
      </section>

      {/* EVENTS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Events (last 200)</h2>
        {loadingEvents ? (
          <p>Loading events...</p>
        ) : (
          <div className="overflow-x-auto border rounded-lg shadow-md">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Event</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Pivot</th>
                  <th className="px-4 py-2">Job</th>
                  <th className="px-4 py-2">Created</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e) => (
                  <tr key={e.id} className="border-t">
                    <td className="px-4 py-2">{e.eventType}</td>
                    <td className="px-4 py-2">{e.userEmail ?? "-"}</td>
                    <td className="px-4 py-2">{e.pivotRole ?? "-"}</td>
                    <td className="px-4 py-2">{e.jobTitle ?? "-"}</td>
                    <td className="px-4 py-2">{e.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4">
          <CSVLink
            data={events}
            filename={`events-${new Date().toISOString()}.csv`}
            className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-teal-dark transition"
          >
            Export Events CSV
          </CSVLink>
        </div>
      </section>
    </main>
  );
}
