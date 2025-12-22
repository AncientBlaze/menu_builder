import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const Route = createFileRoute("/Signup")({
    beforeLoad: () => {
        throw redirect({to : "/"})
    },
    component: SignupPage,
});

async function signupUser(data: { email: string; password: string }) {
    await new Promise((r) => setTimeout(r, 800));
    return { email: data.email };
}

function SignupPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });

    const mutation = useMutation({
        mutationFn: signupUser,
        onSuccess: () => {
            navigate({ to: "/" });
        },
    });

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-white/5 p-8 backdrop-blur border border-white/10">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">
                    Sign Up
                </h1>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        mutation.mutate(form);
                    }}
                    className="space-y-4"
                >
                    <input
                        value={form.email}
                        className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2 text-white"
                        placeholder="Email"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <input
                        value={form.password}
                        type="password"
                        className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2 text-white"
                        placeholder="Password"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    {mutation.isError && (
                        <p className="text-sm text-red-400">
                            {(mutation.error as Error).message}
                        </p>
                    )}

                    <button className="w-full rounded-lg bg-indigo-600 py-2 text-white font-semibold">
                        {mutation.isPending ? "Creating…" : "Create Account"}
                    </button>
                </form>
            </div>
        </div>
    );
}
