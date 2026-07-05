import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { myProfileQuery } from "@/lib/queries";
import { updateMyProfile, getMyProfile } from "@/lib/account.functions";

export const Route = createFileRoute("/_authenticated/account/")({
  component: ProfilePage,
});

function ProfilePage() {
  const fetchProfile = useServerFn(getMyProfile);
  const updateFn = useServerFn(updateMyProfile);
  const qc = useQueryClient();
  const { data: profile } = useQuery({ ...myProfileQuery(), queryFn: () => fetchProfile() });

  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name ?? "");
      setPhone(profile.phone ?? "");
      setAvatarUrl(profile.avatar_url ?? "");
    }
  }, [profile]);

  const save = useMutation({
    mutationFn: () =>
      updateFn({ data: { display_name: displayName, phone, avatar_url: avatarUrl } }),
    onSuccess: () => {
      toast.success("PROFILE UPDATED");
      qc.invalidateQueries({ queryKey: ["account", "profile"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const initial = (displayName || "?").charAt(0).toUpperCase();

  return (
    <div className="space-y-8 max-w-xl">
      <header>
        <div className="section-num mb-1">/ 01 — IDENTITY</div>
        <h2 className="display-md">PROFILE</h2>
      </header>

      <div className="flex items-center gap-5">
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="w-20 h-20 object-cover bg-hc-surface border border-hc-border" />
        ) : (
          <div
            className="w-20 h-20 bg-hc-text text-hc-bg flex items-center justify-center text-3xl"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            {initial}
          </div>
        )}
        <div>
          <div className="font-bold text-lg">{displayName || "—"}</div>
          <div className="meta text-hc-muted">Member · #{(profile?.id ?? "").slice(0, 6).toUpperCase()}</div>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          save.mutate();
        }}
        className="space-y-6"
      >
        <div>
          <label className="label-xs text-hc-muted block mb-2">DISPLAY NAME</label>
          <input className="form-input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={80} />
        </div>
        <div>
          <label className="label-xs text-hc-muted block mb-2">PHONE</label>
          <input className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={40} />
        </div>
        <div>
          <label className="label-xs text-hc-muted block mb-2">AVATAR URL</label>
          <input
            className="form-input"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://…"
            maxLength={500}
          />
        </div>
        <button type="submit" disabled={save.isPending} className="cta cta-primary">
          {save.isPending ? "SAVING…" : "SAVE CHANGES"}
        </button>
      </form>
    </div>
  );
}
