import { Navbar } from "@/components/navbar";

const facultyCoordinator = {
  name: "Dr. Aruna Reddy",
  phone: "9886511820",
  role: "Faculty Coordinator",
};

const studentCoordinators = [
  { name: "Hitesh R Sulega", phone: "7406573131" },
  { name: "Bhargav L Reddy", phone: "9886957026" },
  { name: "Jithesh U", phone: "8722067551" },
  { name: "Akash R", phone: "8073892740" },
  { name: "Vasanth Kumar S", phone: "9620300081" },
];

export default function TeamPage() {
  return (
    <div
      className="min-h-screen w-full flex flex-col bg-fixed bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <Navbar />

      {/* Dark overlay for readability */}
      <div className="flex-1 flex flex-col items-center justify-start px-4 py-12 md:py-20 bg-black/60">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-2 tracking-tight drop-shadow-lg">
          Our Team
        </h1>
        <p className="text-white/70 text-center mb-12 md:mb-16 text-sm md:text-base">
          The people behind the fest
        </p>

        {/* Faculty Coordinator */}
        <div className="w-full max-w-md mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">👩‍🏫</span>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Faculty Coordinator
            </h2>
          </div>
          <div className="relative group rounded-2xl border border-white/15 bg-black/50 backdrop-blur-xl p-6 hover:border-amber-400/40 transition-all duration-300 shadow-lg">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-xl font-semibold text-white">
                  {facultyCoordinator.name}
                </p>
                <p className="text-white/50 text-sm mt-0.5">
                  {facultyCoordinator.role}
                </p>
              </div>
              <a
                href={`tel:${facultyCoordinator.phone}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-sm font-medium hover:bg-amber-500/25 transition-colors duration-200"
              >
                📞 {facultyCoordinator.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Student Coordinators */}
        <div className="w-full max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">👨‍💻</span>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              Student Coordinators / Team Members
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {studentCoordinators.map((member) => (
              <div
                key={member.phone}
                className="group relative rounded-2xl border border-white/15 bg-black/50 backdrop-blur-xl p-5 hover:border-blue-400/40 transition-all duration-300 shadow-lg"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <p className="text-lg font-semibold text-white">
                    {member.name}
                  </p>
                  <a
                    href={`tel:${member.phone}`}
                    className="inline-flex items-center gap-1.5 mt-2 text-white/60 text-sm hover:text-blue-300 transition-colors duration-200"
                  >
                    📞 {member.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
