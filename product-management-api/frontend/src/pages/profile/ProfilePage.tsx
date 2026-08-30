import { motion } from "framer-motion";

import {
  BadgeCheck,
  Mail,
  Shield,
  UserCircle2,
} from "lucide-react";

import Card from "../../components/ui/Card";
import { useAuth } from "../../hooks/useAuth";

function ProfilePage() {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-5xl space-y-8"
    >
      <div>

        <h1 className="text-4xl font-black">
          My Profile
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your account information.
        </p>

      </div>

      <Card>

        <div className="flex flex-col items-center gap-6 md:flex-row">

          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white">

            <UserCircle2 size={70} />

          </div>

          <div className="flex-1">

            <h2 className="text-3xl font-bold">
              {user?.firstName} {user?.lastName}
            </h2>

            <div className="mt-5 space-y-4">

              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  className="text-indigo-600"
                />

                {user?.email}

              </div>

              <div className="flex items-center gap-3">

                <Shield
                  size={18}
                  className="text-indigo-600"
                />

                {user?.role}

              </div>

              <div className="flex items-center gap-3">

                <BadgeCheck
                  size={18}
                  className="text-green-600"
                />

                Authenticated Account

              </div>

            </div>

          </div>

        </div>

      </Card>

    </motion.div>
  );
}

export default ProfilePage;