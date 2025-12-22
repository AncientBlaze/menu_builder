

import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const Route = createFileRoute("/Login")({
    beforeLoad: () => {
        throw redirect({to: "/"})
    },
    component: LoginRoute,
});

function LoginRoute() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });

    const loginMutation = useMutation({
        mutationFn: async (data: { email: string; password: string }) => {
            await new Promise((r) => setTimeout(r, 800));
            return { email: data.email };
        },
        onSuccess: () => {
            navigate({ to: "/" });
        },
    });

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-white/5 p-8 backdrop-blur border border-white/10">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">
                    Login
                </h1>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        loginMutation.mutate(form);
                    }}
                    className="space-y-4"
                >
                    <input
                        className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2 text-white"
                        placeholder="Email"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <input
                        type="password"
                        className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2 text-white"
                        placeholder="Password"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                    {loginMutation.isError && (
                        <p className="text-red-400 text-sm">
                            {(loginMutation.error as Error).message}
                        </p>
                    )}

                    <button className="w-full rounded-lg bg-indigo-600 py-2 text-white font-semibold">
                        {loginMutation.isPending ? "Logging in…" : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

