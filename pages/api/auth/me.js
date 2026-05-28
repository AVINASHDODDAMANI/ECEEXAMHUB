import { connectToDatabase } from "../../../lib/mongodb";
import { getSessionPayload } from "../../../lib/auth/session";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method not allowed." });
  }

  const session = getSessionPayload(req);

  if (!session) {
    return res.status(200).json({ user: null });
  }

  await connectToDatabase();

  const user = await User.findById(session.sub);

  if (!user || user.status !== "active") {
    return res.status(200).json({ user: null });
  }

  return res.status(200).json({
    user: {
      id: String(user._id),
      name: user.name,
      email: user.email || "",
      phone: user.phone || "",
      role: user.role,
    },
  });
}
