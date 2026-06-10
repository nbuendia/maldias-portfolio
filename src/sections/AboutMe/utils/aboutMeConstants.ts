export const WHOAMI_COMMAND = "cat who-am-i.txt";

export const WHO_AM_I = `Who am I? I'm your favorite bartender, a growing developer and lifelong student.

I'd spend my day daydreaming about games, animation and art. My curiosity led me to teach myself C# and Unity, which evolved into attending school for fullstack web development. What started as fun and games soon turned into a career and I had the pleasure of working alongside some of the most impressive minds at Shopify and Rockstar Games.

My desire to be better than I was yesterday progressed into a fascination with engineering and robotics. Today I'm actively pursuing a degree in Computer Engineering, learning more about hardware and integrating it with my software background.

What can I say, I love a challenge.`;

export const TECH_STACK_COMMAND = "cat tech-stack.txt";

const TECH_STACK_FRONTEND = {
  icon: "web",
  label: "Frontend",
  list: ["TypeScript", "JavaScript", "React", "Redux", "Vue.js", "Next.js","HTML", "CSS/SCSS"],
};

const TECH_STACK_BACKEND = {
  icon: "dns",
  label: "Backend",
  list: ["Node.js", "Express", "C#", ".NET"],
};

const TECH_STACK_TESTING = {
  icon: "fact_check",
  label: "Testing",
  list: ["Jest", "Cypress"],
};

const TECH_STACK_DATABASES = {
  icon: "database",
  label: "Database",
  list:["MongoDB", "SQL"],
};
const TECH_STACK_DEVOPS_INFRASTRUCTURE = {
  icon: "cloud_sync",
  label: "DevOps",
  list:["Git", "CI/CD", "Kubernetes"],
};

export const TECH_STACK = [TECH_STACK_FRONTEND, TECH_STACK_BACKEND, TECH_STACK_TESTING, TECH_STACK_DATABASES, TECH_STACK_DEVOPS_INFRASTRUCTURE];