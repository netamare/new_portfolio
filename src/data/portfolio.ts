export const portfolio = {
  name: "Netsanet Amare",
  firstName: "Netsanet",
  lastName: "Amare",
  role: "Computer Science Student · Developer · Creative Thinker",
  intro:
    "I enjoy building digital experiences, solving problems, and turning ideas into functional applications. I'm currently exploring mobile and web development.",
  about:
    "I'm Netsanet Amare, a Computer Science student at Arsi University interested in mobile and web development. I enjoy building useful applications, solving problems, learning new technologies, and creating clean user interfaces.",
  email: "nestiamare64@gmail.com",
  photo: "/images/net.jpg",
  socials: {
    github: { label: "GitHub", username: "netamare", url: "https://github.com/netamare" },
    linkedin: {
      label: "LinkedIn",
      username: "netsanet-amare-599a11381",
      url: "https://www.linkedin.com/in/netsanet-amare-599a11381",
    },
    codeforces: {
      label: "Codeforces",
      username: "netsiamre21",
      url: "https://codeforces.com/profile/netsiamre21",
    },
    leetcode: {
      label: "LeetCode",
      username: "net_amare",
      url: "https://leetcode.com/u/net_amare/",
    },
  },
};

export const skillGroups = [
  { title: "Mobile", skills: ["Flutter", "Dart", "Kotlin", "React Native"] },
  { title: "Web", skills: ["HTML", "CSS", "JavaScript", "Next.js", "API Integration"] },
  { title: "Backend & Database", skills: ["Firebase", "MongoDB", "Supabase"] },
  { title: "Tools", skills: ["Git", "GitHub", "VS Code", "Android Studio"] },
  { title: "Creative", skills: ["UI/UX Design", "Video Editing"] },
] as const;

export const projects = [
  {
    title: "WellFly – Flight Booking App",
    description: "An Expedia-inspired flight booking application.",
    technologies: ["Flutter", "Dart", "Flight API"],
    overview: "An Expedia-inspired flight booking application.",
    features: ["Flight booking experience"],
    githubUrl: "",
    liveUrl: "",
    kind: "flight",
    image: "/images/projects/wellfly.png",
  },
  {
    title: "University Student Helper",
    description: "A student productivity app for schedules, GPA calculation, assignments, and notes.",
    technologies: ["Flutter", "Dart", "Hive"],
    overview: "A student productivity app for managing academic routines and coursework.",
    features: ["Schedules", "GPA calculation", "Assignments", "Notes"],
    githubUrl: "",
    liveUrl: "",
    kind: "student",
    image: "/images/projects/student-helper.png",
  },
  {
    title: "Call Center 9141 Events Escalation and Response Monitoring System",
    description: "A web-based system for tracking citizen complaints, responses, and department performance.",
    technologies: ["HTML", "CSS", "JavaScript"],
    overview: "A web-based system for tracking citizen complaints, responses, and department performance.",
    features: ["Complaint tracking", "Response monitoring", "Department performance tracking"],
    githubUrl: "",
    liveUrl: "",
    kind: "monitoring",
    image: "/images/projects/call-center.png",
  },
] as const;
