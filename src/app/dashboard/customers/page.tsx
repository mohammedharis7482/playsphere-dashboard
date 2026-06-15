"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Mail,
  Phone,
  Search,
  Trash2,
  UserPlus,
  Users,
  X,
} from "lucide-react";

import { Customer } from "@/types/customer";

const inputClass =
  "w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [openAdd, setOpenAdd] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await fetch("/api/customers", {
          credentials: "include",
        });

        const data = await response.json();

        if (data.success) {
          setCustomers(data.data);
        }
      } catch (error) {
        console.error("FETCH_CUSTOMERS_ERROR", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    const value = search.toLowerCase();

    return customers.filter((customer) => {
      return (
        customer.name.toLowerCase().includes(value) ||
        customer.phone.includes(value) ||
        customer.email?.toLowerCase().includes(value)
      );
    });
  }, [customers, search]);

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
    });
    setError("");
  };

  const handleAddCustomer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      setError("Name and phone number are required.");
      return;
    }

    try {
      setAdding(true);
      setError("");

      const response = await fetch("/api/customers", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Failed to add customer.");
        return;
      }

      setCustomers((prev) => [data.data, ...prev]);
      resetForm();
      setOpenAdd(false);
    } catch (error) {
      console.error("ADD_CUSTOMER_ERROR", error);
      setError("Something went wrong while adding customer.");
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to delete customer.");
        return;
      }

      setCustomers((prev) => prev.filter((customer) => customer.id !== id));
    } catch (error) {
      console.error("DELETE_CUSTOMER_ERROR", error);
      alert("Something went wrong while deleting customer.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950">
            Customers
          </h1>

          <p className="mt-2 text-sm font-medium text-slate-500">
            Manage customer profiles, contact details and booking history.
          </p>
        </div>

        <button
          onClick={() => setOpenAdd(true)}
          className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
        >
          <UserPlus size={18} />
          Add Customer
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                Total Customers
              </p>
              <h3 className="mt-3 text-3xl font-black text-slate-950">
                {customers.length}
              </h3>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
              <Users size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">With Email</p>
          <h3 className="mt-3 text-3xl font-black text-slate-950">
            {customers.filter((c) => c.email).length}
          </h3>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">
            Search Results
          </p>
          <h3 className="mt-3 text-3xl font-black text-slate-950">
            {filteredCustomers.length}
          </h3>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">
            Active Records
          </p>
          <h3 className="mt-3 text-3xl font-black text-slate-950">
            {customers.length}
          </h3>
        </div>
      </div>

      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-950">
                Customer List
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Showing{" "}
                <span className="font-bold text-slate-800">
                  {filteredCustomers.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-slate-800">
                  {customers.length}
                </span>{" "}
                customers
              </p>
            </div>

            <div className="relative w-full xl:max-w-sm">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search customers..."
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-sm font-bold text-slate-500">
                Loading customers...
              </p>
            </div>
          ) : filteredCustomers.length > 0 ? (
            <div className="overflow-x-auto rounded-2xl border border-slate-100">
              <table className="w-full min-w-[760px]">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200 text-left">
                    {["Customer", "Phone", "Email", "Created", "Actions"].map(
                      (head) => (
                        <th
                          key={head}
                          className={`px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500 ${
                            head === "Actions" ? "text-center" : ""
                          }`}
                        >
                          {head}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50"
                    >
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-sm font-black text-emerald-700">
                            {customer.name.charAt(0)}
                          </div>

                          <div>
                            <p className="font-bold text-slate-900">
                              {customer.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              ID: {customer.id.slice(0, 8)}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                          <Phone size={16} className="text-slate-400" />
                          {customer.phone}
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                          <Mail size={16} className="text-slate-400" />
                          {customer.email || "No email"}
                        </div>
                      </td>

                      <td className="px-5 py-5 text-sm font-semibold text-slate-600">
                        {new Date(customer.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex justify-center">
                          <button
                            onClick={() => handleDeleteCustomer(customer.id)}
                            className="rounded-xl p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex min-h-[300px] items-center justify-center rounded-3xl bg-slate-50">
              <p className="text-sm font-bold text-slate-500">
                No customers found.
              </p>
            </div>
          )}
        </div>
      </section>

      {openAdd && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[32px] bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-950">
                  Add Customer
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a new customer profile.
                </p>
              </div>

              <button
                onClick={() => {
                  setOpenAdd(false);
                  resetForm();
                }}
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="space-y-4">
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Customer name"
                className={inputClass}
              />

              <input
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Phone number"
                className={inputClass}
              />

              <input
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email address optional"
                className={inputClass}
              />

              {error && <p className="text-sm font-bold text-red-500">{error}</p>}

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setOpenAdd(false);
                    resetForm();
                  }}
                  className="rounded-2xl border border-slate-200 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={adding}
                  className="rounded-2xl bg-emerald-500 px-5 py-3 font-bold text-white transition hover:bg-emerald-600 disabled:opacity-60"
                >
                  {adding ? "Adding..." : "Add Customer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}