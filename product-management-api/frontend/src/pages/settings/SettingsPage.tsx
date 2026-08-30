import { motion } from "framer-motion";

import {
  Bell,
  Lock,
  Moon,
  ShieldCheck,
} from "lucide-react";

import Card from "../../components/ui/Card";

function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-6xl space-y-8"
    >
      <div>

        <h1 className="text-4xl font-black">
          Settings
        </h1>

        <p className="mt-2 text-slate-500">
          Configure your application preferences.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <Card>

          <div className="flex items-center gap-4">

            <Moon
              className="text-indigo-600"
              size={28}
            />

            <div>

              <h2 className="font-bold">
                Theme
              </h2>

              <p className="text-sm text-slate-500">
                Light Mode (Coming Soon)
              </p>

            </div>

          </div>

        </Card>

        <Card>

          <div className="flex items-center gap-4">

            <Bell
              className="text-indigo-600"
              size={28}
            />

            <div>

              <h2 className="font-bold">
                Notifications
              </h2>

              <p className="text-sm text-slate-500">
                Enabled
              </p>

            </div>

          </div>

        </Card>

        <Card>

          <div className="flex items-center gap-4">

            <Lock
              className="text-indigo-600"
              size={28}
            />

            <div>

              <h2 className="font-bold">
                Password
              </h2>

              <p className="text-sm text-slate-500">
                Protected with encryption
              </p>

            </div>

          </div>

        </Card>

        <Card>

          <div className="flex items-center gap-4">

            <ShieldCheck
              className="text-green-600"
              size={28}
            />

            <div>

              <h2 className="font-bold">
                Security
              </h2>

              <p className="text-sm text-slate-500">
                JWT Authentication Enabled
              </p>

            </div>

          </div>

        </Card>

      </div>

    </motion.div>
  );
}

export default SettingsPage;